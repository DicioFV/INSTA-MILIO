import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface AchievementContextType {
  unlockAchievement: (achievement: Achievement) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);

  const unlockAchievement = useCallback((achievement: Achievement) => {
    // Check if already unlocked
    const unlocked = JSON.parse(localStorage.getItem('im-achievements') || '[]') as string[];
    if (unlocked.includes(achievement.id)) return;

    // Save as unlocked
    localStorage.setItem('im-achievements', JSON.stringify([...unlocked, achievement.id]));
    
    // Show popup
    setCurrentAchievement(achievement);

    // Hide after 4 seconds
    setTimeout(() => {
      setCurrentAchievement(null);
    }, 4000);
  }, []);

  return (
    <AchievementContext.Provider value={{ unlockAchievement }}>
      {children}

      {/* Achievement Popup */}
      <AnimatePresence>
        {currentAchievement && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110]"
          >
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                style={{ background: 'var(--theme-gradient)' }}
              />
              
              {/* Card */}
              <div className="relative bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/30 p-6 flex items-center gap-4 shadow-2xl min-w-[320px]">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  {currentAchievement.icon}
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy size={14} className="text-[var(--theme-primary)]" />
                    <span className="text-[var(--theme-primary)] text-xs font-bold uppercase tracking-wider">
                      Conquista Desbloqueada!
                    </span>
                  </div>
                  <h4 className="font-montserrat font-bold text-text-primary">
                    {currentAchievement.title}
                  </h4>
                  <p className="text-text-muted text-sm">
                    {currentAchievement.description}
                  </p>
                </div>

                {/* Sparkles */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  ✨
                </motion.div>
              </div>

              {/* Progress bar animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
                style={{ background: 'var(--theme-gradient)' }}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error('useAchievement must be used within AchievementProvider');
  }
  return context;
}

// Pre-defined achievements
export const ACHIEVEMENTS = {
  FIRST_VISIT: {
    id: 'first-visit',
    icon: '🚀',
    title: 'Primeiro Passo',
    description: 'Você acessou o Instagram Milionário!',
  },
  TOUR_COMPLETED: {
    id: 'tour-completed',
    icon: '🎓',
    title: 'Estudante Dedicado',
    description: 'Completou o tour de boas-vindas',
  },
  MODULE_OPENED: {
    id: 'module-opened',
    icon: '📚',
    title: 'Explorador',
    description: 'Abriu seu primeiro módulo',
  },
  PROFILE_ANALYZED: {
    id: 'profile-analyzed',
    icon: '🔍',
    title: 'Auto-Conhecimento',
    description: 'Analisou seu perfil do Instagram',
  },
  AGENT_CHAT: {
    id: 'agent-chat',
    icon: '🤖',
    title: 'Amigo da IA',
    description: 'Conversou com o Agente do Instagram',
  },
  FIRST_CHECKLIST: {
    id: 'first-checklist',
    icon: '✅',
    title: 'Organizado',
    description: 'Marcou seu primeiro dia no cronograma',
  },
  VIP_LOGIN: {
    id: 'vip-login',
    icon: '👑',
    title: 'Membro VIP',
    description: 'Fez login na área exclusiva',
  },
  THEME_CHANGED: {
    id: 'theme-changed',
    icon: '🎨',
    title: 'Estiloso',
    description: 'Personalizou o tema da plataforma',
  },
};
