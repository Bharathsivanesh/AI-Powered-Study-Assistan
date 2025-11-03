import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload } from "lucide-react";

const GenerateQuestion = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsGenerating(true);
      setProgress(0);

      let current = 0;
      const interval = setInterval(() => {
        current += 10;
        setProgress(current);
        if (current >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row">
      {/* LEFT SIDE - Upload Section */}
      <div className="w-3/4 p-10 flex flex-col ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generate Study Questions
        </h1>
        <p className="text-gray-600 mb-8">
          Upload your question papers and let our AI generate study questions
          for you.
        </p>

        {/* Upload Box */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center shadow-sm mb-8">
          <Upload className="w-12 h-12 text-green-500 mb-3" />
          <p className="text-gray-600 mb-2">
            Drag & drop your file here or click to upload
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Supports: PDF, DOCX, PNG, JPG. Max size: 10MB.
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

      {/* RIGHT SIDE */}
      <div className="w-[30%] bg-white shadow-inner flex flex-col border-l border-gray-200 ">
        
        <div className="flex flex-col items-center justify-center text-center mb-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Not Ready to Upload?
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Try a sample set of AI-generated questions.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Download className="w-4 h-4" /> Sample Questions
          </button>
        </div>

      
        {!isGenerating && progress === 100 && (
          <motion.div
            className="bg-gray-50 border-t border-gray-200 mt-6  p-8 pt-6 flex-1 overflow-y-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
              Generated Questions
            </h2>

            <select className="border border-gray-300 rounded-lg p-2 mb-4 w-full text-gray-700 focus:outline-none">
              <option>Choose Topic</option>
              <option>AI Fundamentals</option>
              <option>Machine Learning</option>
              <option>Data Structures</option>
            </select>

            <ul className="list-decimal list-inside text-gray-700 space-y-2 text-sm">
              <li>Explain the concept of supervised learning.</li>
              <li>What are the types of neural networks?</li>
              <li>How does reinforcement learning work?</li>
              <li>Differentiate between AI and ML.</li>
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
