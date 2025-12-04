import { memo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import { setCategories } from "../../store/slices/categoriesSlice";
import { FaEdit, FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { generateSlug } from "../../utils/string";
import { usePopUp } from "../../utils/usePopUp";

const Products = memo(() => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // State for Create/Edit Modal
    const { showPopUp: isModalOpen, handleOpenPopUp: openModal, handleClosePopUp: closeModal } = usePopUp();
    const [editingProduct, setEditingProduct] = useState(null);

    // State for Delete Confirmation Modal
    const { showPopUp: isDeleteModalOpen, handleOpenPopUp: openDeleteModal, handleClosePopUp: closeDeleteModal } = usePopUp();
    const [productToDelete, setProductToDelete] = useState(null);

    // Get categories from Redux
    const categoriesFromRedux = useSelector((state) => state.categories.categories);

    // Fetch categories and store in Redux
    const { data: categoriesData } = useCategories();

    useEffect(() => {
        if (categoriesData?.data) {
            dispatch(setCategories(categoriesData.data));
        }
    }, [categoriesData, dispatch]);

    const { data: productsData, isLoading, error } = useProducts({
        search: searchTerm,
        category: selectedCategory,
    });

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    const products = productsData?.data?.products || [];

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_id: "",
        image_url: "",

    });

    // --- Handlers for Create/Edit ---

    const handleNameChange = (e) => {
        const name = e.target.value;
        // Auto-generate slug only if creating new product
        if (!editingProduct) {
            const slug = generateSlug(name);
            setFormData(prev => ({ ...prev, name, slug }));
        } else {
            setFormData(prev => ({ ...prev, name }));
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            // Editing existing product
            setEditingProduct(product);
            setFormData({
                name: product.name,
                slug: product.slug,
                description: product.description || "",
                price: product.price,
                stock_quantity: product.stock_quantity,
                category_id: product.category_id,
                image_url: "",
            });
        } else {
            // Creating new product
            setEditingProduct(null);
            setFormData({
                name: "",
                slug: "",
                description: "",
                price: "",
                stock_quantity: "",
                category_id: "",
                image_url: "",
            });
        }
        openModal();
    };

    const handleCloseModal = () => {
        closeModal();
        setEditingProduct(null);
        setFormData({
            name: "",
            slug: "",
            description: "",
            price: "",
            stock_quantity: "",
            category_id: "",
            image_url: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: check if category is selected
        if (!formData.category_id) {
            alert("Please select a category");
            return;
        }

        try {
            if (editingProduct) {
                // UPDATE: Use FormData for update as well (to support image update)
                const body = new FormData();
                body.append("name", formData.name);
                body.append("slug", formData.slug);
                body.append("description", formData.description);
                body.append("price", parseFloat(formData.price));
                body.append("stock_quantity", parseInt(formData.stock_quantity));
                body.append("category_id", formData.category_id);

                // Only append image if a new file is selected
                if (formData.image_url && typeof formData.image_url === 'object') {
                    body.append("image", formData.image_url);
                }

                await updateMutation.mutateAsync({ id: editingProduct.id, data: body });
            } else {
                // CREATE: Use FormData
                const body = new FormData();
                body.append("name", formData.name);
                body.append("slug", formData.slug);
                body.append("description", formData.description);
                body.append("price", parseFloat(formData.price));
                body.append("stock_quantity", parseInt(formData.stock_quantity));
                body.append("category_id", formData.category_id);

                // Only append image if file is selected
                if (formData.image_url) {
                    body.append("image", formData.image_url);
                }

                await createMutation.mutateAsync(body);
            }
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save product:", err);
            alert("Failed to save product: " + (err.response?.data?.message || err.message));
        }
    };

    // --- Handlers for Delete ---

    const handleOpenDeleteModal = (product) => {
        setProductToDelete(product);
        openDeleteModal();
    };

    const handleCloseDeleteModal = () => {
        closeDeleteModal();
        setProductToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await deleteMutation.mutateAsync(productToDelete.id);
            handleCloseDeleteModal();
        } catch (err) {
            console.error("Failed to delete product:", err);
            alert("Failed to delete product: " + (err.response?.data?.message || err.message));
        }
    };


    if (isLoading) return <div className="p-6">Loading products...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading products: {error.message}</div>;

    return (
        <>
            <div className="space-y-6 h-[90vh]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products Management</h1>
                    <button
                        onClick={() => handleOpenModal(null)}
                        className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark transition-colors shadow-lg border border-black"
                    >
                        Add New Product
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                            >
                                <option value="">All Categories</option>
                                {categoriesFromRedux.map((category) => (
                                    <option key={category.id} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left relative">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Product</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Category</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Price</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Stock</th>
                                    <th className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 overflow-hidden shrink-0">
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <span className="text-xs">No img</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-white">{product.name}</p>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {product.category?.name || 'Uncategorized'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                                            ${parseFloat(product.price).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock_quantity > 0
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity})` : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => handleOpenModal(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDeleteModal(product)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-screen">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {editingProduct ? "Edit Product" : "Add New Product"}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Product Name */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        placeholder="e.g. Red Rose Bouquet"
                                        required
                                    />
                                </div>

                                {/* Slug field is hidden as it is auto-generated */}



                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category_id}
                                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categoriesFromRedux.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>

                                {/* Stock Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Stock Quantity *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.stock_quantity}
                                        onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        placeholder="0"
                                        required
                                    />
                                </div>

                                {/* Upload Image */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Product Image {editingProduct && "(Upload new to replace)"}
                                    </label>

                                    {/* Show current image if editing */}
                                    {editingProduct && editingProduct.image_url && (
                                        <div className="mb-2">
                                            <img
                                                src={editingProduct.image_url}
                                                alt="Current product"
                                                className="w-24 h-24 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                            />
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current image</p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.files[0] })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        rows="4"
                                        placeholder="Product description..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                                    className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-lg border border-black"
                                >
                                    {createMutation.isPending || updateMutation.isPending
                                        ? "Saving..."
                                        : editingProduct ? "Update Product" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaExclamationTriangle className="text-red-500 text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Product?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-gray-800 dark:text-white">"{productToDelete?.name}"</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={handleCloseDeleteModal}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={deleteMutation.isPending}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 shadow-lg shadow-red-500/30"
                            >
                                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

Products.displayName = "Products";

export default Products;
