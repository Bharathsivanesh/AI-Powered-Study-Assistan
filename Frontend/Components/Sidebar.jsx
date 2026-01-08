import React from "react";
import {
  Dashboard,
  Quiz,
  QuestionAnswer,
  SmartToy,
  AccountCircle,
} from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { NavLink } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  const links = [
    { to: "", label: "Dashboard", icon: <Dashboard /> },
    { to: "GenerateQuestion", label: "Generate Questions", icon: <Quiz /> },
    { to: "SolveAi", label: "Solve with AI", icon: <QuestionAnswer /> },
    { to: "AiAssistent", label: "AI Chat Assistant", icon: <SmartToy /> },
    {
      to: "Recommendation",
      label: "AI Recommendation",
      icon: <PsychologyIcon />,
    },
    { to: "Profile", label: "Profile", icon: <AccountCircle /> },
  ];

  return (
    <div
      className={`fixed lg:static top-0 left-0 h-full bg-white shadow-md p-5 flex flex-col transform transition-transform duration-300 z-50 w-64
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <img
        src="/logo1.png"
        alt="Logo"
        className="w-16 h-20 mx-auto mb-6"
      />

      <nav className="flex flex-col gap-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === ""}
            onClick={() => toggleSidebar()} 
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
