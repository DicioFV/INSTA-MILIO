import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RecursosSection from '../components/RecursosSection';

export default function RecursosPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('im-user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user.isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch {
        // Ignorar
      }
    }
  }, []);

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

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 text-center">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          📥 Recursos & <span className="text-[var(--theme-primary)]">Downloads</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          PDFs, checklists, templates e materiais exclusivos para acelerar seu crescimento.
        </p>
      </div>

      {/* Resources */}
      <RecursosSection 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => {
          // Trigger login via event
          window.dispatchEvent(new CustomEvent('open-login'));
        }}
      />
    </div>
  );
}
