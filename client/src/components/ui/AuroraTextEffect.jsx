import { useEffect, useRef } from 'react';

const keyframes = `
  @keyframes aurora-1 {
    0% { top: 0; right: 0; }
    50% { top: 100%; right: 75%; }
    75% { top: 100%; right: 25%; }
    100% { top: 0; right: 0; }
  }
  @keyframes aurora-2 {
    0% { top: -50%; left: 0%; }
    60% { top: 100%; left: 75%; }
    85% { top: 100%; left: 25%; }
    100% { top: -50%; left: 0%; }
  }
  @keyframes aurora-3 {
    0% { bottom: 0; left: 0; }
    40% { bottom: 100%; left: 75%; }
    65% { bottom: 40%; left: 50%; }
    100% { bottom: 0; left: 0; }
  }
  @keyframes aurora-4 {
    0% { bottom: -50%; right: 0; }
    50% { bottom: 0%; right: 40%; }
    90% { bottom: 50%; right: 25%; }
    100% { bottom: -50%; right: 0; }
  }
  @keyframes aurora-border {
    0% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
    25% { border-radius: 47% 29% 39% 49% / 61% 19% 66% 26%; }
    50% { border-radius: 57% 23% 47% 72% / 63% 17% 66% 33%; }
    75% { border-radius: 28% 49% 29% 100% / 93% 20% 64% 25%; }
    100% { border-radius: 37% 29% 27% 27% / 28% 25% 41% 37%; }
  }
`;

const layers = [
  { color: 'bg-bloom-300', anim: 'aurora-1', speed: 5 },
  { color: 'bg-rose-300', anim: 'aurora-2', speed: 5 },
  { color: 'bg-beige-300', anim: 'aurora-3', speed: 3 },
  { color: 'bg-bloom-200', anim: 'aurora-4', speed: 13 },
];

export default function AuroraTextEffect({ children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <div className="absolute inset-0 z-10 mix-blend-lighten pointer-events-none" aria-hidden>
        {layers.map((l, i) => (
          <div
            key={i}
            className={`absolute w-[120%] h-[120%] -top-[10%] -left-[10%] ${l.color} blur-2xl opacity-70`}
            style={{
              borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%',
              animation: `aurora-border 6s ease-in-out infinite, ${l.anim} ${l.speed}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>
    </span>
  );
}
