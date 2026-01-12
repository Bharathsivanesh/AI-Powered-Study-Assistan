import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload } from "lucide-react";
import { apiService } from "../../Services/Apicall";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getCourses,
  uploadPDFToCourse,
} from "../../Firebaseservices/CourseService";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import Loader from "../../Components/Loader";
import { showToast } from "../../Components/Notification";

const GenerateQuestion = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const fileInputRef = useRef();
  const [allQuestions, setAllQuestions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setLoading(true);
    setFile(uploadedFile);
    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 10 : p));
    }, 400);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      const data = await apiService({
        endpoint: "/questions/upload",
        method: "POST",
        payload: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(interval);
      setProgress(100);
      setIsGenerating(false);

      const parsedData = data.questions.questions;
      const topicKeys = Object.keys(parsedData);
      setTopics(topicKeys);
      setSelectedTopic(topicKeys[0]);
      setAllQuestions(parsedData);
      setQuestions(parsedData[topicKeys[0]]);
      setLoading(false);
      showToast("The Questions Is Generated Successfully!", "success");
    } catch (error) {
      clearInterval(interval);
      setIsGenerating(false);

      showToast(
        "Error generating questions: " +
          (error?.response?.data?.detail || error?.message),
        "error"
      );

      setLoading(false);
    }
  };

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    setQuestions(allQuestions[topic] || []);
  };

  const hasQuestions = topics.length > 0 && progress === 100;

  const handleDownloadSelected = () => {
    if (!selectedTopic || questions.length === 0) {
      alert("No questions available to download!");
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Generated Questions", 20, 20);

    // Topic Title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Topic: ${selectedTopic}`, 20, 35);

    // Questions Table
    const formattedQuestions = questions.map((q, i) => [`${i + 1}. ${q}`]);

    autoTable(doc, {
      startY: 45,
      head: [["Questions"]],
      body: formattedQuestions,
      styles: { fontSize: 11, cellPadding: 5 },
      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
      },
    });

    doc.save(`${selectedTopic.replace(/\s+/g, "_")}_Questions.pdf`);
  };

  // ✅ Download all topics + questions
  const handleDownloadAll = () => {
    if (Object.keys(allQuestions).length === 0) {
      alert("No questions available to download!");
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Generated Questions - All Topics", 20, 20);

    let y = 35;

    Object.entries(allQuestions).forEach(([topic, qns], index) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`${index + 1}. ${topic}`, 20, y);
      y += 10;

      const formattedQuestions = qns.map((q, i) => [`${i + 1}. ${q}`]);

      autoTable(doc, {
        startY: y,
        head: [["Questions"]],
        body: formattedQuestions,
        styles: { fontSize: 11, cellPadding: 5 },
        headStyles: {
          fillColor: [34, 197, 94],
          textColor: 255,
          halign: "center",
        },
      });

      y = doc.lastAutoTable.finalY + 15;
    });

    doc.save("All_Topics_Questions.pdf");
  };

  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    await FetchCourse();
  };

  const handleClose = () => setOpen(false);

  const FetchCourse = async () => {
    setLoading(true);
    const response = await getCourses();
    console.log("Courses fetched:", response?.message);
    if (response.success) {
      setMaterials(response?.message);
      showToast("Courses fetched successfully!", "success");
    } else {
      showToast("Failed to fetch courses", "error");
    }
    setLoading(false);
  };

  const handleFileChange = async (event, courseId) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const result = await uploadPDFToCourse(file, courseId);
      if (result.success) {
        showToast("PDF uploaded successfully!", "success");
      } else {
        showToast("Error uploading PDF", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("❌ Error uploading PDF", "error");
    } finally {
      if (setOpen) setOpen(false);
      setLoading(false);
    }
  };
  const handleSelectCourse = (courseId) => {
    fileInputRef.current.click();

    fileInputRef.current.onchange = (event) =>
      handleFileChange(event, courseId);
  };
  return (
    <>
      <Loader visible={loading} />
      <div
        className={`min-h-screen flex flex-col md:flex-row ${
          hasQuestions ? "md:flex-row" : "items-start justify-center"
        }`}
      >
        {/* Hidden file input */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        {/* LEFT SIDE - Upload Section */}
        <div
          className={`${
            hasQuestions ? "md:w-3/5" : "w-full max-w-3xl"
          } p-6 md:p-10 mx-auto md:mx-0`}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2 text-center md:text-left">
            Generate Study Questions
          </h1>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            Upload your syllabus and let AI generate topic-wise questions for
            you.
          </p>

          {/* Upload Box */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center shadow-sm mb-6">
            <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mb-3" />
            <p className="text-gray-600 mb-2 text-center">
              Drag & drop your file here or click to upload
            </p>
            <p className="text-sm text-gray-400 mb-4 text-center">
              Supports: PDF only. Max size: 10MB.
            </p>

            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
              <span className="bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg shadow hover:bg-green-700 transition text-sm sm:text-base">
                Choose File
              </span>
            </label>

            {file && (
              <p className="text-sm text-green-700 mt-4 font-medium text-center">
                Uploaded: {file.name}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
              <div
                className="bg-green-500 h-3 sm:h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          <button
            onClick={handleOpen}
            className="bg-green-500 mt-4 md:mt-0 hover:bg-green-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-xl shadow-md flex items-center gap-2 justify-center transition w-full md:w-auto"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Upload PDF questions
            To Course
          </button>
        </div>

        {/* RIGHT SIDE - Generated Questions */}
        {hasQuestions && (
          <motion.div
            className="w-full md:w-2/5 h-auto md:h-screen bg-white shadow-inner flex flex-col border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 md:p-8 flex-1 overflow-y-auto">
              <h2 className="text-xl font-semibold text-green-700 mb-4 text-center md:text-left">
                Generated Questions
              </h2>

              {/* Topic Dropdown */}
              <select
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-gray-700 focus:outline-none"
                value={selectedTopic}
                onChange={handleTopicChange}
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>

              {/* Questions List */}
              <ul className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
                {questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleDownloadSelected}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-xl shadow-md flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Download
                  Selected Topic
                </button>

                <button
                  onClick={handleDownloadAll}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-xl shadow-md flex items-center gap-2 justify-center w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" /> Download All
                  Topics
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal for selecting course */}
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
                          sx={{ color: "#6b7280", mb: 2 }}
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
    </>
  );
};

export default GenerateQuestion;
