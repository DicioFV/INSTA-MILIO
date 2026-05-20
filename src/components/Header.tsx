import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, Rocket } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'InstAqui', href: '#instaqui' },
  { label: 'Análise', href: '#analise' },
  { label: 'Agente IA', href: '#agente' },
  { label: 'Virais', href: '#virais' },
  { label: 'Contato', href: '#contato' },
];

export default function Header({ onLoginClick, isLoggedIn, onLogout: _onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-primary/95 backdrop-blur-xl shadow-2xl shadow-gold-primary/5 border-b border-gold-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <span className="text-2xl">📱</span>
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-lg md:text-xl text-gold-primary group-hover:text-gold-secondary transition-colors">
                INSTAGRAM MILIONÁRIO
              </span>
              <span className="text-[10px] md:text-xs text-text-secondary -mt-1 tracking-wider">
                Do Zero ao Viral com Propósito
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm text-text-secondary hover:text-gold-primary transition-colors rounded-lg hover:bg-gold-primary/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-gold-primary transition-colors border border-white/10 rounded-full hover:border-gold-primary/30"
            >
              <LogIn size={16} />
              {isLoggedIn ? 'Área VIP' : 'Login VIP'}
            </button>
            <a
              href="#modulos"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-montserrat font-bold text-dark-primary gold-gradient rounded-full hover:opacity-90 transition-all animate-pulse-gold"
            >
              <Rocket size={16} />
              Quero Crescer Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-primary hover:text-gold-primary transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-secondary/98 backdrop-blur-xl border-b border-gold-primary/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-text-secondary hover:text-gold-primary hover:bg-gold-primary/5 rounded-xl transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => { onLoginClick(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-text-secondary border border-white/10 rounded-full"
                >
                  <LogIn size={16} />
                  {isLoggedIn ? 'Área VIP' : 'Login VIP'}
                </button>
                <a
                  href="#modulos"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-montserrat font-bold text-dark-primary gold-gradient rounded-full"
                >
                  <Rocket size={16} />
                  Quero Crescer Agora
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
