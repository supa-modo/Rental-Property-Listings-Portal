import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

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
    <div className="p-12  min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddingProperty(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Add New Property
        </motion.button>
      </div>

      {/* Property Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
              <h3 className="text-xl font-bold text-white">{property.name}</h3>
              <p className="text-purple-100">{property.address}</p>
            </div>
            
            {/* Property Stats */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">Total Units</p>
                  <p className="text-xl font-bold text-purple-900">{property.totalUnits}</p>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-indigo-600 font-medium">Occupancy</p>
                  <p className="text-xl font-bold text-indigo-900">{property.occupancyRate}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Revenue</p>
                  <p className="text-xl font-bold text-blue-900">${property.monthlyRevenue}</p>
                </div>
              </div>

              {/* Units List */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 mb-2">Units</h4>
                {property.units.map((unit) => (
                  <div
                    key={unit.number}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">Unit {unit.number}</p>
                      <p className="text-sm text-gray-600">${unit.rent}/month</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        unit.status === "Occupied"
                          ? "bg-green-100 text-green-800"
                          : unit.status === "Vacant"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t px-4 py-3 bg-gray-50 flex justify-end space-x-3">
              <button className="text-purple-600 hover:text-purple-800">
                Edit Property
              </button>
              <button className="text-purple-600 hover:text-purple-800">
                Add Unit
              </button>
              <button className="text-red-600 hover:text-red-800">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Property Modal */}
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
