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
import {
  getCourses,
  updateCourseWithQA,
} from "../../Firebaseservices/CourseService";
import { Button, Card, CardContent, Grid, Modal, Box } from "@mui/material";
import { Download } from "lucide-react";

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
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    await FetchCourse();
  };

  const handleClose = () => setOpen(false);

  const FetchCourse = async () => {
    const response = await getCourses();
    console.log("Courses fetched:", response?.message);
    if (response.success) {
      alert("✅ Course added successfully!", response?.message);
      setMaterials(response?.message);
    } else {
      alert("❌ Failed to fetch course.");
    }
  };

  const handleSelectCourse = async (courseId) => {
    if (qaPairs.length === 0) {
      alert("⚠️ No Q&A pairs available to upload!");
      return;
    }

    try {
      const result = await updateCourseWithQA(courseId, qaPairs);
      if (result.success) {
        alert("✅ Q&A successfully added to course!");
        setOpen(false);
      } else {
        alert("❌ Failed to update course with Q&A.");
      }
    } catch (error) {
      console.error("Firestore update error:", error);
      alert("⚠️ Something went wrong while updating Firestore.");
    }
  };

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* UPLOAD SECTION */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-500 text-center md:text-left">
            Upload Question Image
          </h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Upload an image of your question paper, and our AI will generate
            smart question-answer pairs for you.
          </p>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 sm:p-10 cursor-pointer hover:border-green-500 transition bg-gray-50"
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "#22c55e" }} />
            <p className="text-gray-700 font-medium mt-2 text-center">
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

          {file && loading && (
            <div className="mt-6 w-full flex flex-col items-center">
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
                  "& .MuiLinearProgress-bar": { backgroundColor: "#22c55e" },
                  width: "100%",
                }}
              />
              <div className="flex justify-center mt-4">
                <CircularProgress size={30} sx={{ color: "#22c55e" }} />
              </div>
            </div>
          )}
        </div>

        {/* AI OUTPUT SECTION */}
        <div className="flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-500 text-center md:text-left">
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
            <button
              onClick={handleOpen}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-md flex items-center gap-2 justify-center mt-4 w-full sm:w-auto transition"
            >
              <Download className="w-5 h-5" />
              Upload Question & Answer
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: "bold",
              color: "#16a34a",
            }}
          >
            Select a Course to Attach PDF
          </Typography>

          <Grid container spacing={3}>
            {materials.length > 0 ? (
              materials.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      border: "1px solid #e5e7eb",
                      minWidth: 300,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-4px) scale(1.02)",
                        borderColor: "#16a34a",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#16a34a",
                          fontWeight: 700,
                          mb: 1,
                          letterSpacing: 0.3,
                        }}
                      >
                        {item.c_name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6b7280",
                          mb: 2,
                        }}
                      >
                        {item.createdAt}
                      </Typography>

                      <Button
                        variant="contained"
                        onClick={() => handleSelectCourse(item.C_ID)}
                        sx={{
                          textTransform: "none",
                          fontWeight: 600,
                          backgroundColor: "#16a34a",
                          borderRadius: 2,
                          px: 3,
                          "&:hover": { backgroundColor: "#15803d" },
                        }}
                      >
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                sx={{ textAlign: "center", color: "gray", width: "100%" }}
              >
                No courses found
              </Typography>
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
