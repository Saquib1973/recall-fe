import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";

interface StaggerAnimationProps {
  children: ReactNode;
  staggerDuration?: number;
  delayDuration?: number;
  exitStaggerDuration?: number;
  staggerDirection?: 1 | -1;
  initial?: string;
  animate?: string;
  exit?: string;
}

const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDuration = 0.2,
  delayDuration = 0.2,
  exitStaggerDuration = 0.05,
  staggerDirection = 1,
  initial = "exit",
  animate = "enter",
  exit = "exit",
}) => {
  const variants: Variants = {
    enter: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delayDuration,
      },
    },
    exit: {
      transition: {
        staggerChildren: exitStaggerDuration,
        staggerDirection: staggerDirection,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default StaggerAnimation;