import "./index.css";
import { Routes, Route } from "react-router-dom";

import StatusBar from "./components/StatusBar.jsx"
import SplashScreen from "./components/SplashScreen.jsx"
import LoginScreen from "./pages/login.jsx"
import SignupScreen from "./pages/register.jsx"
import OnboardingScreen from "./pages/home.jsx"

/* ------------------------- APP MAIN ------------------------- */
const App = () => {
return (
    <div className="app-root">
      <div className="phone-shell">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<SignupScreen />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
