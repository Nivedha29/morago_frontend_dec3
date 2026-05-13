import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../services/api";
import "./Profile.css";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [form, setForm] = useState({
    firstname: currentUser.firstname || currentUser.firstName || "",
    lastname: currentUser.lastname || currentUser.lastName || "",
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

    if (!form.firstname.trim() || !form.lastname.trim()) {
      alert("Please enter first name and last name");
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await updateUserProfile({
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
      });

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          ...updatedUser,
          firstname: updatedUser.firstname || form.firstname,
          lastname: updatedUser.lastname || form.lastname,
        })
      );

      alert("Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      alert(error.message || "Failed to update profile");
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
        <h3>Edit Profile</h3>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <label>Last Name</label>
        <input
          name="lastname"
          placeholder="Enter Your Last Name"
          value={form.lastname}
          onChange={handleChange}
        />

        <label>First Name</label>
        <input
          name="firstname"
          placeholder="Enter Your First Name"
          value={form.firstname}
          onChange={handleChange}
        />

        <button className="save-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}