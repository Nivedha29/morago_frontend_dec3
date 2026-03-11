import React, { useState } from "react";
import StatusBar from "../components/StatusBar.jsx";

/* ------------------------- ONBOARDING SCREEN ------------------------- */
const OnboardingScreen = ({
  index,
  total,
  title,
  subtitle,
  heroImage,
  heroPosition,
  shapes = [],
  onLogin,
  onSignup,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) onSwipeLeft();
      else onSwipeRight();
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
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: heroPosition,
        }}
      />

      {/* Gradient */}
      <div className="onb-gradient" />

      {/* Content */}
      <div className="onboarding-foreground">
        <StatusBar />

        <button className="onb-skip">Skip</button>

        <div className="onb-bottom">
          <h1 className="onb-title">{title}</h1>
          <p className="onb-subtitle">{subtitle}</p>

          <div className="onb-dots-row">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`onb-dot ${i === index ? "onb-dot-active" : ""}`}
              />
            ))}
          </div>

          <div className="onb-buttons">
            <button className="btn btn-primary" onClick={onLogin}>
              Log in
            </button>
            <button className="btn btn-secondary" onClick={onSignup}>
              Sign up
            </button>
          </div>

          <button className="onb-translator-link">I am a translator</button>
        </div>

        {/* Side colored shapes (exactly 2 per slide) */}
        {shapes.map((shape, i) => (
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