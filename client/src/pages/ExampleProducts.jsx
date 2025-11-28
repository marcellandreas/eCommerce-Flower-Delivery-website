import React, { useState } from 'react';
import { useProducts, useCreateProduct, useDeleteProduct } from '../hooks/useProducts';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/uiSlice';

const ExampleProducts = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen } = useSelector((state) => state.ui);

    // 1. Fetching Data
    const { data: products, isLoading, isError, error } = useProducts();

    // 2. Mutations
    const createMutation = useCreateProduct();
    const deleteMutation = useDeleteProduct();

    const [newProductName, setNewProductName] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newProductName) return;

        try {
            await createMutation.mutateAsync({ name: newProductName, price: 100 });
            setNewProductName('');
            // Optional: Dispatch UI action
            dispatch(openModal({ type: 'SUCCESS', data: 'Product created!' }));
        } catch (err) {
            console.error('Failed to create product:', err);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div>Loading products...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products Example</h1>

            {/* Redux State Example */}
            <div className="mb-4">
                Sidebar is: {isSidebarOpen ? 'Open' : 'Closed'}
            </div>

            {/* Create Form */}
            <form onSubmit={handleCreate} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="New Product Name"
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                    {createMutation.isPending ? 'Creating...' : 'Add Product'}
                </button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products?.map((product) => (
                    <div key={product._id || product.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{product.name}</h3>
                        <p>${product.price}</p>
                        <button
                            onClick={() => handleDelete(product._id || product.id)}
                            className="text-red-500 mt-2 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExampleProducts;
