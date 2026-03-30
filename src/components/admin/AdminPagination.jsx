import React from "react";
import "../../styles/AdminPagination.css";

const AdminPagination = () => {
  return (
    <div className="admin-pagination">
      <button type="button" className="admin-pagination-button disabled">
        Prev
      </button>

      <button type="button" className="admin-pagination-page active">
        1
      </button>
      <button type="button" className="admin-pagination-page">2</button>
      <button type="button" className="admin-pagination-page">3</button>

      <button type="button" className="admin-pagination-button">
        Next
      </button>
    </div>
  );
};

export default AdminPagination;