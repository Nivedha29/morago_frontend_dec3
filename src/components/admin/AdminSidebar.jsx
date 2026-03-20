import React from "react";
import "../../styles/AdminSidebar.css";
import sideBarProfile from "../../assets/SideBarProfile.svg";
import sideBarGear from "../../assets/SideBarGear.svg";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <p className="sidebar-title">Lists</p>
          <div className="sidebar-item active">User</div>
          <div className="sidebar-item">Translator</div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-title">Translation topics</p>
          <div className="sidebar-item">Themes</div>
          <div className="sidebar-item">Categories</div>
        </div>
      </div>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-add-button">
          <img
            src={sideBarProfile}
            alt=""
            className="sidebar-add-icon"
          />
          <span>Add</span>
        </button>

        <button type="button" className="sidebar-settings-button">
          <img
            src={sideBarGear}
            alt="Settings"
            className="sidebar-settings-icon"
          />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;