import React from "react";
import "../../styles/Admin/AdminTable.css";

const AdminTable = ({
  data = [],
  columns = [],
  rowKey = "id",
  tableClassName = "",
}) => {
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
              : (row[column.key] ?? "-");

            return (
              <div
                key={column.key}
                className={`morago-admin-table__cell ${
                  column.cellClassName || ""
                } ${column.onClick ? "morago-admin-table__link" : ""}`.trim()}
                onClick={column.onClick ? () => column.onClick(row) : undefined}
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
