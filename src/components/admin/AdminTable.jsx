import React from "react";
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/eye.svg";

const defaultTranslatorColumns = (
  onViewWithdrawRequest,
  onViewWithdrawHistory,
  onViewTranslator,
) => [
  {
    key: "checkbox",
    header: <input type="checkbox" className="admin-table-checkbox" />,
    cellClassName: "admin-table-checkbox-cell",
    headerClassName: "admin-table-checkbox-cell",
    disableSortArrow: true,
    render: () => <input type="checkbox" className="admin-table-checkbox" />,
  },
  {
    key: "name",
    header: "Name",
    render: (t) =>
      t.firstName || t.lastName
        ? `${t.firstName || ""} ${t.lastName || ""}`.trim()
        : "-",
  },
  {
    key: "phone",
    header: "Phone",
    render: (t) => t.phone || "-",
  },
  {
    key: "email",
    header: "Email",
    render: (t) => t.email || "-",
  },
  {
    key: "topik",
    header: "Topik",
    render: (t) => (t.levelOfKorean ? `${t.levelOfKorean} level` : "-"),
  },
  {
    key: "status",
    header: "Status",
    render: (t) => (t.isOnline ? "Online" : "Offline"),
  },
  {
    key: "withdrawRequest",
    header: "Withdraw request",
    cellClassName: "admin-table-link",
    render: (t) =>
      t.hasWithdrawalRequest ? (
        <span className="admin-table-pill">Request</span>
      ) : (
        "-"
      ),
    onClick: (t) => onViewWithdrawRequest && onViewWithdrawRequest(t),
  },
  {
    key: "call",
    header: "Call",
    cellClassName: "admin-table-link",
    onClick: (t) => onViewCall && onViewCall(t),
    render: () => "View >",
  },
  {
    key: "withdraw",
    header: "Withdraw",
    cellClassName: "admin-table-link",
    onClick: (t) => onViewWithdrawHistory && onViewWithdrawHistory(t),
    render: () => "View >",
  },
  {
    key: "action",
    header: "",
    cellClassName: "admin-table-action-cell",
    headerClassName: "admin-table-action-cell",
    disableSortArrow: true,
    onClick: (t) => onViewTranslator && onViewTranslator(t),
    render: () => (
      <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
    ),
  },
];

const AdminTable = ({
  translators = [],
  data,
  columns,
  onViewWithdrawRequest,
  onViewWithdrawHistory,
  onViewTranslator,
  onViewCall,
  onViewWithdraw,
  rowKey = "id",
}) => {
  const tableData = data || translators;
  const tableColumns =
    columns ||
    defaultTranslatorColumns(
      onViewWithdrawRequest,
      onViewWithdrawHistory,
      onViewTranslator,
    );

  return (
    <div className="admin-table">
      <div className="admin-table-header">
        {tableColumns.map((column) => (
          <div
            key={column.key}
            className={`admin-table-cell ${
              column.cellClassName || ""
            } ${column.headerClassName || "admin-table-header-cell"}`.trim()}
          >
            {React.isValidElement(column.header) ? (
              column.header
            ) : column.header ? (
              <>
                <span>{column.header}</span>
                {!column.disableSortArrow && (
                  <span className="admin-table-sort-arrow">▾</span>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>

      {tableData.map((row, index) => (
        <div className="admin-table-row" key={row[rowKey] ?? index}>
          {tableColumns.map((column) => {
            const content = column.render
              ? column.render(row)
              : (row[column.key] ?? "-");

            return (
              <div
                key={column.key}
                className={`admin-table-cell ${column.cellClassName || ""}`.trim()}
                onClick={column.onClick ? () => column.onClick(row) : undefined}
                style={column.onClick ? { cursor: "pointer" } : undefined}
              >
                {content}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AdminTable;