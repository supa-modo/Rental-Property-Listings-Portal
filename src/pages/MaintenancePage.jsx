import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const MaintenancePage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      unit: "Unit 101",
      issue: "Plumbing leak in bathroom",
      priority: "High",
      status: "Pending",
      reportedBy: "John Doe",
      reportedDate: "2024-12-08",
      description: "Water leaking from under sink, causing floor damage",
      assignedTo: "Mike Smith",
      estimatedCost: 250,
    },
    // Add more maintenance requests
  ]);

  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setRequests([...requests, { id: requests.length + 1, ...data }]);
    setIsAddingRequest(false);
    reset();
  };

  return (
    <div className="px-10 py-12 space-y-6 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingRequest(true)}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          New Request
        </motion.button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-red-100">High Priority</h3>
          <p className="text-3xl font-bold mt-2">3</p>
          <p className="text-sm text-red-100 mt-2">Requires immediate attention</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-yellow-100">In Progress</h3>
          <p className="text-3xl font-bold mt-2">5</p>
          <p className="text-sm text-yellow-100 mt-2">Being worked on</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-green-100">Completed</h3>
          <p className="text-3xl font-bold mt-2">12</p>
          <p className="text-sm text-green-100 mt-2">This month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-sm font-medium text-blue-100">Total Cost</h3>
          <p className="text-3xl font-bold mt-2">$2,450</p>
          <p className="text-sm text-blue-100 mt-2">This month</p>
        </motion.div>
      </div>

      {/* Maintenance Requests List */}
      <div className="grid gap-6">
        {requests.map((request) => (
          <motion.div
            key={request.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {request.unit} - {request.issue}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Reported by {request.reportedBy} on {request.reportedDate}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : request.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {request.priority}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium text-gray-900">{request.status}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-medium text-gray-900">{request.assignedTo}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Estimated Cost</p>
                  <p className="font-medium text-gray-900">${request.estimatedCost}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">{request.description}</p>
            </div>

            <div className="border-t px-6 py-3 bg-gray-50 flex justify-end space-x-3">
              <button className="text-blue-600 hover:text-blue-800">Update Status</button>
              <button className="text-emerald-600 hover:text-emerald-800">Assign</button>
              <button className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Request Modal */}
      {isAddingRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">New Maintenance Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  {...register("unit")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue
                </label>
                <input
                  {...register("issue")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingRequest(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
