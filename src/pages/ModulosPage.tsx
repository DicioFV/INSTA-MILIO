import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModulosSection from '../components/ModulosSection';
import AlgoritmoSection from '../components/AlgoritmoSection';
import AgenteSection from '../components/AgenteSection';
import ErrosSection from '../components/ErrosSection';

export default function ModulosPage() {
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
          📚 Módulos <span className="text-[var(--theme-primary)]">Completos</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Todo o conhecimento que você precisa para dominar o Instagram, organizado em 7 módulos práticos.
        </p>
      </div>

      {/* Modules */}
      <ModulosSection />

      {/* Algorithm */}
      <AlgoritmoSection />

      {/* Agent Section */}
      <AgenteSection />

      {/* Common Errors */}
      <ErrosSection />
    </div>
  );
}
