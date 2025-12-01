import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaBox,
    FaList,
    FaShoppingCart,
    FaClipboardList
} from "react-icons/fa";

const AdminSidebar = memo(() => {
    const location = useLocation();

    const menuItems = [
        { path: "/admin", icon: <FaHome />, label: "Dashboard" },
        { path: "/admin/users", icon: <FaUsers />, label: "Users" },
        { path: "/admin/products", icon: <FaBox />, label: "Products" },
        { path: "/admin/categories", icon: <FaList />, label: "Categories" },
        { path: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
        { path: "/admin/carts", icon: <FaShoppingCart />, label: "Carts" },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-dark-bg border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col transition-colors duration-300">
            <div className="p-6 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-primary dark:text-white">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    &copy; 2025 Flower Shop Admin
                </p>
            </div>
        </aside>
    );
});

AdminSidebar.displayName = "AdminSidebar";

export default AdminSidebar;
