import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const MaintenanceTab = () => {
  const maintenanceRequests = [
    {
      id: 1,
      issue: "Leaking Faucet",
      status: "In Progress",
      date: "2024-12-08",
      priority: "Medium",
      description:
        "Kitchen sink faucet is continuously dripping, causing water wastage and increased utility bills.",
      location: "Kitchen",
      assignedTo: {
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        email: "john.smith@maintenance.com",
        specializaion: "Plumbing",
        estimatedArrival: "2024-12-10 14:00",
      },
      updates: [
        {
          date: "2024-12-08 10:00",
          message: "Request received and assigned to technician",
        },
        {
          date: "2024-12-08 14:30",
          message: "Parts ordered, scheduled for repair on Tuesday",
        },
      ],
    },
    {
      id: 2,
      issue: "AC Maintenance",
      status: "Completed",
      date: "2024-11-30",
      priority: "Low",
      description: "Regular maintenance check for the air conditioning unit.",
      location: "Living Room",
      assignedTo: {
        name: "Sarah Johnson",
        phone: "+1 (555) 987-6543",
        email: "sarah.j@maintenance.com",
        specializaion: "HVAC",
        estimatedArrival: "Completed",
      },
      updates: [
        {
          date: "2024-11-30 09:00",
          message: "Maintenance check completed",
        },
        {
          date: "2024-11-30 09:30",
          message: "Filters replaced and system optimized",
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid gap-6">
        {maintenanceRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {request.issue}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Submitted on {format(new Date(request.date), "MMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {request.location}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : request.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {request.priority} Priority
              </span>
            </div>

            {/* Description Section */}
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Description
                </h4>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-3">
                  {request.description}
                </p>
              </div>

              {/* Assigned Technician Section */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Assigned Technician
                </h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {request.assignedTo.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {request.assignedTo.specializaion}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <PhoneIcon className="w-4 h-4 mr-2" />
                          {request.assignedTo.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {request.assignedTo.email}
                        </div>
                      </div>
                    </div>
                    {request.status !== "Completed" && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">
                          Estimated Arrival
                        </p>
                        <p className="text-sm text-blue-600">
                          {format(
                            new Date(request.assignedTo.estimatedArrival),
                            "MMM d, h:mm a"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Updates Timeline */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                  Updates
                </h4>
                <div className="space-y-3">
                  {request.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-600">
                          {update.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(update.date), "MMM d, h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MaintenanceTab;
