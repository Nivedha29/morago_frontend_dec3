import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { useCall } from "../context/CallProvider.jsx";
import "./CallScreen.css";

export default function CallScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const hasCreatedCallRef = useRef(false);

  const [screenError, setScreenError] = useState("");

  const translator = location.state?.translator;
  const topic = location.state?.topic;

  const {
    activeCall,
    callStatus,
    callError,
    localStream,
    remoteStream,
    startCall,
    endCall,
    toggleMute,
    toggleCamera,
    isMuted,
    isCameraOff,
  } = useCall();

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream || null;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  useEffect(() => {
    const recipientId = translator?.id || translator?.translatorId;
    const themeId = topic?.id || topic?.themeId;

    if (!activeCall && recipientId && themeId && !hasCreatedCallRef.current) {
      hasCreatedCallRef.current = true;

      startCall({ recipientId, themeId }).catch((error) => {
        setScreenError(error?.message || "Failed to create call.");
        hasCreatedCallRef.current = false;
      });
    }
  }, [activeCall, startCall, topic, translator]);

  const handleEndCall = () => {
    endCall();
    navigate("/my-calls");
  };

  const displayName =
    translator?.name ||
    activeCall?.callerName ||
    activeCall?.translatorName ||
    "Call";

  const displayTopic = topic?.name || activeCall?.theme || "Translation call";

  return (
    <div className="phone-wrap">
      <div className="screen active-call-page">
        <StatusBar />

        <div className="call-header">
          <button onClick={() => navigate(-1)}>←</button>
          <b>morago</b>
          <span />
        </div>

        <main className="active-call-body">
          <p className="calling-label">
            {callStatus === "started" ? "Connected" : "Calling..."}
          </p>

          <div className="video-stage">
            <video
              ref={remoteVideoRef}
              className="remote-video"
              autoPlay
              playsInline
            />

            <video
              ref={localVideoRef}
              className="local-video"
              autoPlay
              playsInline
              muted
            />
          </div>

          <h2>{displayName}</h2>
          <p className="active-call-topic">{displayTopic}</p>

          {(screenError || callError) && (
            <p className="call-error-text">{screenError || callError}</p>
          )}

          <div className="call-actions">
            <button type="button" onClick={toggleMute}>
              {isMuted ? "🔇" : "🎤"}
            </button>

            <button type="button" onClick={toggleCamera}>
              {isCameraOff ? "📷" : "🎥"}
            </button>

            <button type="button">💬</button>
          </div>

          <button className="end-call-btn" onClick={handleEndCall}>
            End Call
          </button>
        </main>

        <div className="home-indicator" />
      </div>
    </div>
  );
}