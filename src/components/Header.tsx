import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, Rocket } from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Módulos', href: '/modulos' },
  { label: 'InstAqui', href: '/instaqui' },
  { label: 'Cronograma', href: '/cronograma' },
  { label: 'Ferramentas', href: '/ferramentas' },
  { label: 'Análise', href: '/analise' },
];

export default function Header({ onLoginClick, isLoggedIn, onLogout: _onLogout }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-primary/95 backdrop-blur-xl shadow-2xl shadow-[var(--theme-primary)]/5 border-b border-[var(--theme-primary)]/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📱</span>
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-lg md:text-xl text-[var(--theme-primary)] group-hover:opacity-80 transition-opacity">
                INSTAGRAM MILIONÁRIO
              </span>
              <span className="text-[10px] md:text-xs text-text-secondary -mt-1 tracking-wider">
                Do Zero ao Viral com Propósito
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'text-[var(--theme-primary)] bg-[var(--theme-primary)]/10'
                    : 'text-text-secondary hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-[var(--theme-primary)] transition-colors border border-white/10 rounded-full hover:border-[var(--theme-primary)]/30"
              >
                <LogIn size={16} />
                Meu Dashboard
              </Link>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-[var(--theme-primary)] transition-colors border border-white/10 rounded-full hover:border-[var(--theme-primary)]/30"
              >
                <LogIn size={16} />
                Login VIP
              </button>
            )}
            <Link
              to="/modulos"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-montserrat font-bold text-dark-primary rounded-full hover:opacity-90 transition-all"
              style={{ background: 'var(--theme-gradient)' }}
            >
              <Rocket size={16} />
              Começar Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-primary hover:text-[var(--theme-primary)] transition-colors"
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
            className="lg:hidden bg-dark-secondary/98 backdrop-blur-xl border-b border-[var(--theme-primary)]/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`block px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.href
                      ? 'text-[var(--theme-primary)] bg-[var(--theme-primary)]/10'
                      : 'text-text-secondary hover:text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-text-secondary border border-white/10 rounded-full"
                  >
                    <LogIn size={16} />
                    Meu Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => { onLoginClick(); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-text-secondary border border-white/10 rounded-full"
                  >
                    <LogIn size={16} />
                    Login VIP
                  </button>
                )}
                <Link
                  to="/modulos"
                  className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-montserrat font-bold text-dark-primary rounded-full"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Rocket size={16} />
                  Começar Agora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
