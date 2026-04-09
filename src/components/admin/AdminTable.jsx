import React from "react";
import "../../styles/AdminTable.css";

const AdminTable = ({
  data = [],
  columns = [],
  rowKey = "id",
  tableClassName = "",
}) => {
  return (
    <div className={`admin-table ${tableClassName}`.trim()}>
      <div className="admin-table-header">
        {columns.map((column) => (
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

      {data.map((row, index) => (
        <div className="admin-table-row" key={row[rowKey] ?? index}>
          {columns.map((column) => {
            const content = column.render
              ? column.render(row)
              : (row[column.key] ?? "-");

            return (
              <div
                key={column.key}
                className={`admin-table-cell ${
                  column.cellClassName || ""
                } ${column.onClick ? "admin-table-link" : ""}`.trim()}
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

export default AdminTable;
