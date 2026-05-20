import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/modules';

function AccordionItem({ item, isOpen, onClick }: { item: { pergunta: string; resposta: string }; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`font-montserrat font-semibold text-sm sm:text-base pr-4 transition-colors ${isOpen ? 'text-gold-primary' : 'text-text-primary group-hover:text-gold-primary'}`}>
          {item.pergunta}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-gold-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="text-text-secondary text-sm leading-relaxed pl-0">
          {item.resposta}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Perguntas <span className="text-gold-primary">Frequentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl px-6 sm:px-8"
        >
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
