import React from "react";
import eyeIcon from "../../assets/eye.svg";

const defaultTranslatorColumns = (
  onViewWithdrawRequest,
  onViewCall,
  onViewWithdrawHistory,
  onViewTranslator,
) => [
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
    render: (translator) =>
      translator.firstName || translator.lastName
        ? `${translator.firstName || ""} ${translator.lastName || ""}`.trim()
        : "-",
  },
  {
    key: "phone",
    header: "Phone",
    render: (translator) => translator.phone || "-",
  },
  {
    key: "email",
    header: "Email",
    render: (translator) => translator.email || "-",
  },
  {
    key: "topik",
    header: "Topik",
    render: (translator) =>
      translator.levelOfKorean ? `${translator.levelOfKorean} level` : "-",
  },
  {
    key: "status",
    header: "Status",
    render: (translator) => (translator.isOnline ? "Online" : "Offline"),
  },
  {
    key: "withdrawRequest",
    header: "Withdraw request",
    cellClassName: "morago-admin-table__link",
    render: (translator) =>
      translator.hasWithdrawalRequest ? (
        <span className="morago-admin-table__pill">Request</span>
      ) : (
        "-"
      ),
    onClick: (translator) =>
      onViewWithdrawRequest && onViewWithdrawRequest(translator),
  },
  {
    key: "call",
    header: "Call",
    cellClassName: "morago-admin-table__link",
    onClick: (translator) => onViewCall && onViewCall(translator),
    render: () => "View >",
  },
  {
    key: "withdraw",
    header: "Withdraw",
    cellClassName: "morago-admin-table__link",
    onClick: (translator) =>
      onViewWithdrawHistory && onViewWithdrawHistory(translator),
    render: () => "View >",
  },
  {
    key: "action",
    header: "",
    cellClassName: "morago-admin-table__action-cell",
    headerClassName: "morago-admin-table__action-cell",
    disableSortArrow: true,
    onClick: (translator) => onViewTranslator && onViewTranslator(translator),
    render: () => (
      <img src={eyeIcon} alt="view" className="morago-admin-table__eye-icon" />
    ),
  },
];

const translatorWithdrawHistoryColumns = () => [
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
    key: "type",
    header: "Withdraw",
    render: () => "Withdraw",
  },
  {
    key: "date",
    header: "Date",
    render: (item) => item.date || "-",
  },
  {
    key: "amount",
    header: "Coins",
    render: (item) => item.amount ?? "-",
  },
  {
    key: "status",
    header: "Withdraw request",
    render: (item) => item.status || "-",
  },
];

const callHistoryColumns = () => [
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
    key: "call",
    header: "Call",
    render: (item) => item.name || item.phone || "-",
  },
  {
    key: "date",
    header: "Date",
    render: (item) => item.date || "-",
  },
  {
    key: "duration",
    header: "Duration",
    render: (item) => (item.duration ? `${item.duration} min` : "-"),
  },
  {
    key: "coins",
    header: "Coins",
    render: (item) => (item.coins ? `+ ${item.coins}` : "-"),
  },
  {
    key: "theme",
    header: "Theme",
    render: (item) => item.theme || "-",
  },
  {
    key: "withdraw",
    header: "Withdraw request",
    render: (item) => (item.hasRequest ? "Request" : "None"),
  },
  {
    key: "rating",
    header: "Rating",
    render: (item) => item.rating || "-",
  },
];

export {
  defaultTranslatorColumns,
  translatorWithdrawHistoryColumns,
  callHistoryColumns,
};
