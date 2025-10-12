// PaymentComponent.jsx
import React from "react";

export default function Payment({ amount, name }) {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_RSRpmL1CvBHd8o", 
      amount: parseInt(amount * 100), 
      currency: "INR",
      name: "AI-Powered Study Assistant",
      description: "Plan Payment",
      image:
        "https://dpcdkpodnbtmwamkpqwv.supabase.co/storage/v1/object/public/Hostep-attendence/profile.jpg",
      handler: function (response) {
        console.log("Payment successful:", response);
        alert("✅ Payment Successful!");
      },
      prefill: {
        name: "Bharath Sivanesh",
        email: "bharathsivanesh@gmail.com",
        contact: "9025368695",
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#158993", // greenish theme
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
   
      <button
        className="mt-6 w-full text-white py-2 rounded-lg transition bg-green-500 hover:bg-green-600"
        onClick={pay}
      >
        {name}
      </button>

  );
}
