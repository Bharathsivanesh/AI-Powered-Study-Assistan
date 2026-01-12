import React from "react";
import { Modal, Box } from "@mui/material";

const Loader = ({ visible }) => {
  if (!visible) return null;

  return (
    <Modal
      open={visible}
      aria-labelledby="loader-modal"
      sx={{ backdropFilter: "blur(2px)" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            border: "12px solid",
            borderColor: "#22C55E white white #22C55E",
            position: "absolute",
            animation: "spin 1.2s linear infinite",
          }}
        />

        <Box
          component="img"
          src="/ai.jpg"
          alt="Logo"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "contain",
            zIndex: 1,
          }}
        />

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </Box>
    </Modal>
  );
};

export default Loader;
