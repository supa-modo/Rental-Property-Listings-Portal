import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { PlusIcon, UserGroupIcon, HomeIcon } from "@heroicons/react/24/outline";

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
      propertyName: "Sunset Apartments",
      unit: "Unit 102",
      contact: "+1234567891",
      email: "jane@example.com",
      moveInDate: "2023-02-01",
      status: "Active",
      rentStatus: "Due",
    },
    {
      id: 3,
      name: "Mike Johnson",
      propertyName: "Oakwood Heights",
      unit: "Unit 201",
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
    <div>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <UserGroupIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Tenants</h1>
                <p className="text-sm text-gray-500">
                  Manage your property tenants
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddingTenant(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Tenant
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {Object.entries(groupedTenants).map(([propertyName, propertyTenants]) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={propertyName}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center space-x-2 mb-6">
                <HomeIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">{propertyName}</h2>
                <span className="text-sm text-gray-500">
                  ({propertyTenants.length} tenants)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Move In
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {propertyTenants.map((tenant) => (
                      <tr
                        key={tenant.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{tenant.name}</div>
                            <div className="text-sm text-gray-500">{tenant.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {tenant.unit}
                        </td>
                        <td className="hidden md:table-cell px-4 py-4 text-sm text-gray-500">
                          {tenant.contact}
                        </td>
                        <td className="hidden lg:table-cell px-4 py-4 text-sm text-gray-500">
                          {tenant.moveInDate}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${tenant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {tenant.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${tenant.rentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {tenant.rentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
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
                  Property Name
                </label>
                <input
                  {...register("propertyName")}
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
