import React from "react";
import {
  FaSearch,
  FaBell,
  FaChevronLeft,
  FaUserCircle,
  FaCog,
  FaHome,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import {
  ChevronLeftIcon,
  BellIcon,
  HomeIcon,
  CreditCardIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ChartBarIcon,
  WrenchIcon,
  CogIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const RentalManagementDashboard = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  // Sample data
  const rentalIncomeData = [
    { month: "Jan", income: 25000, expenses: 5000 },
    { month: "Feb", income: 22000, expenses: 4800 },
    { month: "Mar", income: 27500, expenses: 5200 },
    { month: "Apr", income: 24000, expenses: 4900 },
    { month: "May", income: 26000, expenses: 5100 },
    { month: "Jun", income: 23500, expenses: 4700 },
    { month: "July", income: 27500, expenses: 5200 },
    { month: "Aug", income: 24000, expenses: 4900 },
    { month: "Sep", income: 26000, expenses: 5100 },
    { month: "Oct", income: 23500, expenses: 4700 },
    { month: "Nov", income: 27500, expenses: 5200 },
    { month: "Dec", income: 24000, expenses: 4900 },
  ];

  const properties = [
    {
      id: 1,
      name: "Sunset Apartments",
      units: ["Unit 101", "Unit 102", "Unit 103"],
    },
    {
      id: 2,
      name: "Ocean View Complex",
      units: ["Unit A1", "Unit A2", "Unit B1"],
    },
    { id: 3, name: "Mountain Lodge", units: ["Suite 1", "Suite 2"] },
  ];

  const maintenanceRequests = [
    {
      id: 1,
      unit: "Unit 101",
      issue: "Plumbing",
      priority: "High",
      status: "Pending",
    },
    {
      id: 2,
      unit: "Unit A2",
      issue: "HVAC",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: 3,
      unit: "Suite 1",
      issue: "Electrical",
      priority: "Low",
      status: "Scheduled",
    },
  ];

  const navItems = [
    { id: "dashboard", icon: HomeIcon, label: "Dashboard" },
    { id: "notifications", icon: BellIcon, label: "Notifications", count: 3 },
    { id: "payments", icon: CreditCardIcon, label: "Payments" },
    { id: "properties", icon: BuildingOfficeIcon, label: "Properties" },
    { id: "tenants", icon: UsersIcon, label: "Tenants" },
    { id: "reports", icon: ChartBarIcon, label: "Reports" },
    { id: "maintenance", icon: WrenchIcon, label: "Maintenance Requests" },
  ];

  const stats = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$124,500",
      change: "+12%",
      icon: CurrencyDollarIcon,
      trend: "up",
    },
    {
      id: 2,
      title: "Active Tenants",
      value: "45",
      change: "+3",
      icon: UsersIcon,
      trend: "up",
    },
    {
      id: 3,
      title: "Properties",
      value: "28",
      change: "+2",
      icon: BuildingOfficeIcon,
      trend: "up",
    },
    {
      id: 4,
      title: "Occupancy Rate",
      value: "92%",
      change: "+5%",
      icon: ClipboardDocumentCheckIcon,
      trend: "up",
    },
  ];

  return (
    <div className="p-12 bg-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, John!</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingProperty(true)}
          className="px-4 py-2 flex items-center space-x-2 bg-gradient-to-br from-indigo-600  to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <PlusIcon width={20} />
          <span>Add New Property</span>
        </motion.button>
      </div>

      <div className="flex-col space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowTrendingUpIcon
                  className={`w-4 h-4 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                />
                <span
                  className={`ml-2 text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change} from last month
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gray-100 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">Rental Income</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rentalIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Upcoming Leases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-400 to-indigo-500 text-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upcoming Payments
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={item}
                  className="p-4 rounded-lg bg-white/10 backdrop-blur-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <CurrencyDollarIcon className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Rent Payment Due
                      </p>
                      <p className="text-sm text-gray-200">Unit B-456</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">Kshs. 1,200</p>
                    <span className="text-[13px] text-red-600 font-semibold px-4 py-1 bg-blue-200/20 rounded-lg">
                      Due in 5 days
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Maintenance Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-600 to-red-400 text-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Maintenance Requests</h3>
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <motion.div
                  key={request.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{request.unit}</h4>
                      <p className="text-sm text-emerald-100">
                        {request.issue}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        request.priority === "High"
                          ? "bg-red-400/20 text-red-100"
                          : request.priority === "Medium"
                            ? "bg-yellow-400/20 text-yellow-100"
                            : "bg-green-400/20 text-green-100"
                      }`}
                    >
                      {request.priority}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Payments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-lg bg-white/10 backdrop-blur-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Unit 101</h4>
                    <p className="text-sm text-orange-100">Rent Payment</p>
                  </div>
                  <span className="text-lg font-semibold">$1,200</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Property Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Property Status</h3>
            <div className="space-y-4">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-white/10 backdrop-blur-lg cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <h4 className="font-medium">{property.name}</h4>
                  <p className="text-sm text-purple-200 mt-1">
                    {property.units.length} Units
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RentalManagementDashboard;
