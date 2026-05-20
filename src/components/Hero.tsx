import { motion } from 'framer-motion';
import { Play, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/80 via-dark-primary/70 to-dark-primary" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/60 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gold-secondary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-gold-primary text-sm mb-8"
          >
            <span className="w-2 h-2 bg-gold-primary rounded-full animate-pulse" />
            Atualizado com o Algoritmo 2026
          </motion.div>

          {/* Headline */}
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-text-primary">Do Zero ao Viral:</span>
            <br />
            <span className="shimmer-text">O Sistema Completo</span>
            <br />
            <span className="text-text-primary">para Explodir no Instagram</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-text-secondary leading-relaxed mb-10">
            Estratégia baseada no algoritmo real de 2026. Para cantores, músicos e adoradores 
            que querem alcançar almas — e escalar sua presença nas redes sociais{' '}
            <span className="text-gold-primary font-semibold">com propósito.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#modulos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 font-montserrat font-bold text-dark-primary gold-gradient rounded-full text-lg shadow-xl shadow-gold-primary/20 hover:shadow-gold-primary/40 transition-shadow w-full sm:w-auto justify-center"
            >
              <Play size={20} fill="currentColor" />
              Começar do Zero no Instagram
            </motion.a>
            <motion.a
              href="#analise"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 font-montserrat font-semibold text-text-primary border-2 border-white/20 rounded-full text-lg hover:border-gold-primary/50 hover:bg-gold-primary/5 transition-all w-full sm:w-auto justify-center"
            >
              <BarChart3 size={20} />
              Analisar Meu Perfil Agora
            </motion.a>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="text-success">✓</span> 100% Gratuito
            </span>
            <span className="flex items-center gap-2">
              <span className="text-success">✓</span> Estratégias Orgânicas
            </span>
            <span className="flex items-center gap-2">
              <span className="text-success">✓</span> Atualizado 2026
            </span>
            <span className="flex items-center gap-2">
              <span className="text-success">✓</span> Focado em Gospel
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gold-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
        </div>
      </motion.div>
    </section>
  );
}
