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
    header: <input type="checkbox" className="admin-table-checkbox" />,
    cellClassName: "admin-table-checkbox-cell",
    headerClassName: "admin-table-checkbox-cell",
    disableSortArrow: true,
    render: () => <input type="checkbox" className="admin-table-checkbox" />,
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
    cellClassName: "admin-table-link",
    render: (translator) =>
      translator.hasWithdrawalRequest ? (
        <span className="admin-table-pill">Request</span>
      ) : (
        "-"
      ),
    onClick: (translator) =>
      onViewWithdrawRequest && onViewWithdrawRequest(translator),
  },
  {
    key: "call",
    header: "Call",
    cellClassName: "admin-table-link",
    onClick: (translator) => onViewCall && onViewCall(translator),
    render: () => "View >",
  },
  {
    key: "withdraw",
    header: "Withdraw",
    cellClassName: "admin-table-link",
    onClick: (translator) =>
      onViewWithdrawHistory && onViewWithdrawHistory(translator),
    render: () => "View >",
  },
  {
    key: "action",
    header: "",
    cellClassName: "admin-table-action-cell",
    headerClassName: "admin-table-action-cell",
    disableSortArrow: true,
    onClick: (translator) => onViewTranslator && onViewTranslator(translator),
    render: () => (
      <img src={eyeIcon} alt="view" className="admin-table-eye-icon" />
    ),
  },
];

const translatorWithdrawHistoryColumns = () => [
  {
    key: "checkbox",
    header: <input type="checkbox" className="admin-table-checkbox" />,
    cellClassName: "admin-table-checkbox-cell",
    headerClassName: "admin-table-checkbox-cell",
    disableSortArrow: true,
    render: () => <input type="checkbox" className="admin-table-checkbox" />,
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

export { defaultTranslatorColumns, translatorWithdrawHistoryColumns };
