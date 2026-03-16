import StatusBar from "../components/StatusBar.jsx";

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

export default SplashScreen;