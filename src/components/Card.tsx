import React, { Component } from 'react';
import { motion } from 'framer-motion';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}
export function Card({
  children,
  className = '',
  hover = false,
  onClick
}: CardProps) {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: {
      y: -4,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    transition: {
      duration: 0.2
    }
  } : {};
  return <Component className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`} onClick={onClick} {...hoverProps}>
      {children}
    </Component>;
}