import "./index.css";
import { Routes, Route } from "react-router-dom";

import StatusBar from "./components/StatusBar.jsx"
import SplashScreen from "./components/SplashScreen.jsx"
import LoginScreen from "./pages/login.jsx"
import SignupScreen from "./pages/sign-up.jsx"
import OnboardingScreen from "./pages/onboarding.jsx"
import HomeScreen from "./pages/home.jsx";
import TranslatorHome from "./pages/translator-home.jsx";
import UserRegisterPage from "./pages/UserRegisterPage";
import TranslatorRegisterPage from "./pages/register-translator";

/* ------------------------- APP MAIN ------------------------- */
const App = () => {
return (
    <div className="app-root">
      <div className="phone-shell">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/sign-up" element={<SignupScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/translator-home" element={<TranslatorHome />} />
          <Route path="/register-user" element={<UserRegisterPage />} />
          <Route path="/register-translator" element={<TranslatorRegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
