import React from "react";
import "../../styles/AdminHeader.css";
import moragoLogo from "../../assets/MoragoLogo.svg";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="admin-logo-box">
        <img
          src={moragoLogo}
          alt="Morago logo"
          className="admin-logo-image"
        />
      </div>
      <div className="admin-header-bar" />
    </div>
  );
};

export default AdminHeader;