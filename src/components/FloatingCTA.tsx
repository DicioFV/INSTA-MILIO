import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Mostrar após rolar 2 telas
      if (scrollY > windowHeight * 2 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const dismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-24 sm:w-80 z-40"
        >
          <div className="glass-card rounded-2xl p-4 border-gold-primary/30 shadow-2xl shadow-gold-primary/10 relative">
            <button
              onClick={dismiss}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-tertiary border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={12} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center animate-pulse-gold">
                <Rocket size={18} className="text-dark-primary" />
              </div>
              <div>
                <p className="font-montserrat font-bold text-text-primary text-sm">Pronto para crescer?</p>
                <p className="text-text-muted text-xs">Comece pelo cronograma de 60 dias</p>
              </div>
            </div>

            <a
              href="#modulos"
              onClick={dismiss}
              className="block w-full text-center px-4 py-2.5 gold-gradient rounded-xl font-montserrat font-bold text-dark-primary text-sm hover:opacity-90 transition-opacity"
            >
              Começar Agora →
            </a>

            <p className="text-center text-text-muted text-[10px] mt-2">
              ✓ 100% Gratuito • ✓ Sem cadastro
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
