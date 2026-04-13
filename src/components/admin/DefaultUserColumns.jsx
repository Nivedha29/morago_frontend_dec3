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

const userCallHistoryColumns = [
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
    header: "Call",
    render: (call) => call.name || call.phone || "-",
  },
  {
    key: "date",
    header: "Date",
    render: (call) => call.date || "-",
  },
  {
    key: "duration",
    header: "Duration",
    render: (call) => (call.duration ? `${call.duration} min` : "-"),
  },
  {
    key: "coins",
    header: "Coins",
    render: (call) => call.coins ?? "-",
  },
  {
    key: "theme",
    header: "Theme",
    render: (call) => call.theme || "-",
  },
  {
    key: "hasRequest",
    header: "Deposit request",
    render: (call) => (call.hasRequest ? "Yes" : "None"),
  },
  {
    key: "rating",
    header: "Rating",
    render: (call) => {
      const rating = Number(call.rating);
      if (!rating) return "-";
      return "★".repeat(Math.round(rating));
    },
  },
];

const userDepositHistoryColumns = (onCharge) => [
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
    key: "deposit",
    header: "Deposit",
    render: () => "Deposit",
  },
  {
    key: "date",
    header: "Date",
    render: (deposit) => deposit.date || "-",
  },
  {
    key: "amount",
    header: "Coins",
    render: (deposit) =>
      deposit.amount !== null && deposit.amount !== undefined
        ? `+ ${deposit.amount.toLocaleString()}`
        : "-",
  },
  {
    key: "status",
    header: "Deposit request",
    cellClassName: "morago-admin-table__link",
    onClick: (deposit) => onCharge && onCharge(deposit),
    render: (deposit) => {
      if (deposit.status === "COMPLETED") return "Transfer completed";
      if (deposit.status === "PENDING") return "Request";
      if (deposit.status === "FAILED") return "Failed";
      return deposit.status || "-";
    },
  },
];

export {
  defaultUserColumns,
  userCallHistoryColumns,
  userDepositHistoryColumns,
};
