import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { createCall } from "../services/api";
import "./CallProvider.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const CallContext = createContext(null);

function readCurrentUser() {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readToken() {
  return localStorage.getItem("token") || readCurrentUser()?.token || null;
}

function parseMessage(message) {
  try {
    return JSON.parse(message.body);
  } catch {
    return null;
  }
}

function getPeerUserId(call, currentUserId) {
  if (!call || !currentUserId) return null;

  return Number(currentUserId) === Number(call.callerId)
    ? call.translatorId
    : call.callerId;
}

export function CallProvider({ children }) {
  const navigate = useNavigate();

  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callStatus, setCallStatus] = useState("idle");
  const [callError, setCallError] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const stompRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const activeCallRef = useRef(null);
  const pendingIceRef = useRef([]);
  const preparingRef = useRef(null);

  const currentUser = readCurrentUser();
  const currentUserId = currentUser?.id;

  useEffect(() => {
    activeCallRef.current = activeCall;
  }, [activeCall]);

  const cleanupPeer = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.ontrack = null;
      peerRef.current.onicecandidate = null;
      peerRef.current.close();
      peerRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    pendingIceRef.current = [];
    preparingRef.current = null;

    setLocalStream(null);
    setRemoteStream(null);
    setIsMuted(false);
    setIsCameraOff(false);
  }, []);

  const resetCall = useCallback(
    (status = "idle") => {
      cleanupPeer();
      setIncomingCall(null);
      setActiveCall(null);
      setCallStatus(status);
    },
    [cleanupPeer],
  );

  const publish = useCallback((destination, body) => {
    const client = stompRef.current;

    if (!client?.connected) {
      setCallError("WebSocket is not connected. Please login again.");
      return false;
    }

    client.publish({
      destination,
      body: JSON.stringify(body),
    });

    return true;
  }, []);

  const flushPendingIce = useCallback(async () => {
    const pc = peerRef.current;

    if (!pc?.remoteDescription) return;

    const candidates = [...pendingIceRef.current];
    pendingIceRef.current = [];

    for (const candidate of candidates) {
      try {
        await pc.addIceCandidate(candidate);
      } catch (error) {
        console.error("Failed to add queued ICE candidate", error);
      }
    }
  }, []);

  const preparePeerConnection = useCallback(
    async (callPayload) => {
      if (peerRef.current) return peerRef.current;
      if (preparingRef.current) return preparingRef.current;

      preparingRef.current = (async () => {
        const pc = new RTCPeerConnection(ICE_SERVERS);
        peerRef.current = pc;

        pc.ontrack = (event) => {
          const [stream] = event.streams;
          if (stream) setRemoteStream(stream);
        };

        pc.onicecandidate = (event) => {
          if (!event.candidate) return;

          const user = readCurrentUser();
          const toUserId = getPeerUserId(callPayload, user?.id);

          if (!toUserId) return;

          publish("/app/webrtc/ice", {
            callId: callPayload.callId,
            toUserId,
            candidate: JSON.stringify(event.candidate.toJSON()),
          });
        };

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        localStreamRef.current = stream;
        setLocalStream(stream);

        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        return pc;
      })();

      try {
        return await preparingRef.current;
      } finally {
        preparingRef.current = null;
      }
    },
    [publish],
  );

  const createAndSendOffer = useCallback(
    async (callPayload) => {
      const user = readCurrentUser();
      const pc = await preparePeerConnection(callPayload);

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      publish("/app/webrtc/offer", {
        callId: callPayload.callId,
        toUserId: getPeerUserId(callPayload, user?.id),
        sdp: offer.sdp,
      });
    },
    [preparePeerConnection, publish],
  );

  const handleStarted = useCallback(
    async (payload) => {
      if (!payload?.callId) return;

      setCallError("");
      setIncomingCall(null);
      setActiveCall(payload);
      setCallStatus("started");

      try {
        await preparePeerConnection(payload);

        const user = readCurrentUser();

        if (Number(user?.id) === Number(payload.callerId)) {
          await createAndSendOffer(payload);
        }
      } catch (error) {
        console.error("Could not prepare WebRTC", error);
        setCallError(
          error?.message ||
            "Camera/microphone permission failed. Please allow access.",
        );
      }
    },
    [createAndSendOffer, preparePeerConnection],
  );

  const handleOffer = useCallback(
    async (payload) => {
      const callPayload = activeCallRef.current;

      if (
        !payload?.callId ||
        !callPayload ||
        Number(payload.callId) !== Number(callPayload.callId)
      ) {
        return;
      }

      try {
        const pc = await preparePeerConnection(callPayload);

        await pc.setRemoteDescription({
          type: "offer",
          sdp: payload.sdp,
        });

        await flushPendingIce();

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        const user = readCurrentUser();

        publish("/app/webrtc/answer", {
          callId: callPayload.callId,
          toUserId: getPeerUserId(callPayload, user?.id),
          sdp: answer.sdp,
        });
      } catch (error) {
        console.error("Failed to handle offer", error);
        setCallError(error?.message || "Failed to handle WebRTC offer.");
      }
    },
    [flushPendingIce, preparePeerConnection, publish],
  );

  const handleAnswer = useCallback(
    async (payload) => {
      const callPayload = activeCallRef.current;

      if (
        !payload?.callId ||
        !callPayload ||
        Number(payload.callId) !== Number(callPayload.callId)
      ) {
        return;
      }

      try {
        const pc = peerRef.current;
        if (!pc) return;

        await pc.setRemoteDescription({
          type: "answer",
          sdp: payload.sdp,
        });

        await flushPendingIce();
      } catch (error) {
        console.error("Failed to handle answer", error);
        setCallError(error?.message || "Failed to handle WebRTC answer.");
      }
    },
    [flushPendingIce],
  );

  const handleIce = useCallback(async (payload) => {
    const callPayload = activeCallRef.current;

    if (
      !payload?.callId ||
      !callPayload ||
      Number(payload.callId) !== Number(callPayload.callId)
    ) {
      return;
    }

    try {
      const candidateData =
        typeof payload.candidate === "string"
          ? JSON.parse(payload.candidate)
          : payload.candidate;

      const candidate = new RTCIceCandidate(candidateData);
      const pc = peerRef.current;

      if (pc?.remoteDescription) {
        await pc.addIceCandidate(candidate);
      } else {
        pendingIceRef.current.push(candidate);
      }
    } catch (error) {
      console.error("Failed to handle ICE candidate", error);
    }
  }, []);

  useEffect(() => {
    const token = readToken();

    if (!token || !currentUserId) {
      if (stompRef.current) {
        stompRef.current.deactivate();
        stompRef.current = null;
      }

      resetCall("idle");
      return;
    }

    if (stompRef.current?.active || stompRef.current?.connected) {
      return;
    }

    const bearer = `Bearer ${token}`;
    const wsUrl = `${API_BASE_URL}/ws?token=${encodeURIComponent(bearer)}`;

    console.log("WS URL:", wsUrl);

    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),

      connectHeaders: {
        Authorization: bearer,
      },

      reconnectDelay: 5000,

      debug: () => {},

      onConnect: () => {
        console.log("STOMP connected");

        setCallError("");

        client.subscribe("/user/topic/notification", () => {});

        client.subscribe("/user/queue/incoming-call", (msg) => {
          const payload = parseMessage(msg);
          console.log("Incoming call:", payload);

          if (payload?.callId) {
            setIncomingCall(payload);
            setCallStatus("incoming");
          }
        });

        client.subscribe("/user/queue/call-started", (msg) => {
          const payload = parseMessage(msg);
          console.log("Call started:", payload);
          handleStarted(payload);
        });

        client.subscribe("/user/queue/call-rejected", () => {
          console.log("Call rejected");
          resetCall("rejected");
        });

        client.subscribe("/user/queue/call-ended", () => {
          console.log("Call ended");
          resetCall("ended");
        });

        client.subscribe("/user/queue/call-timeout", () => {
          console.log("Call timeout");
          resetCall("timeout");
        });

        client.subscribe("/user/queue/webrtc/offer", (msg) => {
          const payload = parseMessage(msg);
          console.log("Received offer:", payload);
          handleOffer(payload);
        });

        client.subscribe("/user/queue/webrtc/answer", (msg) => {
          const payload = parseMessage(msg);
          console.log("Received answer:", payload);
          handleAnswer(payload);
        });

        client.subscribe("/user/queue/webrtc/ice", (msg) => {
          const payload = parseMessage(msg);
          console.log("Received ICE:", payload);
          handleIce(payload);
        });
      },

      onWebSocketClose: (event) => {
        console.log("WebSocket closed", event);

        if (!event.wasClean) {
          cleanupPeer();
        }
      },

      onStompError: (frame) => {
        console.log("STOMP error", frame);

        setCallError(
          frame.headers?.message || frame.body || "WebSocket/STOMP error",
        );
      },
    });

    stompRef.current = client;
    client.activate();

    return () => {
      client.deactivate();

      if (stompRef.current === client) {
        stompRef.current = null;
      }
    };
  }, [
    cleanupPeer,
    currentUserId,
    handleAnswer,
    handleIce,
    handleOffer,
    handleStarted,
    resetCall,
  ]);

  const startCall = useCallback(async ({ recipientId, themeId }) => {
    setCallError("");
    setCallStatus("creating");

    const payload = await createCall({
      recipientId,
      themeId,
    });

    setActiveCall(payload);
    setCallStatus("ringing");

    return payload;
  }, []);

  const acceptCall = useCallback(() => {
    if (!incomingCall?.callId) return;

    setActiveCall(incomingCall);
    setCallStatus("accepting");

    publish("/app/call/accept", {
      callId: incomingCall.callId,
    });

    navigate("/translator/call");
  }, [incomingCall, navigate, publish]);

  const rejectCall = useCallback(() => {
    if (!incomingCall?.callId) return;

    publish("/app/call/reject", {
      callId: incomingCall.callId,
    });

    resetCall("rejected");
  }, [incomingCall, publish, resetCall]);

  const endCall = useCallback(() => {
    const callId = activeCallRef.current?.callId || incomingCall?.callId;

    if (callId) {
      publish("/app/call/end", {
        callId,
      });
    }

    resetCall("ended");
  }, [incomingCall, publish, resetCall]);

  const toggleMute = useCallback(() => {
    const audioTracks = localStreamRef.current?.getAudioTracks() || [];

    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMuted((value) => !value);
  }, []);

  const toggleCamera = useCallback(() => {
    const videoTracks = localStreamRef.current?.getVideoTracks() || [];

    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsCameraOff((value) => !value);
  }, []);

  const value = useMemo(
    () => ({
      activeCall,
      incomingCall,
      callStatus,
      callError,
      localStream,
      remoteStream,
      isMuted,
      isCameraOff,
      startCall,
      acceptCall,
      rejectCall,
      endCall,
      toggleMute,
      toggleCamera,
    }),
    [
      acceptCall,
      activeCall,
      callError,
      callStatus,
      endCall,
      incomingCall,
      isCameraOff,
      isMuted,
      localStream,
      rejectCall,
      remoteStream,
      startCall,
      toggleCamera,
      toggleMute,
    ],
  );

  return (
    <CallContext.Provider value={value}>
      {children}

      {incomingCall && (
        <div className="incoming-call-backdrop">
          <div className="incoming-call-card">
            <p className="incoming-call-label">Incoming call</p>
            <h3>{incomingCall.callerName || "User"}</h3>
            <p>{incomingCall.theme || "Translation call"}</p>

            <div className="incoming-call-actions">
              <button className="reject" onClick={rejectCall}>
                Reject
              </button>

              <button className="accept" onClick={acceptCall}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </CallContext.Provider>
  );
}

export function useCall() {
  const context = useContext(CallContext);

  if (!context) {
    throw new Error("useCall must be used inside CallProvider");
  }

  return context;
}