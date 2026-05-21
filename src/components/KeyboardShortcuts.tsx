import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { keys: ['?'], description: 'Mostrar atalhos' },
  { keys: ['G', 'H'], description: 'Ir para Home' },
  { keys: ['G', 'M'], description: 'Ir para Módulos' },
  { keys: ['G', 'C'], description: 'Ir para Cronograma' },
  { keys: ['G', 'A'], description: 'Abrir Agente IA' },
  { keys: ['T'], description: 'Trocar tema' },
  { keys: ['Esc'], description: 'Fechar modal' },
];

interface KeyboardShortcutsProps {
  onOpenAgent: () => void;
  onOpenTheme: () => void;
}

export default function KeyboardShortcuts({ onOpenAgent, onOpenTheme }: KeyboardShortcutsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se estiver em input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();

      // Show shortcuts
      if (e.key === '?') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Close modal
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Theme
      if (key === 'T' && !pendingKey) {
        onOpenTheme();
        return;
      }

      // Navigation shortcuts (G + letter)
      if (key === 'G' && !pendingKey) {
        setPendingKey('G');
        setTimeout(() => setPendingKey(null), 1000);
        return;
      }

      if (pendingKey === 'G') {
        switch (key) {
          case 'H':
            window.location.hash = '#inicio';
            break;
          case 'M':
            window.location.hash = '#modulos';
            break;
          case 'C':
            document.querySelector('#cronograma')?.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'A':
            onOpenAgent();
            break;
        }
        setPendingKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pendingKey, onOpenAgent, onOpenTheme]);

  return (
    <>
      {/* Pending Key Indicator */}
      <AnimatePresence>
        {pendingKey && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-dark-secondary border border-[var(--theme-primary)]/30 shadow-lg"
          >
            <span className="text-text-primary text-sm">
              Pressione: <kbd className="px-2 py-0.5 bg-dark-primary rounded text-[var(--theme-primary)] font-mono">{pendingKey}</kbd> + ...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcuts Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
                  <Keyboard size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Atalhos de Teclado</h3>
                  <p className="text-text-muted text-sm">Navegue como um pro</p>
                </div>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-dark-primary/50 rounded-lg p-3"
                  >
                    <span className="text-text-secondary text-sm">{shortcut.description}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, j) => (
                        <span key={j}>
                          <kbd className="px-2 py-1 bg-dark-tertiary border border-white/10 rounded text-text-primary text-xs font-mono">
                            {key}
                          </kbd>
                          {j < shortcut.keys.length - 1 && <span className="text-text-muted mx-1">+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-text-muted text-xs text-center mt-4">
                Pressione <kbd className="px-1 py-0.5 bg-dark-primary rounded text-[var(--theme-primary)] text-xs">?</kbd> para abrir a qualquer momento
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
