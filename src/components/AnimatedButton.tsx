import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  disabled = false,
  loading = false,
  icon,
  className = '',
}: AnimatedButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-montserrat font-bold rounded-full transition-all relative overflow-hidden';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'text-dark-primary',
    secondary: 'bg-dark-tertiary text-text-primary border border-white/10 hover:border-[var(--theme-primary)]/30',
    outline: 'bg-transparent border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10',
    ghost: 'bg-transparent text-text-secondary hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5',
  };

  const content = (
    <>
      {/* Shimmer effect for primary */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="relative z-10">{children}</span>
        </>
      )}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: disabled || loading ? {} : { scale: 1.02, y: -2 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        style={variant === 'primary' ? { background: 'var(--theme-gradient)', boxShadow: `0 4px 20px var(--theme-shadow)` } : {}}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={variant === 'primary' ? { background: 'var(--theme-gradient)', boxShadow: `0 4px 20px var(--theme-shadow)` } : {}}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

// Botão com efeito de confetti ao clicar
export function ConfettiButton({ children, onClick, ...props }: AnimatedButtonProps) {
  const handleClick = () => {
    // Criar partículas de confetti
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(container);

    const colors = ['#D4A017', '#F5C842', '#FFE082', '#22C55E', '#3B82F6'];
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: confetti-${i} ${0.5 + Math.random() * 0.5}s ease-out forwards;
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-${i} {
          to {
            transform: translate(
              calc(-50% + ${(Math.random() - 0.5) * 400}px),
              calc(-50% + ${(Math.random() - 0.5) * 400}px)
            ) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 1000);
    onClick?.();
  };

  return (
    <AnimatedButton onClick={handleClick} {...props}>
      {children}
    </AnimatedButton>
  );
}

// Botão com ripple effect
export function RippleButton({ children, onClick, ...props }: AnimatedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      background: rgba(255,255,255,0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      margin-top: -50px;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
