import { motion } from 'framer-motion';
import { Bot, Zap, Brain, RefreshCw, Shield, MessageSquare } from 'lucide-react';

export default function AgenteSection() {
  return (
    <section id="agente" className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,160,23,0.04)_0%,_transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Inteligência Artificial
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            🤖 Agente do Instagram — <span className="text-gold-primary">IA Especialista</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Seu consultor pessoal de Instagram disponível 24/7. Especializado no algoritmo 2026 e no nicho gospel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Features */}
          <div className="space-y-4">
            {[
              { icon: Brain, title: 'Base de Conhecimento Especializada', desc: 'Treinado com dados oficiais da Meta, Instagram Creator Academy e Adam Mosseri.' },
              { icon: RefreshCw, title: 'Atualização Semanal', desc: 'Todo domingo às 23h59, o Agente recebe as últimas mudanças do algoritmo.' },
              { icon: Zap, title: 'Respostas Instantâneas', desc: 'Pergunte sobre horários, hashtags, Reels, Trial Reels, collabs e muito mais.' },
              { icon: Shield, title: 'Personalizado para Gospel', desc: 'Respostas adaptadas para cantores, músicos e adoradores.' },
              { icon: MessageSquare, title: 'Dicas Contextuais', desc: 'Sugestões baseadas no dia e horário — sempre relevantes.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 glass-card rounded-xl p-4 hover:border-gold-primary/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shrink-0">
                  <feature.icon size={20} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-text-primary text-sm">{feature.title}</h3>
                  <p className="text-text-muted text-xs mt-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Chat Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="gold-gradient p-4 flex items-center gap-3">
              <Bot size={24} className="text-dark-primary" />
              <div>
                <h3 className="font-montserrat font-bold text-dark-primary text-sm">Agente do Instagram</h3>
                <p className="text-dark-primary/70 text-xs">IA Especialista • Online</p>
              </div>
            </div>

            {/* Chat Messages Preview */}
            <div className="p-4 space-y-4 min-h-[350px]">
              {/* Agent welcome */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-dark-primary" />
                </div>
                <div className="bg-dark-tertiary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <p className="text-text-primary text-sm">Olá! 👋 Sou o Agente Instagram. Pergunte qualquer coisa sobre crescer no Instagram!</p>
                </div>
              </div>

              {/* User question */}
              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-dark-tertiary border border-white/10 flex items-center justify-center shrink-0">
                  <span className="text-xs">👤</span>
                </div>
                <div className="gold-gradient rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                  <p className="text-dark-primary text-sm font-medium">Qual o melhor horário para postar Reels?</p>
                </div>
              </div>

              {/* Agent response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-dark-primary" />
                </div>
                <div className="bg-dark-tertiary rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <p className="text-text-primary text-sm">
                    Os melhores horários em 2026 são:<br />
                    📌 <strong>12h-13h</strong> (almoço)<br />
                    📌 <strong>18h-19h</strong> (saída do trabalho)<br />
                    📌 <strong>21h-22h</strong> (relaxamento)<br /><br />
                    Para gospel, <strong>domingos às 20h</strong> performam muito bem! 🙏
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 border-t border-white/5 text-center">
              <p className="text-text-muted text-xs mb-3">Clique no botão 🤖 no canto inferior direito para conversar</p>
              <div className="bg-dark-primary rounded-xl p-3 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Pergunte sobre Instagram..."
                  className="flex-1 bg-transparent text-text-muted text-sm focus:outline-none"
                  disabled
                />
                <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center opacity-50">
                  <span className="text-dark-primary text-sm">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
