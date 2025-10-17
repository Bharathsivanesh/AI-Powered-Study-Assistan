import React from "react";
import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react";

export default function Profile() {
  const user = {
    name: "Bharath Sivanesh",
    email: "bharath@example.com",
    phone: "+91 98765 43210",
    location: "Pune, India",
    bio: "Full Stack Developer passionate about building scalable web apps with React and Node.js.",
    profilePic:
      "https://images.unsplash.com/photo-1603415526960-f7e0328f56c5?auto=format&fit=crop&w=200&q=80",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md border-4 border-indigo-500"
          />
          <h1 className="text-2xl font-semibold mt-4 text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-500 text-sm text-center">{user.bio}</p>

          <button className="mt-4 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-indigo-500" size={20} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="text-indigo-500" size={20} />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="text-indigo-500" size={20} />
            <span>{user.location}</span>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-400">
          © 2025 Bharath | All Rights Reserved
        </div>
      </div>
    </div>
  );
}
