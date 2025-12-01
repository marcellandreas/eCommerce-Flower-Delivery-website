import { memo, useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminHeader from "../Admin/AdminHeader";
import { useCurrentUser } from "../../../hooks/useUsers";

const AdminLayout = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: currentUserData, isLoading, error } = useCurrentUser();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-bg">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Check if user is authenticated and has admin role
    // Adjust the property path based on your actual API response structure
    const user = currentUserData?.data?.user || currentUserData?.data;
    const isAdmin = user?.role === 'admin';

    if (!isAdmin) {
        // Redirect to home if not admin
        return <Navigate to="/" replace />;
    }

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
