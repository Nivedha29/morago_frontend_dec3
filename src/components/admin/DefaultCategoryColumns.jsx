import React from "react";
import eyeIcon from "../../assets/eye.svg";

const defaultCategoryColumns = (onViewCategory) => [
  {
    key: "categoryCheckbox",
    header: <input type="checkbox" className="morago-admin-table__checkbox" />,
    cellClassName: "morago-admin-table__checkbox-cell",
    headerClassName: "morago-admin-table__checkbox-cell",
    disableSortArrow: true,
    render: () => (
      <input type="checkbox" className="morago-admin-table__checkbox" />
    ),
  },
  {
    key: "categoryName",
    header: "Category",
    render: (category) => category.title || category.name || "-",
  },
  {
    key: "categoryStatus",
    header: "Status",
    render: (category) => (category.isActive ? "Active" : "Inactive"),
  },
  {
    key: "categoryAction",
    header: "",
    cellClassName: "morago-admin-table__action-cell",
    headerClassName: "morago-admin-table__action-cell",
    disableSortArrow: true,
    onClick: (category) => onViewCategory && onViewCategory(category),
    render: () => (
      <img src={eyeIcon} alt="view" className="morago-admin-table__eye-icon" />
    ),
  },
];

export { defaultCategoryColumns };
