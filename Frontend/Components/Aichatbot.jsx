import React, { useState } from "react";
import { Bot, Send } from "lucide-react";
import {
  Box,
  Fab,
  Modal,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setChat((prev) => [...prev, { from: "user", text: message }]);

    // Example AI response
    setTimeout(() => {
      setChat((prev) => [...prev, { from: "bot", text: "Hello! How can I help?" }]);
    }, 700);

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <Fab
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#22C55E",
          boxShadow: 4,
          "&:hover": {
            backgroundColor: "#16A34A",
            transform: "scale(1.1)",
          },
        }}
      >
        <Bot size={24} color="white" />
      </Fab>

      {/* Chat Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 24,
            width: 360,
            height: 500,
            backgroundColor: "#ffffff",
            borderRadius: 3,
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#22C55E",
              color: "white",
              p: 2,
              textAlign: "center",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            AI Chat Bot 🤖
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {chat.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 10 }}
              >
                Start chatting with AI 🤖
              </Typography>
            ) : (
              chat.map((msg, i) => (
                <Paper
                  key={i}
                  elevation={1}
                  sx={{
                    p: 1.2,
                    maxWidth: "75%",
                    alignSelf:
                      msg.from === "user" ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.from === "user" ? "#DCFCE7" : "#E5E7EB",
                    borderRadius: 2,
                    borderTopRightRadius: msg.from === "user" ? 0 : 2,
                    borderTopLeftRadius: msg.from === "bot" ? 0 : 2,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              ))
            )}
          </Box>

          {/* Input Section */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              borderTop: "1px solid #e0e0e0",
            }}
            elevation={0}
          >
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handleSend}
              variant="contained"
              sx={{
                ml: 1.5,
                bgcolor: "#22C55E",
                "&:hover": { bgcolor: "success.dark" },
                minWidth: 0,
              }}
            >
              <Send size={18} />
            </Button>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default ChatBot;
