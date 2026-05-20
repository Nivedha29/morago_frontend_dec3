import React, { useEffect, useState } from "react";
import StatusBar from "../components/StatusBar.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import { getTranslatorCallHistory } from "../services/mobileTranslator.js";
import fallbackAvatar from "../assets/avatar.svg";
import "./MyCallsPage.css";

const getContent = (data) => {
  if (Array.isArray(data)) return data;
  return data?.content || [];
};

export default function TranslatorMyCallsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const isMissed = activeTab === "missed";

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);

        const data = await getTranslatorCallHistory({
          isMissed,
          isLast: false,
          page: 0,
          size: 20,
          sortBy: "id",
          sortDirection: "DESC",
        });

        setCalls(getContent(data));
      } catch (error) {
        console.error("Translator call history error:", error);
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [isMissed]);

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
          {calls.map((call, index) => (
            <div className="calls-row" key={`${call.date}-${index}`}>
              <div className="calls-avatar-wrap">
                <img
                  src={call.imageUrl || fallbackAvatar}
                  alt={call.name || "User"}
                  onError={(e) => {
                    e.currentTarget.src = fallbackAvatar;
                  }}
                />
                {isMissed && <span className="missed-dot" />}
              </div>

              <div className="calls-info">
                <div>
                  <b>{call.name || "User"}</b>
                  <span className={isMissed ? "dot red" : "dot green"} />
                </div>
                <p>{call.theme || "Topic"}</p>
              </div>

              <div className="calls-meta">
                <span>{call.date || ""}</span>
                <small>{call.duration || 0} min</small>
                <small>{call.coins || 0} coins</small>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileBottomNav activeTab="calls" />
      <div className="home-indicator" />
    </div>
  );
}