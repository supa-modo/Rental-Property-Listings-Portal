import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const TenantsPage = () => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 1,
      name: "John Doe",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    // Add more sample tenants
  ]);

  const [isAddingTenant, setIsAddingTenant] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setTenants([
      ...tenants,
      { id: tenants.length + 1, ...data, status: "Active" },
    ]);
    setIsAddingTenant(false);
    reset();
  };

  return (
    <div className="p-12 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Management</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingTenant(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Add New Tenant
        </motion.button>
      </div>

      {/* Tenant List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tenants.map((tenant) => (
          <motion.div
            key={tenant.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
              <h3 className="text-lg font-semibold text-white">
                {tenant.name}
              </h3>
              <p className="text-blue-100 text-sm">{tenant.unit}</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contact:</span>
                <span className="text-gray-900">{tenant.contact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{tenant.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Move-in Date:</span>
                <span className="text-gray-900">{tenant.moveInDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    tenant.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tenant.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rent Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    tenant.rentStatus === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {tenant.rentStatus}
                </span>
              </div>
            </div>
            <div className="border-t px-4 py-3 bg-gray-50 flex justify-end space-x-3">
              <button className="text-blue-600 hover:text-blue-800">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Tenant Modal */}
      {isAddingTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Add New Tenant</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  {...register("unit")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  {...register("contact")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Move-in Date
                </label>
                <input
                  {...register("moveInDate")}
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingTenant(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg"
                >
                  Add Tenant
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TenantsPage;
