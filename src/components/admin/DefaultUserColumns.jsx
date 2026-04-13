import React from "react";
import eyeIcon from "../../assets/eye.svg";

const defaultUserColumns = (onViewUser, onViewCall, onViewDeposit) => [
  {
    key: "checkbox",
    header: <input type="checkbox" className="morago-admin-table__checkbox" />,
    cellClassName: "morago-admin-table__checkbox-cell",
    headerClassName: "morago-admin-table__checkbox-cell",
    disableSortArrow: true,
    render: () => (
      <input type="checkbox" className="morago-admin-table__checkbox" />
    ),
  },
  {
    key: "name",
    header: "Name",
    render: (user) =>
      user.firstName || user.lastName
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "-",
  },
  {
    key: "phone",
    header: "Phone",
    render: (user) => user.phone || "-",
  },
  {
    key: "balance",
    header: "Balance",
    render: (user) => user.balance ?? "-",
  },
  {
    key: "depositRequest",
    header: "Deposit request",
    render: (user) =>
      user.hasDepositRequest ? (
        <span className="morago-admin-table__pill">Request</span>
      ) : (
        "-"
      ),
  },
  {
    key: "call",
    header: "Call",
    cellClassName: "morago-admin-table__link",
    onClick: (user) => onViewCall && onViewCall(user),
    render: () => "View >",
  },
  {
    key: "deposit",
    header: "Deposit",
    cellClassName: "morago-admin-table__link",
    onClick: (user) => onViewDeposit && onViewDeposit(user),
    render: () => "View >",
  },
  {
    key: "action",
    header: "",
    cellClassName: "morago-admin-table__action-cell",
    headerClassName: "morago-admin-table__action-cell",
    disableSortArrow: true,
    onClick: (user) => onViewUser && onViewUser(user),
    render: () => (
      <img src={eyeIcon} alt="view" className="morago-admin-table__eye-icon" />
    ),
  },
];

export { defaultUserColumns };
