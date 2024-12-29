import React, { useState } from 'react';
import { UserIcon, BuildingOfficeIcon, DocumentTextIcon, KeyIcon, PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
        phone: "+254 789 123 567"
      }
    },
    residenceInfo: {
      buildingName: "Dala Luxury Heights",
      buildingAddress: "123 Oginga Odinga Street, Kisumu City, KSM 042",
      unitNumber: "A-203",
      floor: "2nd Floor",
      unitType: "2 Bedroom Appartment Suite",
      squareFootage: "1,200 sq ft",
      parkingSpot: "P-45",
      moveInDate: "2024-01-15"
    },
    leaseInfo: {
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      monthlyRent: "Kshs. 62,500",
      securityDeposit: "Kshs. 60,750",
      leaseType: "Fixed Term",
      paymentDueDate: "25th of each month"
    }
  });

  const handleInputChange = (section, field, value) => {
    setTenantData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setTenantData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        emergencyContact: {
          ...prev.personalInfo.emergencyContact,
          [field]: value
        }
      }
    }));
  };

  const InfoSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <Icon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  const InputField = ({ label, type = "text", value, onChange, disabled = !isEditing, className = "" }) => (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );

  const PasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
          <button
            onClick={() => setShowPasswordModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <InputField 
            label="Current Password"
            type="password"
            value=""
            onChange={() => {}}
            disabled={false}
          />
          <InputField 
            label="New Password"
            type="password"
            value=""
            onChange={() => {}}
            disabled={false}
          />
          <InputField 
            label="Confirm New Password"
            type="password"
            value=""
            onChange={() => {}}
            disabled={false}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <KeyIcon className="w-4 h-4 mr-2" />
          Reset Password
        </button>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isEditing
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isEditing ? (
            <>
              <CheckIcon className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Details
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
            onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            value={tenantData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
          />
          <InputField
            label="Phone Number"
            type="tel"
            value={tenantData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <InputField
              label="Name"
              value={tenantData.personalInfo.emergencyContact.name}
              onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
            />
            <InputField
              label="Relation"
              value={tenantData.personalInfo.emergencyContact.relation}
              onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={tenantData.personalInfo.emergencyContact.phone}
              onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
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
            onChange={(e) => handleInputChange('residenceInfo', 'buildingName', e.target.value)}
          />
          <InputField
            label="Building Address"
            value={tenantData.residenceInfo.buildingAddress}
            onChange={(e) => handleInputChange('residenceInfo', 'buildingAddress', e.target.value)}
          />
          <InputField
            label="Unit Number"
            value={tenantData.residenceInfo.unitNumber}
            onChange={(e) => handleInputChange('residenceInfo', 'unitNumber', e.target.value)}
          />
          <InputField
            label="Floor"
            value={tenantData.residenceInfo.floor}
            onChange={(e) => handleInputChange('residenceInfo', 'floor', e.target.value)}
          />
          <InputField
            label="Unit Type"
            value={tenantData.residenceInfo.unitType}
            onChange={(e) => handleInputChange('residenceInfo', 'unitType', e.target.value)}
          />
          <InputField
            label="Square Footage"
            value={tenantData.residenceInfo.squareFootage}
            onChange={(e) => handleInputChange('residenceInfo', 'squareFootage', e.target.value)}
          />
          <InputField
            label="Parking Spot"
            value={tenantData.residenceInfo.parkingSpot}
            onChange={(e) => handleInputChange('residenceInfo', 'parkingSpot', e.target.value)}
          />
          <InputField
            label="Move-in Date"
            type="date"
            value={tenantData.residenceInfo.moveInDate}
            onChange={(e) => handleInputChange('residenceInfo', 'moveInDate', e.target.value)}
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
            onChange={(e) => handleInputChange('leaseInfo', 'startDate', e.target.value)}
          />
          <InputField
            label="End Date"
            type="date"
            value={tenantData.leaseInfo.endDate}
            onChange={(e) => handleInputChange('leaseInfo', 'endDate', e.target.value)}
          />
          <InputField
            label="Monthly Rent"
            value={tenantData.leaseInfo.monthlyRent}
            onChange={(e) => handleInputChange('leaseInfo', 'monthlyRent', e.target.value)}
          />
          <InputField
            label="Security Deposit"
            value={tenantData.leaseInfo.securityDeposit}
            onChange={(e) => handleInputChange('leaseInfo', 'securityDeposit', e.target.value)}
          />
          <InputField
            label="Lease Type"
            value={tenantData.leaseInfo.leaseType}
            onChange={(e) => handleInputChange('leaseInfo', 'leaseType', e.target.value)}
          />
          <InputField
            label="Payment Due Date"
            value={tenantData.leaseInfo.paymentDueDate}
            onChange={(e) => handleInputChange('leaseInfo', 'paymentDueDate', e.target.value)}
          />
        </div>
      </InfoSection>

      {showPasswordModal && <PasswordModal />}
    </div>
  );
};

export default TenantDetails;