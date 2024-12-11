import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    {
      id: 1,
      tenant: "John Doe",
      unit: "Unit 101",
      amount: 1200,
      date: "2024-12-01",
      status: "Paid",
      type: "Rent",
      method: "Bank Transfer",
    },
    // Add more payments
  ]);

  const [filter, setFilter] = useState("all");

  const stats = {
    totalCollected: 25000,
    pending: 3500,
    overdue: 1200,
    thisMonth: 12000,
  };

  return (
    <div className="p-12 space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Record Payment
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-green-100">Total Collected</h3>
          <p className="text-3xl font-bold mt-2">${stats.totalCollected}</p>
          <p className="text-sm text-green-100 mt-2">+12% from last month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-blue-100">This Month</h3>
          <p className="text-3xl font-bold mt-2">${stats.thisMonth}</p>
          <p className="text-sm text-blue-100 mt-2">80% of target</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-yellow-100">Pending</h3>
          <p className="text-3xl font-bold mt-2">${stats.pending}</p>
          <p className="text-sm text-yellow-100 mt-2">Due this week</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-red-100">Overdue</h3>
          <p className="text-3xl font-bold mt-2">${stats.overdue}</p>
          <p className="text-sm text-red-100 mt-2">Action required</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {["all", "paid", "pending", "overdue"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.tenant}
                    </div>
                    <div className="text-sm text-gray-500">{payment.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${payment.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(payment.date), "MMM d, yyyy")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
