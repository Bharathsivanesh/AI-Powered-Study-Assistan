import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload } from "lucide-react";
import { apiService } from "../../Services/Apicall";

const GenerateQuestion = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState({});

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

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
    } catch (error) {
      clearInterval(interval);
      setIsGenerating(false);
      alert(
        "Error generating questions: " +
          (error.response?.data?.detail || error.message)
      );
      console.error(error);
    }
  };

  const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    setQuestions(allQuestions[topic] || []);
  };

  const hasQuestions = topics.length > 0 && progress === 100;

  return (
    <div
      className={`min-h-screen flex ${
        hasQuestions ? "flex-row" : "items-start justify-center"
      }`}
    >
      {/* LEFT SIDE - Upload Section */}
      <div
        className={`${hasQuestions ? "w-3/5 p-10" : "w-full max-w-3xl p-10"}`}
      >
        <h1 className="text-3xl font-bold text-green-500 mb-2 text-center">
          Generate Study Questions
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Upload your syllabus and let AI generate topic-wise questions for you.
        </p>

        {/* Upload Box */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center shadow-sm mb-8">
          <Upload className="w-12 h-12 text-green-500 mb-3" />
          <p className="text-gray-600 mb-2 text-center">
            Drag & drop your file here or click to upload
          </p>
          <p className="text-sm text-gray-400 mb-4 text-center">
            Supports: PDF only. Max size: 10MB.
          </p>

          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileUpload} />
            <span className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
              Choose File
            </span>
          </label>

          {file && (
            <p className="text-sm text-green-700 mt-4 font-medium">
              Uploaded: {file.name}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - Generated Questions (only visible after success) */}
      {hasQuestions && (
        <motion.div
          className="w-[40%] h-screen bg-white shadow-inner flex flex-col border-l border-gray-200 overflow-y-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 pt-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
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

            <button className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl shadow-md flex items-center gap-2 w-full justify-center">
              <Download className="w-5 h-5" /> Download All
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GenerateQuestion;
