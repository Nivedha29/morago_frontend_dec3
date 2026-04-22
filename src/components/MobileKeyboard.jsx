import React from "react";
import "../index.css";
import "../styles/MobileKeyboard.css";

const KEYS = [
  { value: "1", sub: "" },
  { value: "2", sub: "ABC" },
  { value: "3", sub: "DEF" },
  { value: "4", sub: "GHI" },
  { value: "5", sub: "JKL" },
  { value: "6", sub: "MNO" },
  { value: "7", sub: "PQRS" },
  { value: "8", sub: "TUV" },
  { value: "9", sub: "WXYZ" },
  { value: "", sub: "" },
  { value: "0", sub: "" },
  { value: "⌫", sub: "" },
];

const MobileKeyboard = ({ onDigitClick, onDelete }) => {
  const handleClick = (value) => {
    if (value === "") return;

    if (value === "⌫") {
      onDelete();
      return;
    }

    onDigitClick(value);
  };

  return (
    <div className="keyboard mobile-keyboard">
      {KEYS.map((key, index) => (
        <button
          key={`${key.value}-${index}`}
          type="button"
          className={`key ${key.value === "" ? "key-empty" : ""}`}
          onClick={() => handleClick(key.value)}
          disabled={key.value === ""}
        >
          <span className="mobile-keyboard__main">{key.value}</span>
          {key.sub && <span className="mobile-keyboard__sub">{key.sub}</span>}
        </button>
      ))}
    </div>
  );
};

export default MobileKeyboard;
