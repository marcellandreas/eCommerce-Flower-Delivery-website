import { memo, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";

const AdminLayout = memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">

            {/* Overlay background for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer (Mobile) + Static (Desktop) */}
            <div
                className={`fixed md:static z-30 transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <AdminSidebar onClose={() => setIsOpen(false)} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader onMenuClick={() => setIsOpen(true)} />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
});

AdminLayout.displayName = "AdminLayout";

export default AdminLayout;
