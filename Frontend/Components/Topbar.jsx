import React from "react";
import { Notifications, AccountCircle, Logout } from "@mui/icons-material";

const Topbar = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      {/* Left: Page Title */}
      <h2 className="text-2xl md:text-2xl font-bold italic text-green-500 tracking-wide drop-shadow-md">
        AI Study Assistant
      </h2>

      {/* Right: Icons + Logout */}
      <div className="flex items-center gap-4">
        <Notifications
          fontSize="medium"
          className="text-green-500 cursor-pointer hover:text-green-600 transition"
        />
        <AccountCircle
          fontSize="medium"
          className="text-green-500 cursor-pointer hover:text-green-600 transition"
        />
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-green-500 hover:text-green-600 px-2 py-1 rounded transition"
        >
          <Logout fontSize="medium" />
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
