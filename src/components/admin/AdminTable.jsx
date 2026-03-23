import React from "react";
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/eye.svg";

const AdminTable = ({ translators = [], onViewTranslator }) => {
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

      {translators.map((t) => (
        <div className="admin-table-row" key={t.id}>
          <div className="admin-table-cell admin-table-checkbox-cell">
            <input type="checkbox" className="admin-table-checkbox" />
          </div>

          <div className="admin-table-cell">
            {t.firstName || t.lastName
              ? `${t.firstName || ""} ${t.lastName || ""}`
              : "-"}
          </div>

          <div className="admin-table-cell">{t.phone || "-"}</div>

          <div className="admin-table-cell">{t.email || "-"}</div>

          <div className="admin-table-cell">
            {t.levelOfKorean ? `${t.levelOfKorean} level` : "-"}
          </div>

          <div className="admin-table-cell">
            {t.isOnline ? "Online" : "Offline"}
          </div>

          <div className="admin-table-cell">
            {t.hasWithdrawalRequest ? (
              <span className="admin-table-pill">Request</span>
            ) : (
              "-"
            )}
          </div>

          <div className="admin-table-cell admin-table-link">View</div>

          <div
            className="admin-table-cell admin-table-link"
            onClick={() => onViewTranslator && onViewTranslator(t)}
          >
            View
          </div>

          <div
            className="admin-table-cell admin-table-action-cell"
            onClick={() => onViewTranslator && onViewTranslator(t)}
          >
            <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTable;
