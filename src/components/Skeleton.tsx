import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const baseClasses = 'bg-dark-tertiary animate-pulse';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={16} width="60%" />
          <Skeleton variant="text" height={12} width="40%" />
        </div>
      </div>
      <Skeleton height={120} />
      <div className="space-y-2">
        <Skeleton variant="text" height={12} />
        <Skeleton variant="text" height={12} width="80%" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          height={12}
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="rounded-full border-2 border-[var(--theme-primary)] border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}

export function LoadingOverlay({ message = 'Carregando...' }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-dark-primary/90 backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <LoadingSpinner size={48} />
      <p className="text-text-secondary mt-4 font-medium">{message}</p>
    </motion.div>
  );
}

export function PulseRing() {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'var(--theme-gradient)' }}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'var(--theme-gradient)' }}
        animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}
