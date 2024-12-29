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
  ChartBarIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import MaintenanceModal from "../components/tenants/MaintenanceRequestModal";
import PaymentsTab from "../components/tenants/PaymentsTab";

const TenantDashboard = () => {
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Extended mock data
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

  const utilityData = [
    { month: "Jan", electricity: 120, water: 45, gas: 30 },
    { month: "Feb", electricity: 130, water: 48, gas: 35 },
    { month: "Mar", electricity: 125, water: 52, gas: 38 },
    { month: "Apr", electricity: 135, water: 50, gas: 32 },
    { month: "May", electricity: 145, water: 55, gas: 36 },
    { month: "Jun", electricity: 160, water: 58, gas: 40 },
  ];

  const daysUntilPayment = differenceInDays(
    new Date(tenantData.nextPayment.date),
    new Date()
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Notification badge component
  const NotificationBadge = () => (
    <div className="relative">
      <BellIcon className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        2
      </span>
    </div>
  );

  // Tab navigation component
  const TabNavigation = () => (
    <div className="flex space-x-10 mb-6 border-b border-gray-300">
      {["overview", "payments", "maintenance", "tenant details"].map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          className={`px-4 py-2 font-semibold transition-colors ${
            selectedTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-600"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-gray-100 to-indigo-200">
      {/* Header */}
      <div className="bg-gray-100 border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <HomeIcon className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <h1 className="text-xl font-extrabold text-gray-900">
                    Welcome, {user?.name || "Tenant"}
                  </h1>
                  <p className="text-sm font-extrabold text-gray-500">
                    Unit {tenantData.unit.number}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <NotificationBadge />
              <button
                onClick={() => setShowMaintenanceModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              >
                <WrenchIcon className="w-4 h-4 mr-2" />
                Request Maintenance
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-6 py-2 rounded-md text-sm font-semibold text-white bg-red-500 hover:bg-gray-50 transition-colors"
              >
                <LuLogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl shadow-xl min-h-screen mx-auto px-8 sm:px-12 lg:px-16 py-8">
        <TabNavigation />

        {/* Overview Section */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-sm p-6 border border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Next Payment
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${tenantData.nextPayment.amount}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CurrencyDollarIcon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Due in {daysUntilPayment} days
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-sm p-6 border border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Maintenance
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {maintenanceRequests.length} Active
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <WrenchIcon className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ChartBarIcon className="w-4 h-4 mr-1" />
                    {
                      maintenanceRequests.filter(
                        (r) => r.status === "Completed"
                      ).length
                    }{" "}
                    completed this month
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-sm p-6 border border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Lease Status
                    </p>
                    <p className="text-2xl font-bold text-gray-900">Active</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <DocumentTextIcon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Expires Dec 31, 2024
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Utility Usage Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Utility Usage
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={utilityData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="electricity"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="gas"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div> */}
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Documents
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {tenantData.leaseDocument.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Valid until Dec 31, 2024
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                    <ArrowDownTrayIcon className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Maintenance Request Modal */}
        <MaintenanceModal
          showMaintenanceModal={showMaintenanceModal}
          setShowMaintenanceModal={setShowMaintenanceModal}
        />

        {/* Payments Tab */}
        {selectedTab === "payments" && (
          <PaymentsTab paymentHistory={paymentHistory} />
        )}

        {/* Maintenance Tab */}
        {selectedTab === "maintenance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-6">
              {maintenanceRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
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
                  <div className="mt-4">
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
        )}

        {/* Documents Tab */}
        {/* {selectedTab === "documents" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Documents
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <DocumentTextIcon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {tenantData.leaseDocument.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Valid until Dec 31, 2024
                    </p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </motion.div>
        )} */}
      </div>
    </div>
  );
};

export default TenantDashboard;
