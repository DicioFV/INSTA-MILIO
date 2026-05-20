import { useState } from 'react';
import { motion } from 'framer-motion';
import { viralCards } from '../data/modules';

const filtros = ['Todos', 'Reels', 'Carrosséis'];

export default function ViraisSection() {
  const [filtro, setFiltro] = useState('Todos');

  const filtered = filtro === 'Todos' 
    ? viralCards 
    : viralCards.filter(v => v.formato.toLowerCase().includes(filtro.toLowerCase().replace('éis', 'el')));

  return (
    <section id="virais" className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Inspiração Viral
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Vídeos <span className="text-gold-primary">Virais</span> do Seu Nicho
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Veja os formatos e estruturas que mais viralizam no nicho gospel — e use como inspiração
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {filtros.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filtro === f
                  ? 'gold-gradient text-dark-primary'
                  : 'bg-dark-tertiary text-text-secondary hover:text-text-primary border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((viral, i) => (
            <motion.div
              key={viral.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group hover:border-gold-primary/40 transition-all"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-gold-primary/20 to-gold-secondary/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🔥</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold-primary/20 text-gold-primary border border-gold-primary/30">
                    {viral.formato}
                  </span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-text-primary">{viral.titulo}</h3>
                <p className="text-text-muted text-sm mt-1">👤 {viral.perfil}</p>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-gold-primary text-xs font-montserrat font-bold uppercase mb-1">📊 Por que viralizou</p>
                  <p className="text-text-secondary text-sm">{viral.motivo}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gold-primary text-xs font-montserrat font-bold uppercase mb-1">⏱️ Duração</p>
                    <p className="text-text-secondary text-sm">{viral.duracao}</p>
                  </div>
                </div>
                <div className="bg-dark-primary/50 rounded-lg p-4 border-l-4 border-gold-primary">
                  <p className="text-gold-primary text-xs font-montserrat font-bold uppercase mb-1">💡 Como adaptar</p>
                  <p className="text-text-secondary text-sm">{viral.dica}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Weekly Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-2xl p-8 text-center"
        >
          <span className="text-4xl mb-4 block">📺</span>
          <h3 className="font-playfair text-2xl font-bold text-text-primary mb-3">
            Análise Semanal do YouTube
          </h3>
          <p className="text-text-secondary mb-4">
            "Top 3 Vídeos Sobre Instagram Mais Vistos na Semana" — Atualizado toda segunda-feira às 10h00
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { titulo: 'Como Viralizar Reels em 2026', canal: '@SocialExpert', views: '342K views' },
              { titulo: 'Algoritmo Instagram Atualizado', canal: '@GrowthHacker', views: '289K views' },
              { titulo: 'Reels Gospel que Explodiram', canal: '@MusicaDigital', views: '156K views' },
            ].map((video) => (
              <div key={video.titulo} className="bg-dark-primary/50 rounded-xl p-4 text-left border border-white/5 hover:border-gold-primary/20 transition-colors">
                <div className="w-full h-32 bg-dark-tertiary rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">▶️</span>
                </div>
                <h4 className="text-text-primary text-sm font-semibold mb-1">{video.titulo}</h4>
                <p className="text-text-muted text-xs">{video.canal} • {video.views}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
