import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../services/api";
import "./Profile.css";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      await updatePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      alert("Password updated successfully");
      navigate("/profile");
    } catch (error) {
      alert(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <button type="button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h3>Change Password</h3>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <label>Current Password</label>
        <input
          type="password"
          name="oldPassword"
          placeholder="Enter Current Password"
          value={form.oldPassword}
          onChange={handleChange}
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={form.newPassword}
          onChange={handleChange}
        />

        <label>Repeat New Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Repeat New Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}