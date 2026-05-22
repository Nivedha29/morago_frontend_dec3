import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadUserAvatar } from "../services/api";
import "./Profile.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const firstName =
    currentUser.firstname ||
    currentUser.firstName ||
    currentUser.first_name ||
    "First";

  const lastName =
    currentUser.lastname ||
    currentUser.lastName ||
    currentUser.last_name ||
    "Last";

  const phone =
    currentUser.phone ||
    currentUser.phoneNumber ||
    currentUser.phone_number ||
    "010 1234 56 78";

  const [avatar, setAvatar] = useState(
    currentUser.avatar ||
      currentUser.avatarUrl ||
      currentUser.imageUrl ||
      currentUser.profileImage ||
      ""
  );

  const [uploading, setUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadUserAvatar(file);

      const uploadedAvatar =
        data.avatar ||
        data.avatarUrl ||
        data.imageUrl ||
        data.profileImage ||
        data.url ||
        "";

      if (uploadedAvatar) {
        setAvatar(uploadedAvatar);

        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...currentUser,
            avatar: uploadedAvatar,
            avatarUrl: uploadedAvatar,
          })
        );
      }

      alert("Avatar uploaded successfully");
    } catch (error) {
      alert(error.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-bottom-row">
          <div className="profile-info">
            <button
              type="button"
              className="avatar-button"
              onClick={handleAvatarClick}
              disabled={uploading}
            >
              {avatar ? (
                <img className="profile-avatar-img" src={avatar} alt="Profile" />
              ) : (
                <div className="profile-avatar">{firstName.charAt(0)}</div>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarUpload}
            />

            <div className="profile-text">
              <h3>
                {firstName} {lastName}
              </h3>
              <p>{phone}</p>
            </div>
          </div>

          <button className="edit-btn" onClick={() => navigate("/profile/edit")}>
            Edit
          </button>
        </div>
      </div>

      <h4 className="section-title">Settings</h4>

      <div
        className="menu-item"
        onClick={() => navigate("/profile/change-password")}
      >
        <span className="menu-icon">▣</span>
        <span>Change Password</span>
      </div>

      <div className="menu-item">
        <span className="menu-icon">♧</span>
        <span>Notifications</span>
      </div>

      <h4 className="section-title">About the App</h4>

      <div className="menu-item">
        <span className="menu-icon">?</span>
        <span>FAQ</span>
      </div>

      <div className="menu-item">
        <span className="menu-icon">♡</span>
        <span>Privacy Policy</span>
      </div>

      <div className="menu-item">
        <span className="menu-icon">♙</span>
        <span>Contact Us</span>
      </div>

      <nav className="bottom-nav">
        <button type="button" onClick={() => navigate("/home")}>
          <span>⌂</span>
          Home
        </button>

        <button type="button" onClick={() => navigate("/my-calls")}>
          <span>☏</span>
          My calls
        </button>

        <button type="button" onClick={() => console.log("Message page later")}>
          <span>▢</span>
          Message
        </button>

        <button
          type="button"
          className="active"
          onClick={() => navigate("/profile")}
        >
          <span>♙</span>
          Profile
        </button>
      </nav>

      <div className="home-indicator" />
    </div>
  );
}