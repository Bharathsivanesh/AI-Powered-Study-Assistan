import React from "react";

function FeatureCards() {
  const features = [
    {
      image: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 4h16v12H4z" />
          <path d="M6 16h12M8 20h8M12 20v0" />
          <path d="M9 7l2-2 2 2M9 10l2-2 2 2" />
        </svg>
      ),
      title: "Upload Syllabus",
      description: "Upload your syllabus file to generate questions easily.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      image: (
        <svg
          className="w-12 h-12 animate-pulse-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
          <path d="M9 13h6M9 17h6" />
        </svg>
      ),
      title: "Generate Questions",
      description: "AI will create smart questions from uploaded syllabus.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      image: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      title: "Download Questions",
      description: "Download your generated questions in PDF format.",
      gradient: "from-emerald-400 to-green-600",
    },
    {
      image: (
        <svg
          className="w-12 h-12 animate-float"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 8v8M8 12h8" />
          <circle cx="12" cy="12" r="9" />
          <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20" />
        </svg>
      ),
      title: "AI Chatbot",
      description: "Chat with the AI to get instant help and answers.",
      gradient: "from-green-400 to-lime-500",
    },
    {
      image: (
        <svg
          className="w-12 h-12 animate-spin-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24" />
        </svg>
      ),
      title: "Answer from Upload",
      description: "Upload questions to get AI-generated answers.",
      gradient: "from-teal-400 to-green-500",
    },
    {
      image: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <circle cx="18" cy="15" r="1.5" />
        </svg>
      ),
      title: "Price Model",
      description: "Manage your plan and payments with Razorpay.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      image: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "My Profile",
      description: "View and edit your personal details.",
      gradient: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-green-200 cursor-pointer animate-card-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`h-40 bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500`}
          >
            <div className="absolute inset-0 opacity-10">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id={`pattern-${index}`}
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#pattern-${index})`} />
              </svg>
            </div>
            <div className="text-white relative z-10 transform group-hover:scale-125 transition-transform duration-300">
              {feature.image}
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
              {feature.title}
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>

            <div className="mt-4 flex items-center text-green-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Learn more</span>
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;
