import React from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { Outlet } from "react-router-dom";
import ChatBot from "../Components/Aichatbot";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* Here your page components render */}
           <ChatBot /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
