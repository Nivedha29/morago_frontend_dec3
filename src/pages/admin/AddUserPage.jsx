import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/AddUserPage.css";

const coinOptions = [100, 200, 300, 400];

const AddUserPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState("Sean");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("None");
  const [selectedCoins, setSelectedCoins] = useState([100]);
  const [previewImage, setPreviewImage] = useState("");

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleCoinToggle = (coin) => {
    setSelectedCoins((prev) =>
      prev.includes(coin)
        ? prev.filter((item) => item !== coin)
        : [...prev, coin],
    );
  };

  const selectedCoinsLabel =
    selectedCoins.length > 0 ? selectedCoins.join(", ") : "Choose...";

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Users list"
            breadcrumbSection="Lists"
            breadcrumbPage="Users / Add User"
          >
            <div className="add-user-card">
              <div className="add-user-upload-row">
                <div
                  className="add-user-upload-box"
                  onClick={handleOpenFilePicker}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenFilePicker();
                    }
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="User preview"
                      className="add-user-preview-image"
                    />
                  ) : (
                    <span className="add-user-upload-icon">⇧</span>
                  )}
                </div>

                <div className="add-user-upload-placeholder" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="add-user-hidden-input"
                onChange={handleImageChange}
              />

              <div className="add-user-form-grid">
                <div className="add-user-field">
                  <label className="add-user-label">Full Name</label>

                  <div className="add-user-name-row">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="add-user-input add-user-name-input"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="add-user-input add-user-name-input"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="add-user-field">
                  <label className="add-user-label">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="add-user-input"
                    placeholder="Phone"
                  />
                </div>

                <div className="add-user-field">
                  <label className="add-user-label">Coins</label>

                  <div className="add-user-coins-box">
                    <div className="add-user-coins-display">
                      <span>{selectedCoinsLabel || "Choose..."}</span>
                      <span className="add-user-coins-arrow">⌄</span>
                    </div>

                    <div className="add-user-coins-dropdown">
                      {coinOptions.map((coin) => (
                        <label key={coin} className="add-user-coin-option">
                          <input
                            type="checkbox"
                            checked={selectedCoins.includes(coin)}
                            onChange={() => handleCoinToggle(coin)}
                          />
                          <span>{coin}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="add-user-actions">
              <button
                type="button"
                className="add-user-cancel-btn"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button type="button" className="add-user-save-btn">
                Save
              </button>
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
