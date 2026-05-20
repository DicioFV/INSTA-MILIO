import { motion } from 'framer-motion';
import { errosInstagram } from '../data/modules';

export default function ErrosSection() {
  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-error font-montserrat font-bold text-sm tracking-widest uppercase">
            Atenção Total
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            O Que <span className="text-error">NÃO</span> Fazer no Instagram
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Esses erros silenciosos estão destruindo seu alcance. Pare de sabotar seu crescimento agora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {errosInstagram.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-red-950/20 border border-red-900/30 rounded-xl p-5 hover:border-red-700/40 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">❌</span>
                <div>
                  <h3 className="font-montserrat font-bold text-text-primary text-sm mb-1">
                    {item.erro}
                  </h3>
                  <p className="text-red-300/70 text-sm leading-relaxed">
                    → {item.explicacao}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
