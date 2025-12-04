import { memo, useState } from "react";
import { useOrdersQuery, useUpdateOrderStatus } from "../../queries/orders";
import { format } from "date-fns";
import { FaEye, FaEdit, FaTimes, FaCheck, FaBox, FaTruck, FaBan } from "react-icons/fa";

const Orders = memo(() => {
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [statusToUpdate, setStatusToUpdate] = useState("");

    // Fetch orders
    const { data: ordersData, isLoading, error } = useOrdersQuery({
        status: filterStatus !== "All" ? filterStatus.toLowerCase() : undefined,
    });

    const updateStatusMutation = useUpdateOrderStatus();

    const orders = ordersData?.data?.orders || [];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600';
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleOpenStatusModal = (order) => {
        setSelectedOrder(order);
        setStatusToUpdate(order.status);
        setIsStatusModalOpen(true);
    };

    const handleCloseStatusModal = () => {
        setIsStatusModalOpen(false);
        setSelectedOrder(null);
    };

    const handleUpdateStatus = () => {
        if (selectedOrder && statusToUpdate) {
            updateStatusMutation.mutate(
                { id: selectedOrder.id, status: statusToUpdate },
                {
                    onSuccess: () => {
                        handleCloseStatusModal();
                    },
                }
            );
        }
    };

    // Filter by search term
    const filteredOrders = orders.filter((order) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            order.order_number?.toLowerCase().includes(term) ||
            order.customer_name?.toLowerCase().includes(term) ||
            order.customer_email?.toLowerCase().includes(term)
        );
    });

    if (isLoading) return <div className="p-6">Loading orders...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading orders: {error.message}</div>;

    return (
        <>
            <div className="space-y-6 h-full">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Management</h1>
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium">
                        Total Orders: {ordersData?.data?.pagination?.total || 0}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700 shrink-0 flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by Order #, Name, or Email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left relative">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Order #</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Customer</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Date</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Total</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700">Status</th>
                                    <th className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                                            {order.order_number}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-gray-800 dark:text-white font-medium">
                                                    {order.customer_name}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {order.customer_email}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {order.created_at ? format(new Date(order.created_at), 'MMM dd, yyyy HH:mm') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-800 dark:text-white font-bold">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }).format(order.total)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(order)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenStatusModal(order)}
                                                    className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                                                    title="Update Status"
                                                >
                                                    <FaEdit size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No orders found matching your criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && !isStatusModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-screen">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl shadow-2xl transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Order Details
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    #{selectedOrder.order_number}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer & Shipping Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaBox className="text-primary" /> Customer Info
                                    </h3>
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p><span className="font-medium">Name:</span> {selectedOrder.customer_name}</p>
                                        <p><span className="font-medium">Email:</span> {selectedOrder.customer_email}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedOrder.customer_phone || '-'}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FaTruck className="text-primary" /> Shipping Details
                                    </h3>
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p>{selectedOrder.shipping_address_line1}</p>
                                        {selectedOrder.shipping_address_line2 && <p>{selectedOrder.shipping_address_line2}</p>}
                                        <p>{selectedOrder.shipping_city}, {selectedOrder.shipping_state} {selectedOrder.shipping_postal_code}</p>
                                        <p>{selectedOrder.shipping_country}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-3 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                            <div className="w-16 h-16 rounded-md bg-gray-100 dark:bg-gray-600 overflow-hidden shrink-0">
                                                {item.product?.image_url ? (
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <FaBox />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-gray-800 dark:text-white">{item.product?.name || "Unknown Product"}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                                <p className="font-medium text-gray-800 dark:text-white">
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }).format(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="font-medium text-gray-800 dark:text-white">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(selectedOrder.subtotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                    <span className="font-medium text-gray-800 dark:text-white">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(selectedOrder.shipping_cost)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
                                    <span className="text-lg font-bold text-primary">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(selectedOrder.total)}
                                    </span>
                                </div>
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

            {/* Update Status Modal */}
            {isStatusModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm h-screen">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Update Order Status</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Change status for order <span className="font-medium">#{selectedOrder.order_number}</span>
                        </p>

                        <div className="space-y-3 mb-6">
                            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                <label key={status} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${statusToUpdate === status
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={statusToUpdate === status}
                                        onChange={(e) => setStatusToUpdate(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-between w-full">
                                        <span className="capitalize font-medium text-gray-700 dark:text-gray-200">{status}</span>
                                        {statusToUpdate === status && <FaCheck className="text-primary" />}
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCloseStatusModal}
                                className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                disabled={updateStatusMutation.isPending}
                                className="flex-1 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
                            >
                                {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

Orders.displayName = "Orders";

export default Orders;
