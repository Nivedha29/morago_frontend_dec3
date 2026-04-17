import React from "react";
import eyeIcon from "../../assets/eye.svg";

const defaultThemeColumns = (onViewTheme) => [
  {
    key: "themeCheckbox",
    header: <input type="checkbox" className="morago-admin-table__checkbox" />,
    cellClassName: "morago-admin-table__checkbox-cell",
    headerClassName: "morago-admin-table__checkbox-cell",
    disableSortArrow: true,
    render: () => (
      <input type="checkbox" className="morago-admin-table__checkbox" />
    ),
  },
  {
    key: "themeName",
    header: "Theme",
    render: (theme) => theme.title || theme.name || "-",
  },
  {
    key: "themeCategory",
    header: "Categories",
    render: (theme) => theme.categoryName || "-",
  },
  {
    key: "themeStatus",
    header: "Status",
    render: (theme) => (theme.isActive ? "Active" : "Inactive"),
  },
  {
    key: "themeIcon",
    header: "Icon",
    render: (theme) =>
      theme.iconUrl ? (
        <a
          href={theme.iconUrl}
          target="_blank"
          rel="noreferrer"
          className="morago-admin-table__file-link"
        >
          View File
        </a>
      ) : (
        "-"
      ),
  },
  {
    key: "themeAction",
    header: "",
    cellClassName: "morago-admin-table__action-cell",
    headerClassName: "morago-admin-table__action-cell",
    disableSortArrow: true,
    onClick: (theme) => onViewTheme && onViewTheme(theme),
    render: () => (
      <img src={eyeIcon} alt="view" className="morago-admin-table__eye-icon" />
    ),
  },
];

export { defaultThemeColumns };
