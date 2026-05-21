import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: '📱',
    title: 'Configure seu Perfil',
    description: 'Use nosso checklist do Módulo 1 para criar o perfil perfeito com bio otimizada para SEO.',
    color: 'from-blue-500/20 to-blue-600/10',
  },
  {
    number: '02',
    icon: '📅',
    title: 'Siga o Cronograma',
    description: '60 dias de conteúdo planejado. Saiba exatamente o que postar, quando e como.',
    color: 'from-purple-500/20 to-purple-600/10',
  },
  {
    number: '03',
    icon: '🎬',
    title: 'Crie Reels que Viralizam',
    description: 'Aplique a estrutura Frame-a-Frame em cada vídeo. Ganchos, keywords, CTAs perfeitos.',
    color: 'from-pink-500/20 to-pink-600/10',
  },
  {
    number: '04',
    icon: '📊',
    title: 'Analise e Ajuste',
    description: 'Use nosso Agente IA para dicas personalizadas e análise de perfil em tempo real.',
    color: 'from-green-500/20 to-green-600/10',
  },
  {
    number: '05',
    icon: '🚀',
    title: 'Cresça com Propósito',
    description: 'Alcance milhares de pessoas com sua mensagem. Do zero ao viral com autenticidade.',
    color: 'from-gold-primary/20 to-gold-secondary/10',
  },
];

export default function ComoFuncionaSection() {
  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.03)_0%,_transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Passo a Passo
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Como <span className="text-gold-primary">Funciona</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Um sistema completo para transformar seu Instagram em 60 dias
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-primary/50 via-gold-primary/20 to-transparent" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`inline-block bg-gradient-to-br ${step.color} rounded-2xl p-6 border border-white/5`}>
                    <div className={`flex items-center gap-4 mb-3 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-3xl">{step.icon}</span>
                      <div>
                        <span className="text-gold-primary/50 font-mono text-sm">PASSO</span>
                        <h3 className="font-montserrat font-bold text-text-primary text-lg">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Number Circle */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold-primary/20">
                    <span className="font-playfair font-bold text-dark-primary text-lg">{step.number}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-gold-primary/30 absolute left-1/2 -translate-x-1/2 top-full" />
                  )}
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#modulos"
            className="inline-flex items-center gap-3 px-8 py-4 gold-gradient rounded-full font-montserrat font-bold text-dark-primary text-lg shadow-xl shadow-gold-primary/20 hover:shadow-gold-primary/40 transition-shadow"
          >
            🚀 Começar Minha Jornada
          </a>
        </motion.div>
      </div>
    </section>
  );
}
