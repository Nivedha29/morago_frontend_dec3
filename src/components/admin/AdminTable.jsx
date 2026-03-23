import React from "react";
import "../../styles/Admin/AdminTable.css";

const AdminTable = ({
  data = [],
  columns = [],
  rowKey = "id",
}) => {
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

export default AdminTable;
