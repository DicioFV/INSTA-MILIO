import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Lock, Check } from 'lucide-react';
import { recursos } from '../data/modules';

interface RecursosProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export default function RecursosSection({ isLoggedIn, onLoginClick }: RecursosProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Materiais Exclusivos
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Ferramentas e <span className="text-gold-primary">Recursos</span> Gratuitos
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Tudo que você precisa para acelerar seu crescimento, pronto para baixar e usar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recursos.map((recurso, i) => (
            <motion.div
              key={recurso.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-5 hover:border-gold-primary/30 transition-all group"
            >
              <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform">{recurso.icon}</span>
              <h3 className="font-montserrat font-bold text-text-primary text-sm mb-2">{recurso.titulo}</h3>
              <p className="text-text-muted text-xs mb-4">{recurso.desc}</p>
              
              {isLoggedIn ? (
                <button className="flex items-center gap-2 text-gold-primary text-sm font-semibold hover:text-gold-secondary transition-colors">
                  <Download size={16} />
                  Baixar
                </button>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 text-text-muted text-sm hover:text-gold-primary transition-colors"
                >
                  <Lock size={16} />
                  Login para baixar
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Email Capture */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-card rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto"
          >
            <span className="text-4xl mb-4 block">🎁</span>
            <h3 className="font-playfair text-2xl font-bold text-text-primary mb-3">
              Receba o Pack Completo Grátis
            </h3>
            <p className="text-text-secondary mb-6">
              Digite seu email e receba todos os materiais + dicas exclusivas semanalmente
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-3 text-success font-semibold">
                <Check size={24} />
                <span>Email cadastrado com sucesso! Verifique sua caixa de entrada.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full pl-12 pr-4 py-3 bg-dark-primary border border-white/10 rounded-full text-text-primary placeholder-text-muted focus:border-gold-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 gold-gradient rounded-full font-montserrat font-bold text-dark-primary hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Enviar Pack →
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
