import React from "react";
import tick from "../../src/assets/check.png";
import Payment from "../../Components/Razorpatmodal";

const plans = [
  {
    name: "Free Plan",
    price: 0,
    duration: "Lifetime (Limited Access)",
    label: { text: "Starter Plan", color: "bg-green-100 text-green-600" },
    features: [
      "Upload syllabus/question papers 5 times per month",
      "Basic AI-generated answers",
      "Limited chatbot responses",
    ],
    buttonText: "Start Free",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Premium Plan",
    price: 199,
    duration: "Monthly Subscription",
    label: { text: "Most Popular", color: "bg-green-500 text-white" },
    features: [
      "Upload syllabus/question papers 10 times per month",
      "Full AI chatbot access",
      "Generate Q&A instantly",
      "Priority AI processing",
    ],
    buttonText: "Upgrade to Premium",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "Pro Plan",
    price: 999,
    duration: "Annual Access",
    label: { text: "Best Value", color: "bg-yellow-100 text-yellow-700" },
    features: [
      "Unlimited uploads and Q&A generations",
      "Repeated Question Analysis",
      "Mock Test Generator",
      "Exclusive access to new AI tools",
    ],
    buttonText: "Go Pro",
    buttonColor: "bg-green-500 hover:bg-green-600",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Choose the Best Plan for Your Smart Study Journey
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Upgrade anytime and unlock full AI-powered features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-green-500"
          >
            {/* Label */}
            <span
              className={`absolute top-2 left-2 text-xs font-semibold px-3 py-1 rounded-full ${plan.label.color}`}
            >
              {plan.label.text}
            </span>

            <h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2 text-gray-800">
              ₹ {plan.price}
            </p>
            <p className="text-gray-500 text-sm mb-4">{plan.duration}</p>

            {/* Features */}
            <ul className="text-gray-600 text-sm space-y-2 text-left">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <img src={tick} alt="check" className="w-5 h-5 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* <button
              className={`mt-6 w-full text-white py-2 rounded-lg transition ${plan.buttonColor}`}
            >
              {plan.buttonText}
            </button> */}
            <Payment amount={plan.price} name={plan.name}/>
          </div>
        ))}
      </div>
    </div>
  );
}
