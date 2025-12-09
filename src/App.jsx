import React, { useState, useEffect } from "react";
import "./index.css";

import bg1 from "./assets/bg1.png";
import bg2 from "./assets/bg2.png";
import bg3 from "./assets/bg3.png";

/* ------------------------- SLIDES DATA ------------------------- */
/* Each slide has EXACTLY 2 overlay shapes: one left, one right */
const slides = [
  {
    title: "Don’t understand or can’t explain?",
    subtitle: "The Morago app will help, just choose your translator.",
    hero: bg1,
    shapes: [
      {
        side: "left",
        color: "#ff4b72", // pink on left
        size: "90px",
        top: "35%",
        offset: "-45px",
      },
      {
        side: "right",
        color: "#ffb600", // orange on right
        size: "90px",
        top: "45%",
        offset: "-45px",
      },
    ],
  },
  {
    title: "From hospital to realtor",
    subtitle: "Choose from various topics — from paediatrics to hospital.",
    hero: bg2,
    shapes: [
      {
        side: "left",
        color: "#ffb600", // big orange on left
        size: "110px",
        top: "45%",
        offset: "-55px",
      },
      {
        side: "right",
        color: "#ff4b72", // red on right
        size: "70px",
        top: "30%",
        offset: "-35px",
      },
    ],
  },
  {
    title: "First call on us",
    subtitle: "Call and pay only for the minutes you actually used.",
    hero: bg3,
    shapes: [
      {
        side: "left",
        color: "#ff4b72", // red on left
        size: "70px",
        top: "32%",
        offset: "-35px",
      },
      {
        side: "right",
        color: "#ffb600", // orange on right
        size: "90px",
        top: "52%",
        offset: "-45px",
      },
    ],
  },
];

/* ------------------------- STATUS BAR ------------------------- */
const StatusBar = () => {
  return (
    <div className="status-bar">
      <span className="status-time">9:41</span>

      <div className="status-icons">
        {/* SIGNAL */}
        <div className="icon-signal">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Filled iOS-style WIFI */}
        <div className="icon-wifi-filled" />

        {/* BATTERY */}
        <div className="icon-battery">
          <div className="battery-body">
            <div className="battery-level" />
          </div>
          <div className="battery-cap" />
        </div>
      </div>
    </div>
  );
};

/* ------------------------- SPLASH SCREEN ------------------------- */
const SplashScreen = () => {
  return (
    <div className="screen splash-screen">
      <StatusBar />
      <div className="splash-content">
        <div className="splash-logo">
          <span className="logo-dot logo-dot-red" />
          <span className="logo-dot logo-dot-yellow" />
          <span className="logo-dot logo-dot-green" />
          <span className="logo-dot logo-dot-blue" />
        </div>
        <div className="splash-text">morago</div>
      </div>
    </div>
  );
};

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

