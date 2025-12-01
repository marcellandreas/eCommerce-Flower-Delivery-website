import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaUsers,
    FaBox,
    FaList,
    FaClipboardList,
    FaShoppingCart,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

const AdminSidebar = memo(({ onClose }) => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [tooltip, setTooltip] = useState({ show: false, label: "", top: 0, left: 0 });

    const menuItems = [
        { path: "/admin", icon: <FaHome />, label: "Dashboard" },
        { path: "/admin/users", icon: <FaUsers />, label: "Users" },
        { path: "/admin/products", icon: <FaBox />, label: "Products" },
        { path: "/admin/categories", icon: <FaList />, label: "Categories" },
        { path: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
        { path: "/admin/carts", icon: <FaShoppingCart />, label: "Carts" },
    ];

    const handleMouseEnter = (e, label) => {
        if (!collapsed) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            show: true,
            label,
            top: rect.top + rect.height / 2,
            left: rect.right
        });
    };

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, show: false }));
    };

    return (
        <>
            <aside
                className={`${collapsed ? 'w-20' : 'w-64'
                    } bg-white dark:bg-dark-bg border-r border-gray-200 dark:border-gray-700 min-h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
            >
                {/* Toggle Button - Visible only on Desktop */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 text-gray-500 hover:text-primary transition-colors shadow-md hidden md:flex items-center justify-center z-10"
                >
                    {collapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
                </button>

                {/* Header */}
                <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700 overflow-hidden">
                    {collapsed ? (
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    ) : (
                        <h1 className="text-2xl font-bold text-primary dark:text-white select-none whitespace-nowrap">
                            Admin Panel
                        </h1>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {menuItems.map((item) => {
                        const isActive =
                            location.pathname === item.path ||
                            (item.path !== "/admin" && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                                onMouseLeave={handleMouseLeave}
                                className={`group flex items-center ${collapsed ? 'justify-center' : ''
                                    } px-3 py-3 rounded-lg transition-all duration-300 ease-in-out relative ${isActive
                                        ? "bg-primary text-black shadow-md"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                <span className={`text-xl transition-transform duration-300 ${!collapsed && 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>

                                {!collapsed && (
                                    <span className="ml-3 font-medium whitespace-nowrap transition-opacity duration-300">
                                        {item.label}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Fixed Tooltip Portal-like behavior */}
            {collapsed && tooltip.show && (
                <div
                    className="fixed z-50 px-3 py-2 bg-gray-800 text-black text-xs rounded shadow-lg pointer-events-none transform -translate-y-1/2 transition-opacity duration-200 z-50"
                    style={{
                        top: tooltip.top,
                        left: tooltip.left + 10 // Add some spacing
                    }}
                >
                    {tooltip.label}
                    {/* Arrow */}
                    <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-gray-800" />
                </div>
            )}
        </>
    );
});

AdminSidebar.displayName = "AdminSidebar";
export default AdminSidebar;
