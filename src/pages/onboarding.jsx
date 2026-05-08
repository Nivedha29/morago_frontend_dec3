import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { slides } from "../utils/slides.js";
import "./Onboarding.css";

/* ------------------------- ONBOARDING SCREEN ------------------------- */
const OnboardingScreen = () => {
  const navigate = useNavigate();

  const [touchStartX, setTouchStartX] = useState(null);
  const [onbIndex, setOnbIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnbIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const s = slides[onbIndex];

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        setOnbIndex((prev) => (prev + 1) % slides.length);
      } else {
        setOnbIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    setTouchStartX(null);
  };

  return (
    <div
      className="screen onboarding-screen"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div
        className="onboarding-bg"
        style={{
          backgroundImage: `url(${s.hero})`,
          backgroundPosition: "center top",
        }}
      />

      {/* Gradient */}
      <div className="onb-gradient" />

      {/* Content */}
      <div className="onboarding-foreground">
        <StatusBar />

        <button className="onb-skip" onClick={() => navigate("/login")}>Skip</button>

        <div className="onb-bottom">
          <h1 className="onb-title">{s.title}</h1>
          <p className="onb-subtitle">{s.subtitle}</p>

          <div className="onb-dots-row">
            {Array.from({ length: slides.length }).map((_, i) => (
              <span
                key={i}
                className={`onb-dot ${i === onbIndex ? "onb-dot-active" : ""}`}
              />
            ))}
          </div>

          <div className="onb-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </button>
          </div>

          <button
            type="button"
            className="onb-translator-link"
            onClick={() => navigate("/sign-up/translator")}
          >
            I am a translator
          </button>
        </div>

        {/* Side colored shapes (exactly 2 per slide) */}
        {s.shapes.map((shape, i) => (
          <div
            key={i}
            className={`onb-shape ${
              shape.side === "left" ? "onb-shape-left" : "onb-shape-right"
            }`}
            style={{
              backgroundColor: shape.color,
              width: shape.size,
              height: shape.size,
              top: shape.top,
              ...(shape.side === "left"
                ? { left: shape.offset }
                : { right: shape.offset }),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingScreen;
