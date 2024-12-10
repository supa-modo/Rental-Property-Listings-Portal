import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("financial");

  const financialData = [
    { month: "Jan", income: 25000, expenses: 8000, profit: 17000 },
    { month: "Feb", income: 27000, expenses: 7500, profit: 19500 },
    { month: "Mar", income: 28500, expenses: 9000, profit: 19500 },
    { month: "Apr", income: 26000, expenses: 8200, profit: 17800 },
    { month: "May", income: 29000, expenses: 8800, profit: 20200 },
    { month: "Jun", income: 30000, expenses: 9500, profit: 20500 },
  ];

  const occupancyData = [
    { name: "Occupied", value: 42 },
    { name: "Vacant", value: 8 },
    { name: "Maintenance", value: 4 },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="px-10 py-12 space-y-6 ">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex space-x-4">
        {["financial", "occupancy", "maintenance", "tenant"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedReport(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedReport === type
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </button>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#6366F1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Occupancy Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Occupancy Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupancyData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-emerald-100">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">$165,420</p>
          <p className="text-sm text-emerald-100 mt-2">+12% from last month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-blue-100">Average Rent</h3>
          <p className="text-3xl font-bold mt-2">$1,250</p>
          <p className="text-sm text-blue-100 mt-2">Per unit</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-purple-100">Occupancy Rate</h3>
          <p className="text-3xl font-bold mt-2">87%</p>
          <p className="text-sm text-purple-100 mt-2">+5% from last month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-orange-100">Maintenance Cost</h3>
          <p className="text-3xl font-bold mt-2">$12,350</p>
          <p className="text-sm text-orange-100 mt-2">This month</p>
        </motion.div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expenses Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { category: "Maintenance", amount: 12350 },
                { category: "Utilities", amount: 8500 },
                { category: "Insurance", amount: 4200 },
                { category: "Property Tax", amount: 6800 },
                { category: "Marketing", amount: 2100 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tenant Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Tenant Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Average Lease Length</span>
              <span className="font-semibold">14 months</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Renewal Rate</span>
              <span className="font-semibold">76%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">New Tenants</span>
              <span className="font-semibold">8 this month</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Average Response Time</span>
              <span className="font-semibold">24 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsPage;
