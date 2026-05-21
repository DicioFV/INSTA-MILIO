import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const tourSteps = [
  {
    id: 1,
    title: 'Bem-vindo ao Instagram Milionário! 🎉',
    description: 'A plataforma premium para transformar seu Instagram. Vamos fazer um tour rápido?',
    emoji: '👋',
    position: 'center',
  },
  {
    id: 2,
    title: 'Os 7 Módulos Completos',
    description: 'Cada módulo cobre uma área essencial: do perfil perfeito aos Reels virais. Clique para explorar!',
    emoji: '📚',
    position: 'center',
    highlight: '#modulos',
  },
  {
    id: 3,
    title: 'Cronograma de 60 Dias',
    description: '60 dias de conteúdo planejado para você. Marque cada dia como feito e acompanhe seu progresso.',
    emoji: '📅',
    position: 'center',
  },
  {
    id: 4,
    title: 'Agente IA Especialista',
    description: 'Clique no botão 🤖 no canto inferior direito para tirar dúvidas sobre o algoritmo 2026 em tempo real!',
    emoji: '🤖',
    position: 'center',
  },
  {
    id: 5,
    title: 'Área VIP Exclusiva',
    description: 'Faça login com a senha "1234fv" para acessar downloads exclusivos, conquistas e dashboard personalizado.',
    emoji: '👑',
    position: 'center',
  },
  {
    id: 6,
    title: 'Você está pronto! 🚀',
    description: 'Explore a plataforma, siga o cronograma e transforme seu Instagram. Do zero ao viral com propósito!',
    emoji: '✨',
    position: 'center',
  },
];

export default function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('im-tour-completed');
    if (!hasSeenTour) {
      // Delay para não aparecer imediatamente
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem('im-tour-completed', 'true');
    setIsOpen(false);
  };

  const next = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    completeTour();
  };

  const step = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="bg-dark-secondary rounded-3xl border border-[var(--theme-primary)]/30 max-w-md w-full p-8 relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: 'var(--theme-gradient)' }}
            />
            
            {/* Skip button */}
            <button
              onClick={skip}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary text-sm transition-colors"
            >
              Pular tour
            </button>

            {/* Content */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6"
                style={{ background: 'var(--theme-gradient)' }}
              >
                {step.emoji}
              </motion.div>

              <h3 className="font-playfair text-2xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                {step.description}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 mb-6">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStep
                        ? 'w-8'
                        : i < currentStep
                        ? 'w-1.5 opacity-60'
                        : 'w-1.5 opacity-30'
                    }`}
                    style={i <= currentStep ? { background: 'var(--theme-gradient)' } : { background: 'white' }}
                  />
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={prev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    currentStep === 0
                      ? 'opacity-0 pointer-events-none'
                      : 'text-text-muted hover:text-text-primary border border-white/10 hover:border-white/20'
                  }`}
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>

                <button
                  onClick={next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat font-bold text-dark-primary transition-all hover:opacity-90"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      <Sparkles size={16} />
                      Começar!
                    </>
                  ) : (
                    <>
                      Próximo
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
