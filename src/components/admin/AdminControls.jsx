import React, { useEffect, useRef, useState } from "react";
import "../../styles/Admin/AdminControls.css";
import searchIcon from "../../assets/SearchIcon.svg";

const AdminControls = ({
  onApply,
  filterOptions = [],
  actionOptions = [
    { label: "Show all", value: "show-all" },
    { label: "Go to first page", value: "first-page" },
    { label: "Go to last page", value: "last-page" },
  ],
  searchPlaceholder = "Search by name or phone",
  disableSearch = false,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [action, setAction] = useState("");

  const onApplyRef = useRef(onApply);
  const previousSearchRef = useRef("");

  useEffect(() => {
    onApplyRef.current = onApply;
  }, [onApply]);

  const handleApply = () => {
    const trimmedSearch = search.trim();

    if (onApplyRef.current) {
      onApplyRef.current({
        search: trimmedSearch,
        filter,
        action,
      });
    }

    if (action === "show-all") {
      setSearch("");
      setFilter("");
      setAction("");
    }
  };

  useEffect(() => {
    if (disableSearch) return;

    const trimmed = search.trim();
    const previousTrimmed = previousSearchRef.current.trim();

    if (trimmed.length === 0 && previousTrimmed.length > 0) {
      if (onApplyRef.current) {
        onApplyRef.current({
          search: "",
          filter: "",
          action: "",
        });
      }

      previousSearchRef.current = search;
      return;
    }

    if (trimmed.length < 2) {
      previousSearchRef.current = search;
      return;
    }

    const timer = setTimeout(() => {
      if (onApplyRef.current) {
        onApplyRef.current({
          search: trimmed,
          filter: "",
          action: "",
        });
      }
    }, 600);

    previousSearchRef.current = search;

    return () => clearTimeout(timer);
  }, [search, disableSearch]);

  return (
    <div className="admin-controls">
      <div className="admin-controls-search-wrapper">
        <img
          src={searchIcon}
          alt="search"
          className="admin-controls-search-icon"
        />

        <input
          type="text"
          placeholder={searchPlaceholder}
          className={`admin-controls-search ${
            disableSearch ? "admin-controls-search-disabled" : ""
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={disableSearch}
        />
      </div>

      <div className="admin-controls-row">
        <select
          className="admin-controls-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Filter</option>

          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="admin-controls-action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="">Choose action</option>

          {actionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="admin-controls-apply"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
