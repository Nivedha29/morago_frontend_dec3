import React from "react";
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/eye.svg";

const AdminTable = () => {
  return (
    <div className="admin-table">
      <div className="admin-table-header">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" className="admin-table-checkbox" />
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Name</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Phone</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Email</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Topik</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Status</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Withdraw request</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Call</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-header-cell">
          <span>Withdraw</span>
          <span className="admin-table-sort-arrow">▾</span>
        </div>

        <div className="admin-table-cell admin-table-action-cell"></div>
      </div>

      <div className="admin-table-row">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" className="admin-table-checkbox" />
        </div>

        <div className="admin-table-cell">Name 1</div>
        <div className="admin-table-cell">010 1234 5678</div>
        <div className="admin-table-cell">user@mail.com</div>
        <div className="admin-table-cell">5 level</div>
        <div className="admin-table-cell">Verified</div>
        <div className="admin-table-cell">
          <span className="admin-table-pill">Request</span>
        </div>
        <div className="admin-table-cell admin-table-link">View</div>
        <div className="admin-table-cell admin-table-link">View</div>
        <div className="admin-table-cell admin-table-action-cell">
          <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
        </div>
      </div>

      <div className="admin-table-row">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" className="admin-table-checkbox" />
        </div>

        <div className="admin-table-cell">Name 2</div>
        <div className="admin-table-cell">010 9876 5432</div>
        <div className="admin-table-cell">user2@mail.com</div>
        <div className="admin-table-cell">3 level</div>
        <div className="admin-table-cell">Unverified</div>
        <div className="admin-table-cell">None</div>
        <div className="admin-table-cell admin-table-link">View</div>
        <div className="admin-table-cell admin-table-link">View</div>
        <div className="admin-table-cell admin-table-action-cell">
          <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;