import React, { useState } from "react";
import {
  UserIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  KeyIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaKey, FaUnlockKeyhole } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const TenantDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tenantData, setTenantData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+254 789 123 567",
      emergencyContact: {
        name: "Jane Doe",
        relation: "Spouse",
        phone: "+254 789 123 567",
      },
    },
    residenceInfo: {
      buildingName: "Dala Luxury Heights",
      buildingAddress: "123 Oginga Odinga Street, Kisumu City, KSM 042",
      unitNumber: "A-203",
      floor: "2nd Floor",
      unitType: "2 Bedroom Appartment Suite",
      squareFootage: "1,200 sq ft",
      parkingSpot: "P-45",
      moveInDate: "2024-01-15",
    },
    leaseInfo: {
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      monthlyRent: "Kshs. 62,500",
      securityDeposit: "Kshs. 60,750",
      leaseType: "Fixed Term",
      paymentDueDate: "25th of each month",
    },
  });

  const handleInputChange = (section, field, value) => {
    setTenantData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setTenantData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        emergencyContact: {
          ...prev.personalInfo.emergencyContact,
          [field]: value,
        },
      },
    }));
  };

  const InfoSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-100">
      <div className="flex items-center space-x-3 mb-8">
        <Icon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );

  const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    disabled = true,
    className = "",
  }) => (
    <div className={className}>
      <label className="block text-sm font-extrabold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-4 py-3 border font-semibold text-gray-500 border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm disabled:bg-gray-50/80"
      />
    </div>
  );

  const handleModalClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowPasswordModal(false);
    }
  };

  const PasswordModal = () => (
    <AnimatePresence>
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleModalClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8">
              <div>
                <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Reset Your Account Password
                </h2>
                <p className="text-gray-500 font-semibold font-sans mt-1">
                  Enter your current password and choose a new one
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border font-semibold text-gray-500 border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border font-semibold text-gray-500 border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border font-semibold text-gray-500 border-gray-200 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-3 font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Update Password
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center border px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold"
        >
          <FaKey className="w-[1.2rem] mr-2 text-gray-600" />
          Reset Account Password
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-medium ${
            isEditing
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white"
          }`}
        >
          {isEditing ? (
            <>
              <FaCheck className="w-[1.2rem] h-5 mr-3" />
              Save Changes
            </>
          ) : (
            <>
              <FaEdit className="w-[1.2rem] mr-3" />
              Edit Personal Info
            </>
          )}
        </button>
      </div>

      {/* Personal Information */}
      <InfoSection title="Personal Information" icon={UserIcon}>
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            value={tenantData.personalInfo.name}
            onChange={(e) =>
              handleInputChange("personalInfo", "name", e.target.value)
            }
            disabled={!isEditing}
          />
          <InputField
            label="Email"
            type="email"
            value={tenantData.personalInfo.email}
            onChange={(e) =>
              handleInputChange("personalInfo", "email", e.target.value)
            }
            disabled={!isEditing}
          />
          <InputField
            label="Phone Number"
            type="tel"
            value={tenantData.personalInfo.phone}
            onChange={(e) =>
              handleInputChange("personalInfo", "phone", e.target.value)
            }
            disabled={!isEditing}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4">
            Emergency Contact
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InputField
              label="Name"
              value={tenantData.personalInfo.emergencyContact.name}
              onChange={(e) =>
                handleEmergencyContactChange("name", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Relation"
              value={tenantData.personalInfo.emergencyContact.relation}
              onChange={(e) =>
                handleEmergencyContactChange("relation", e.target.value)
              }
              disabled={!isEditing}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={tenantData.personalInfo.emergencyContact.phone}
              onChange={(e) =>
                handleEmergencyContactChange("phone", e.target.value)
              }
              disabled={!isEditing}
            />
          </div>
        </div>
      </InfoSection>

      {/* Residence Information */}
      <InfoSection title="Residence Information" icon={BuildingOfficeIcon}>
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Building Name"
            value={tenantData.residenceInfo.buildingName}
          />
          <InputField
            label="Building Address"
            value={tenantData.residenceInfo.buildingAddress}
          />
          <InputField
            label="Unit Number"
            value={tenantData.residenceInfo.unitNumber}
          />
          <InputField label="Floor" value={tenantData.residenceInfo.floor} />
          <InputField
            label="Unit Type"
            value={tenantData.residenceInfo.unitType}
          />
          <InputField
            label="Square Footage"
            value={tenantData.residenceInfo.squareFootage}
          />
          <InputField
            label="Parking Spot"
            value={tenantData.residenceInfo.parkingSpot}
          />
          <InputField
            label="Move-in Date"
            type="date"
            value={tenantData.residenceInfo.moveInDate}
          />
        </div>
      </InfoSection>

      {/* Lease Information */}
      <InfoSection title="Lease Information" icon={DocumentTextIcon}>
        <div className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Start Date"
            type="date"
            value={tenantData.leaseInfo.startDate}
          />
          <InputField
            label="End Date"
            type="date"
            value={tenantData.leaseInfo.endDate}
          />
          <InputField
            label="Monthly Rent"
            value={tenantData.leaseInfo.monthlyRent}
          />
          <InputField
            label="Security Deposit"
            value={tenantData.leaseInfo.securityDeposit}
          />
          <InputField
            label="Lease Type"
            value={tenantData.leaseInfo.leaseType}
          />
          <InputField
            label="Payment Due Date"
            value={tenantData.leaseInfo.paymentDueDate}
          />
        </div>
      </InfoSection>

      {showPasswordModal && <PasswordModal />}
    </div>
  );
};

export default TenantDetails;
