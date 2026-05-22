import { motion } from 'framer-motion';
import CalculadoraEngajamento from './CalculadoraEngajamento';
import GeradorLegendas from './GeradorLegendas';
import SimuladorCrescimento from './SimuladorCrescimento';
import GeradorHashtags from './GeradorHashtags';
import QuizInstagram from './QuizInstagram';
import AudioPlayer from './AudioPlayer';

export default function FerramentasSection() {
  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(var(--theme-primary-rgb),0.05)_0%,_transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[var(--theme-primary)] font-montserrat font-bold text-sm tracking-widest uppercase">
            Ferramentas Interativas
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Ferramentas <span className="text-[var(--theme-primary)]">Exclusivas</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Use nossas ferramentas para otimizar sua estratégia e acelerar seu crescimento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <CalculadoraEngajamento />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <GeradorLegendas />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <SimuladorCrescimento />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GeradorHashtags />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <QuizInstagram />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <AudioPlayer />
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}
