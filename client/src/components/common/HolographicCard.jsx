export default function HolographicCard({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-2xl select-none"
        style={{
          filter:
            'drop-shadow(0 2px 1px #00000020) drop-shadow(0 4px 3px #00000020) drop-shadow(0 10px 9px #00000020) drop-shadow(0 20px 20px #00000020)',
          animation: 'holographic-float 3s ease infinite',
        }}
      >
        {/* Base white card */}
        <div className="absolute inset-0 bg-white" />

        {/* Holographic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(255,107,254,0.15), rgba(0,249,248,0.1), rgba(0,129,253,0.15), rgba(238,240,188,0.1))',
            mixBlendMode: 'overlay',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,107,254,0.08) 20px, rgba(255,107,254,0.08) 40px)',
            animation: 'holographic-shimmer 4s linear infinite',
          }}
        />

        {/* Color-shifting animated layer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'linear-gradient(to bottom, #ff6bfe, #00f9f8, #0081fd, #ff6bfe)',
            backgroundSize: '100% 300%',
            mixBlendMode: 'color',
            animation: 'holographic-bg 4s ease-in-out infinite alternate',
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>

      <style>{`
        @keyframes holographic-float {
          50% {
            filter: drop-shadow(0 4px 3px #00000010) drop-shadow(0 6px 6px #00000010) drop-shadow(0 16px 14px #00000010) drop-shadow(0 30px 28px #00000010);
            transform: translateY(-6px) scale(1.01);
          }
        }
        @keyframes holographic-bg {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes holographic-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
