// export default Recommendation
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  LinearProgress,
  Avatar,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Recommendation = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const topics = [
    "DBMS",
    "Networks",
    "Algorithms",
    "Data Structures",
    "OS",
    "Comp. Arch.",
  ];
  const frequencies = [12, 20, 5, 15, 10, 8];

  const topQuestions = [
    "Explain normalization in DBMS.",
    "Differentiate between TCP and UDP.",
    "What is a binary search algorithm?",
    "Describe heap data structure.",
    "Explain the concept of virtual memory.",
  ];

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 3000);
  };

  const data = {
    labels: topics,
    datasets: [
      {
        label: "Question Frequency",
        data: frequencies,
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Question Frequency by Topic",
        color: "#22c55e",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: { ticks: { color: "#22c55e" } },
      y: { ticks: { color: "#22c55e" } },
    },
  };

  return (
    <Box className=" flex flex-col items-center ">
      {/* Header */}
      <Box className="w-full max-w-6xl flex justify-between items-center p-2">
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#22c55e" }}>
          StudySmart AI – Repeated Question Recommendation System
        </Typography>
        <Avatar sx={{ bgcolor: "#22c55e" }}>A</Avatar>
      </Box>

      {/* Upload Section */}
      <Card className="w-full max-w-6xl p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Upload Section
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload your past question papers and let our AI find recurring
          patterns for you. Upload 3+ papers for best results.
        </Typography>

        <Box className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#22c55e",
              borderColor: "#22c55e",
              // "&:hover": { borderColor: "#22c55e" , backgroundColor:"#22c55e"  },
            }}
          >
            Upload More
          </Button>
          <Button
            variant="contained"
            startIcon={<InsertDriveFileIcon />}
            onClick={handleUpload}
            sx={{
              backgroundColor: "#22c55e",
              // "&:hover": { backgroundColor: green[600] },
            }}
          >
            Process Files
          </Button>
        </Box>

        {analyzing && (
          <Box className="mt-6">
            <Typography color="text.secondary" gutterBottom>
              Analyzing... Finding patterns
            </Typography>
            <LinearProgress
              sx={{ height: 8, borderRadius: 5, bgcolor: "#e5e7eb" }}
              color="success"
            />
          </Box>
        )}
      </Card>

      {/* Graphs and Stats Section */}
      <Box className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <Card className="p-6 rounded-2xl shadow-md border border-gray-200">
          <Bar data={data} options={options} />
        </Card>

        {/* Top 5 Repeated Questions */}
        <Card className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col">
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#22c55e" }}
          >
            Top 5 Most Repeated Questions
          </Typography>
          <Box
            className="flex flex-col gap-3 mt-2 overflow-y-auto pr-2"
            style={{ maxHeight: "250px" }}
          >
            {topQuestions.map((q, i) => (
              <Box
                key={i}
                className="p-3 rounded-xl border border-gray-200 bg-green-50 flex items-start gap-2"
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  className="leading-snug"
                >
                  <span className="font-semibold text-green-500">
                    Q{i + 1}:
                  </span>{" "}
                  {q}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      {/* Footer Action */}
    </Box>
  );
};

export default Recommendation;
