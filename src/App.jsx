import "./index.css";
import { Routes, Route } from "react-router-dom";

/* ------------------------- Admin Page ------------------------- */

import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
import AdminTranslatorPage from "./pages/admin/TranslatorPages/AdminTranslatorPage.jsx";
import AddTranslatorPage from "./pages/admin/TranslatorPages/AddTranslatorPage.jsx";
import TranslatorWithdrawHistoryPage from "./pages/admin/TranslatorPages/TranslatorWithdrawHistoryPage.jsx";
import TranslatorWithdrawApproval from "./pages/admin/TranslatorPages/TranslatorWithdrawApproval.jsx";
import TranslatorCallHistoryPage from "./pages/admin/TranslatorPages/TranslatorCallHistoryPage.jsx";
import TranslatorWithdrawPage from "./pages/admin/TranslatorPages/TranslatorWithdrawPage.jsx";
<<<<<<< HEAD
<<<<<<< HEAD

import AdminUserPage from "./pages/admin/UsersPages/AdminUserPage.jsx";
import AdminUserCallHistoryPage from "./pages/admin/UsersPages/UserCallHistoryPage.jsx";
import UserDepositHistoryPage from "./pages/admin/UsersPages/UserDepositHistoryPage.jsx";
import UserChargePage from "./pages/admin/UsersPages/UserChargePage.jsx";
import AddUserPage from "./pages/admin/UsersPages/AddUserPage.jsx";

import AdminThemesPage from "./pages/admin/ThemesPages/AdminThemesPage.jsx";
import AdminThemesAddPage from "./pages/admin/ThemesPages/AddThemePage.jsx";
=======
import AdminTranslatorPage from "./pages/admin/AdminTranslatorPage.jsx";
import AddTranslatorPage from "./pages/admin/AddTranslatorPage.jsx";
import TranslatorWithdrawTablePage from "./pages/admin/TranslatorWithdrawTablePage.jsx";
import TranslatorWithdrawApproval from "./pages/admin/TranslatorWithdrawApproval.jsx";
import TranslatorCallHistoryPage from "./pages/admin/TranslatorCallHistoryPage";

import AdminUserPage from "./pages/admin/AdminUserPage.jsx";
import UserDetailModal from "./components/admin/UserDetailModal.jsx";
import UserCallHistoryPage from "./pages/admin/UserCallHistoryPage.jsx";


import AdminThemesPage from "./pages/admin/AdminThemesPage.jsx";
>>>>>>> e87b76b ( Style: Polished Styling and Routing)
=======

import AdminUserPage from "./pages/admin/UsersPages/AdminUserPage.jsx";
import AdminUserCallHistoryPage from "./pages/admin/UsersPages/UserCallHistoryPage.jsx";
import UserDepositHistoryPage from "./pages/admin/UsersPages/UserDepositHistoryPage.jsx";
import UserChargePage from "./pages/admin/UsersPages/UserChargePage.jsx";
import AddUserPage from "./pages/admin/UsersPages/AddUserPage.jsx";

import AdminThemesPage from "./pages/admin/ThemesPages/AdminThemesPage.jsx";
import AdminThemesAddPage from "./pages/admin/ThemesPages/AddThemePage.jsx";
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
import AdminTranslatorPage from "./pages/admin/AdminTranslatorPage.jsx";
import AddTranslatorPage from "./pages/admin/AddTranslatorPage.jsx";
import AdminUserPage from "./pages/admin/AdminUserPage.jsx";
import UserDetailModal from "./components/admin/UserDetailModal.jsx";
import UserCallHistoryPage from "./pages/admin/UserCallHistoryPage.jsx";


import AdminThemesPage from "./pages/admin/AdminThemesPage.jsx";
>>>>>>> d07e567 ( Added Initial Routing)
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage.jsx";
=======

import AdminUserPage from "./pages/admin/UsersPages/AdminUserPage.jsx";
import AdminUserCallHistoryPage from "./pages/admin/UsersPages/UserCallHistoryPage.jsx";
import UserDepositHistoryPage from "./pages/admin/UsersPages/UserDepositHistoryPage.jsx";
import UserChargePage from "./pages/admin/UsersPages/UserChargePage.jsx";
import AddUserPage from "./pages/admin/UsersPages/AddUserPage.jsx";

import AdminThemesPage from "./pages/admin/ThemesPages/AdminThemesPage.jsx";
import AdminThemesAddPage from "./pages/admin/ThemesPages/AddThemePage.jsx";
import AdminCategoriesPage from "./pages/admin/CategoriesPages/AdminCategoriesPage.jsx";
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)

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
    /* ------------------------- ADMIN ------------------------- */
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
<<<<<<< HEAD
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
      
=======

>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
      <Route path="/admin/translators" element={<AdminTranslatorPage />} />
      <Route path="/admin/translators/add" element={<AddTranslatorPage />} />
<<<<<<< HEAD
      <Route
        path="/admin/translators/:translatorId/withdraw"
        element={<TranslatorWithdrawPage />}
      />
      <Route
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
        path="/admin/translators/:translatorId/withdraw-history"
        element={<TranslatorWithdrawHistoryPage />}
      />
      <Route
        path="/admin/translators/:translatorId/withdraw/:withdrawalId/approval"
<<<<<<< HEAD
<<<<<<< HEAD
=======
        path="/admin/translators/:translatorId/withdraw-history/:withdrawalId/approval"
>>>>>>> e87b76b ( Style: Polished Styling and Routing)
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
        element={<TranslatorWithdrawApproval />}
      />
      <Route
        path="/admin/translators/:id/call-history"
        element={<TranslatorCallHistoryPage />}
      />

      <Route path="/admin/users" element={<AdminUserPage />} />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
      <Route
        path="/admin/users/:userId/call-history"
        element={<AdminUserCallHistoryPage />}
      />
      <Route
        path="/admin/users/:userId/deposit-history"
        element={<UserDepositHistoryPage />}
      />
      <Route
        path="/admin/users/:userId/charge/:depositId"
        element={<UserChargePage />}
      />
      <Route path="/admin/users/add" element={<AddUserPage />} />
<<<<<<< HEAD
<<<<<<< HEAD
=======
      <Route path="/admin/users/:userId" element={<UserDetailModal />} />
      <Route
        path="/admin/users/:userId/call-history"
        element={<UserCallHistoryPage />}
      />
=======
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)

>>>>>>> e87b76b ( Style: Polished Styling and Routing)
=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)

=======
      <Route path="/admin/users" element={<AdminUserPage />} />
>>>>>>> d07e567 ( Added Initial Routing)
      <Route path="/admin/themes" element={<AdminThemesPage />} />
<<<<<<< HEAD
=======
      <Route path="/admin/themes/add" element={<AdminThemesAddPage />} />
>>>>>>> fb1069c (feat: implement admin categories page with table, controls, and API integration)
      <Route path="/admin/categories" element={<AdminCategoriesPage />} />

      {/* ------------------------- MOBILE APP ------------------------- */}

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
