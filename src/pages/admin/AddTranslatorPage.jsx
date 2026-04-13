import React from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import "../../styles/AdminLayout.css";
import "../../styles/AddTranslatorPage.css";

const AddTranslatorPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Add translator"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators / Add translator"
            showControls={false}
          >
            <div className="add-translator-page">
              <div className="add-translator-card">
                <form className="add-translator-form">
                  <div className="add-translator-top">
                    <div className="add-translator-photo-box">
                      <button
                        type="button"
                        className="add-translator-photo-button"
                      >
                        ↑
                      </button>
                    </div>

                    <div className="add-translator-photo-preview" />
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>Full Name</label>
                      <div className="add-translator-name-group">
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Surname" />
                      </div>
                    </div>
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>Phone</label>
                      <input type="text" placeholder="None" />
                    </div>
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>Birth</label>
                      <input type="text" placeholder="None" />
                    </div>
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>TOPIK</label>
                      <select>
                        <option>Level</option>
                      </select>
                    </div>
                  </div>

                  <div className="add-translator-checkbox-box">
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Select all</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>1 level</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>2 level</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>3 level</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>4 level</span>
                    </label>
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>Language</label>
                      <select>
                        <option>Language</option>
                      </select>
                    </div>
                  </div>

                  <div className="add-translator-checkbox-box">
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Select all</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Ru</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>En</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Ko</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Uz</span>
                    </label>
                  </div>

                  <div className="add-translator-row">
                    <div className="add-translator-field">
                      <label>Translation's topics</label>
                      <select>
                        <option>Theme</option>
                      </select>
                    </div>
                  </div>

                  <div className="add-translator-checkbox-box">
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Select all</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Theme 1</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Theme 2</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Theme 3</span>
                    </label>
                    <label className="add-translator-checkbox-item">
                      <input type="checkbox" />
                      <span>Theme 4</span>
                    </label>
                  </div>

                  <div className="add-translator-upload-box">
                    <button
                      type="button"
                      className="add-translator-upload-button"
                    >
                      Upload files...
                    </button>
                  </div>

                  <div className="add-translator-actions">
                    <button
                      type="button"
                      className="add-translator-btn add-translator-btn-cancel"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="add-translator-btn add-translator-btn-save"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default AddTranslatorPage;