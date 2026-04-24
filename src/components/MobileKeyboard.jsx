import React from "react";

import "../index.css";
import "../styles/MobileKeyboard.css";

const KEYS = [
  { value: "1", label: "1", sub: "" },
  { value: "2", label: "2 ABC", sub: "ABC" },
  { value: "3", label: "3 DEF", sub: "DEF" },
  { value: "4", label: "4 GHI", sub: "GHI" },
  { value: "5", label: "5 JKL", sub: "JKL" },
  { value: "6", label: "6 MNO", sub: "MNO" },
  { value: "7", label: "7 PQRS", sub: "PQRS" },
  { value: "8", label: "8 TUV", sub: "TUV" },
  { value: "9", label: "9 WXYZ", sub: "WXYZ" },
  { value: "", label: "", sub: "" },
  { value: "0", label: "0", sub: "" },
  { value: "delete", label: "Delete digit", sub: "" },
];

const MobileKeyboard = ({ onDigitClick, onDelete }) => {
  const handleClick = (value) => {
    if (!value) return;

    if (value === "delete") {
      onDelete();
      return;
    }

    onDigitClick(value);
  };

  return (
    <div
      className="keyboard mobile-keyboard"
      role="group"
      aria-label="Numeric keyboard"
    >
      {KEYS.map((key, index) => {
        const isEmptyKey = key.value === "";
        const isDeleteKey = key.value === "delete";

        return (
          <button
            key={`${key.value || "empty"}-${index}`}
            type="button"
            className={`key ${isEmptyKey ? "key-empty" : ""}`}
            onClick={() => handleClick(key.value)}
            disabled={isEmptyKey}
            aria-label={key.label || undefined}
            aria-hidden={isEmptyKey}
            tabIndex={isEmptyKey ? -1 : 0}
          >
            <span className="mobile-keyboard__main">
              {isDeleteKey ? "⌫" : key.value}
            </span>
            {key.sub ? (
              <span className="mobile-keyboard__sub">{key.sub}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};

export default MobileKeyboard;
