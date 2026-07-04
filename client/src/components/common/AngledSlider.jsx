import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Link } from "react-router-dom";

export default function AngledSlider({
  items,
  speed = 40,
  direction = "left",
  containerHeight = "420px",
  cardWidth = "300px",
  gap = "40px",
  angle = 20,
  hoverScale = 1.05,
  className = "",
}) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef(null);

  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const calcWidth = () => {
      const w = parseInt(cardWidth) || 300;
      const g = parseInt(gap) || 40;
      setSliderWidth((w + g) * items.length);
    };
    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, [items.length, cardWidth, gap]);

  useEffect(() => {
    if (sliderWidth <= 0 || isHovered) return;

    const startX = direction === "left" ? 0 : -sliderWidth;
    const endX = direction === "left" ? -sliderWidth : 0;

    const currentX = x.get();
    const dist = Math.abs(endX - currentX);
    const duration = speed * (dist / sliderWidth);

    const anim = animate(x, endX, {
      duration: Math.max(duration, 0.1),
      ease: "linear",
      onComplete: () => {
        x.set(startX);
      },
    });

    return () => anim.stop();
  }, [sliderWidth, speed, direction, isHovered, x]);

  return (
    <div
      className={`relative w-full overflow-hidden py-6 ${className}`}
      style={{
        height: containerHeight,
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex items-center h-full"
        style={{ x, gap, transformStyle: "preserve-3d" }}
      >
        {duplicatedItems.map((item, index) => (
          <AngledCard
            key={`${item.id}-${index}`}
            item={item}
            angle={angle}
            hoverScale={hoverScale}
            cardWidth={cardWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}

function AngledCard({ item, angle, hoverScale, cardWidth }) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className="relative flex-shrink-0 group overflow-visible cursor-pointer"
      style={{
        width: cardWidth,
        height: "100%",
        transformStyle: "preserve-3d",
      }}
      animate={
        isHovered
          ? { rotateY: 0, z: 120, opacity: 1, scale: hoverScale, zIndex: 50 }
          : { rotateY: angle, z: 60, opacity: 0.9, scale: 1, zIndex: 30 }
      }
      transition={{ type: "spring", mass: 3, stiffness: 400, damping: 50 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden border border-white/10 bg-cream-100 min-h-[260px] shadow-2xl rounded-2xl">
        <img
          src={item.url}
          alt={item.alt || ""}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="font-serif text-lg font-bold">{item.title}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (item.to) {
    return <Link to={item.to} className="h-full block">{content}</Link>;
  }

  return content;
}
