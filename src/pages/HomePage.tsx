import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Map, Calendar, Wrench, BarChart3, 
  Flame, Download, HelpCircle, ChevronRight, Play
} from 'lucide-react';
import Hero from '../components/Hero';
import ProvasSociais from '../components/ProvasSociais';
import ComoFuncionaSection from '../components/ComoFuncionaSection';
import DepoimentosSection from '../components/DepoimentosSection';
import FAQSection from '../components/FAQSection';

const menuCards = [
  {
    to: '/modulos',
    icon: BookOpen,
    emoji: '📚',
    title: 'Módulos Completos',
    description: 'Os 7 módulos com todo o conhecimento para crescer no Instagram',
    color: 'from-purple-500/20 to-purple-600/10',
    badge: '7 módulos',
  },
  {
    to: '/instaqui',
    icon: Map,
    emoji: '🗺️',
    title: 'InstAqui',
    description: 'Guia turístico completo de todas as funções do Instagram',
    color: 'from-blue-500/20 to-blue-600/10',
    badge: 'Guia Completo',
  },
  {
    to: '/cronograma',
    icon: Calendar,
    emoji: '📅',
    title: 'Cronograma 60 Dias',
    description: 'Seu plano diário de conteúdo com progresso e séries',
    color: 'from-green-500/20 to-green-600/10',
    badge: '60 dias',
  },
  {
    to: '/ferramentas',
    icon: Wrench,
    emoji: '🛠️',
    title: 'Ferramentas',
    description: 'Calculadora, gerador de legendas, hashtags, quiz e mais',
    color: 'from-orange-500/20 to-orange-600/10',
    badge: '5 tools',
  },
  {
    to: '/analise',
    icon: BarChart3,
    emoji: '🔍',
    title: 'Análise de Perfil',
    description: 'Diagnóstico completo do seu Instagram com plano de ação',
    color: 'from-pink-500/20 to-pink-600/10',
    badge: 'IA',
  },
  {
    to: '/virais',
    icon: Flame,
    emoji: '🔥',
    title: 'Virais & Inspiração',
    description: 'Exemplos de conteúdo viral e algoritmo explicado',
    color: 'from-red-500/20 to-red-600/10',
    badge: 'Trending',
  },
  {
    to: '/recursos',
    icon: Download,
    emoji: '📥',
    title: 'Recursos & Downloads',
    description: 'PDFs, checklists, templates e materiais exclusivos',
    color: 'from-cyan-500/20 to-cyan-600/10',
    badge: '8+ arquivos',
  },
  {
    to: '/faq',
    icon: HelpCircle,
    emoji: '❓',
    title: 'FAQ Completo',
    description: 'Todas as perguntas frequentes respondidas',
    color: 'from-yellow-500/20 to-yellow-600/10',
    badge: '14+ perguntas',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Prova Social / Números */}
      <ProvasSociais />

      {/* Como Funciona */}
      <ComoFuncionaSection />

      {/* Menu de Navegação Principal */}
      <section className="py-20 bg-dark-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(var(--theme-primary-rgb),0.03)_0%,_transparent_60%)]" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[var(--theme-primary)] font-montserrat font-bold text-sm tracking-widest uppercase">
              Navegue pela Plataforma
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
              O Que Você Quer <span className="text-[var(--theme-primary)]">Aprender</span> Hoje?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Escolha uma área para explorar. Todo o conhecimento está organizado para você.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuCards.map((card, i) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={card.to}
                  className={`block h-full bg-gradient-to-br ${card.color} rounded-2xl p-6 border border-white/5 hover:border-[var(--theme-primary)]/30 transition-all group hover:shadow-xl hover:shadow-[var(--theme-primary)]/5 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{card.emoji}</span>
                    <span className="px-2 py-1 bg-white/5 rounded-full text-[10px] text-text-muted font-medium">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="font-montserrat font-bold text-text-primary text-lg mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[var(--theme-primary)] text-sm font-semibold group-hover:gap-2 transition-all">
                    Acessar <ChevronRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Start CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/modulos"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-montserrat font-bold text-dark-primary text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'var(--theme-gradient)', boxShadow: '0 4px 20px var(--theme-shadow)' }}
            >
              <Play size={20} fill="currentColor" />
              Começar pelos Módulos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Depoimentos */}
      <DepoimentosSection />

      {/* FAQ Resumido */}
      <section className="py-20 bg-dark-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-playfair text-3xl font-bold text-text-primary mb-4">
              Dúvidas <span className="text-[var(--theme-primary)]">Frequentes</span>
            </h2>
          </motion.div>
          
          {/* Mostra apenas 4 perguntas na home */}
          <FAQSection limit={4} />
          
          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--theme-primary)]/30 text-[var(--theme-primary)] font-semibold hover:bg-[var(--theme-primary)]/10 transition-all"
            >
              Ver Todas as Perguntas
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
