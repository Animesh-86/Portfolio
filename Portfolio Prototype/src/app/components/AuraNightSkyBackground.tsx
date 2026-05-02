import { motion } from 'framer-motion';

const baseDuration = 60;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getMaskStyle(fadeEdges: boolean, fadeStrength: number) {
  const inner = clamp(40 - (fadeStrength - 50) * 0.2, 25, 55);
  const outer = clamp(70 + (fadeStrength - 50) * 0.3, 55, 90);

  return fadeEdges
    ? {
        maskImage: `radial-gradient(ellipse at 100% 0%, black ${inner}%, transparent ${outer}%)`
      }
    : { maskImage: 'none' };
}

export function AuraNightSkyBackground({
  backgroundColor = '#0a0a0f',
  stripesColor = '#ffffff',
  rainbowColors = ['#60a5fa', '#e879f9', '#60a5fa', '#5eead4', '#60a5fa'],
  speed = 1,
  stripeWidth = 7,
  fadeEdges = true,
  fadeStrength = 50
}: {
  backgroundColor?: string;
  stripesColor?: string;
  rainbowColors?: string[];
  speed?: number;
  stripeWidth?: number;
  fadeEdges?: boolean;
  fadeStrength?: number;
}) {
  const colors = rainbowColors.length >= 5 ? rainbowColors : ['#60a5fa', '#e879f9', '#60a5fa', '#5eead4', '#60a5fa'];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(232, 121, 249, 0.16), transparent 26%), radial-gradient(circle at 50% 80%, rgba(94, 234, 212, 0.12), transparent 28%)',
          filter: 'blur(20px)'
        }}
      />
      <motion.div
        animate={{ backgroundPosition: ['50% 50%', '350% 50%'] }}
        transition={{
          duration: Math.max(1, baseDuration / Math.max(0.1, speed)),
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          position: 'absolute',
          inset: '-10px',
          opacity: 0.5,
          filter: 'blur(10px) opacity(50%) saturate(200%)',
          pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(
            100deg,
            ${stripesColor} 0%,
            ${stripesColor} ${stripeWidth}%,
            transparent ${stripeWidth + 3}%,
            transparent ${stripeWidth + 5}%,
            ${stripesColor} ${stripeWidth + 9}%
          ), repeating-linear-gradient(
            100deg,
            ${colors[0]} 10%,
            ${colors[1]} 15%,
            ${colors[2]} 20%,
            ${colors[3]} 25%,
            ${colors[4]} 30%
          )`,
          backgroundSize: '300% 200%',
          backgroundPosition: '50% 50%, 50% 50%',
          ...getMaskStyle(fadeEdges, fadeStrength)
        }}
      />
    </div>
  );
}