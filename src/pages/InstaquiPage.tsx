import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InstaquiSection from '../components/InstaquiSection';

export default function InstaquiPage() {
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
          🗺️ InstAqui — <span className="text-[var(--theme-primary)]">Guia Turístico</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Seu guia completo de todas as funcionalidades do Instagram. Clique em qualquer item para ver dicas estratégicas.
        </p>
      </div>

      {/* InstAqui Content */}
      <InstaquiSection />
    </div>
  );
}
