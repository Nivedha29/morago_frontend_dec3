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

<<<<<<< HEAD
export default AdminTable;
=======
export default AdminTable;
