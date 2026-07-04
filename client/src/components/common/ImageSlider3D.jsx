import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const TEAM_IMAGES = [
  { src: "https://i.pravatar.cc/600?img=32", name: "Chadrack" },
  { src: "https://i.pravatar.cc/600?img=47", name: "Mak VieSAinte" },
  { src: "https://i.pravatar.cc/600?img=53", name: "Osiris Balonga" },
  { src: "https://i.pravatar.cc/600?img=68", name: "Jacques" },
  { src: "https://i.pravatar.cc/600?img=59", name: "Riche Makso" },
  { src: "https://i.pravatar.cc/600?img=16", name: "Jemima" },
];

export default function ImageSlider3D({
  images = TEAM_IMAGES,
  duration = 28,
  cardWidth = "14em",
  cardAspectRatio = "3/4",
  perspective = "30em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
  linkTo,
}) {
  const n = images.length;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
        WebkitMask:
          "linear-gradient(90deg, transparent, #000 8% 92%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 8% 92%, transparent)",
      }
    : {};

  const renderCard = (img, i) => (
    <div
      key={i}
      className={`col-start-1 row-start-1 rounded-2xl overflow-hidden shadow-2xl ${imageClassName}`}
      style={{
        width: cardWidth,
        aspectRatio: cardAspectRatio,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
      }}
    >
      <img
        src={img.src}
        alt={img.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-10">
        <p className="text-white text-sm font-semibold font-sans tracking-wide">
          {img.name}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className={`grid w-full h-full min-h-[580px] overflow-hidden place-items-center ${containerClassName}`}
      style={{
        perspective: perspective,
        ...maskStyles,
      }}
    >
      <motion.div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: rotationValues,
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {images.map((img, i) =>
          linkTo ? (
            <Link key={i} to={linkTo(img, i)} className="contents">
              {renderCard(img, i)}
            </Link>
          ) : (
            renderCard(img, i)
          )
        )}
      </motion.div>
    </div>
  );
}
