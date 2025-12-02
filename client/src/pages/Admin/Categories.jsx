import { memo, useState } from "react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "../../hooks/useCategories";
import { format } from "date-fns";

const Categories = memo(() => {
    const { data: categoriesData, isLoading, error } = useCategories();
    const createMutation = useCreateCategory();
    const updateMutation = useUpdateCategory();
    const deleteMutation = useDeleteCategory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", slug: "" });

    const categories = categoriesData?.data || [];

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description || "",
                slug: category.slug
            });
        } else {
            setEditingCategory(null);
            setFormData({ name: "", description: "", slug: "" });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: "", description: "", slug: "" });
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        // Only auto-generate slug if we are creating a new category or if the user hasn't manually edited the slug yet (simplification: just always auto-gen if creating)
        // Or better: just auto-gen if not editing an existing category, or if the user wants to.
        // Let's just auto-gen it for now if it's empty or matches the previous auto-gen.
        // Simple approach: Auto-fill slug if it's empty or if we are in "create" mode and it matches the old name slugified.

        // Let's just update name, and if slug is empty, update slug too.
        if (!editingCategory) {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, name, slug }));
        } else {
            setFormData(prev => ({ ...prev, name }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateMutation.mutateAsync({ id: editingCategory._id, data: formData });
            } else {
                await createMutation.mutateAsync(formData);
            }
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save category:", err);
            alert("Failed to save category: " + (err.response?.data?.message || err.message));
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteMutation.mutateAsync(id);
            } catch (err) {
                console.error("Failed to delete category:", err);
                alert("Failed to delete category");
            }
        }
    };

    if (isLoading) return <div className="p-6">Loading categories...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading categories: {error.message}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Categories Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
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
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Created At</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {categories.map((category) => (
                                <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{category.name}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{category.description}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{category.slug}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {category.createdAt ? format(new Date(category.createdAt), 'MMM dd, yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleOpenModal(category)}
                                            className="text-primary hover:text-primary-dark font-medium mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category._id)}
                                            className="text-red-500 hover:text-red-700 font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No categories found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                            {editingCategory ? "Edit Category" : "Add New Category"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        rows="3"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                                >
                                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
});

Categories.displayName = "Categories";

export default Categories;
