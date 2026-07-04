import { useEffect, useRef, useCallback } from "react";

export default function ParticleOrbitEffect({
  className = "",
  particleCount = 25,
  radius = 70,
  particleSpeed = 0.025,
  radiusScale = 1.5,
  intensity = 1,
  fadeOpacity = 0.05,
  colorRange = [0, 360],
  disabled = false,
  followMouse = true,
  autoColors = true,
  particleSize = 2,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(undefined);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, radiusScale: 1 });
  const colorTimerRef = useRef(0);

  const generateColor = useCallback((hue) => {
    const h = hue ?? (colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]));
    return `hsl(${h}, 70%, 60%)`;
  }, [colorRange]);

  const createParticles = useCallback((initialX, initialY) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const hue = colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
      particles.push({
        size: particleSize,
        position: { x: initialX, y: initialY },
        offset: { x: 0, y: 0 },
        shift: { x: initialX, y: initialY },
        speed: particleSpeed + Math.random() * particleSpeed,
        targetSize: particleSize,
        fillColor: generateColor(hue),
        orbit: radius * 0.5 + radius * 0.5 * Math.random(),
        hue,
        trail: [],
      });
    }
    return particles;
  }, [particleCount, particleSpeed, particleSize, radius, generateColor, colorRange]);

  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouseRef.current.x = canvas.width / 2;
    mouseRef.current.y = canvas.height / 2;
    particlesRef.current = createParticles(mouseRef.current.x, mouseRef.current.y);
  }, [createParticles]);

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleMouseMove = (e) => {
      if (!followMouse) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => { mouseRef.current.isDown = true; };
    const handleMouseUp = () => { mouseRef.current.isDown = false; };

    const handleTouchMove = (e) => {
      if (!followMouse || e.touches.length === 0) return;
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 0) return;
      mouseRef.current.isDown = true;
      if (followMouse) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => { mouseRef.current.isDown = false; };

    const draw = () => {
      if (!context || !canvas) return;

      if (autoColors) {
        colorTimerRef.current += 0.016;
        if (colorTimerRef.current >= 2) {
          colorTimerRef.current = 0;
          particlesRef.current.forEach((p) => {
            p.hue = colorRange[0] + Math.random() * (colorRange[1] - colorRange[0]);
            p.fillColor = generateColor(p.hue);
          });
        }
      }

      const targetScale = mouseRef.current.isDown ? radiusScale : 1;
      mouseRef.current.radiusScale += (targetScale - mouseRef.current.radiusScale) * 0.02;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        p.offset.x += p.speed * intensity;
        p.offset.y += p.speed * intensity;

        p.shift.x += (mouseRef.current.x - p.shift.x) * p.speed * intensity;
        p.shift.y += (mouseRef.current.y - p.shift.y) * p.speed * intensity;

        const orbitR = p.orbit * mouseRef.current.radiusScale * intensity;
        p.position.x = p.shift.x + Math.cos(i + p.offset.x) * orbitR;
        p.position.y = p.shift.y + Math.sin(i + p.offset.y) * orbitR;

        p.position.x = Math.max(0, Math.min(p.position.x, canvas.width));
        p.position.y = Math.max(0, Math.min(p.position.y, canvas.height));

        p.trail.push({ x: p.position.x, y: p.position.y, alpha: 1 });

        const maxTrail = Math.max(5, Math.floor(40 * intensity));
        if (p.trail.length > maxTrail) p.trail.shift();

        p.trail.forEach((pt, idx) => {
          pt.alpha = ((idx + 1) / p.trail.length) * fadeOpacity * 20;
        });

        if (p.trail.length > 1) {
          for (let j = 1; j < p.trail.length; j++) {
            const prev = p.trail[j - 1];
            const curr = p.trail[j];
            context.beginPath();
            context.strokeStyle = p.fillColor;
            context.lineWidth = p.size * 0.3 * curr.alpha;
            context.globalAlpha = curr.alpha;
            context.moveTo(prev.x, prev.y);
            context.lineTo(curr.x, curr.y);
            context.stroke();
          }
        }

        p.size += (p.targetSize - p.size) * 0.05;
        if (Math.abs(p.size - p.targetSize) < 0.1) {
          p.targetSize = particleSize + Math.random() * particleSize * 2;
        }

        context.beginPath();
        context.fillStyle = p.fillColor;
        context.globalAlpha = 0.9;
        context.arc(p.position.x, p.position.y, p.size * 0.5, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    updateCanvasDimensions();

    window.addEventListener("resize", updateCanvasDimensions);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", updateCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    disabled, followMouse, particleCount, radius, particleSpeed,
    radiusScale, intensity, fadeOpacity, colorRange, autoColors,
    particleSize, updateCanvasDimensions, createParticles, generateColor,
  ]);

  if (disabled) return null;

  return (
    <div className={`fixed top-0 left-0 z-[99999] pointer-events-none w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-screen h-screen block" aria-hidden="true" />
    </div>
  );
}
