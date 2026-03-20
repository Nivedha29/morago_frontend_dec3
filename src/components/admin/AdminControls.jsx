import React from "react";
import "../../styles/AdminControls.css";

const AdminControls = () => {
  return (
    <div className="admin-controls">
      <input
        type="text"
        placeholder="Search..."
        className="admin-controls-search"
      />

      <select className="admin-controls-filter">
        <option>Filter</option>
      </select>

      <select className="admin-controls-action">
        <option>Action</option>
      </select>

      <button className="admin-controls-apply">Apply</button>
    </div>
  );
};

export default AdminControls;