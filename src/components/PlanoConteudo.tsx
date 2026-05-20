import { useState } from 'react';
import { motion } from 'framer-motion';

const perfis = [
  {
    nome: 'Felipe Vitória — Cantor Gospel',
    emoji: '🎤',
    color: 'gold-primary',
    stories: [
      { hora: '8h00', icon: '🌅', titulo: 'Devocional do dia', desc: 'Versículo + reflexão pessoal' },
      { hora: '12h00', icon: '🎵', titulo: 'Trecho de música', desc: 'Música que está ensaiando' },
      { hora: '15h00', icon: '💬', titulo: 'Caixinha / Enquete', desc: 'Interação direta com seguidores' },
      { hora: '18h00', icon: '🎤', titulo: 'Bastidores', desc: 'Ensaio ou gravação' },
      { hora: '21h00', icon: '🙏', titulo: 'Encerramento', desc: 'Mensagem de fé' },
    ],
    reels: [
      { dia: 'Segunda', icon: '❤️', serie: 'Hinos que me marcaram', formato: 'Cantar trecho + história pessoal + CTA emocional' },
      { dia: 'Quarta', icon: '🎵', serie: 'Você Lembra Desse Louvor?', formato: 'Intro do hino + pergunta + call to DM' },
      { dia: 'Sexta', icon: '🙌', serie: 'Adoração ao Vivo', formato: 'Mini-performance intimista (60s máx)' },
      { dia: 'Domingo', icon: '🎤', serie: 'Palavra + Música', formato: 'Versículo cantado / meditado' },
    ],
    posts: [
      { dia: 'Terça', icon: '📖', tema: '5 hinos para ouvir quando estiver triste', formato: 'Carrossel com capa chamativa' },
      { dia: 'Quinta', icon: '📊', tema: 'Bastidores, making of, processo', formato: 'Post com foto + legenda longa' },
    ],
    lives: [
      { freq: '1-2x/mês', tema: 'Noite de Adoração ao Vivo', formato: 'Conteúdo puro de worship' },
      { freq: '1x/mês', tema: 'Bate-papo + Pedidos', formato: 'Interação com fãs' },
    ],
  },
  {
    nome: 'Teclado Felipe Vitória',
    emoji: '🎹',
    color: 'info',
    stories: [
      { hora: '9h00', icon: '🌅', titulo: 'Dica rápida de teclado', desc: '30 segundos de valor' },
      { hora: '13h00', icon: '🎹', titulo: 'Acorde do dia', desc: 'Demonstração prática' },
      { hora: '16h00', icon: '❓', titulo: 'Quiz musical', desc: '"Você sabe o nome desse acorde?"' },
      { hora: '19h00', icon: '🎵', titulo: 'Música sendo aprendida', desc: 'Processo de estudo' },
      { hora: '22h00', icon: '💡', titulo: 'Dica de prática', desc: 'Para o dia seguinte' },
    ],
    reels: [
      { dia: 'Segunda', icon: '🎹', serie: 'Acorde que muda tudo', formato: 'Toca + mostra nome + ensina posição' },
      { dia: 'Terça', icon: '🎵', serie: 'Aprenda em 30 segundos', formato: 'Intro de hino clássico gospel' },
      { dia: 'Quinta', icon: '💡', serie: 'Erro que todo tecladista comete', formato: 'Erro → solução → resultado' },
      { dia: 'Sexta', icon: '🔥', serie: 'Cover Viral', formato: 'Versão no teclado de música em alta' },
      { dia: 'Sábado', icon: '🎤', serie: 'Pedido dos Seguidores', formato: 'Toca o que pediram no DM' },
    ],
    posts: [
      { dia: 'Segunda', icon: '📖', tema: '5 acordes gospel essenciais', formato: 'Carrossel educativo' },
      { dia: 'Quarta', icon: '🎹', tema: 'Partituras/cifras simplificadas', formato: 'Carrossel com cifras' },
      { dia: 'Sexta', icon: '📊', tema: 'Dicas de equipamento/setup', formato: 'Post com fotos do setup' },
    ],
    lives: [
      { freq: '2-4x/mês', tema: 'Masterclass ao vivo de teclado gospel', formato: 'Ensino prático' },
      { freq: '1x/mês', tema: 'Tocando pedidos ao vivo', formato: 'Interação musical' },
    ],
  },
];

export default function PlanoConteudo() {
  const [activePerfil, setActivePerfil] = useState(0);
  const perfil = perfis[activePerfil];

  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,160,23,0.03)_0%,_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Plano Personalizado
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Plano de Conteúdo <span className="text-gold-primary">por Perfil</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-4 mb-10">
          {perfis.map((p, i) => (
            <button
              key={p.nome}
              onClick={() => setActivePerfil(i)}
              className={`px-6 py-3 rounded-full font-montserrat font-bold text-sm transition-all ${
                activePerfil === i
                  ? 'gold-gradient text-dark-primary shadow-lg shadow-gold-primary/20'
                  : 'bg-dark-tertiary text-text-secondary hover:text-text-primary border border-white/10'
              }`}
            >
              {p.emoji} {p.nome.split(' — ')[1] || p.nome}
            </button>
          ))}
        </div>

        <motion.div
          key={activePerfil}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Stories */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-gold-primary text-lg mb-4">
              📱 Stories (Diário — 3 a 5 por dia)
            </h3>
            <div className="space-y-3">
              {perfil.stories.map((s) => (
                <div key={s.hora} className="flex items-center gap-3 bg-dark-primary/40 rounded-lg p-3">
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex-1">
                    <span className="text-gold-primary font-mono text-xs">{s.hora}</span>
                    <p className="text-text-primary text-sm font-semibold">{s.titulo}</p>
                    <p className="text-text-muted text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reels */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-gold-primary text-lg mb-4">
              🎬 Reels ({perfil.reels.length}x por semana)
            </h3>
            <div className="space-y-3">
              {perfil.reels.map((r) => (
                <div key={r.dia} className="flex items-start gap-3 bg-dark-primary/40 rounded-lg p-3">
                  <span className="text-lg">{r.icon}</span>
                  <div className="flex-1">
                    <span className="text-gold-primary font-mono text-xs">{r.dia}</span>
                    <p className="text-text-primary text-sm font-semibold">{r.serie}</p>
                    <p className="text-text-muted text-xs">{r.formato}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts/Carrosséis */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-gold-primary text-lg mb-4">
              📸 Posts/Carrosséis ({perfil.posts.length}x por semana)
            </h3>
            <div className="space-y-3">
              {perfil.posts.map((p) => (
                <div key={p.dia} className="flex items-start gap-3 bg-dark-primary/40 rounded-lg p-3">
                  <span className="text-lg">{p.icon}</span>
                  <div className="flex-1">
                    <span className="text-gold-primary font-mono text-xs">{p.dia}</span>
                    <p className="text-text-primary text-sm font-semibold">{p.tema}</p>
                    <p className="text-text-muted text-xs">{p.formato}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lives */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-montserrat font-bold text-gold-primary text-lg mb-4">
              🔴 Lives ({perfil.lives.length > 2 ? '2–4' : '1–2'}x por mês)
            </h3>
            <div className="space-y-3">
              {perfil.lives.map((l) => (
                <div key={l.tema} className="flex items-start gap-3 bg-dark-primary/40 rounded-lg p-3">
                  <span className="text-lg">🎤</span>
                  <div className="flex-1">
                    <span className="text-gold-primary font-mono text-xs">{l.freq}</span>
                    <p className="text-text-primary text-sm font-semibold">{l.tema}</p>
                    <p className="text-text-muted text-xs">{l.formato}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
