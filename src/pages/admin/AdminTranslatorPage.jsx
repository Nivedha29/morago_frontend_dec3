import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminTranslatorPage = () => {
  return (
    <div>
      <AdminHeader />

      <div style={{ display: "flex" }}>
        <AdminSidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h1>Admin Translator Page</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminTranslatorPage;