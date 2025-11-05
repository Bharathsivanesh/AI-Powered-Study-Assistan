import React, { useState } from "react";
import {
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { apiService } from "../../Services/Apicall";

export default function SolveAi() {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qaPairs, setQaPairs] = useState([]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;


    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Only image files (jpg, jpeg, png) are allowed!");
      return;
    }

    setFile(selectedFile);
    setLoading(true);
    setProgress(0);
    setQaPairs([]);


    let value = 0;
    const interval = setInterval(() => {
      value += 10;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 300);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await apiService({
        endpoint: "/qa/upload",
        method: "POST",
        payload: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onSuccess: (data) => {
          console.log("✅ QA generated successfully:", data);
        },
        onError: (error) => {
          console.error("❌ Upload failed:", error);
        },
      });

      setTimeout(() => {
        setLoading(false);
        setQaPairs(response.qa_pairs || []);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            Upload Question Image
          </h2>
          <p className="text-gray-600 mb-6">
            Upload an image of your question paper, and our AI will generate
            smart question-answer pairs for you.
          </p>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-green-500 transition bg-gray-50"
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "#22c55e" }} />
            <p className="text-gray-700 font-medium mt-2">
              {file ? file.name : "Drag and drop your image here"}
            </p>
            <span className="mt-2 text-green-500 underline font-medium">
              Browse Files
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <div className="mt-6 w-full">
              {loading && (
                <>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Analyzing your image...
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
                    <CircularProgress size={30} sx={{ color: "#22c55e" }} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            AI Answer Generation Output
          </h2>

          <div
            className="overflow-y-auto pr-2"
            style={{ maxHeight: "500px", scrollbarWidth: "thin" }}
          >
            {qaPairs.length > 0 ? (
              qaPairs.map((item, index) => (
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
                      Question {index + 1}: {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography color="text.secondary">
                Upload an image to generate Q&A pairs.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
