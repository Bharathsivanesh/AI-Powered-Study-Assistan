import React, { useState } from "react";
import {
  Notifications,
  AccountCircle,
  Logout,
  Send,
  ChatBubbleOutline,
} from "@mui/icons-material";
import { Modal, Box } from "@mui/material";

const Topbar = ({ onLogout }) => {
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
    {
      id: 3,
      name: "Jacob Jones",
      lastMessage: "I submitted the assignment.",
      time: "Mon",
    },
    {
      id: 4,
      name: "Theresa Webb",
      lastMessage: "Can we schedule a meeting?",
      time: "Mon",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");

  const handleOpen = () => {
    setOpen(true);
    if (students.length > 0) {
      setSelectedStudent(students[0]);
    }
  };

  const handleClose = () => setOpen(false);

  const handleStudentClick = (student) => setSelectedStudent(student);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Send:", message);
    setMessage("");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h2 className="text-2xl font-bold italic text-green-500 tracking-wide drop-shadow-md">
        AI Study Assistant
      </h2>

      <div className="flex items-center gap-4">
        <Notifications
          fontSize="medium"
          className="text-green-500 cursor-pointer hover:text-green-600 transition"
          onClick={handleOpen}
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

      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
          sx={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: 600,
          }}
        >
          <div className=" border border-b-2 border-green-500 text-white px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChatBubbleOutline sx={{ color: "#22c55e" }} />
              <h2 className="text-lg text-green-500 font-semibold tracking-wide">
                Doubt Section
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm transition"
            >
              Close
            </button>
          </div>

          <div className="flex flex-row flex-1">
            {/* LEFT: Student List */}
            <div className="w-[30%] border-r border-gray-200 overflow-y-auto bg-white">
              {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 italic p-4">
                  No students yet 👋
                </div>
              ) : (
                students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentClick(student)}
                    className={`px-4 py-3 cursor-pointer hover:bg-green-50 transition ${
                      selectedStudent?.id === student.id ? "bg-green-100" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">
                        {student.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {student.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {student.lastMessage}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT: Chat Section */}
            <div className="flex flex-col flex-1 h-full bg-gray-50">
              {students.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-gray-400 italic">
                  No students yet 👋
                </div>
              ) : !selectedStudent ? (
                <div className="flex flex-1 items-center justify-center text-gray-400 italic">
                  Select a student to start chatting 💬
                </div>
              ) : (
                <>
                  {/* Chat Header */}
                  <div className="flex justify-between items-center bg-green-500 text-white px-6 py-3">
                    <h2 className="font-semibold text-lg">
                      {selectedStudent?.name}
                    </h2>
                    <span className="text-sm opacity-80">Active now</span>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                    {/* Incoming */}
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-green-200 text-green-700 rounded-full flex items-center justify-center font-bold">
                        {selectedStudent?.name?.charAt(0)}
                      </div>
                      <div className="bg-white shadow p-3 rounded-xl max-w-[70%]">
                        <p className="text-sm text-gray-800">
                          Hi, I have a question about the homework assignment.
                        </p>
                        <span className="text-xs text-gray-400">10:42 AM</span>
                      </div>
                    </div>

                    {/* Outgoing */}
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
                  <div className="flex items-center gap-2 p-4 border-t bg-white">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
                    >
                      <Send fontSize="small" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Topbar;
