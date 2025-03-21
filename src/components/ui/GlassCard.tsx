
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverEffect = false
}) => {
  return (
    <div className={cn(
      'glass rounded-xl p-6',
      hoverEffect && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;
