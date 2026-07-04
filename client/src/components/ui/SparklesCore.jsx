import { useId } from 'react';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function SparklesContent({
  id,
  className,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}) {
  return (
    <Particles
      id={id}
      className={`h-full w-full ${className || ''}`}
      options={{
        background: { color: { value: 'transparent' } },
        fullScreen: { enable: false, zIndex: 1 },
        fpsLimit: 120,
        particles: {
          color: { value: particleColor },
          move: {
            enable: true,
            speed: { min: 0.1, max: speed || 2 },
            outModes: { default: 'out' },
          },
          number: {
            density: { enable: true, width: 800, height: 600 },
            value: particleDensity || 40,
          },
          opacity: {
            value: { min: 0.1, max: 0.8 },
            animation: { enable: true, speed: 2, sync: false, startValue: 'random' },
          },
          shape: { type: 'circle' },
          size: { value: { min: minSize || 0.4, max: maxSize || 1 } },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function SparklesCore(props) {
  const generatedId = useId();
  const stableInit = initEngine;

  return (
    <ParticlesProvider init={stableInit}>
      <SparklesContent {...props} id={props.id || generatedId} />
    </ParticlesProvider>
  );
}

function initEngine(engine) {
  return loadSlim(engine);
}
