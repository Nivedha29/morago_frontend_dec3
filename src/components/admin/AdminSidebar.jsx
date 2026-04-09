import React, { useState } from "react";
import "../../styles/AdminSidebar.css";
import sideBarProfile from "../../assets/SideBarProfile.svg";
import sideBarGear from "../../assets/SideBarGear.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [isListsOpen, setIsListsOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (location.pathname.startsWith("/admin/translators")) {
      navigate("/admin/translators/add");
    } else if (location.pathname.startsWith("/admin/users")) {
      navigate("/admin/users/add");
    } else if (location.pathname.startsWith("/admin/themes")) {
      navigate("/admin/themes/add");
    } else if (location.pathname.startsWith("/admin/categories")) {
      navigate("/admin/categories/add");
    }
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-content">
        <div className="admin-sidebar-section">
          <button
            type="button"
            className="admin-sidebar-title-row"
            onClick={() => setIsListsOpen((prev) => !prev)}
          >
            <span
              className={`admin-sidebar-title-arrow ${isListsOpen ? "open" : ""}`}
            >
              ▾
            </span>
            <span className="admin-sidebar-title">Lists</span>
          </button>

          {isListsOpen && (
            <div className="admin-sidebar-items">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `admin-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                User
              </NavLink>

              <NavLink
                to="/admin/translators"
                className={({ isActive }) =>
                  `admin-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Translator
              </NavLink>
            </div>
          )}
        </div>

        <div className="admin-sidebar-section">
          <button
            type="button"
            className="admin-sidebar-title-row"
            onClick={() => setIsTopicsOpen((prev) => !prev)}
          >
            <span
              className={`admin-sidebar-title-arrow ${isTopicsOpen ? "open" : ""}`}
            >
              ▾
            </span>
            <span className="admin-sidebar-title">Translation topics</span>
          </button>

          {isTopicsOpen && (
            <div className="admin-sidebar-items">
              <NavLink
                to="/admin/themes"
                className={({ isActive }) =>
                  `admin-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Themes
              </NavLink>

              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `admin-sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Categories
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div className="admin-sidebar-footer">
        <button
          type="button"
          className="admin-sidebar-add-button"
          onClick={handleAddClick}
        >
          <img src={sideBarProfile} alt="" className="admin-sidebar-add-icon" />
          <span>Add</span>
        </button>

        <button type="button" className="admin-sidebar-settings-button">
          <img
            src={sideBarGear}
            alt="Settings"
            className="admin-sidebar-settings-icon"
          />
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
