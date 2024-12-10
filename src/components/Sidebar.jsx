import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  WrenchIcon,
  ChartBarIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/' },
    { id: 'tenants', label: 'Tenants', icon: UsersIcon, path: '/tenants', count: 3 },
    { id: 'properties', label: 'Properties', icon: BuildingOfficeIcon, path: '/properties' },
    { id: 'payments', label: 'Payments', icon: CurrencyDollarIcon, path: '/payments' },
    { id: 'maintenance', label: 'Maintenance', icon: WrenchIcon, path: '/maintenance', count: 2 },
    { id: 'reports', label: 'Reports', icon: ChartBarIcon, path: '/reports' },
    { id: 'profile', label: 'Profile', icon: UserCircleIcon, path: '/profile' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isSidebarOpen ? "256px" : "80px" }}
      className="fixed left-0 h-full bg-gradient-to-b from-gray-700 via-gray-500 to-gray-700 text-white shadow-xl z-30"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between">
          <motion.div
            initial={false}
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="flex items-center space-x-3"
          >
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            {isSidebarOpen && (
              <span className="font-bold text-xl">RentalPro</span>
            )}
          </motion.div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ChevronLeftIcon
              className={`w-5 h-5 transform transition-transform ${
                !isSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {isSidebarOpen && (
                <motion.span
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="ml-3"
                >
                  {item.label}
                  {item.count && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 rounded-full">
                      {item.count}
                    </span>
                  )}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <img
              src="https://ui-avatars.com/api/?name=John+Doe"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            {isSidebarOpen && (
              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                className="flex-1"
              >
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-400">john@example.com</p>
              </motion.div>
            )}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <CogIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
