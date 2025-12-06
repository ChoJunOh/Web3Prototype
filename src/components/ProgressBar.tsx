import React from 'react';
import { motion } from 'framer-motion';
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'teal' | 'orange' | 'green';
}
export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'teal'
}: ProgressBarProps) {
  const percentage = Math.min(value / max * 100, 100);
  const colors = {
    teal: 'bg-gradient-to-r from-teal-500 to-cyan-500',
    orange: 'bg-gradient-to-r from-orange-500 to-amber-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500'
  };
  return <div className="w-full">
      {(label || showPercentage) && <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-semibold text-gray-900">
              {Math.round(percentage)}%
            </span>}
        </div>}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div initial={{
        width: 0
      }} animate={{
        width: `${percentage}%`
      }} transition={{
        duration: 0.8,
        ease: 'easeOut'
      }} className={`h-full ${colors[color]} rounded-full`} />
      </div>
    </div>;
}