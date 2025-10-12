// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginCard from "../Pages/Onboarding/Login";
import SignUpCard from "../Pages/Onboarding/Sigin";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AiAssistent from "../Pages/AiAssistent/Page";
import GenerateQuestion from "../Pages/Generatequestion/Page";
import Profile from "../Pages/Profile/Page";
import SolveAi from "../Pages/SolvewithAi/Page";
import PricingPage from "../Pages/Payment/Page";
import Recommendation from "../Pages/Recommendation/Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/sigin" element={<SignUpCard />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index  element={<Dashboard />} />
          <Route path="AiAssistent" element={<AiAssistent />} />
          <Route path="GenerateQuestion" element={<GenerateQuestion />} />
          <Route path="PricingPage" element={<PricingPage />} />
          <Route path="Profile" element={<Profile />} />
           <Route path="SolveAi" element={<SolveAi />} />
           <Route path="Recommendation" element={<Recommendation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
