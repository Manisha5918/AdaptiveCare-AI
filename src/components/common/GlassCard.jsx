import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export const GlassCard = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  onClick,
  tiltEffect = true,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for 3D rotation (subtle angles for modern premium feel)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 220, damping: 25 });

  // Springs for Glare specular reflections (in percentages)
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [10, 90]), { stiffness: 220, damping: 25 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [10, 90]), { stiffness: 220, damping: 25 });

  // Dynamic template for glare reflection background
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!tiltEffect || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: hoverEffect && hovering ? rotateX : 0,
        rotateY: hoverEffect && hovering ? rotateY : 0,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 30,
        layout: { duration: 0.55, type: "spring", stiffness: 200, damping: 28 } 
      }}
      whileHover={hoverEffect ? { 
        y: -5, 
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.15)",
        borderColor: "rgba(255, 255, 255, 0.15)"
      } : undefined}
      onClick={onClick}
      className={`glass-panel rounded-[28px] p-8 relative overflow-hidden transition-colors duration-300 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {/* Flat isolated layout container to avoid Z-translation text rendering blur */}
      <div className="h-full flex flex-col justify-between relative z-10">
        {children}
      </div>

      {/* Glossy reflection glare overlay */}
      {hoverEffect && tiltEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};
