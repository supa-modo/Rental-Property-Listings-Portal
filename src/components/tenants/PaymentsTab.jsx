import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const PaymentsTab = ({ paymentHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const filteredPayments = paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.amount.toString().includes(searchTerm) ||
      format(new Date(payment.date), "MMM d, yyyy")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="border-b border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Payment History
            </h2>
            <div className="flex gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  <span>
                    {statusFilter === "all" ? "All Status" : statusFilter}
                  </span>
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    {["all", "completed", "pending", "failed"].map((status) => (
                      <button
                        key={status}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => {
                          setStatusFilter(status);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 text-sm font-medium text-gray-600">
                  Date
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="text-right p-4 text-sm font-medium text-gray-600">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-sm text-gray-900">
                    {format(new Date(payment.date), "MMM d, yyyy")}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors inline-flex items-center text-sm">
                      <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentsTab;
