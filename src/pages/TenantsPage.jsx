import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  PlusIcon,
  UsersIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  PhoneIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const TenantsPage = () => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "John Doe",
      propertyName: "Sunset Apartments",
      unit: "Unit 101",
      contact: "+1234567890",
      email: "john@example.com",
      moveInDate: "2023-01-15",
      status: "Active",
      rentStatus: "Paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      propertyName: "Ocean View Complex",
      unit: "Unit A2",
      contact: "+1234567891",
      email: "jane@example.com",
      moveInDate: "2023-02-01",
      status: "Active",
      rentStatus: "Due",
    },
    {
      id: 3,
      name: "Mike Johnson",
      propertyName: "Mountain Lodge",
      unit: "Suite 1",
      contact: "+1234567892",
      email: "mike@example.com",
      moveInDate: "2023-03-15",
      status: "Active",
      rentStatus: "Paid",
    },
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

  // Group tenants by property
  const groupedTenants = tenants.reduce((acc, tenant) => {
    if (!acc[tenant.propertyName]) {
      acc[tenant.propertyName] = [];
    }
    acc[tenant.propertyName].push(tenant);
    return acc;
  }, {});

  return (
    <div className="p-12 bg-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UsersIcon className="w-8 h-8 mr-3 text-indigo-600" />
            Tenants Management
          </h1>
          <p className="text-gray-500">View and manage your tenant profiles</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingTenant(true)}
          className="px-4 py-2 flex items-center space-x-2 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <PlusIcon width={20} />
          <span>Add New Tenant</span>
        </motion.button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedTenants).map(
          ([propertyName, propertyTenants]) => (
            <motion.div
              key={propertyName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BuildingOfficeIcon className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {propertyName}
                  </h2>
                  <span className="text-sm text-gray-500">
                    ({propertyTenants.length} tenants)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {propertyTenants.map((tenant) => (
                  <motion.div
                    key={tenant.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-md p-5 space-y-4 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <UserCircleIcon className="w-12 h-12 text-indigo-500" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tenant.name}
                        </h3>
                        <p className="text-sm text-gray-500">{tenant.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {tenant.unit}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {tenant.contact}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Moved in: {tenant.moveInDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        tenant.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                      >
                        {tenant.status}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${
                        tenant.rentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                      >
                        Rent: {tenant.rentStatus}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* Add Tenant Modal */}
      {isAddingTenant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <PlusIcon className="w-7 h-7 mr-2 text-indigo-600" />
                Add New Tenant
              </h2>
              <button
                onClick={() => setIsAddingTenant(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>×
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  {...register("propertyName")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  {...register("unit")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  {...register("contact")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Move-in Date
                </label>
                <input
                  {...register("moveInDate")}
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                  className="px-4 py-2 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
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
