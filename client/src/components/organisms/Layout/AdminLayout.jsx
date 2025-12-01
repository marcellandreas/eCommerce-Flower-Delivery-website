import { memo } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";

const AdminLayout = memo(() => {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
});

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
