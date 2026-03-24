import React from "react";
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/eye.svg";

const defaultTranslatorColumns = (
  onViewTranslator,
  onViewCall,
  onViewWithdraw,
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
    render: (t) =>
      t.hasWithdrawalRequest ? (
        <span className="admin-table-pill">Request</span>
      ) : (
        "-"
      ),
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
    onClick: (t) => onViewWithdraw && onViewWithdraw(t),
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
const defaultUserColumns = (onViewUser, onViewCall, onViewDeposit) => [
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
    render: (u) =>
      u.firstName || u.lastName
        ? `${u.firstName || ""} ${u.lastName || ""}`.trim()
        : "-",
  },
  {
    key: "phone",
    header: "Phone",
    render: (u) => u.phone || "-",
  },
  {
    key: "balance",
    header: "Balance",
    render: (u) => u.balance ?? "-",
  },
  {
    key: "depositRequest",
    header: "Deposit request",
    render: (u) =>
      u.hasDepositRequest ? (
        <span className="admin-table-pill">Request</span>
      ) : (
        "None"
      ),
  },
  {
    key: "call",
    header: "Call",
    cellClassName: "admin-table-link",
    onClick: (u) => onViewCall && onViewCall(u),
    render: () => "View >",
  },
  {
    key: "deposit",
    header: "Deposit",
    cellClassName: "admin-table-link",
    onClick: (u) => onViewDeposit && onViewDeposit(u),
    render: () => "View >",
  },
  {
    key: "action",
    header: "",
    cellClassName: "admin-table-action-cell",
    headerClassName: "admin-table-action-cell",
    disableSortArrow: true,
    onClick: (u) => onViewUser && onViewUser(u),
    render: () => (
      <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
    ),
  },
];

const AdminTable = ({
  translators = [],
  data,
  columns,
  onViewTranslator,
  onViewCall,
  onViewWithdraw,
  onViewUser,
  onViewDeposit,
  rowKey = "id",
}) => {
  const tableData = data || translators;
  const tableColumns =
    columns ||
    defaultTranslatorColumns(onViewTranslator, onViewCall, onViewWithdraw);

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

export const defaultCategoryColumns = (onViewCategory) => [
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
    header: "Categories",
    render: (category) => category.name || "-",
  },
  {
    key: "status",
    header: "Status",
    render: (category) => (category.isActive ? "Active" : "Inactive"),
  },
  {
    key: "action",
    header: "",
    cellClassName: "admin-table-action-cell",
    headerClassName: "admin-table-action-cell",
    disableSortArrow: true,
    onClick: (category) => onViewCategory && onViewCategory(category),
    render: () => (
      <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
    ),
  },
];

export default AdminTable;
export { defaultUserColumns };
