import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, RefreshCw, X, Check } from 'lucide-react';

const templates = {
  emocional: {
    nome: 'Emocional / Testemunho',
    emoji: '💖',
    estrutura: [
      '[EMOÇÃO forte no início]',
      '',
      '[História pessoal em 2-3 linhas]',
      '',
      '[Conexão com o hino/música]',
      '',
      '[Pergunta para engajamento]',
      '',
      '.',
      '.',
      '[3-5 hashtags]',
    ],
  },
  educativo: {
    nome: 'Educativo / Tutorial',
    emoji: '📚',
    estrutura: [
      '🎹 [TÍTULO CHAMATIVO]',
      '',
      '[Contexto do que vai ensinar]',
      '',
      '✅ Passo 1: [...]',
      '✅ Passo 2: [...]',
      '✅ Passo 3: [...]',
      '',
      '💾 Salva esse post para praticar depois!',
      '',
      '.',
      '.',
      '[3-5 hashtags]',
    ],
  },
  nostalgia: {
    nome: 'Nostalgia / Memória',
    emoji: '🕯️',
    estrutura: [
      '🎵 [Nome do hino]',
      '',
      '"[Trecho da letra]"',
      '',
      '[Memória pessoal ligada ao hino]',
      '',
      'Você lembra quando cantava isso? 👇',
      'Marca alguém que ama esse hino!',
      '',
      '.',
      '.',
      '[3-5 hashtags]',
    ],
  },
  bastidores: {
    nome: 'Bastidores / Making Of',
    emoji: '🎬',
    estrutura: [
      '🎤 Por trás das câmeras...',
      '',
      '[O que estava acontecendo]',
      '',
      '[Detalhe interessante ou engraçado]',
      '',
      '[Aprendizado ou reflexão]',
      '',
      'Você gosta de ver os bastidores? 🎬',
      '',
      '.',
      '.',
      '[3-5 hashtags]',
    ],
  },
  chamadaAcao: {
    nome: 'Call to Action Forte',
    emoji: '🚀',
    estrutura: [
      '⚡ [GANCHO IRRESISTÍVEL]',
      '',
      '[Promessa de valor em 1 linha]',
      '',
      '[Por que isso é importante]',
      '',
      '👇 Comenta "[palavra]" que eu te mando no direct!',
      '',
      '💾 Salva • ❤️ Curte • 📤 Compartilha',
      '',
      '.',
      '.',
      '[3-5 hashtags]',
    ],
  },
};

const hashtagSuggestions = {
  gospel: ['#HinosGospel', '#MúsicaGospel', '#Adoração', '#LouvoreAdoração', '#GospelBrasil'],
  teclado: ['#TecladoGospel', '#TecladistaGospel', '#AcordesGospel', '#MúsicosCristãos', '#TecladoWorship'],
  cantor: ['#CantorGospel', '#VozGospel', '#MinistérioDeLouvor', '#AdoradorDeVerdade', '#CantorCristão'],
};

export default function GeradorLegendas() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof templates | null>(null);
  const [tema, setTema] = useState('');
  const [nicho, setNicho] = useState<'gospel' | 'teclado' | 'cantor'>('gospel');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [copied, setCopied] = useState(false);

  const generateCaption = () => {
    if (!selectedTemplate || !tema) return;
    
    const template = templates[selectedTemplate];
    const hashtags = hashtagSuggestions[nicho].slice(0, 5).join(' ');
    
    let caption = template.estrutura.join('\n')
      .replace('[3-5 hashtags]', hashtags)
      .replace('[EMOÇÃO forte no início]', `🎵 ${tema} me tocou de um jeito especial...`)
      .replace('[TÍTULO CHAMATIVO]', tema.toUpperCase())
      .replace('[Nome do hino]', tema)
      .replace('[GANCHO IRRESISTÍVEL]', `Você PRECISA ouvir isso!`);

    setGeneratedCaption(caption);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCaption);
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
          <Sparkles size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Gerador de Legendas</h4>
          <p className="text-text-muted text-sm">Crie legendas otimizadas com IA</p>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-2xl w-full p-6 my-8 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
                  <Sparkles size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Gerador de Legendas</h3>
                  <p className="text-text-muted text-sm">Escolha um template e personalize</p>
                </div>
              </div>

              {/* Template Selection */}
              <div className="mb-6">
                <label className="text-text-muted text-sm mb-2 block">Tipo de Legenda</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.entries(templates) as [keyof typeof templates, typeof templates.emocional][]).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedTemplate(key)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        selectedTemplate === key
                          ? 'bg-[var(--theme-primary)]/20 border-2 border-[var(--theme-primary)]'
                          : 'bg-dark-primary/50 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{value.emoji}</span>
                      <span className="text-sm text-text-primary font-medium">{value.nome}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Input */}
              <div className="mb-4">
                <label className="text-text-muted text-sm mb-2 block">Tema / Hino / Assunto</label>
                <input
                  type="text"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder="Ex: Lugar Secreto, Grandioso és Tu..."
                  className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-[var(--theme-primary)] focus:outline-none"
                />
              </div>

              {/* Niche Selection */}
              <div className="mb-6">
                <label className="text-text-muted text-sm mb-2 block">Seu Nicho (para hashtags)</label>
                <div className="flex gap-2">
                  {[
                    { key: 'gospel', label: '🎤 Gospel Geral' },
                    { key: 'teclado', label: '🎹 Tecladista' },
                    { key: 'cantor', label: '🎙️ Cantor' },
                  ].map((n) => (
                    <button
                      key={n.key}
                      onClick={() => setNicho(n.key as typeof nicho)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        nicho === n.key
                          ? 'bg-[var(--theme-primary)] text-dark-primary'
                          : 'bg-dark-primary/50 text-text-secondary border border-white/10'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCaption}
                disabled={!selectedTemplate || !tema}
                className="w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary mb-6 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                style={{ background: 'var(--theme-gradient)' }}
              >
                <Sparkles size={18} />
                Gerar Legenda
              </button>

              {/* Generated Caption */}
              <AnimatePresence>
                {generatedCaption && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="bg-dark-primary/50 rounded-xl p-4 border border-white/10 relative">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-text-muted text-xs">Legenda Gerada:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={generateCaption}
                            className="p-2 rounded-lg bg-dark-tertiary text-text-muted hover:text-text-primary transition-colors"
                            title="Regenerar"
                          >
                            <RefreshCw size={14} />
                          </button>
                          <button
                            onClick={copyToClipboard}
                            className="p-2 rounded-lg bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/30 transition-colors"
                            title="Copiar"
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                      <pre className="text-text-primary text-sm whitespace-pre-wrap font-sans leading-relaxed">
                        {generatedCaption}
                      </pre>
                    </div>
                    <p className="text-text-muted text-xs text-center mt-3">
                      💡 Dica: Personalize os campos entre [colchetes] antes de usar!
                    </p>
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
