import { motion } from "framer-motion";
import React from "react";
import "./GlassPanel.css"; // Ensure you have a CSS file for the styles

const GlassPanel = () => {
  const containerVariants = {
    // Define the initial state of the animation
    initial: {
      backgroundPosition: "0% 50%",
    },
    // Define the animation properties
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%"],
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className="glass-panel-container">
      <motion.div
        className="glass-panel"
        variants={containerVariants}
        initial="initial"
        animate="animate">
        <p className="loading-text">Loading...</p>
      </motion.div>
    </div>
  );
};

export default GlassPanel;
