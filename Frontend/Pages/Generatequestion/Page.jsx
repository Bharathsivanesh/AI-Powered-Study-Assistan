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

    // Animate fake progress
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 10 : p));
    }, 400);

    // Prepare form data for file upload
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      {/* LEFT SIDE - Upload Section */}
      <div className="w-3/4 p-10 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generate Study Questions
        </h1>
        <p className="text-gray-600 mb-8">
          Upload your syllabus and let AI generate topic-wise questions for you.
        </p>

        {/* Upload Box */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center shadow-sm mb-8">
          <Upload className="w-12 h-12 text-green-500 mb-3" />
          <p className="text-gray-600 mb-2">
            Drag & drop your file here or click to upload
          </p>
          <p className="text-sm text-gray-400 mb-4">
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
      {/* RIGHT SIDE - Generated Questions */}
      <div className="w-[40%] h-screen bg-white shadow-inner flex flex-col border-l border-gray-200 overflow-y-auto">
        {!isGenerating && progress === 100 && topics.length > 0 && (
          <motion.div
            className=" p-8 pt-6 flex-1 overflow-y-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GenerateQuestion;
