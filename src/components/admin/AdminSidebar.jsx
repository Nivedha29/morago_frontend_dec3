import React, { useState } from "react";
import "../../styles/AdminSidebar.css";
import sideBarProfile from "../../assets/SideBarProfile.svg";
import sideBarGear from "../../assets/SideBarGear.svg";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const [isListsOpen, setIsListsOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <button
            type="button"
            className="sidebar-title-row"
            onClick={() => setIsListsOpen((prev) => !prev)}
          >
            <span
              className={`sidebar-title-arrow ${isListsOpen ? "open" : ""}`}
            >
              ▾
            </span>
            <span className="sidebar-title">Lists</span>
          </button>

          {isListsOpen && (
            <div className="sidebar-items">
              <div
                className={`sidebar-item ${isActive("/admin/users") ? "active" : ""}`}
                onClick={() => navigate("/admin/users")}
              >
                User
              </div>

              <div
                className={`sidebar-item ${isActive("/admin/translators") ? "active" : ""}`}
                onClick={() => navigate("/admin/translators")}
              >
                Translator
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <button
            type="button"
            className="sidebar-title-row"
            onClick={() => setIsTopicsOpen((prev) => !prev)}
          >
            <span
              className={`sidebar-title-arrow ${isTopicsOpen ? "open" : ""}`}
            >
              ▾
            </span>
            <span className="sidebar-title">Translation topics</span>
          </button>

          {isTopicsOpen && (
            <div className="sidebar-items">
              <div
                className={`sidebar-item ${isActive("/admin/themes") ? "active" : ""}`}
                onClick={() => navigate("/admin/themes")}
              >
                Themes
              </div>

              <div
                className={`sidebar-item ${isActive("/admin/categories") ? "active" : ""}`}
                onClick={() => navigate("/admin/categories")}
              >
                Categories
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-add-button">
          <img src={sideBarProfile} alt="" className="sidebar-add-icon" />
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
