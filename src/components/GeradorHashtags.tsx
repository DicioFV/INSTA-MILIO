import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hash, Copy, RefreshCw, X, Check } from 'lucide-react';

const hashtagDatabase = {
  geral: {
    alta: ['#Gospel', '#MúsicaGospel', '#Adoração', '#Louvor', '#Worship'],
    media: ['#HinosGospel', '#GospelBrasil', '#LouvoreAdoração', '#MúsicaCristã', '#AdoraçãoADeus'],
    nicho: ['#GospelAcústico', '#HinosClássicos', '#GospelContemporâneo', '#MúsicosCristãos', '#MinistérioDeLouvor'],
  },
  cantor: {
    alta: ['#CantorGospel', '#VozGospel', '#Cantora', '#Gospel2026', '#Louvor'],
    media: ['#CantorCristão', '#VozDeDeus', '#AdoradorDeVerdade', '#CantoraGospel', '#LouvorEAdoração'],
    nicho: ['#CantorMinistro', '#VozProfética', '#CantandoParaDeus', '#MinistérioDeAdoração', '#CantorBrasileiro'],
  },
  tecladista: {
    alta: ['#Teclado', '#TecladoGospel', '#Piano', '#Keyboard', '#Worship'],
    media: ['#TecladistaGospel', '#PianoWorship', '#AcordesGospel', '#TecladoBrasil', '#MúsicoGospel'],
    nicho: ['#TecladistaCristão', '#AcordesDeAdoração', '#TecladoWorshipBR', '#PianistaGospel', '#HarmoniaGospel'],
  },
  violao: {
    alta: ['#Violão', '#ViolãoGospel', '#Guitar', '#Acústico', '#Worship'],
    media: ['#ViolãoAcústico', '#ViolonistaCristão', '#GuitarWorship', '#ViolãoBrasil', '#MúsicaAcústica'],
    nicho: ['#ViolãoDeAdoração', '#FingerstyleGospel', '#ViolãoMinistério', '#AcústicoGospel', '#ViolonistaBrasileiro'],
  },
  igreja: {
    alta: ['#Igreja', '#Culto', '#Celebração', '#Ministério', '#Cristo'],
    media: ['#IgrejaBrasil', '#CultoDominical', '#CelebraçãoDeDeus', '#MinistérioDeMusica', '#PalavraDeeus'],
    nicho: ['#IgrejaCristã', '#CultoDeAdoração', '#CelebraçãoGospel', '#MinistérioLocal', '#ComunidadeCristã'],
  },
};

type NichoType = keyof typeof hashtagDatabase;

export default function GeradorHashtags() {
  const [isOpen, setIsOpen] = useState(false);
  const [nicho, setNicho] = useState<NichoType>('geral');
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    const db = hashtagDatabase[nicho];
    const selected: string[] = [];
    
    // 1-2 alta competição
    const alta = [...db.alta].sort(() => Math.random() - 0.5).slice(0, 2);
    // 2-3 média competição
    const media = [...db.media].sort(() => Math.random() - 0.5).slice(0, 2);
    // 1-2 nicho específico
    const nichoTags = [...db.nicho].sort(() => Math.random() - 0.5).slice(0, 1);

    selected.push(...alta, ...media, ...nichoTags);
    setGenerated(selected);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-[var(--theme-primary)]/30 transition-all w-full text-left"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
          <Hash size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Gerador de Hashtags</h4>
          <p className="text-text-muted text-sm">Hashtags estratégicas para 2026</p>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
                  <Hash size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Gerador de Hashtags</h3>
                  <p className="text-text-muted text-sm">Otimizadas para Instagram 2026</p>
                </div>
              </div>

              {/* Niche Selection */}
              <div className="mb-6">
                <label className="text-text-muted text-sm mb-2 block">Selecione seu nicho:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'geral', label: '🎵 Geral' },
                    { key: 'cantor', label: '🎤 Cantor' },
                    { key: 'tecladista', label: '🎹 Teclado' },
                    { key: 'violao', label: '🎸 Violão' },
                    { key: 'igreja', label: '⛪ Igreja' },
                  ].map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setNicho(n.key as NichoType)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        nicho === n.key
                          ? 'bg-[var(--theme-primary)] text-dark-primary'
                          : 'bg-dark-primary/50 text-text-secondary border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateHashtags}
                className="w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary mb-6 flex items-center justify-center gap-2"
                style={{ background: 'var(--theme-gradient)' }}
              >
                <Hash size={18} />
                Gerar Hashtags
              </button>

              {/* Generated Hashtags */}
              <AnimatePresence>
                {generated.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="bg-dark-primary/50 rounded-xl p-4 border border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-text-muted text-xs">{generated.length} hashtags geradas</span>
                        <div className="flex gap-2">
                          <button
                            onClick={generateHashtags}
                            className="p-2 rounded-lg bg-dark-tertiary text-text-muted hover:text-text-primary transition-colors"
                            title="Regenerar"
                          >
                            <RefreshCw size={14} />
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className="p-2 rounded-lg bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/30 transition-colors"
                            title="Copiar todas"
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {generated.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="px-3 py-1.5 bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/20 rounded-full text-[var(--theme-primary)] text-sm"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-text-muted text-xs">💡 Dicas de uso:</p>
                      <ul className="text-text-muted text-xs space-y-1">
                        <li>• Use 3-5 hashtags por post (recomendação 2026)</li>
                        <li>• Coloque no final da legenda ou primeiro comentário</li>
                        <li>• Varie as hashtags entre posts</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
