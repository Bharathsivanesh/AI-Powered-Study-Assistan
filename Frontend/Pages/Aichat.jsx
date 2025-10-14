import React, { useState } from "react";
import {
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
//dummy test
export default function SolveAi() {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLoading(true);
      setProgress(0);
      setShowChart(false);

      // Simulate AI analysis progress
      let value = 0;
      const interval = setInterval(() => {
        value += 10;
        setProgress(value);
        if (value >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowChart(true);
        }
      }, 400);
    }
  };

  // Pie chart data (AI-analyzed category share)
  const pieData = {
    labels: ["DBMS", "Networks", "OS", "AI", "Algorithms", "Data Structures"],
    datasets: [
      {
        label: "Question Share",
        data: [30, 25, 15, 10, 12, 8],
        backgroundColor: [
          "#22c55e", // green-500
          "#16a34a", // green-600
          "#4ade80", // green-400
          "#86efac", // green-300
          "#bbf7d0", // green-200
          "#dcfce7", // green-100
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 13 },
        },
      },
      title: {
        display: true,
        text: "AI-Detected Question Category Share",
        color: "#22c55e",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Upload / Chart Section */}
        <div className="flex flex-col">
          {!showChart && (
            <>
              <h2 className="text-3xl font-bold mb-4 text-green-500">
                Upload Question Paper
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your question paper to let our AI analyze question
                patterns and provide smart topic-based insights.
              </p>

              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-green-500 transition bg-gray-50"
              >
                <CloudUploadIcon sx={{ fontSize: 48, color: "#22c55e" }} />
                <p className="text-gray-700 font-medium mt-2">
                  {file ? file.name : "Drag and drop your PDF here"}
                </p>
                <span className="mt-2 text-green-500 underline font-medium">
                  Browse Files
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}

          {/* Loader / Chart Section */}
          {file && (
            <div className="mt-6 w-full">
              {loading ? (
                <>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Analyzing your document...
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#dcfce7",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#22c55e",
                      },
                    }}
                  />
                  <div className="flex justify-center mt-4">
                    <CircularProgress
                      size={30}
                      sx={{ color: "#22c55e" }}
                      thickness={5}
                    />
                  </div>
                </>
              ) : (
                showChart && (
                  <Card
                    sx={{
                     
                      borderRadius: 3,
                   
                      backgroundColor: "#f9fafb",
                      boxShadow: 2,
                    }}
                  >
                    <CardContent>
                      <Pie data={pieData} options={pieOptions} />
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            AI Answer Generation Output
          </h2>

          <div
            className="overflow-y-auto pr-2"
            style={{
              maxHeight: "500px",
              scrollbarWidth: "thin",
            }}
          >
            {[
              {
                q: "What are the key differences between supervised and unsupervised learning?",
              },
              {
                q: "Explain the concept of gradient descent in neural networks.",
              },
              {
                q: "Describe the role of activation functions in neural networks.",
              },
              {
                q: "What is overfitting and how can it be prevented in machine learning models?",
              },
              {
                q: "Explain the difference between batch gradient descent and stochastic gradient descent.",
              },
              { q: "What are CNNs and how do they work in image processing?" },
              { q: "Differentiate between precision and recall in AI models." },
            ].map((item, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  boxShadow: "none",
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#22c55e" }} />}
                  sx={{
                    backgroundColor: "#f9fafb",
                    "& .MuiTypography-root": { fontWeight: 500 },
                  }}
                >
                  <Typography variant="subtitle1" color="text.primary">
                    Question {index + 1}: {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    This is where the AI-generated answer will appear once the
                    document is analyzed.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
