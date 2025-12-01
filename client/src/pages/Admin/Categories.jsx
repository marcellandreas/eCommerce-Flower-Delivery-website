import { memo } from "react";

const Categories = memo(() => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Categories Management</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    Add New Category
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Description</th>
                                <th className="px-6 py-4">Products Count</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">Flowers</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">Beautiful fresh flowers</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">120</td>
                                <td className="px-6 py-4">
                                    <button className="text-primary hover:text-primary-dark font-medium mr-3">Edit</button>
                                    <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

Categories.displayName = "Categories";

export default Categories;
