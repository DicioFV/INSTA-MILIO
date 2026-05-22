import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FAQSection from '../components/FAQSection';

export default function FAQPage() {
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
          ❓ Perguntas <span className="text-[var(--theme-primary)]">Frequentes</span>
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Todas as suas dúvidas sobre Instagram, algoritmo e crescimento respondidas.
        </p>
      </div>

      {/* Full FAQ */}
      <FAQSection />
    </div>
  );
}
