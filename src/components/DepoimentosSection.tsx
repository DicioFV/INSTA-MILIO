import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const depoimentos = [
  {
    id: 1,
    nome: 'Pastor Ricardo Mendes',
    cargo: 'Pastor e Cantor Gospel',
    avatar: '👨‍💼',
    texto: 'Em 3 meses seguindo o cronograma, meu perfil saiu de 800 para 15.000 seguidores. O método funciona porque é baseado em dados reais do algoritmo, não em "achismos".',
    seguidores: { antes: 800, depois: 15000 },
    estrelas: 5,
  },
  {
    id: 2,
    nome: 'Ministério Adoração Viva',
    cargo: 'Igreja Batista Central',
    avatar: '⛪',
    texto: 'Começamos do zero absoluto. Hoje alcançamos milhares de pessoas semanalmente com nossos louvores. O InstAqui nos ensinou cada botão do Instagram!',
    seguidores: { antes: 0, depois: 8500 },
    estrelas: 5,
  },
  {
    id: 3,
    nome: 'Ana Clara Worship',
    cargo: 'Tecladista e Professora',
    avatar: '👩‍🎤',
    texto: 'O Agente IA é incrível! Toda vez que tenho dúvida sobre o algoritmo, ele me dá a resposta na hora. É como ter um consultor particular 24 horas.',
    seguidores: { antes: 1200, depois: 22000 },
    estrelas: 5,
  },
  {
    id: 4,
    nome: 'Samuel Louvor',
    cargo: 'Cantor e Compositor',
    avatar: '🎤',
    texto: 'A estrutura Frame-a-Frame mudou completamente meus Reels. Meus vídeos agora têm 3x mais retenção e os compartilhamentos via DM triplicaram.',
    seguidores: { antes: 3500, depois: 45000 },
    estrelas: 5,
  },
  {
    id: 5,
    nome: 'Banda Céus Abertos',
    cargo: 'Banda Gospel',
    avatar: '🎸',
    texto: 'O plano de conteúdo de 60 dias salvou nossa banda. Antes não sabíamos o que postar. Agora temos série, horário e tema definidos para cada dia.',
    seguidores: { antes: 500, depois: 12000 },
    estrelas: 5,
  },
];

export default function DepoimentosSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % depoimentos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + depoimentos.length) % depoimentos.length);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % depoimentos.length);
  };

  const current = depoimentos[currentIndex];

  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(var(--theme-primary-rgb),0.05)_0%,_transparent_60%)]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--theme-primary)] font-montserrat font-bold text-sm tracking-widest uppercase">
            Histórias Reais
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Quem Já <span className="text-[var(--theme-primary)]">Transformou</span> seu Instagram
          </h2>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 sm:p-12 relative"
        >
          <Quote size={48} className="absolute top-6 left-6 text-[var(--theme-primary)] opacity-20" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar + Info */}
            <div className="text-center md:text-left shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] flex items-center justify-center text-5xl mx-auto md:mx-0 mb-4">
                {current.avatar}
              </div>
              <h4 className="font-montserrat font-bold text-text-primary">{current.nome}</h4>
              <p className="text-text-muted text-sm">{current.cargo}</p>
              
              {/* Stars */}
              <div className="flex justify-center md:justify-start gap-1 mt-2">
                {Array.from({ length: current.estrelas }).map((_, i) => (
                  <Star key={i} size={16} className="text-[var(--theme-primary)] fill-[var(--theme-primary)]" />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-text-secondary text-lg leading-relaxed mb-6 italic">
                "{current.texto}"
              </p>
              
              {/* Stats */}
              <div className="flex gap-6 flex-wrap">
                <div className="bg-dark-primary/50 rounded-xl px-6 py-3">
                  <p className="text-text-muted text-xs uppercase">Antes</p>
                  <p className="font-playfair text-2xl font-bold text-error">
                    {current.seguidores.antes.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-2xl">→</div>
                <div className="bg-dark-primary/50 rounded-xl px-6 py-3">
                  <p className="text-text-muted text-xs uppercase">Depois</p>
                  <p className="font-playfair text-2xl font-bold text-success">
                    {current.seguidores.depois.toLocaleString()}
                  </p>
                </div>
                <div className="bg-[var(--theme-primary)]/10 rounded-xl px-6 py-3 border border-[var(--theme-primary)]/20">
                  <p className="text-text-muted text-xs uppercase">Crescimento</p>
                  <p className="font-playfair text-2xl font-bold text-[var(--theme-primary)]">
                    +{Math.round(((current.seguidores.depois - current.seguidores.antes) / (current.seguidores.antes || 1)) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {depoimentos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setIsAutoPlaying(false); }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-[var(--theme-primary)] w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-[var(--theme-primary)] hover:border-[var(--theme-primary)]/30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
