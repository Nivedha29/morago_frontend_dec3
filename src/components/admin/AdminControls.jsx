import React from "react";
import "../../styles/Admin/AdminControls.css";
import searchIcon from "../../assets/SearchIcon.svg";

const AdminControls = () => {
  return (
    <div className="admin-controls">
      <div className="admin-controls-search-wrapper">
        <img
          src={searchIcon}
          alt="search"
          className="admin-controls-search-icon"
        />

        <input
          type="text"
          placeholder="Search by name or company"
          className="admin-controls-search"
        />
      </div>

      <div className="admin-controls-row">
        <select className="admin-controls-filter">
          <option>Filter</option>
        </select>

        <select className="admin-controls-action">
          <option>Choose action</option>
        </select>

        <button type="button" className="admin-controls-apply">
          Apply
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
