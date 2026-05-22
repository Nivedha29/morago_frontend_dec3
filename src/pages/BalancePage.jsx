import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar.jsx";
import { requestTopup } from "../services/user.js";
import api from "../services/api.js";
import "./BalancePage.css";

export default function BalancePage() {
  const navigate = useNavigate();

  const [step, setStep] = useState("details");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    accountHolder: "",
    nameOfBank: "Hana Bank",
    won: 10000,
  });

  useEffect(() => {
    const loadBalance = async () => {
      try {
        const res = await api.get("/profile/balance");
        setBalance(Number(res.data || 0));
      } catch (error) {
        console.error("Balance load error:", error);
      }
    };

    loadBalance();
  }, []);

  const submitTopup = async () => {
    if (!form.accountHolder.trim()) {
      alert("Please enter sender's name");
      return;
    }

    try {
      setLoading(true);
      await requestTopup(form);
      setStep("success");
    } catch (error) {
      console.error(error);
      alert("Top-up request failed");
    } finally {
      setLoading(false);
    }
  };

  if (step === "topup") {
    return (
      <div className="balance-screen">
        <StatusBar />

        <button className="balance-back" onClick={() => navigate("/home")}>
          ←
        </button>

        <h1 className="balance-title">Top up balance</h1>

        <p className="balance-desc">
          The minimum top-up amount is 10,000 won. Funds will be credited to the
          account within one working day.
        </p>

        <p className="balance-label">Account for top-up</p>

        <div className="topup-bank-card">
          <div>1234 5678 9101 1234</div>
          <span>KEB Hana Bank</span>
        </div>

        <p className="balance-label">Sender's name</p>

        <input
          className="balance-input"
          placeholder="Last Name First Name"
          value={form.accountHolder}
          onChange={(e) =>
            setForm({ ...form, accountHolder: e.target.value })
          }
        />

        <p className="balance-label">Amount to top up</p>

        <select
          className="balance-input"
          value={form.won}
          onChange={(e) =>
            setForm({ ...form, won: Number(e.target.value) })
          }
        >
          <option value={10000}>10,000 won</option>
          <option value={30000}>30,000 won</option>
          <option value={50000}>50,000 won</option>
          <option value={100000}>100,000 won</option>
        </select>

        <button className="balance-main-btn" onClick={submitTopup}>
          {loading ? "Requesting..." : "Request top-up"}
        </button>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="balance-screen success-screen">
        <StatusBar />

        <button className="balance-back" onClick={() => setStep("topup")}>
          ←
        </button>

        <h1 className="balance-title">Top up balance</h1>

        <div className="success-card">
          <div className="success-icon">✓</div>

          <h2>Top-up request completed successfully</h2>

          <p>
            Funds will be credited to your balance within one working day.
          </p>
        </div>

        <button className="balance-main-btn" onClick={() => navigate("/home")}>
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
          <p>My balance</p>
          <h2>₩ {balance.toLocaleString()}</h2>
        </div>

        <button className="white-topup-btn" onClick={() => setStep("topup")}>
          Top up balance
        </button>
      </div>

      <h3 className="details-title">Details</h3>
    </div>
  );
}