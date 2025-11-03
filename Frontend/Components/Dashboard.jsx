import { Bell, User } from "lucide-react";

import FeatureCards from "./FeatureCards";
import AIHeroSection from "./Aiher0section";
import AnimatedBackground from "./AnimatedBackground";

function Dashboards() {
  return (
    <div className="min-h-screen overflow-y-auto  relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto  sm:px-6 lg:px-8 py-4">
        

          <AIHeroSection />

          <FeatureCards />
        </main>
      </div>
    </div>
  );
}

export default Dashboards;
