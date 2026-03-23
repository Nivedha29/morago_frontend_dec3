import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminPageShell from "../../components/admin/AdminPageShell";
import AdminPagination from "../../components/admin/AdminPagination";
import "../../styles/AdminLayout.css";
import "../../styles/TranslatorWithdrawTablePage.css";

const mockWithdrawHistory = [
  {
    id: 1,
    type: "Withdraw",
    date: "2022.12.27 17:43",
    coins: "- 300.000",
    request: "Transfer completed",
  },
  {
    id: 2,
    type: "Withdraw",
    date: "2022.12.31 20:43",
    coins: "- 40.000",
    request: "Transfer completed",
  },
];

const TranslatorWithdrawTablePage = () => {
  const { translatorId } = useParams();
  const [page, setPage] = useState(0);

  return (
    <div>
      <AdminHeader />

      <div className="admin-page-wrapper">
        <AdminSidebar />

        <div className="admin-page-content">
          <AdminPageShell
            title="Withdraw history"
            breadcrumbSection="Lists"
            breadcrumbPage="Translators / Withdraw history"
          >
            {/* TABLE */}
            <div className="withdraw-table-wrapper">
              <div className="withdraw-table">
                {/* HEADER */}
                <div className="withdraw-table-header">
                  <div className="withdraw-cell checkbox">
                    <input type="checkbox" />
                  </div>

                  <div className="withdraw-cell header">
                    Withdraw <span>▾</span>
                  </div>

                  <div className="withdraw-cell header">
                    Date <span>▾</span>
                  </div>

                  <div className="withdraw-cell header">
                    Coins <span>▾</span>
                  </div>

                  <div className="withdraw-cell header">
                    Withdraw request <span>▾</span>
                  </div>
                </div>

                {/* ROWS */}
                {mockWithdrawHistory.map((item) => (
                  <div className="withdraw-table-row" key={item.id}>
                    <div className="withdraw-cell checkbox">
                      <input type="checkbox" />
                    </div>

                    <div className="withdraw-cell">{item.type}</div>
                    <div className="withdraw-cell">{item.date}</div>
                    <div className="withdraw-cell">{item.coins}</div>
                    <div className="withdraw-cell">{item.request}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGINATION */}
            <div className="admin-page-footer">
              <AdminPagination
                page={page}
                setPage={setPage}
                totalPages={3}
              />
            </div>

            {/* DEBUG */}
            <p className="withdraw-debug">
              Translator ID: {translatorId}
            </p>
          </AdminPageShell>
        </div>
      </div>
    </div>
  );
};

export default TranslatorWithdrawTablePage;