import React, { useState } from "react";
import FormInput from "../../Components/InputFields";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const SignUpCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add signup logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>
        <p className="text-gray-500 text-center mb-6">
          Sign up for your Study Assistant
        </p>

        <div className="flex flex-col gap-4">
          <FormInput
            type="text"
            label="Full Name"
            value={formData.name}
            onChange={handleChange("name")}
             variant="standard"
            color="success"
          />
          <FormInput
            type="email"
            label="Email address"
            value={formData.email}
              variant="standard"
            color="success"
            onChange={handleChange("email")}
            
          />
          <FormInput
            type="password"
            label="Password"
              variant="standard"
            color="success"
            value={formData.password}
            onChange={handleChange("password")}
           
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#22C55E",
              "&:hover": { backgroundColor: "#16A34A" },
              color: "#fff",
              borderRadius: "0.5rem",
              paddingY: 1,
              fontWeight: 500,
              marginTop: 2,
            }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpCard;
