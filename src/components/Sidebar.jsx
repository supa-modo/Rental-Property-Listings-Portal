import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "@heroicons/react/24/outline";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { id: "tenants", label: "Tenants", icon: UsersIcon, path: "/tenants" },
    {
      id: "properties",
      label: "Properties",
      icon: BuildingOfficeIcon,
      path: "/properties",
    },
    {
      id: "payments",
      label: "Payments",
      icon: CurrencyDollarIcon,
      path: "/payments",
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: WrenchIcon,
      path: "/maintenance",
    },
    { id: "reports", label: "Reports", icon: ChartBarIcon, path: "/reports" },
    { id: "profile", label: "Profile", icon: UserCircleIcon, path: "/profile" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? "300px" : "75px",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="fixed left-0 h-full bg-gradient-to-b from-indigo-900 via-gray-400 to-gray-600 text-white shadow-xl z-30"
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 flex items-center justify-between">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="flex items-center space-x-3"
          >
            <img src="/appartment.png" alt="Logo" className="w-8 h-8" />
            {isOpen && <span className="font-bold text-xl">RentalPro</span>}
          </motion.div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronLeftIcon
              className={`w-5 h-5 transform transition-transform ${
                !isOpen ? "rotate-180" : ""
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
                  : "text-gray-300 hover:bg-indigo-600"
              }`}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {isOpen && (
                <motion.span
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="ml-3 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <UserCircleIcon className="w-6 h-6 text-gray-300" />
            </div>
            {isOpen && (
              <motion.div
                initial={false}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="font-medium truncate">{user?.name || "User"}</p>
                <p className="text-sm text-gray-400 truncate">
                  {user?.username || "email@example.com"}
                </p>
              </motion.div>
            )}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <AiOutlineLogout className="w-6 h-6 text-gray-300 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
