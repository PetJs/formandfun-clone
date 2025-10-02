import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring animation for smooth trailing
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        backgroundColor: "#333",
        borderRadius: "50%",
        pointerEvents: "none", // let clicks pass through
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
