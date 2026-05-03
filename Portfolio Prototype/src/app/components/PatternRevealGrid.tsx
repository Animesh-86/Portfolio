import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export function PatternRevealGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="absolute inset-0 group overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
    >
      {/* Base Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--border-accent) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          opacity: 0.3
        }}
      />

      {/* Reveal Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              var(--primary-glow),
              transparent 80%
            )
          `,
          maskImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
          WebkitMaskImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)`,
          maskSize: '40px 40px',
          WebkitMaskSize: '40px 40px'
        }}
      />

      {/* Large Soft Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition duration-500 opacity-0 group-hover:opacity-40"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.08),
              transparent 80%
            )
          `
        }}
      />
    </div>
  );
}
