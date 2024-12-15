import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  PlusIcon,
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Sunset Blvd",
      units: [
        { number: "101", status: "Occupied", rent: 1200 },
        { number: "102", status: "Vacant", rent: 1200 },
        { number: "103", status: "Maintenance", rent: 1300 },
      ],
      totalUnits: 3,
      occupancyRate: "67%",
      monthlyRevenue: 3700,
    },
    // ... other properties (keep existing data)
  ]);

  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newProperty = {
      id: properties.length + 1,
      ...data,
      units: [], // Initially empty, can be expanded later
      occupancyRate: "0%",
      monthlyRevenue: 0,
    };
    setProperties([...properties, newProperty]);
    setIsAddingProperty(false);
    reset();
  };

  return (
    <div className="p-12 bg-gray-200 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BuildingOfficeIcon className="w-8 h-8 mr-3 text-indigo-600" />
            Properties Management
          </h1>
          <p className="text-gray-500">
            Manage and track your rental properties
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingProperty(true)}
          className="px-4 py-2 flex items-center space-x-2 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <PlusIcon width={20} />
          <span>Add New Property</span>
        </motion.button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-500">{property.address}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 16h16v2H2v-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <UserGroupIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <p className="text-sm text-gray-600">Occupancy</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {property.occupancyRate}
                </p>
              </div>
              <div className="bg-white/30 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-green-600 mr-2" />
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${property.monthlyRevenue}
                </p>
              </div>
            </div>

            {/* Units Status */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Units Status
              </h4>
              <div className="space-y-2">
                {property.units.map((unit, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white/40 p-3 rounded-lg"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-800">
                        Unit {unit.number}
                      </span>
                      <span className="ml-2 text-sm text-gray-600">
                        ${unit.rent}/mo
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        unit.status === "Occupied"
                          ? "bg-green-100 text-green-700"
                          : unit.status === "Vacant"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Property Modal */}
      <AnimatePresence>
        {isAddingProperty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Property
                </h2>
                <button
                  onClick={() => setIsAddingProperty(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter property name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    {...register("address", { required: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter property address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Units
                  </label>
                  <input
                    {...register("totalUnits", {
                      required: true,
                      min: 1,
                      valueAsNumber: true,
                    })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Number of units"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingProperty(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertiesPage;
