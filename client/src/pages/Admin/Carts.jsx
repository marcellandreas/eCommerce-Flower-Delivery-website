import { memo, useState } from "react";
import { useAllCarts } from "../../queries/carts";
import { usePopUp } from "../../utils/usePopUp";
import { FaEye, FaTimes, FaShoppingBag } from "react-icons/fa";

const Carts = memo(() => {
    const { data: cartsData, isLoading, error } = useAllCarts();
    const { showPopUp: isModalOpen, handleOpenPopUp: openModal, handleClosePopUp: closeModal } = usePopUp();
    const [selectedCart, setSelectedCart] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const carts = cartsData?.data?.data || [];

    const handleViewDetails = (cart) => {
        setSelectedCart(cart);
        openModal();
    };

    const handleCloseModal = () => {
        closeModal();
        setSelectedCart(null);
    };

    console.log(carts)

    // Filter carts based on search term (user name or email)
    const filteredCarts = carts.filter((cart) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const userName = cart.user ? `${cart.user.first_name} ${cart.user.last_name}`.toLowerCase() : "guest";
        const userEmail = cart.user?.email?.toLowerCase() || "";
        return userName.includes(term) || userEmail.includes(term);
    });

    if (isLoading) return <div className="p-6">Loading carts...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading carts: {error.message}</div>;

    return (
        <>
            <div className="space-y-6 h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Active Carts</h1>
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                        Total Carts: {carts.length}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search by user name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left relative">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">User</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Items Count</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Subtotal</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Last Updated</th>
                                    <th className="px-6 py-4 text-center bg-gray-50 dark:bg-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredCarts.map((cart) => (
                                    <tr key={cart.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden shrink-0">
                                                    {cart.user?.image_url ? (
                                                        <img
                                                            src={cart.user.image_url}
                                                            alt={cart.user.first_name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                            <FaShoppingBag />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-white">
                                                        {cart.user ? `${cart.user.first_name} ${cart.user.last_name}` : "Guest User"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {cart.user?.email || `Session: ${cart.session_id?.substring(0, 8)}...`}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {cart.items.length} items
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }).format(cart.subtotal)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {new Date(cart.updatedAt).toLocaleDateString()} {new Date(cart.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => handleViewDetails(cart)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCarts.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No active carts found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Cart Details Modal */}
            {isModalOpen && selectedCart && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-screen">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Cart Details
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {selectedCart.user ? `${selectedCart.user.first_name}'s Cart` : "Guest Cart"}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {selectedCart.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-700">
                                        <div className="w-20 h-20 rounded-lg bg-white dark:bg-gray-600 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-600">
                                            {item.product?.image_url ? (
                                                <img
                                                    src={item.product.image_url}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <FaShoppingBag />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                                                {item.product?.name || "Unknown Product"}
                                            </h3>
                                            <div className="flex justify-between items-end">
                                                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                                    <p>Price: {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }).format(item.product?.price || 0)}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-bold text-primary">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }).format((item.product?.price || 0) * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">Total Amount</span>
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        minimumFractionDigits: 0,
                                    }).format(selectedCart.subtotal)}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                            <button
                                onClick={handleCloseModal}
                                className="w-full py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

Carts.displayName = "Carts";

export default Carts;
