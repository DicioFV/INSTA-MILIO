import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { icon: '🎯', number: 60, suffix: '', label: 'Dias de Conteúdo Planejado' },
  { icon: '📹', number: 42, suffix: '+', label: 'Reels + Carrosséis Prontos' },
  { icon: '📈', number: 9, suffix: '', label: 'Semanas de Estratégia Progressiva' },
  { icon: '🔑', number: 7, suffix: '', label: 'Sinais do Algoritmo 2026 Revelados' },
  { icon: '🎤', number: 2, suffix: '', label: 'Perfis Mapeados com Estratégia' },
  { icon: '🤖', number: 1, suffix: '', label: 'Agente IA Especialista' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="font-playfair text-4xl sm:text-5xl font-bold text-gold-primary">
      {count}{suffix}
    </div>
  );
}

export default function ProvasSociais() {
  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.05)_0%,_transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Tudo que Você Precisa em <span className="text-gold-primary">Um Só Lugar</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Estratégia completa, conteúdo pronto e ferramentas exclusivas para seu crescimento no Instagram
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:border-gold-primary/30 transition-all group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <AnimatedNumber target={stat.number} suffix={stat.suffix} />
              <p className="text-text-secondary text-sm mt-2 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