/* ------------------------- LOGIN SCREEN ------------------------- */
const LoginScreen = ({ onOpenSignup }) => {
  const [role, setRole] = useState("user");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const [activeField, setActiveField] = useState(null);

  const handleLogin = () => {
    const trimmedPhone = phone.replace(/\s+/g, "");
    const trimmedPassword = password;

    let phoneError = "";
    let passwordError = "";

    if (!trimmedPhone || !trimmedPassword) {
      phoneError = "Invalid number or password";
      passwordError = "Invalid number or password";
    } else {
      const isCorrect =
        trimmedPhone === "01077770000" && trimmedPassword === "admin1234!";

      if (!isCorrect) {
        phoneError = "Invalid number or password";
        passwordError = "Invalid number or password";
      }
    }

    setErrors({ phone: phoneError, password: passwordError });
  };

  const handleKeypadClick = (digit) => {
    if (activeField === "phone") setPhone((prev) => prev + digit);
  };

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">Log in</h1>
          <p className="login-subtitle">
            Log in to take advantage of all the app’s features
          </p>

          <div className="role-switch">
            <button
              className={
                role === "user"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("user")}
            >
              I am a user
            </button>
            <button
              className={
                role === "translator"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("translator")}
            >
              I am a translator
            </button>
          </div>
        </div>

        <div className="login-form">
          <label className="field-label">Phone number</label>
          <div
            className={`field-wrapper ${
              activeField === "phone" ? "field-focused" : ""
            } ${errors.phone ? "field-error" : ""}`}
            onClick={() => setActiveField("phone")}
          >
            <span className="field-icon phone-icon" />
            <input
              className="field-input"
              type="tel"
              placeholder="Enter your phone number without dashes"
              value={phone}
              onFocus={() => setActiveField("phone")}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {errors.phone && <p className="field-error-text">{errors.phone}</p>}

          <label className="field-label">Password</label>
          <div
            className={`field-wrapper ${
              activeField === "password" ? "field-focused" : ""
            } ${errors.password ? "field-error" : ""}`}
            onClick={() => setActiveField("password")}
          >
            <span className="field-icon lock-icon" />
            <input
              className="field-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onFocus={() => setActiveField("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errors.password && (
            <p className="field-error-text">Invalid number or password</p>
          )}

          <button className="btn btn-login" onClick={handleLogin}>
            Log in
          </button>

          <button className="btn btn-register" onClick={onOpenSignup}>
            Register
          </button>

          <button className="link-forgot">Forgot password</button>
        </div>
      </div>

      {/* Custom number keypad */}
      {activeField === "phone" && (
        <div className="keyboard">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map(
            (key, idx) => (
              <button
                key={idx}
                className={`key ${key === "" ? "key-empty" : ""}`}
                onClick={() => {
                  if (key === "⌫") setPhone((prev) => prev.slice(0, -1));
                  else if (key !== "") handleKeypadClick(key);
                }}
                disabled={key === ""}
              >
                {key}
              </button>
            )
          )}
        </div>
      )}

      <div
        className={`home-indicator ${
          activeField === "phone" ? "home-indicator-keyboard" : ""
        }`}
      />
    </div>
  );
};

/* ------------------------- SIGNUP SCREEN ------------------------- */
const SignupScreen = ({ onBackToLogin }) => {
  const [role, setRole] = useState("user");

  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <div className="login-header">
          <h1 className="login-title">Sign up</h1>
          <p className="login-subtitle">
            Create an account to start using all the app’s features.
          </p>

          <div className="role-switch">
            <button
              className={
                role === "user"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("user")}
            >
              I am a user
            </button>
            <button
              className={
                role === "translator"
                  ? "role-pill role-pill-active"
                  : "role-pill role-pill-inactive"
              }
              onClick={() => setRole("translator")}
            >
              I am a translator
            </button>
          </div>
        </div>

        <div className="login-form">
          <button className="btn btn-login">Create account</button>
          <button className="btn btn-register" onClick={onBackToLogin}>
            Back to log in
          </button>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

/* ------------------------- APP MAIN ------------------------- */
const App = () => {
  const [screen, setScreen] = useState("splash");
  const [onbIndex, setOnbIndex] = useState(0);

  /* Splash -> Onboarding after 1.5s */
  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => setScreen("onboarding"), 1500);
      return () => clearTimeout(t);
    }
  }, [screen]);

  /* Auto-swipe onboarding every 4 seconds */
  useEffect(() => {
    if (screen !== "onboarding") return;

    const interval = setInterval(
      () => setOnbIndex((prev) => (prev + 1) % slides.length),
      4000
    );

    return () => clearInterval(interval);
  }, [screen]);

  if (screen === "splash")
    return (
      <div className="app-root">
        <div className="phone-shell">
          <SplashScreen />
        </div>
      </div>
    );

  if (screen === "onboarding") {
    const s = slides[onbIndex];

    return (
      <div className="app-root">
        <div className="phone-shell">
          <OnboardingScreen
            index={onbIndex}
            total={slides.length}
            title={s.title}
            subtitle={s.subtitle}
            heroImage={s.hero}
            heroPosition="center top"
            shapes={s.shapes}
            onLogin={() => setScreen("login")}
            onSignup={() => setScreen("signup")}
            onSwipeLeft={() =>
              setOnbIndex((prev) => (prev + 1) % slides.length)
            }
            onSwipeRight={() =>
              setOnbIndex((prev) => (prev - 1 + slides.length) % slides.length)
            }
          />
        </div>
      </div>
    );
  }

  if (screen === "signup")
    return (
      <div className="app-root">
        <div className="phone-shell">
          <SignupScreen onBackToLogin={() => setScreen("login")} />
        </div>
      </div>
    );

  return (
    <div className="app-root">
      <div className="phone-shell">
        <LoginScreen onOpenSignup={() => setScreen("signup")} />
      </div>
    </div>
  );
};

export default App;
