import { motion } from 'framer-motion';
import { seriesFixas } from '../data/modules';

export default function SeriesSection() {
  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Consistência é Chave
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            As 5 Séries Fixas de <span className="text-gold-primary">Conteúdo</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Séries criam expectativa, fidelizam audiência e facilitam a produção de conteúdo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seriesFixas.map((serie, i) => (
            <motion.div
              key={serie.nome}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 bg-gradient-to-br ${serie.color} border border-white/10 hover:border-gold-primary/30 transition-all group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{serie.emoji}</div>
              <h3 className="font-montserrat font-bold text-text-primary text-lg mb-2">{serie.nome}</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <p><span className="text-gold-primary font-semibold">Perfil:</span> {serie.perfil}</p>
                <p><span className="text-gold-primary font-semibold">Dia:</span> {serie.dia}</p>
                <p><span className="text-gold-primary font-semibold">Tom:</span> {serie.tom}</p>
              </div>
              <div className="mt-4 bg-dark-primary/30 rounded-lg p-3">
                <p className="text-xs text-gold-primary font-montserrat font-bold uppercase mb-1">Formato:</p>
                <p className="text-text-secondary text-sm">{serie.formato}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
