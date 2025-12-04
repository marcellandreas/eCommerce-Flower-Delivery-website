import { FaTimes } from "react-icons/fa"
import { InputSelect, InputText } from "../../atoms/Input"

const AddAndEditProductAdmin = ({ handleSubmit, formData, setFormData, handleCloseModal, editingProduct, categoriesFromRedux, createMutation, updateMutation }) => {
    return (
        <div className="fixed inset-0 !z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-screen">
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
    )
}

export default AddAndEditProductAdmin