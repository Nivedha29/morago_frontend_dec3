import React, { useState } from "react";
import "../../styles/AdminSidebar.css";
import sideBarProfile from "../../assets/SideBarProfile.svg";
import sideBarGear from "../../assets/SideBarGear.svg";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isListsOpen, setIsListsOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

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
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                User
              </NavLink>

              <NavLink
                to="/admin/translators"
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Translator
              </NavLink>
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
              <NavLink
                to="/admin/themes"
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Themes
              </NavLink>

              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Categories
              </NavLink>
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