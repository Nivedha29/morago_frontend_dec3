import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import "./SplashScreen.css";

/* ------------------------- SPLASH SCREEN ------------------------- */
const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, [navigate]);
  
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

export default SplashScreen;