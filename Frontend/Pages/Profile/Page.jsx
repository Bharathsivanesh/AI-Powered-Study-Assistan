import React from "react";
import { Download, FileText, Brain } from "lucide-react";
import userimage from "../../src/assets/userimage.png"
const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: User Profile */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center">
          <img
            src={userimage}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 border-4 border-green-500"
          />
          <h2 className="text-xl font-semibold text-gray-800">Alex Johnson</h2>
          <p className="text-gray-500 mb-4 text-sm">alex.j@email.com</p>

          <button className="bg-green-100 text-green-700 px-6 py-2 rounded-lg mb-3 hover:bg-green-200 transition">
            Edit Profile
          </button>
          <button className="text-red-500 font-medium hover:text-red-600">
            Logout
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 flex flex-col gap-6">
        
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Your Current Plan
              </h3>
              <p className="text-green-600 font-medium mt-1">Pro Plan</p>
              <p className="text-gray-500 text-sm mt-1">
                You have full access to all our premium features. Unlock your
                learning potential.
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mt-4 md:mt-0">
              Upgrade Plan
            </button>
          </div>

         
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Your Monthly Usage
            </h3>

           
            <div className="space-y-5">
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-green-600" />
                    <span>AI Question Generation</span>
                  </div>
                  <span className="text-gray-500">75 / 100</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

             
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span>Document Uploads</span>
                  </div>
                  <span className="text-gray-500">8 / 10</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

            
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-green-600" />
                    <span>Summary Downloads</span>
                  </div>
                  <span className="text-gray-500">15 / 25</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
