import { memo, useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import { format } from "date-fns";


const Orders = memo(() => {
    const [filterStatus, setFilterStatus] = useState("All");
    const { data: orders, isLoading, error } = useOrders();

    console.log(orders?.data)

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'processing':
            case 'shipped':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    if (isLoading) return <div className="p-6">Loading orders...</div>;
    if (error) return <div className="p-6 text-red-500">Error loading orders</div>;

    const filteredOrders = filterStatus === "All"
        ? orders?.data?.orders
        : orders?.data?.orders?.filter(order => order.status === filterStatus);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Management</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredOrders?.map((order) => (
                                <tr key={order.id || order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                                        #{order.id || order._id?.slice(-6)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {order.user?.name || order.customerName || 'Guest'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">
                                        ${order.totalAmount?.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:text-primary-dark font-medium mr-3">View</button>
                                        <button className="text-blue-500 hover:text-blue-700 font-medium">Update</button>
                                    </td>
                                </tr>
                            ))}
                            {(!filteredOrders || filteredOrders.length === 0) && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

Orders.displayName = "Orders";

export default Orders;
