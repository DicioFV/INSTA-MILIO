import { useState } from 'react';
import { motion } from 'framer-motion';

const comparisons = [
  {
    categoria: 'Bio do Perfil',
    icon: '📝',
    antes: {
      titulo: 'Bio Genérica',
      items: [
        '❌ "Cantor gospel 🎤"',
        '❌ Sem palavras-chave',
        '❌ Sem CTA (chamada para ação)',
        '❌ Link quebrado ou sem link',
        '❌ Emojis aleatórios',
      ],
    },
    depois: {
      titulo: 'Bio Otimizada com SEO',
      items: [
        '✅ "Felipe Vitória | Cantor Gospel"',
        '✅ Keywords: Hinos, Adoração, Acústico',
        '✅ CTA: "👇 Baixe meu hinário grátis"',
        '✅ Link para Linktree organizado',
        '✅ Emojis estratégicos e alinhados',
      ],
    },
  },
  {
    categoria: 'Estrutura de Reels',
    icon: '🎬',
    antes: {
      titulo: 'Reel Sem Estratégia',
      items: [
        '❌ Começa devagar sem gancho',
        '❌ Não fala a keyword no áudio',
        '❌ Legenda vazia ou genérica',
        '❌ Sem call-to-action no final',
        '❌ Capa com frame aleatório',
      ],
    },
    depois: {
      titulo: 'Reel Frame-a-Frame',
      items: [
        '✅ Gancho visual nos primeiros 0-3s',
        '✅ Keyword dita em voz alta',
        '✅ Legenda com SEO + hashtags',
        '✅ CTA: "Salva e manda pra alguém"',
        '✅ Capa personalizada e chamativa',
      ],
    },
  },
  {
    categoria: 'Frequência de Posts',
    icon: '📅',
    antes: {
      titulo: 'Postagem Aleatória',
      items: [
        '❌ Posta quando dá vontade',
        '❌ Sem série definida',
        '❌ 3 semanas sem postar',
        '❌ Horários inconsistentes',
        '❌ Conteúdo sem tema claro',
      ],
    },
    depois: {
      titulo: 'Cronograma Estruturado',
      items: [
        '✅ 3-4 Reels por semana',
        '✅ 5 séries fixas rotativas',
        '✅ Stories diários (3-5/dia)',
        '✅ Horários otimizados por dia',
        '✅ Tema e formato pré-definidos',
      ],
    },
  },
  {
    categoria: 'Engajamento',
    icon: '💬',
    antes: {
      titulo: 'Engajamento Baixo',
      items: [
        '❌ Ignora comentários',
        '❌ Não usa Stories interativos',
        '❌ Nunca pede compartilhamento',
        '❌ Não responde DMs',
        '❌ Zero collabs com outros',
      ],
    },
    depois: {
      titulo: 'Comunidade Engajada',
      items: [
        '✅ Responde em menos de 30 min',
        '✅ Enquetes e caixinhas diárias',
        '✅ CTA de DM em cada Reel',
        '✅ DMs respondidas com carinho',
        '✅ 2+ collabs por mês',
      ],
    },
  },
];

export default function AntesDepoisSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--theme-primary)] font-montserrat font-bold text-sm tracking-widest uppercase">
            Transformação Real
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            <span className="text-error">Antes</span> vs <span className="text-success">Depois</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Veja a diferença entre um perfil amador e um perfil profissional otimizado
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {comparisons.map((c, i) => (
            <button
              key={c.categoria}
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeIndex === i
                  ? 'bg-[var(--theme-primary)] text-dark-primary shadow-lg'
                  : 'bg-dark-tertiary text-text-secondary hover:text-text-primary border border-white/10'
              }`}
              style={activeIndex === i ? { boxShadow: `0 4px 20px var(--theme-shadow)` } : {}}
            >
              <span>{c.icon}</span>
              {c.categoria}
            </button>
          ))}
        </div>

        {/* Comparison Cards */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* ANTES */}
          <div className="bg-red-950/10 border border-red-900/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-error text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              ANTES
            </div>
            <div className="flex items-center gap-3 mb-6 mt-4">
              <span className="text-3xl opacity-50">{comparisons[activeIndex].icon}</span>
              <div>
                <h3 className="font-montserrat font-bold text-error text-lg">
                  {comparisons[activeIndex].antes.titulo}
                </h3>
                <p className="text-red-300/50 text-sm">Erros comuns</p>
              </div>
            </div>
            <div className="space-y-3">
              {comparisons[activeIndex].antes.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-red-950/30 rounded-lg p-3 text-red-200/80 text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* DEPOIS */}
          <div className="bg-green-950/10 border border-green-900/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-success text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              DEPOIS
            </div>
            <div className="flex items-center gap-3 mb-6 mt-4">
              <span className="text-3xl">{comparisons[activeIndex].icon}</span>
              <div>
                <h3 className="font-montserrat font-bold text-success text-lg">
                  {comparisons[activeIndex].depois.titulo}
                </h3>
                <p className="text-green-300/50 text-sm">Estratégia aplicada</p>
              </div>
            </div>
            <div className="space-y-3">
              {comparisons[activeIndex].depois.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-green-950/30 rounded-lg p-3 text-green-200/80 text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-text-muted mb-4">Pronto para sair do "Antes" e chegar no "Depois"?</p>
          <a
            href="#modulos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-montserrat font-bold text-dark-primary text-lg transition-all hover:opacity-90"
            style={{ background: 'var(--theme-gradient)', boxShadow: `0 4px 20px var(--theme-shadow)` }}
          >
            🚀 Começar Minha Transformação
          </a>
        </motion.div>
      </div>
    </section>
  );
}
