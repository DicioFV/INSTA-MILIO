import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, ArrowUp, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-secondary border-t border-white/5 relative">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center mb-16">
          <span className="text-4xl mb-4 block">📬</span>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Receba Dicas <span className="text-[var(--theme-primary)]">Semanais</span>
          </h3>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            Toda segunda-feira, um email com as melhores estratégias para crescer no Instagram
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-success font-semibold">
              <Check size={24} />
              <span>Inscrito com sucesso! Verifique seu email.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-dark-primary border border-white/10 rounded-full text-text-primary placeholder-text-muted focus:border-[var(--theme-primary)] focus:outline-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full font-montserrat font-bold text-dark-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: 'var(--theme-gradient)' }}
              >
                Inscrever-se →
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl">📱</span>
              <span className="font-playfair font-bold text-[var(--theme-primary)]">INSTAGRAM MILIONÁRIO</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              A plataforma premium de crescimento no Instagram para criadores de conteúdo gospel.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-text-primary text-sm mb-4">Conteúdo</h4>
            <ul className="space-y-2">
              {[
                { label: 'Módulos', to: '/modulos' },
                { label: 'InstAqui', to: '/instaqui' },
                { label: 'Cronograma', to: '/cronograma' },
                { label: 'Ferramentas', to: '/ferramentas' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-text-muted text-sm hover:text-[var(--theme-primary)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-text-primary text-sm mb-4">Ferramentas</h4>
            <ul className="space-y-2">
              {[
                { label: 'Análise de Perfil', to: '/analise' },
                { label: 'Virais & Inspiração', to: '/virais' },
                { label: 'Recursos', to: '/recursos' },
                { label: 'FAQ', to: '/faq' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-text-muted text-sm hover:text-[var(--theme-primary)] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-text-primary text-sm mb-4">Perfis</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com/felipevitoriacantor" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-[var(--theme-primary)] transition-colors">
                  🎤 Felipe Vitória Cantor
                </a>
              </li>
              <li>
                <a href="https://instagram.com/tecladofelipevitoria" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm hover:text-[var(--theme-primary)] transition-colors">
                  🎹 Teclado Felipe Vitória
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm flex items-center gap-1">
            Feito com <Heart size={14} className="text-error" /> por Felipe Vitória — 2026
          </p>
          <p className="text-text-muted text-xs">
            Instagram Milionário® — Do Zero ao Viral com Propósito
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
