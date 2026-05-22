import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Lock } from 'lucide-react';
import AnalyticsPessoal from '../components/AnalyticsPessoal';
import NotasSection from '../components/NotasSection';
import FavoritosSection from '../components/FavoritosSection';
import LembretesSection from '../components/LembretesSection';

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('im-user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user.isLoggedIn) {
          setIsLoggedIn(true);
          setUserName(user.name);
        }
      } catch {
        // Ignorar
      }
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <Lock size={48} className="text-[var(--theme-primary)] mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-text-primary mb-2">
            Área VIP
          </h2>
          <p className="text-text-muted mb-6">
            Faça login para acessar seu dashboard pessoal com notas, favoritos, lembretes e progresso.
          </p>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-login'));
              navigate('/');
            }}
            className="w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary"
            style={{ background: 'var(--theme-gradient)' }}
          >
            Fazer Login VIP
          </button>
          <p className="text-text-muted text-xs mt-4">
            Senha padrão: <span className="text-[var(--theme-primary)]">1234fv</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-[var(--theme-primary)] transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar para Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
            <Crown size={32} className="text-dark-primary" />
          </div>
          <div>
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary">
              Olá, <span className="text-[var(--theme-primary)]">{userName}</span>! 👑
            </h1>
            <p className="text-text-secondary">Seu dashboard pessoal do Instagram Milionário</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Analytics */}
        <AnalyticsPessoal />

        {/* Lembretes */}
        <LembretesSection />

        {/* Notas */}
        <NotasSection />

        {/* Favoritos */}
        <FavoritosSection />
      </div>
    </div>
  );
}
