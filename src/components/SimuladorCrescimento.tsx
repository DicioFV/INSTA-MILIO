import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, X, Calendar, Target, Zap } from 'lucide-react';

export default function SimuladorCrescimento() {
  const [isOpen, setIsOpen] = useState(false);
  const [seguidoresAtuais, setSeguidoresAtuais] = useState(500);
  const [reelsPorSemana, setReelsPorSemana] = useState(3);
  const [taxaCrescimento, setTaxaCrescimento] = useState(5); // % por semana
  const [meses, setMeses] = useState(6);

  const projecao = useMemo(() => {
    const semanas = meses * 4;
    let seguidores = seguidoresAtuais;
    const data: { semana: number; seguidores: number }[] = [{ semana: 0, seguidores }];

    // Fator de ajuste baseado em frequência de postagem
    const fatorFrequencia = 1 + (reelsPorSemana - 3) * 0.1; // 3 reels = base, mais = boost

    for (let i = 1; i <= semanas; i++) {
      const crescimentoSemana = (taxaCrescimento / 100) * fatorFrequencia;
      seguidores = Math.round(seguidores * (1 + crescimentoSemana));
      data.push({ semana: i, seguidores });
    }

    return data;
  }, [seguidoresAtuais, reelsPorSemana, taxaCrescimento, meses]);

  const seguidoresFinal = projecao[projecao.length - 1].seguidores;
  const crescimentoTotal = seguidoresFinal - seguidoresAtuais;
  const crescimentoPercentual = ((crescimentoTotal / seguidoresAtuais) * 100).toFixed(0);

  const maxSeguidores = Math.max(...projecao.map(p => p.seguidores));

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
          <TrendingUp size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Simulador de Crescimento</h4>
          <p className="text-text-muted text-sm">Projete seus seguidores futuros</p>
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
                  <TrendingUp size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Simulador de Crescimento</h3>
                  <p className="text-text-muted text-sm">Veja sua projeção de seguidores</p>
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-text-muted text-sm mb-2">
                    <Target size={14} />
                    Seguidores Atuais
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={seguidoresAtuais}
                    onChange={(e) => setSeguidoresAtuais(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-dark-primary border border-white/10 rounded-lg text-text-primary focus:border-[var(--theme-primary)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-text-muted text-sm mb-2">
                    <Zap size={14} />
                    Reels por Semana
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={reelsPorSemana}
                    onChange={(e) => setReelsPorSemana(parseInt(e.target.value))}
                    className="w-full accent-[var(--theme-primary)]"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>1</span>
                    <span className="text-[var(--theme-primary)] font-bold">{reelsPorSemana} Reels</span>
                    <span>7</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-text-muted text-sm mb-2">
                    <TrendingUp size={14} />
                    Crescimento Semanal (%)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={taxaCrescimento}
                    onChange={(e) => setTaxaCrescimento(parseInt(e.target.value))}
                    className="w-full accent-[var(--theme-primary)]"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>1%</span>
                    <span className="text-[var(--theme-primary)] font-bold">{taxaCrescimento}%</span>
                    <span>15%</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-text-muted text-sm mb-2">
                    <Calendar size={14} />
                    Período (meses)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={meses}
                    onChange={(e) => setMeses(parseInt(e.target.value))}
                    className="w-full accent-[var(--theme-primary)]"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1">
                    <span>1</span>
                    <span className="text-[var(--theme-primary)] font-bold">{meses} meses</span>
                    <span>12</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-dark-primary/50 rounded-xl p-4 mb-6">
                <div className="h-48 flex items-end gap-1">
                  {projecao.filter((_, i) => i % Math.ceil(projecao.length / 20) === 0 || i === projecao.length - 1).map((p, i, arr) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(p.seguidores / maxSeguidores) * 100}%` }}
                      transition={{ delay: i * 0.05 }}
                      className="flex-1 rounded-t-sm min-w-[8px]"
                      style={{ background: i === arr.length - 1 ? 'var(--theme-gradient)' : 'var(--theme-primary)', opacity: 0.3 + (i / arr.length) * 0.7 }}
                      title={`Semana ${p.semana}: ${p.seguidores.toLocaleString()}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-text-muted">
                  <span>Hoje</span>
                  <span>{meses} meses</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-dark-primary/50 rounded-xl p-4 text-center">
                  <p className="text-text-muted text-xs mb-1">Inicial</p>
                  <p className="font-playfair text-xl font-bold text-text-primary">
                    {seguidoresAtuais.toLocaleString()}
                  </p>
                </div>
                <div className="bg-dark-primary/50 rounded-xl p-4 text-center">
                  <p className="text-text-muted text-xs mb-1">Projeção Final</p>
                  <p className="font-playfair text-xl font-bold text-[var(--theme-primary)]">
                    {seguidoresFinal.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-950/30 border border-green-900/30 rounded-xl p-4 text-center">
                  <p className="text-text-muted text-xs mb-1">Crescimento</p>
                  <p className="font-playfair text-xl font-bold text-green-400">
                    +{crescimentoPercentual}%
                  </p>
                </div>
              </div>

              <p className="text-text-muted text-xs text-center mt-4">
                💡 Projeção baseada em crescimento orgânico consistente. Resultados reais podem variar.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
