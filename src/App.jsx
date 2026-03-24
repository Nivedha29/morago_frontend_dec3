import "./index.css";
import { Routes, Route } from "react-router-dom";

/* ------------------------- Admin Page ------------------------- */

import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminForgotPasswordPage from "./pages/admin/AdminForgotPasswordPage.jsx";
import AdminForgotPasswordVerifyPage from "./pages/admin/AdminForgotPasswordVerifyPage.jsx";
import AdminForgotPasswordNewPasswordPage from "./pages/admin/AdminForgotPasswordNewPasswordPage.jsx";

import AdminTranslatorPage from "./pages/admin/AdminTranslatorPage.jsx";
import AddTranslatorPage from "./pages/admin/AddTranslatorPage.jsx";
import TranslatorWithdrawTablePage from "./pages/admin/TranslatorWithdrawTablePage.jsx";
import TranslatorWithdrawApproval from "./pages/admin/TranslatorWithdrawApproval.jsx";
import TranslatorCallHistoryPage from "./pages/admin/TranslatorCallHistoryPage";

import AdminUserPage from "./pages/admin/AdminUserPage.jsx";
import UserDetailModal from "./components/admin/UserDetailModal.jsx";
import UserCallHistoryPage from "./pages/admin/UserCallHistoryPage.jsx";
<<<<<<< HEAD

=======
import UserDepositHistoryPage from "./pages/admin/UserDepositHistoryPage.jsx";
import UserChargePage from "./pages/admin/UserChargePage.jsx";
>>>>>>> 3c2e042 (Routing: Routed Charge Page, from Deposit History Page)

import AdminThemesPage from "./pages/admin/AdminThemesPage.jsx";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage.jsx";

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
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin/forgot-password"
        element={<AdminForgotPasswordPage />}
      />
      <Route
        path="/admin/forgot-password/verify"
        element={<AdminForgotPasswordVerifyPage />}
      />
      <Route
        path="/admin/forgot-password/new-password"
        element={<AdminForgotPasswordNewPasswordPage />}
      />

      <Route path="/admin/translators" element={<AdminTranslatorPage />} />
      <Route path="/admin/translators/add" element={<AddTranslatorPage />} />
      <Route
        path="/admin/translators/:translatorId/withdraw-history"
        element={<TranslatorWithdrawTablePage />}
      />
      <Route
        path="/admin/translators/:translatorId/withdraw-history/:withdrawalId/approval"
        element={<TranslatorWithdrawApproval />}
      />
      <Route
        path="/admin/translators/:id/call-history"
        element={<TranslatorCallHistoryPage />}
      />

      <Route path="/admin/users" element={<AdminUserPage />} />
      <Route path="/admin/users/:userId" element={<UserDetailModal />} />
      <Route
        path="/admin/users/:userId/call-history"
        element={<UserCallHistoryPage />}
      />
<<<<<<< HEAD

=======
      <Route
        path="/admin/users/:userId/deposit-history"
        element={<UserDepositHistoryPage />}
      />
      <Route
        path="/admin/users/:userId/deposit-history/:depositId/charge"
        element={<UserChargePage />}
      />
>>>>>>> 3c2e042 (Routing: Routed Charge Page, from Deposit History Page)

      <Route path="/admin/themes" element={<AdminThemesPage />} />
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />

      <Route
        path="*"
        element={
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
                <Route
                  path="/sign-up/user"
                  element={<RegisterPage role="user" />}
                />
                <Route
                  path="/sign-up/translator"
                  element={<RegisterPage role="translator" />}
                />
                <Route path="/verify" element={<VerificationCodePage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
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
        }
      />
    </Routes>
  );
};

export default App;
