import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-dark-secondary border border-white/10 flex items-center justify-center shadow-lg hover:border-[var(--theme-primary)] transition-colors group"
        style={{ '--theme-primary': themes[theme].primary } as React.CSSProperties}
      >
        <Palette size={20} className="text-text-secondary group-hover:text-[var(--theme-primary)] transition-colors" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-white/10 max-w-sm w-full p-6 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <span className="text-3xl mb-2 block">🎨</span>
                <h3 className="font-playfair text-xl font-bold text-text-primary">Escolha seu Tema</h3>
                <p className="text-text-muted text-sm">Personalize a experiência ao seu estilo</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(themes) as [string, typeof themes.gold][]).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key as keyof typeof themes);
                      setIsOpen(false);
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      theme === key
                        ? 'border-white/30 bg-white/5'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    {theme === key && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-2"
                      style={{ background: value.gradient }}
                    />
                    <span className="text-lg block mb-1">{value.emoji}</span>
                    <span className="text-text-primary text-sm font-medium">{value.name}</span>
                  </button>
                ))}
              </div>

              <p className="text-center text-text-muted text-xs mt-4">
                Sua escolha será salva automaticamente
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
