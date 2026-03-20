import React from "react";
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/EyeIcon.svg";

const AdminTable = () => {
  return (
    <div className="admin-table">
      {/* HEADER */}
      <div className="admin-table-header">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" />
        </div>

        <div className="admin-table-cell admin-table-header-cell">Name ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Phone ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Email ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Topik ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Status ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Withdraw request ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Call ▾</div>
        <div className="admin-table-cell admin-table-header-cell">Withdraw ▾</div>

        <div className="admin-table-cell admin-table-action-cell"></div>
      </div>

      {/* ROW 1 */}
      <div className="admin-table-row">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" />
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
          <img src={eyeIcon} alt="view" />
        </div>
      </div>

      {/* ROW 2 */}
      <div className="admin-table-row">
        <div className="admin-table-cell admin-table-checkbox-cell">
          <input type="checkbox" />
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
          <img src={eyeIcon} alt="view" />
        </div>
      </div>
    </div>
  );
};

export default AdminTable;