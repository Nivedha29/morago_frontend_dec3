import React from "react";
import "../../styles/Admin/AdminHeader.css";
import moragoLogo from "../../assets/MoragoLogo.svg";
import adminUserIcon from "../../assets/master.svg";

const AdminHeader = ({ showProfile = true }) => {
  return (
    <div className="admin-header">
      <div className="admin-logo-box">
        <img src={moragoLogo} alt="Morago logo" className="admin-logo-image" />
      </div>

      <div className="admin-header-bar">
        {showProfile && (
          <button type="button" className="admin-header-profile">
            <img
              src={adminUserIcon}
              alt=""
              className="admin-header-profile-icon"
            />
            <span className="admin-header-profile-text">Admin</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
