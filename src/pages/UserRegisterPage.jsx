import React from "react";
import StatusBar from "../components/StatusBar";

const UserRegisterPage = () => {
  return (
    <div className="screen login-screen">
      <StatusBar />

      <div className="login-body">
        <h1>User Registration</h1>
      </div>

      <div className="home-indicator" />
    </div>
  );
};

export default UserRegisterPage;