import React, { useState, useEffect } from "react";
import "./index.css";

import StatusBar from "./components/StatusBar.jsx"
import LoginScreen from "./pages/login.jsx"
import SignupScreen from "./pages/register.jsx"
import OnboardingScreen from "./pages/home.jsx"


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
