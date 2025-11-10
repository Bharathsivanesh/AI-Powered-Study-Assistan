import { motion } from "framer-motion";
import aii from "../src/assets/aii.png";

function AIHeroSection() {
  return (
    <div className="relative mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
       
        <motion.img
          src={aii}
          alt="AI Illustration"
          className="w-full md:w-1/2 "
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

       
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 mb-4">
            AI Learning Dashboard
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Transforming Education with Artificial Intelligence
          </h2>

          <motion.p
            className="text-lg text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Generate intelligent questions, analyze syllabus data, and gain
            personalized insights — all powered by AI.
          </motion.p>

        
          <motion.div
            className="mt-8 text-green-600 text-xl font-semibold tracking-wide"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            ⚡ AI in Action • Smarter Learning Every Day
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIHeroSection;
