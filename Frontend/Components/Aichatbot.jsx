import React, { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";
import {
  Box,
  Fab,
  Modal,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    console.log("User:", message);
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

  
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="chatbot-modal"
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 24,
            width: 340,
            height: 450,
            backgroundColor: "#22C55E",
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

          {/* Chat Messages Section */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "#f9f9f9",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 12 }}
            >
              Chat with AI 🤖
            </Typography>
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
              }}
            >
              Send
            </Button>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default ChatBot;
