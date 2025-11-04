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
} from "@mui/material";
import { apiService } from "../Services/Apicall";
import Loader from "react-js-loader";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMsg = { from: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true); 

    try {
      const response = await apiService({
        endpoint: "/ai/ask",
        method: "POST",
        payload: { question: message },
      });

      const botMsg = {
        from: "bot",
        text: response.answer || "No response received",
      };
      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setChat((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error: Could not reach server." },
      ]);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
     
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
            {chat.length === 0 && !loading ? (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 10 }}
              >
                Start chatting with AI 🤖
              </Typography>
            ) : (
              <>
                {chat.map((msg, i) => (
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
                ))}

              
                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Loader
                      type="bubble-top"
                      bgColor={"#22C55E"}
                      color={"#22C55E"}
                      size={25}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>

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
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              variant="contained"
              disabled={loading}
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
