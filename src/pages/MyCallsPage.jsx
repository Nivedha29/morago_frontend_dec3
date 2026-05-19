import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { getUserCallHistory } from "../services/user.js";
import fallbackAvatar from "../assets/avatar.svg";
import "./MyCallsPage.css";

const getContent = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content || data?.data?.content || [];
};

export default function MyCallsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMissed = activeTab === "missed";

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);

        const data = await getUserCallHistory({
          isMissed,
          isLast: false,
          page: 0,
          size: 20,
          sortBy: "id",
          sortDirection: "DESC",
        });

        setCalls(getContent(data));
      } catch (error) {
        console.error("Call history error:", error);
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [isMissed]);

  const getName = (call) =>
    call?.translatorName ||
    call?.recipientName ||
    call?.callerName ||
    call?.translator?.name ||
    "Translator";

  const getTopic = (call) =>
    call?.theme ||
    call?.themeName ||
    call?.topic ||
    call?.translator?.theme ||
    "Topic";

  const getAvatar = (call) =>
    call?.imageURL ||
    call?.imageUrl ||
    call?.avatarURL ||
    call?.avatarUrl ||
    call?.translator?.imageURL ||
    fallbackAvatar;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="screen my-calls-page">
      <div className="my-calls-top">
        <StatusBar />

        <header className="my-calls-header">
          <b>morago</b>
        </header>
      </div>

      <main className="my-calls-body">
        <div className="calls-tabs">
          <button
            type="button"
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>

          <button
            type="button"
            className={activeTab === "missed" ? "active" : ""}
            onClick={() => setActiveTab("missed")}
          >
            Missed
          </button>
        </div>

        <h2>Recent</h2>

        {loading && <p className="calls-muted">Loading...</p>}

        {!loading && calls.length === 0 && (
          <p className="calls-muted">No call history found.</p>
        )}

        <div className="calls-list">
          {calls.map((call) => {
            const missed = call?.isMissed || call?.missed || isMissed;

            return (
              <button type="button" className="calls-row" key={call.id}>
                <div className="calls-avatar-wrap">
                  <img
                    src={getAvatar(call)}
                    alt={getName(call)}
                    onError={(e) => {
                      e.currentTarget.src = fallbackAvatar;
                    }}
                  />
                  {missed && <span className="missed-dot" />}
                </div>

                <div className="calls-info">
                  <div>
                    <b>{getName(call)}</b>
                    <span className={missed ? "dot red" : "dot green"} />
                  </div>
                  <p>{getTopic(call)}</p>
                </div>

                <div className="calls-meta">
                  <span>
                    {formatDate(
                      call?.createdAt || call?.createdDate || call?.date
                    )}
                  </span>
                  <small>{call?.duration || call?.minutes || ""} minutes</small>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <nav className="bottom-nav">
        <button type="button" onClick={() => navigate("/home")}>
          <span>⌂</span>
          Home
        </button>

        <button
          type="button"
          className="active"
          onClick={() => navigate("/my-calls")}
        >
          <span>☏</span>
          My calls
        </button>

        <button type="button">
          <span>▢</span>
          Message
        </button>

        <button type="button" onClick={() => navigate("/profile")}>
          <span>♙</span>
          Profile
        </button>
      </nav>

      <div className="home-indicator" />
    </div>
  );
}