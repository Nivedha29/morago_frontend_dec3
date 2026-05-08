import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBar from "../components/StatusBar.jsx";
import "./ChooseTopicPage.css";

export default function ChooseTopicPage() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [topicError, setTopicError] = useState("");

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTranslators, setShowTranslators] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoadingTopics(true);
        setTopicError("");

        const response = await api.get("/profile/categories", {
          params: {
            page: 0,
            size: 20,
            sortBy: "id",
            sortDirection: "ASC",
            isActive: true,
          },
        });

        setTopics(response.data?.content || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setTopicError(error.message || "Failed to load categories.");
      } finally {
        setLoadingTopics(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="phone-wrap">
      <div className="screen choose-page">
        <StatusBar />

        <header className="choose-header">
          <button onClick={() => navigate(-1)}>←</button>
          <b>morago</b>
          <span />
        </header>

        {!showTranslators ? (
          <main className="choose-body">
            <div className="choose-search">
              <span>⌕</span>
              <input placeholder="Search Topic" />
            </div>

            <h3>Services &lt;</h3>

            {loadingTopics && <p>Loading categories...</p>}

            {topicError && <p className="error-text">{topicError}</p>}

            {!loadingTopics && !topicError && (
              <div className="choose-grid">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    className={selectedTopic?.id === topic.id ? "active" : ""}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setShowTranslators(true);
                    }}
                  >
                    <span>{topic.name?.charAt(0) || "T"}</span>

                    <b>{topic.name}</b>
                  </button>
                ))}
              </div>
            )}

            <div className="service-list">
              <button>Migration &lt;</button>
              <button>Work &lt;</button>
              <button>Government Agencies &lt;</button>
              <button>Leisure &lt;</button>
            </div>
          </main>
        ) : (
          <main className="choose-body">
            <h3>Selected Topic</h3>

            <div className="selected-topic">
              <span>{selectedTopic?.name?.charAt(0) || "T"}</span>

              <p>{selectedTopic?.name}</p>
            </div>

            <h3>Available Translators</h3>

            <p>Translator API connection is next step.</p>
          </main>
        )}

        <nav className="bottom-nav">
          <button onClick={() => navigate("/home")} className="active">
            <span>⌂</span>
            Home
          </button>

          <button type="button">
            <span>☏</span>
            My calls
          </button>

          <button type="button">
            <span>▢</span>
            Message
          </button>

          <button type="button">
            <span>♙</span>
            Profile
          </button>
        </nav>

        <div className="home-indicator" />
      </div>
    </div>
  );
}
