import { memo } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

const AdminHeader = memo(() => {
    return (
        <header className="h-16 bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Overview
                </h2>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-700">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">Admin User</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                    <FaUserCircle className="text-3xl text-gray-400" />
                </div>
            </div>
        </header>
    );
});

AdminHeader.displayName = "AdminHeader";

export default AdminHeader;
