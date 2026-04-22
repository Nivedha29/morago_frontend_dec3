import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import StatusBar from "../components/StatusBar";

/* ------------------------- SIGNUP SCREEN ------------------------- */
const SignupScreen = () => {
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    const routes = {
      user: "/sign-up/user",
      translator: "/mobile/translator-register",
    };

    navigate(routes[role]);
  };
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
          <button className="btn btn-login" onClick={handleCreateAccount}>
            Create account
          </button>
          <button
            className="btn btn-register"
            onClick={() => navigate("/login")}
          >
            Back to log in
          </button>
        </div>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default SignupScreen;
