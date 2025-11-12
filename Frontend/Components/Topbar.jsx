import React, { useState } from "react";
import {
  Menu,
  Notifications,
  AccountCircle,
  Logout,
  Send,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");

  const students = [
    {
      id: 1,
      name: "Eleanor Pena",
      lastMessage: "I have a question...",
      time: "10:42 AM",
    },
    {
      id: 2,
      name: "Cody Fisher",
      lastMessage: "Awesome, thank you!",
      time: "Yesterday",
    },
  ];

  const handleOpen = () => {
    setOpen(true);
    if (students.length > 0) setSelectedStudent(students[0]);
  };
  const handleClose = () => setOpen(false);
  const handleStudentClick = (s) => setSelectedStudent(s);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send:", message);
    setMessage("");
  };

  const router = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    router("/");
  };
  return (
    <div className="flex justify-between items-center bg-white shadow px-4 py-3 flex-wrap gap-3">
      <button className="lg:hidden text-green-500" onClick={onMenuClick}>
        <Menu fontSize="large" />
      </button>

      <h2 className="text-xl sm:text-2xl font-bold italic text-green-500 tracking-wide flex-1 text-center lg:text-left">
        AI Study Assistant
      </h2>

      <div className="flex items-center gap-3 sm:gap-4">
        <Notifications
          fontSize="medium"
          className="text-green-500 cursor-pointer hover:text-green-600"
          onClick={handleOpen}
        />
        <AccountCircle
          fontSize="medium"
          className="text-green-500 cursor-pointer hover:text-green-600"
        />
        <button
          onClick={onLogout}
          className="flex items-center gap-1 text-green-500 hover:text-green-600"
        >
          <Logout fontSize="medium" />
          <span className="hidden sm:block font-medium">Logout</span>
        </button>
      </div>

      {/* Modal: Chat / Notifications */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "80%", md: "60%" },
            height: { xs: "80%", sm: 600 },
          }}
        >
          {/* Header */}
          <div className="border-b border-green-500 px-4 sm:px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChatBubbleOutline sx={{ color: "#22c55e" }} />
              <h2 className="text-base sm:text-lg text-green-500 font-semibold">
                Doubt Section
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm"
            >
              Close
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col sm:flex-row flex-1">
            {/* Student list */}
            <div className="sm:w-[30%] border-r border-gray-200 overflow-y-auto bg-white">
              {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 italic p-4">
                  No students yet 👋
                </div>
              ) : (
                students.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleStudentClick(s)}
                    className={`px-4 py-3 cursor-pointer hover:bg-green-50 ${
                      selectedStudent?.id === s.id ? "bg-green-100" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">{s.name}</h3>
                      <span className="text-xs text-gray-400">{s.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {s.lastMessage}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Chat Section */}
            <div className="flex flex-col flex-1 h-full bg-gray-50">
              {selectedStudent ? (
                <>
                  {/* Chat Header */}
                  <div className="bg-green-500 text-white px-4 sm:px-6 py-3 flex justify-between">
                    <h2 className="font-semibold">{selectedStudent.name}</h2>
                    <span className="text-xs opacity-80">Active now</span>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-green-200 text-green-700 rounded-full flex items-center justify-center font-bold">
                        {selectedStudent.name.charAt(0)}
                      </div>
                      <div className="bg-white shadow p-3 rounded-xl max-w-[70%]">
                        <p className="text-sm text-gray-800">
                          Hi, I have a question about the homework assignment.
                        </p>
                        <span className="text-xs text-gray-400">10:42 AM</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-green-100 shadow p-3 rounded-xl max-w-[70%]">
                        <p className="text-sm text-gray-800">
                          Of course! The final project requires a 10-page paper
                          and a presentation.
                        </p>
                        <span className="text-xs text-gray-400 block text-right">
                          10:45 AM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Input */}
                  <div className="flex items-center gap-2 p-3 border-t bg-white">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                    >
                      <Send fontSize="small" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center text-gray-400 italic">
                  Select a student to chat 💬
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Topbar;
