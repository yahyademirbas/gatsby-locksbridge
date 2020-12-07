import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Transition = ({ children, location }) => {
  const duration = 0.5;
  const Cubic = [0.25, 0.1, 0.25, 1.0];
  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: duration,
        delay: duration,
        when: "beforeChildren",
        ease: Cubic
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: duration, ease: Cubic }
    }
  };

  return (
    <AnimatePresence>
      <motion.main
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        id="main"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default Transition;
