import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { instaquiData } from '../data/modules';

interface InstaquiItem {
  icon: string;
  nome: string;
  desc: string;
}

function InstaquiCategory({ title, emoji, items, color }: { title: string; emoji: string; items: InstaquiItem[]; color: string }) {
  const [selectedItem, setSelectedItem] = useState<InstaquiItem | null>(null);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className={`${color} p-4 flex items-center gap-3`}>
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-montserrat font-bold text-text-primary text-base">{title}</h3>
      </div>
      <div className="p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.nome}
            onClick={() => setSelectedItem(item)}
            className="w-full flex items-center gap-3 bg-dark-primary/40 rounded-lg p-3 text-left hover:bg-gold-primary/5 hover:border-gold-primary/20 border border-transparent transition-all group"
          >
            <span className="text-xl shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-text-primary text-sm font-medium truncate group-hover:text-gold-primary transition-colors">{item.nome}</p>
              <p className="text-text-muted text-xs truncate">{item.desc}</p>
            </div>
            <ChevronRight size={16} className="text-text-muted shrink-0 group-hover:text-gold-primary transition-colors" />
          </button>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-gold-primary/20 max-w-lg w-full p-6 relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold-primary transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{selectedItem.icon}</span>
                <div>
                  <h3 className="font-montserrat font-bold text-gold-primary text-lg">{selectedItem.nome}</h3>
                  <p className="text-text-secondary text-sm">{selectedItem.desc}</p>
                </div>
              </div>

              <div className="bg-dark-primary/50 rounded-xl p-4 border border-gold-primary/10">
                <h4 className="font-montserrat font-bold text-gold-primary text-sm mb-3">💡 Dica Estratégica</h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {selectedItem.nome === 'Enquete' && 'Use enquetes diárias nos Stories para manter engajamento alto. O algoritmo valoriza interações via enquetes. Exemplo: "Qual hino tocar amanhã? 🎵 A ou B?"'}
                  {selectedItem.nome === 'Caixinha de Perguntas' && 'A caixinha é sua melhor ferramenta de pesquisa de mercado. Pergunte o que sua audiência quer ouvir/ver e use as respostas como ideias de Reels.'}
                  {selectedItem.nome === 'Trial Reels' && 'Use Trial Reels para testar ganchos diferentes. Se a retenção for alta, publique oficialmente. Zero risco de prejudicar seu perfil.'}
                  {selectedItem.nome === 'Collab' && 'Collabs dobram seu alcance instantaneamente. Procure artistas gospel com audiência similar à sua e proponha conteúdo colaborativo.'}
                  {selectedItem.nome === 'Broadcast Channel' && 'Crie um Broadcast Channel e avise seus seguidores sobre cada novo Reel. Isso garante visualizações iniciais e sinaliza qualidade ao algoritmo.'}
                  {selectedItem.nome === 'Insights' && 'Analise seus Insights semanalmente. Foque em: Alcance, Compartilhamentos e Saves. Essas são as métricas que mais importam em 2026.'}
                  {!['Enquete', 'Caixinha de Perguntas', 'Trial Reels', 'Collab', 'Broadcast Channel', 'Insights'].includes(selectedItem.nome) && 
                    `Use "${selectedItem.nome}" de forma estratégica para maximizar seu alcance. Cada funcionalidade do Instagram é uma oportunidade de engajamento e crescimento quando usada corretamente.`
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InstaquiSection() {
  return (
    <section id="instaqui" className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,160,23,0.03)_0%,_transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Guia Turístico
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            🗺️ InstAqui — <span className="text-gold-primary">Seu Guia do Instagram</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Entenda cada botão, menu e função do Instagram. Clique em qualquer item para ver dicas estratégicas.
          </p>
        </motion.div>

        {/* Phone Mockup + Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 xl:col-span-1 flex justify-center"
          >
            <div className="w-72 bg-dark-secondary rounded-[3rem] border-4 border-dark-tertiary p-3 shadow-2xl shadow-black/50">
              {/* Phone Screen */}
              <div className="bg-dark-primary rounded-[2.2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1">
                  <span className="text-text-muted text-xs font-medium">9:41</span>
                  <div className="w-20 h-6 bg-dark-secondary rounded-full" />
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 bg-text-muted/50 rounded-sm" />
                    <div className="w-3 h-3 border border-text-muted/50 rounded-sm" />
                  </div>
                </div>

                {/* Instagram Header */}
                <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <span className="font-playfair font-bold text-lg text-text-primary">Instagram</span>
                  <div className="flex items-center gap-3">
                    <span className="text-text-primary">❤️</span>
                    <span className="text-text-primary">✈️</span>
                  </div>
                </div>

                {/* Stories */}
                <div className="px-4 py-3 flex gap-3 overflow-x-hidden border-b border-white/5">
                  <div className="shrink-0 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary p-0.5">
                      <div className="w-full h-full rounded-full bg-dark-primary flex items-center justify-center text-lg">
                        🎤
                      </div>
                    </div>
                    <span className="text-[10px] text-text-muted mt-1">Seu Story</span>
                  </div>
                  {['🎹', '🙌', '🎵', '📖'].map((e, i) => (
                    <div key={i} className="shrink-0 text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-dark-primary flex items-center justify-center text-lg">
                          {e}
                        </div>
                      </div>
                      <span className="text-[10px] text-text-muted mt-1">Perfil {i + 1}</span>
                    </div>
                  ))}
                </div>

                {/* Feed Post */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gold-primary/30 flex items-center justify-center text-sm">🎤</div>
                    <span className="text-text-primary text-xs font-bold">felipevitoria</span>
                  </div>
                  <div className="w-full h-44 bg-gradient-to-br from-gold-primary/20 to-dark-tertiary rounded-lg flex items-center justify-center">
                    <span className="text-5xl">🎵</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-text-primary">❤️</span>
                    <span className="text-text-primary">💬</span>
                    <span className="text-text-primary">📤</span>
                    <span className="ml-auto text-text-primary">💾</span>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="flex items-center justify-around py-3 border-t border-white/5 bg-dark-secondary/50">
                  <span className="text-lg">🏠</span>
                  <span className="text-lg">🔍</span>
                  <span className="text-lg">➕</span>
                  <span className="text-lg">🎬</span>
                  <span className="text-lg">👤</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <InstaquiCategory
            title="Tela Inicial (Feed)"
            emoji="📱"
            items={instaquiData.telaInicial}
            color="bg-gradient-to-r from-dark-tertiary to-dark-secondary"
          />
          <InstaquiCategory
            title="Menu (≡) — Três Traços"
            emoji="⚙️"
            items={instaquiData.menuTresTracos}
            color="bg-gradient-to-r from-dark-tertiary to-dark-secondary"
          />
          <InstaquiCategory
            title="Stories — Ferramentas"
            emoji="📖"
            items={instaquiData.stories}
            color="bg-gradient-to-r from-purple-950/30 to-dark-secondary"
          />
          <InstaquiCategory
            title="Reels — Ferramentas"
            emoji="🎬"
            items={instaquiData.reels}
            color="bg-gradient-to-r from-blue-950/30 to-dark-secondary"
          />
        </div>
      </div>
    </section>
  );
}
