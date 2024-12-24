import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const MaintenanceModal = ({
  showMaintenanceModal,
  setShowMaintenanceModal,
}) => {
  return (
    <AnimatePresence>
      {showMaintenanceModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 w-full max-w-3xl border border-gray-100"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  New Maintenance Request
                </h2>
                <p className="text-gray-500 font-semibold font-sans mt-1">Fill in the details of your maintenance request below</p>
              </div>
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <XMarkIcon className="w-7 h-7 text-gray-400 hover:text-red-600" />
              </button>
            </div>

            <form className="space-y-6 ">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Issue Type
                  </label>
                  <select className="w-full px-4 py-3 font-bold text-red-500 border border-gray-200 rounded-xl focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm">
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC</option>
                    <option>Appliance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <div className="flex space-x-4">
                    {["Low", "Medium", "High"].map((priority) => (
                      <label key={priority} className="flex-1">
                        <input
                          type="radio"
                          name="priority"
                          className="sr-only peer"
                        />
                        <div className="text-center px-4 py-3 font-bold text-gray-500 rounded-xl border border-gray-200 cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:bg-gray-50 transition-all">
                          {priority}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border font-semibold text-gray-500 border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none shadow-sm"
                  placeholder="Please describe the issue in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                  Preferred Inspection Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border text-green-800 font-bold border-gray-200 rounded-xl focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>

              <div className="flex justify-end font-bold space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceModal(false)}
                  className="px-6 py-3 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaintenanceModal;
