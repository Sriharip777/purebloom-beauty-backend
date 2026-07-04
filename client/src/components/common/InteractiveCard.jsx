import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";

export default function InteractiveCard({
  children,
  className = "",
  glowColor = "#F4C6CE",
  borderRadius = "1rem",
  rotationFactor = 0.3,
  shadow = true,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXTrans = useTransform(y, [0, 1], [rotationFactor * 15, -rotationFactor * 15]);
  const rotateYTrans = useTransform(x, [0, 1], [-rotationFactor * 15, rotationFactor * 15]);

  const handlePointerMove = (e) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (e.clientX - bounds.left) / bounds.width;
    const py = (e.clientY - bounds.top) / bounds.height;
    x.set(px);
    y.set(py);
  };

  const xPercentage = useTransform(x, (val) => `${val * 100}%`);
  const yPercentage = useTransform(y, (val) => `${val * 100}%`);
  const interactiveBg = useMotionTemplate`radial-gradient(circle at ${xPercentage} ${yPercentage}, ${glowColor} 0%, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{ perspective: 1000, borderRadius }}
      className={`relative isolate ${className}`}
    >
      <motion.div
        style={{
          rotateX: rotateXTrans,
          rotateY: rotateYTrans,
          transformStyle: "preserve-3d",
          borderRadius,
        }}
        transition={{ type: "spring", mass: 2, stiffness: 300, damping: 30 }}
        className={`w-full h-full overflow-hidden ${shadow ? 'shadow-lg hover:shadow-2xl' : ''} transition-shadow duration-300`}
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: interactiveBg,
            opacity: isHovered ? 0.5 : 0,
            transition: "opacity 0.3s ease",
            borderRadius,
          }}
        />
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
