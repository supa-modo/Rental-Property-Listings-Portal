import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { PlusIcon } from "@heroicons/react/24/outline";

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
    {
      id: 5,
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
    {
      id: 4,
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
    {
      id: 2,
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
    {
      id: 3,
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
    // Add more properties
  ]);

  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setProperties([...properties, { id: properties.length + 1, ...data }]);
    setIsAddingProperty(false);
    reset();
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Properties</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingProperty(true)}
            className="px-4 py-2 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Property</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
                  <p className="text-gray-500">{property.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Total Units</p>
                    <p className="text-lg font-medium text-gray-800">{property.totalUnits}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-lg font-medium text-gray-800">{property.occupancyRate}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-xl font-semibold text-blue-600">${property.monthlyRevenue}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Units Status</p>
                  <div className="grid grid-cols-1 gap-2">
                    {property.units.map((unit, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-600">Unit {unit.number}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          unit.status === 'Occupied' ? 'bg-green-100 text-green-700' :
                          unit.status === 'Vacant' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {unit.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for adding new property */}
      {isAddingProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Add New Property</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name
                </label>
                <input
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  {...register("address")}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Units
                </label>
                <input
                  {...register("totalUnits")}
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg"
                >
                  Add Property
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
