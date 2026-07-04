import React from 'react';
import { motion } from 'framer-motion';

export const CustomChart = ({ 
  data = [], 
  labels = [], 
  color = "#3b82f6", 
  height = 120,
  fillColor = "rgba(59, 130, 246, 0.1)"
}) => {
  if (!data || data.length === 0) return null;

  const padding = 15;
  const chartHeight = height - padding * 2;
  const minVal = Math.min(...data) * 0.9;
  const maxVal = Math.max(...data) * 1.1;
  const valRange = maxVal - minVal || 1;

  // Generate SVG coordinates
  const points = data.map((val, idx) => {
    const x = padding + (idx * (300 - padding * 2)) / (data.length - 1);
    const y = padding + chartHeight - ((val - minVal) / valRange) * chartHeight;
    return { x, y, val };
  });

  // Create path command
  const pathD = points.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  // Create area path command (for gradient fill under the line)
  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` 
    : "";

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 300 ${height}`} className="w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0.00} />
          </linearGradient>
        </defs>

        {/* Horizontal grid guide lines */}
        <line x1={padding} y1={padding} x2={300 - padding} y2={padding} stroke="currentColor" className="text-slate-200 dark:text-charcoal-800" strokeDasharray="3 3" />
        <line x1={padding} y1={padding + chartHeight / 2} x2={300 - padding} y2={padding + chartHeight / 2} stroke="currentColor" className="text-slate-200 dark:text-charcoal-800" strokeDasharray="3 3" />
        <line x1={padding} y1={padding + chartHeight} x2={300 - padding} y2={padding + chartHeight} stroke="currentColor" className="text-slate-200 dark:text-charcoal-800" strokeDasharray="3 3" />

        {/* Gradient fill */}
        <motion.path
          d={areaD}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Glowing stroke path */}
        <motion.path
          d={pathD}
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        {/* Interactive node dots */}
        {points.map((pt, idx) => (
          <g key={idx}>
            <motion.circle
              cx={pt.x}
              cy={pt.y}
              r="4.5"
              fill={color}
              stroke="white"
              strokeWidth="1.5"
              className="dark:stroke-charcoal-900"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.5 }}
            />
            {/* Value Label above points (only for endpoints or peak to avoid clutter) */}
            {(idx === 0 || idx === points.length - 1 || pt.val === Math.max(...data)) && (
              <text
                x={pt.x}
                y={pt.y - 8}
                textAnchor="middle"
                fontSize="8"
                className="fill-charcoal-500 dark:fill-charcoal-400 font-semibold"
              >
                {pt.val}
              </text>
            )}
          </g>
        ))}
      </svg>
      
      {/* Mini X-Axis labels */}
      {labels.length > 0 && (
        <div className="flex justify-between text-[10px] font-medium text-charcoal-400 dark:text-charcoal-500 px-4 mt-1">
          {labels.map((lbl, i) => (
            <span key={i}>{lbl}</span>
          ))}
        </div>
      )}
    </div>
  );
};
