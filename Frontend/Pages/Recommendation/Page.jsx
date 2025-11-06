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
import { apiService } from "../../Services/Apicall";

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
  const [topics, setTopics] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [topQuestions, setTopQuestions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please upload at least one image file.");
      return;
    }

    setAnalyzing(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      await apiService({
        endpoint: "/analyze/upload",
        method: "POST",
        payload: formData,
        onSuccess: (data) => {
          console.log("✅ API Success:", data);
          const result = data.analysis || {};
          setTopics(result.topics || []);
          setFrequencies(result.frequencies || []);
          setTopQuestions(result.topQuestions || []);
        },
        onError: (err) => console.error("❌ API Error:", err),
      });
    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const data = {
    labels: topics,
    datasets: [
      {
        label: "Topic Frequency",
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
        text: "Topic Frequency Analysis",
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
    <Box className="flex flex-col items-center">
      
      <Box className="w-full max-w-6xl flex justify-between items-center py-6">
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#22c55e" }}>
          StudySmart AI – Repeated Question Analyzer
        </Typography>
        <Avatar sx={{ bgcolor: "#22c55e" }}>A</Avatar>
      </Box>

      <Card className="w-full max-w-6xl p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Upload Images
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Upload multiple images of question papers or study materials. Our AI
          will detect frequent topics and questions.
        </Typography>

        <Box className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              component="span"
              sx={{
                color: "#22c55e",
                borderColor: "#22c55e",
              }}
            >
              Choose Images ({selectedFiles.length})
            </Button>
          </label>

          <Button
            variant="contained"
            startIcon={<InsertDriveFileIcon />}
            onClick={handleUpload}
            sx={{
              backgroundColor: "#22c55e",
            }}
          >
            Analyze Files
          </Button>
        </Box>

        {analyzing && (
          <Box className="mt-6">
            <Typography color="text.secondary" gutterBottom>
              Analyzing... Extracting key topics and repeated questions
            </Typography>
            <LinearProgress
              sx={{
                height: 8,
                borderRadius: 5,
                bgcolor: "#e5e7eb",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#22c55e",
                },
              }}
            />
          </Box>
        )}
      </Card>

      {topics.length > 0 && (
        <Box className="w-full max-w-6xl grid md:grid-cols-2 gap-6">
          {/* Chart Section */}
          <Card className="p-6 rounded-2xl shadow-md border border-gray-200">
            <Bar data={data} options={options} />
          </Card>

          {/* Top Repeated Questions */}
          <Card className="p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col">
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#22c55e" }}
            >
              Top Repeated Questions
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
      )}
    </Box>
  );
};

export default Recommendation;
