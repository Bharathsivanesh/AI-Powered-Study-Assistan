import React from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { Outlet } from "react-router-dom";
import ChatBot from "../Components/Aichatbot";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

     
      <div className="flex flex-col flex-1 overflow-hidden">
       
        <div className="flex-shrink-0">
          <Topbar />
        </div>

      
        <main className="flex-1 overflow-y-auto ">
          <Outlet /> 
          <ChatBot />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
