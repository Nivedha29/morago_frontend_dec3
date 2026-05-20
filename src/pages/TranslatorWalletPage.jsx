import React, { useEffect, useState } from "react";
import StatusBar from "../components/StatusBar.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import {
  getCurrentUserBalance,
  requestTranslatorWithdrawal,
} from "../services/mobileTranslator.js";
import "./BalancePage.css";

export default function TranslatorWalletPage() {
  const [step, setStep] = useState("details");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    accountHolder: "",
    nameOfBank: "Hana Bank",
    won: 20000,
  });

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const data = await getCurrentUserBalance();
        setBalance(Number(data || 0));
      } catch (error) {
        console.error("Translator balance error:", error);
      }
    };

    loadBalance();
  }, []);

  const submitWithdrawal = async () => {
    if (!form.accountHolder.trim()) {
      alert("Please enter account holder name");
      return;
    }

    if (!form.nameOfBank.trim()) {
      alert("Please enter bank name");
      return;
    }

    if (!form.won || Number(form.won) <= 0) {
      alert("Please enter withdrawal amount");
      return;
    }

    try {
      setLoading(true);
      await requestTranslatorWithdrawal(form);
      setStep("success");
    } catch (error) {
      console.error("Withdrawal request error:", error);
      alert(error?.message || "Withdrawal request failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "withdraw") {
    return (
      <div className="balance-screen">
        <StatusBar />

        <button className="balance-back" onClick={() => setStep("details")}>
          ←
        </button>

        <h1 className="balance-title">Withdraw</h1>

        <p className="balance-desc">
          Submit your withdrawal request. The admin will review and approve it.
        </p>

        <p className="balance-label">Account holder</p>
        <input
          className="balance-input"
          placeholder="Dmitrii Kim"
          value={form.accountHolder}
          onChange={(e) =>
            setForm({ ...form, accountHolder: e.target.value })
          }
        />

        <p className="balance-label">Bank name</p>
        <input
          className="balance-input"
          placeholder="Hana Bank"
          value={form.nameOfBank}
          onChange={(e) => setForm({ ...form, nameOfBank: e.target.value })}
        />

        <p className="balance-label">Amount</p>
        <input
          className="balance-input"
          type="number"
          value={form.won}
          onChange={(e) => setForm({ ...form, won: Number(e.target.value) })}
        />

        <button className="balance-main-btn" onClick={submitWithdrawal}>
          {loading ? "Requesting..." : "Request withdrawal"}
        </button>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="balance-screen success-screen">
        <StatusBar />

        <h1 className="balance-title">Withdraw</h1>

        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Withdrawal request submitted</h2>
          <p>Your request is now pending admin approval.</p>
        </div>

        <button className="balance-main-btn" onClick={() => setStep("details")}>
          Great!
        </button>
      </div>
    );
  }

  return (
    <div className="balance-screen">
      <div className="balance-details-header">
        <StatusBar />

        <h3>morago</h3>

        <div className="white-balance-card">
          <p>My wallet</p>
          <h2>₩ {balance.toLocaleString()}</h2>
        </div>

        <button className="white-topup-btn" onClick={() => setStep("withdraw")}>
          Withdraw
        </button>
      </div>

      <h3 className="details-title">Details</h3>

      <MobileBottomNav activeTab="wallet" />
      <div className="home-indicator" />
    </div>
  );
}