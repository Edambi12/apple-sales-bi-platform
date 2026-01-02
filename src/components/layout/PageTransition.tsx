import { motion, type Variants, type Transition } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const smoothEase = [0.16, 1, 0.3, 1] as const;

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
  },
};

const pageTransition: Transition = {
  duration: 0.5,
  ease: smoothEase,
};

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation wrapper
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({ children, className, delay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.08,
        delayChildren: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div 
      variants={staggerItemVariants} 
      transition={{ duration: 0.6, ease: smoothEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade in on scroll
interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInView({ children, className, delay = 0 }: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: smoothEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale in animation
export function ScaleInView({ children, className, delay = 0 }: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: smoothEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from side
interface SlideInViewProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
}

export function SlideInView({ children, className, direction = "left", delay = 0 }: SlideInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: smoothEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}