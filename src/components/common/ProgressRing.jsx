import { motion } from 'framer-motion';

export const ProgressRing = ({ 
  value = 0, 
  size = 120, 
  strokeWidth = 10, 
  color = "#3b82f6", 
  subtitle = "" 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          className="text-slate-200 dark:text-charcoal-800 transition-colors duration-300"
          strokeWidth={strokeWidth}
        />
        {/* Animated indicator */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Percentage Center Label */}
      <div className="absolute text-center flex flex-col justify-center items-center">
        <span className="text-2xl font-bold tracking-tight text-charcoal-900 dark:text-slate-100">
          {value}%
        </span>
        {subtitle && (
          <span className="text-[10px] font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-widest mt-0.5">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
