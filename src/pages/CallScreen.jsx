import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";

export default function CallScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const translator = location.state?.translator;
  const topic = location.state?.topic;

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
          <p className="calling-label">Calling...</p>

          {translator && (
            <>
              <img
                src={translator.image}
                alt={translator.name}
                className="active-call-img"
              />

              <h2>{translator.name}</h2>
              <p className="active-call-topic">{topic?.name}</p>
            </>
          )}

          <div className="call-actions">
            <button>🎤</button>
            <button>🔊</button>
            <button>💬</button>
          </div>

          <button className="end-call-btn" onClick={() => navigate("/home")}>
            End Call
          </button>
        </main>

        <div className="home-indicator" />
      </div>
    </div>
  );
}