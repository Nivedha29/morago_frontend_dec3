import React from "react";
import coinIcon from "../assets/coin.svg";

import "../styles/BalanceCard.css";

const BalanceCard = ({ balance = 0, loading = false, onClick }) => {
  const formattedBalance = `${Number(balance || 0).toLocaleString()} won`;

  return (
    <button
      type="button"
      className="mobile-balance-card"
      onClick={onClick}
      aria-label={`My balance ${loading ? "loading" : formattedBalance}`}
    >
      <span className="mobile-balance-card__label">My balance</span>

      <div className="mobile-balance-card__row">
        <img
          src={coinIcon}
          alt=""
          className="mobile-balance-card__icon"
          aria-hidden="true"
        />

        <span className="mobile-balance-card__value">
          {loading ? "Loading..." : formattedBalance}
        </span>

        <span className="mobile-balance-card__arrow" aria-hidden="true">
          ›
        </span>
      </div>
    </button>
  );
};

export default BalanceCard;
