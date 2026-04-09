import React from "react";
import "../../styles/AdminPagination.css";

const AdminPagination = ({ page, setPage, totalPages }) => {
  const maxVisiblePages = 5;

  let startPage = Math.max(0, page - 2);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage >= totalPages) {
    endPage = totalPages - 1;
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

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
        onClick={() => page < totalPages - 1 && setPage(page + 1)}
        disabled={page === totalPages - 1 || totalPages === 0}
      >
        Next
      </button>
    </div>
  );
};

export default AdminPagination;
