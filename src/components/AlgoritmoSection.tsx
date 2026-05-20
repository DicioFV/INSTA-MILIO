import { motion } from 'framer-motion';
import { algorithmSignals } from '../data/modules';

export default function AlgoritmoSection() {
  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,160,23,0.05)_0%,_transparent_60%)]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Algoritmo Revelado
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Os 7 Sinais do <span className="text-gold-primary">Algoritmo 2026</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Entenda o que o Instagram realmente valoriza para decidir quem vê seu conteúdo
          </p>
        </motion.div>

        <div className="space-y-6">
          {algorithmSignals.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 sm:p-6 hover:border-gold-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{signal.icon}</span>
                  <div>
                    <h3 className="font-montserrat font-bold text-text-primary text-sm sm:text-base">
                      #{i + 1} {signal.label}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-sm">{signal.description}</p>
                  </div>
                </div>
                <span className="font-playfair text-2xl sm:text-3xl font-bold text-gold-primary">
                  {signal.percent}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-3 bg-dark-primary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${signal.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #D4A017, ${signal.percent > 70 ? '#22C55E' : signal.percent > 50 ? '#F5C842' : '#EF4444'})`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
