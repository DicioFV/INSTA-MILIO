import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, X, Heart, Share2 } from 'lucide-react';

interface Hino {
  id: string;
  titulo: string;
  artista: string;
  duracao: string;
  categoria: string;
  emoji: string;
}

// Lista de hinos (simulados - sem áudio real)
const hinos: Hino[] = [
  { id: '1', titulo: 'Lugar Secreto', artista: 'Gabriela Rocha', duracao: '4:32', categoria: 'Adoração', emoji: '🙏' },
  { id: '2', titulo: 'Grandioso és Tu', artista: 'Hino Clássico', duracao: '3:45', categoria: 'Clássico', emoji: '⛪' },
  { id: '3', titulo: 'Quão Grande é o Meu Deus', artista: 'Soraya Moraes', duracao: '5:12', categoria: 'Adoração', emoji: '✨' },
  { id: '4', titulo: 'Oceanos', artista: 'Hillsong', duracao: '4:58', categoria: 'Contemporâneo', emoji: '🌊' },
  { id: '5', titulo: 'Deus de Promessas', artista: 'Davi Sacer', duracao: '4:15', categoria: 'Adoração', emoji: '🕊️' },
  { id: '6', titulo: 'Alvo Mais Que a Neve', artista: 'Hino Clássico', duracao: '3:20', categoria: 'Clássico', emoji: '❄️' },
  { id: '7', titulo: 'Faz Chover', artista: 'Fernandinho', duracao: '5:45', categoria: 'Adoração', emoji: '🌧️' },
  { id: '8', titulo: 'Raridade', artista: 'Anderson Freire', duracao: '4:22', categoria: 'Contemporâneo', emoji: '💎' },
];

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHino, setSelectedHino] = useState<Hino | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [filtro, setFiltro] = useState('Todos');
  const [curtidos, setCurtidos] = useState<string[]>([]);

  const categorias = ['Todos', 'Adoração', 'Clássico', 'Contemporâneo'];
  
  const hinosFiltrados = filtro === 'Todos' 
    ? hinos 
    : hinos.filter(h => h.categoria === filtro);

  const toggleCurtir = (id: string) => {
    setCurtidos(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const playHino = (hino: Hino) => {
    setSelectedHino(hino);
    setIsPlaying(true);
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
          <Music size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Biblioteca de Hinos</h4>
          <p className="text-text-muted text-sm">Inspiração para seus Reels</p>
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
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-lg w-full p-6 my-8 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
                  <Music size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Biblioteca de Hinos</h3>
                  <p className="text-text-muted text-sm">Ideias para seus próximos Reels</p>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFiltro(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                      filtro === cat
                        ? 'bg-[var(--theme-primary)] text-dark-primary'
                        : 'bg-dark-tertiary text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Lista de Hinos */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {hinosFiltrados.map(hino => (
                  <motion.div
                    key={hino.id}
                    layout
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                      selectedHino?.id === hino.id
                        ? 'bg-[var(--theme-primary)]/10 border border-[var(--theme-primary)]/30'
                        : 'bg-dark-primary/50 hover:bg-dark-primary/80'
                    }`}
                    onClick={() => playHino(hino)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-dark-tertiary flex items-center justify-center text-xl">
                      {hino.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text-primary text-sm truncate">{hino.titulo}</h4>
                      <p className="text-text-muted text-xs">{hino.artista} • {hino.duracao}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleCurtir(hino.id); }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          curtidos.includes(hino.id)
                            ? 'text-red-400'
                            : 'text-text-muted hover:text-red-400'
                        }`}
                      >
                        <Heart size={16} fill={curtidos.includes(hino.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg text-text-muted hover:text-[var(--theme-primary)] transition-colors"
                      >
                        <Share2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Player Mini */}
              <AnimatePresence>
                {selectedHino && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-4 p-4 rounded-xl border border-[var(--theme-primary)]/20"
                    style={{ background: 'var(--theme-gradient)' }}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 rounded-full bg-dark-primary flex items-center justify-center text-[var(--theme-primary)]"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-dark-primary truncate">{selectedHino.titulo}</h4>
                        <p className="text-dark-primary/70 text-sm">{selectedHino.artista}</p>
                      </div>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 text-dark-primary/70 hover:text-dark-primary transition-colors"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                    
                    {/* Progress Bar (visual only) */}
                    <div className="mt-3 h-1 bg-dark-primary/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-dark-primary"
                        initial={{ width: '0%' }}
                        animate={{ width: isPlaying ? '100%' : '30%' }}
                        transition={{ duration: isPlaying ? 30 : 0.3 }}
                      />
                    </div>
                    
                    <p className="text-center text-dark-primary/50 text-xs mt-2">
                      🎵 Use este hino como inspiração para seu próximo Reel!
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
