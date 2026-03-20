import React from "react";
import "../../styles/AdminPagination.css";

const AdminPagination = ({ page, setPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div className="admin-pagination">
      <button
        type="button"
        className={`admin-pagination-button ${page === 0 ? "disabled" : ""}`}
        onClick={() => page > 0 && setPage(page - 1)}
        disabled={page === 0}
      >
        Prev
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`admin-pagination-page ${
            page === pageNumber ? "active" : ""
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        type="button"
        className={`admin-pagination-button ${
          page === totalPages - 1 || totalPages === 0 ? "disabled" : ""
        }`}
        onClick={() =>
          page < totalPages - 1 && setPage(page + 1)
        }
        disabled={page === totalPages - 1 || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};

export default AdminPagination;