import React, { useState } from "react";
import FormInput from "../../Components/InputFields";
import GoogleIcon from "../../src/assets/google.png";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const router = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to your Study Assistant
        </p>

        <div className="flex flex-col gap-4">
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
            value={formData.password}
            variant="standard"
            color="success"
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
            onClick={() => router("/dashboard")}
          >
            Login
          </Button>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
          <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/sigin"
            className="text-green-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;
