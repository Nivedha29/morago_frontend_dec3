import "./index.css";
import { Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen.jsx";
import LoginScreen from "./pages/login.jsx";
import SignupScreen from "./pages/sign-up.jsx";
import OnboardingScreen from "./pages/onboarding.jsx";
import HomeScreen from "./pages/home.jsx";
import TranslatorHome from "./pages/translator-home.jsx";
import RegisterPage from "./pages/RegisterPage";
import VerificationCodePage from "./pages/VerificationCodePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ForgotPasswordVerifyPage from "./pages/ForgotPasswordVerifyPage.jsx";
import ForgotPasswordNewPasswordPage from "./pages/ForgotPasswordNewPasswordPage.jsx";

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
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRole="ROLE_USER">
                <HomeScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path="/translator-home"
            element={
              <ProtectedRoute allowedRole="ROLE_TRANSLATOR">
                <TranslatorHome />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-up/user" element={<RegisterPage role="user" />} />
          <Route
            path="/sign-up/translator"
            element={<RegisterPage role="translator" />}
          />
          <Route path="/verify" element={<VerificationCodePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/forgot-password/verify"
            element={<ForgotPasswordVerifyPage />}
          />
          <Route
            path="/forgot-password/new-password"
            element={<ForgotPasswordNewPasswordPage />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
