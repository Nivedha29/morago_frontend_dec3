import React from "react";
<<<<<<< HEAD
import "../../styles/AdminTable.css";
import eyeIcon from "../../assets/eye.svg";

const defaultTranslatorColumns = (onViewTranslator) => [
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
    render: () => "View >",
  },
  {
    key: "withdraw",
    header: "Withdraw",
    cellClassName: "admin-table-link",
    onClick: (t) => onViewTranslator && onViewTranslator(t),
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
  onViewTranslator,
=======
import "../../styles/Admin/AdminTable.css";

const AdminTable = ({
  data = [],
  columns = [],
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
  rowKey = "id",
  tableClassName = "",
}) => {
<<<<<<< HEAD
  const tableData = data || translators;
  const tableColumns = columns || defaultTranslatorColumns(onViewTranslator);

=======
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
  return (
    <div className={`morago-admin-table ${tableClassName}`.trim()}>
      <div className="morago-admin-table__header">
        {columns.map((column) => (
          <div
            key={column.key}
            className={`morago-admin-table__cell ${
              column.cellClassName || ""
            } ${
              column.headerClassName || "morago-admin-table__header-cell"
            }`.trim()}
          >
            {React.isValidElement(column.header) ? (
              column.header
            ) : column.header ? (
              <>
                <span>{column.header}</span>
                {!column.disableSortArrow && (
                  <span className="morago-admin-table__sort-arrow">▾</span>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>

      {data.map((row, index) => (
        <div className="morago-admin-table__row" key={row[rowKey] ?? index}>
          {columns.map((column) => {
            const content = column.render
              ? column.render(row)
              : row[column.key] ?? "-";

            return (
              <div
                key={column.key}
<<<<<<< HEAD
                className={`admin-table-cell ${column.cellClassName || ""}`.trim()}
                onClick={
                  column.onClick ? () => column.onClick(row) : undefined
                }
                style={column.onClick ? { cursor: "pointer" } : undefined}
=======
                className={`morago-admin-table__cell ${
                  column.cellClassName || ""
                } ${column.onClick ? "morago-admin-table__link" : ""}`.trim()}
                onClick={column.onClick ? () => column.onClick(row) : undefined}
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
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

<<<<<<< HEAD
export default AdminTable;
=======
export default AdminTable;
>>>>>>> 343f18a (feat: implement Add Theme page with API integration, icon upload, validation, and responsive layout)
