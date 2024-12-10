import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import {
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  HomeIcon,
  WrenchIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const TenantDashboard = () => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  // Mock data
  const tenantData = {
    unit: {
      number: "A-203",
      address: "123 Luxury Apartments, Silicon Valley",
      type: "2 Bedroom Apartment",
      size: "1,200 sq ft",
      rent: 2500,
    },
    nextPayment: {
      date: "2024-12-25",
      amount: 2500,
    },
    leaseDocument: {
      name: "Lease_Agreement_2024.pdf",
      url: "#",
    },
  };

  const paymentHistory = [
    {
      id: 1,
      date: "2024-11-25",
      amount: 2500,
      status: "Paid",
      invoice: "INV-2024-11",
    },
    {
      id: 2,
      date: "2024-10-25",
      amount: 2500,
      status: "Paid",
      invoice: "INV-2024-10",
    },
    {
      id: 3,
      date: "2024-09-25",
      amount: 2500,
      status: "Paid",
      invoice: "INV-2024-09",
    },
  ];

  const maintenanceRequests = [
    {
      id: 1,
      issue: "Leaking Faucet",
      status: "In Progress",
      date: "2024-12-08",
      priority: "Medium",
    },
    {
      id: 2,
      issue: "AC Maintenance",
      status: "Completed",
      date: "2024-11-30",
      priority: "Low",
    },
  ];

  const daysUntilPayment = differenceInDays(
    new Date(tenantData.nextPayment.date),
    new Date()
  );

  return (
    <div className="px-10 py-12 space-y-6  min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowMaintenanceModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <WrenchIcon className="w-5 h-5" />
          <span>New Maintenance Request</span>
        </motion.button>
      </div>

      {/* Unit Details & Next Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unit Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <HomeIcon className="w-5 h-5 mr-2 text-blue-600" />
                Unit Details
              </h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                Unit {tenantData.unit.number}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-gray-600">{tenantData.unit.address}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Type:</span>
              <span className="text-gray-900 font-medium">
                {tenantData.unit.type}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Size:</span>
              <span className="text-gray-900 font-medium">
                {tenantData.unit.size}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly Rent:</span>
              <span className="text-gray-900 font-medium">
                ${tenantData.unit.rent}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next Payment Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-600" />
            Next Payment Due
          </h2>
          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">
              ${tenantData.nextPayment.amount}
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  Due on{" "}
                  {format(
                    new Date(tenantData.nextPayment.date),
                    "MMMM d, yyyy"
                  )}
                </span>
              </div>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                {daysUntilPayment} days until next payment
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payment History & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Payment History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-gray-500">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm text-gray-900">
                      {format(new Date(payment.date), "MMM d, yyyy")}
                    </td>
                    <td className="py-3 text-sm text-gray-900">
                      ${payment.amount}
                    </td>
                    <td className="py-3 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-right">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center justify-end space-x-1">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Maintenance Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Maintenance Requests
          </h2>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-100 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {request.issue}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(request.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : request.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {request.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Documents Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
        <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-medium text-gray-900">Lease Agreement</h3>
              <p className="text-sm text-gray-500">Valid until Dec 31, 2024</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>
      </motion.div>

      {/* Maintenance Request Modal */}
      <AnimatePresence>
        {showMaintenanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  New Maintenance Request
                </h2>
                <button
                  onClick={() => setShowMaintenanceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Issue Type
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Appliance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe the issue in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date for Inspection
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowMaintenanceModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Submit Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TenantDashboard;
