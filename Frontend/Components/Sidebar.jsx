import React from "react";
import {
  Dashboard,
  Quiz,
  QuestionAnswer,
  SmartToy,
  Payment,
  AccountCircle,
} from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "", label: "Dashboard", icon: <Dashboard /> },
    { to: "GenerateQuestion", label: "Generate Questions", icon: <Quiz /> },
    { to: "SolveAi", label: "Solve with AI", icon: <QuestionAnswer /> },
    { to: "AiAssistent", label: "AI Chat Assistant", icon: <SmartToy /> },
    { to: "Recommendation", label: "AI Recommendation", icon: <PsychologyIcon /> },
    { to: "PricingPage", label: "Payment", icon: <Payment /> },
    { to: "Profile", label: "Profile", icon: <AccountCircle /> },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col">
      <img
        src="../src/assets/logo1.png"
        alt="Logo"
        className="w-16 h-20 mx-auto "
      />
      {/* <h1 className="text-2xl font-bold italic text-green-500 mb-6 text-center">
        Study Assistant
      </h1> */}
      <nav className="flex flex-col gap-8 mt-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === ""}
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
