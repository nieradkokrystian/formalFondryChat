import { motion } from "framer-motion";
import "./GlassPanel.css";

const GlassPanel = () => {
  const containerVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },

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
        animate="animate"
      >
        <p className="loading-text">Loading...</p>
      </motion.div>
    </div>
  );
};

export default GlassPanel;
