import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Users, Heart, MessageCircle, Share2, Bookmark, AlertCircle, CheckCircle, X } from 'lucide-react';

interface Metrics {
  seguidores: number;
  curtidas: number;
  comentarios: number;
  compartilhamentos: number;
  salvamentos: number;
  alcance: number;
}

interface ResultData {
  taxaEngajamento: number;
  taxaAlcance: number;
  qualidade: 'excelente' | 'bom' | 'medio' | 'baixo';
  insights: string[];
  dicas: string[];
}

export default function CalculadoraEngajamento() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({
    seguidores: 0,
    curtidas: 0,
    comentarios: 0,
    compartilhamentos: 0,
    salvamentos: 0,
    alcance: 0,
  });
  const [result, setResult] = useState<ResultData | null>(null);

  const calcular = () => {
    if (metrics.seguidores === 0) return;

    const totalEngajamento = metrics.curtidas + (metrics.comentarios * 2) + (metrics.compartilhamentos * 3) + (metrics.salvamentos * 2);
    const taxaEngajamento = (totalEngajamento / metrics.seguidores) * 100;
    const taxaAlcance = metrics.alcance > 0 ? (metrics.alcance / metrics.seguidores) * 100 : 0;

    let qualidade: ResultData['qualidade'] = 'baixo';
    if (taxaEngajamento >= 6) qualidade = 'excelente';
    else if (taxaEngajamento >= 3) qualidade = 'bom';
    else if (taxaEngajamento >= 1) qualidade = 'medio';

    const insights: string[] = [];
    const dicas: string[] = [];

    // Análise de compartilhamentos
    if (metrics.compartilhamentos > metrics.curtidas * 0.1) {
      insights.push('🔥 Seus compartilhamentos estão excelentes! Conteúdo viral.');
    } else {
      dicas.push('📤 Peça mais compartilhamentos via DM nos CTAs.');
    }

    // Análise de salvamentos
    if (metrics.salvamentos > metrics.curtidas * 0.15) {
      insights.push('💾 Alto índice de saves — seu conteúdo tem muito valor!');
    } else {
      dicas.push('💾 Crie mais conteúdo "salvável" (tutoriais, listas, dicas).');
    }

    // Análise de comentários
    if (metrics.comentarios > metrics.curtidas * 0.05) {
      insights.push('💬 Ótima interação nos comentários!');
    } else {
      dicas.push('💬 Faça mais perguntas nas legendas para gerar comentários.');
    }

    // Análise de alcance
    if (taxaAlcance > 100) {
      insights.push('📈 Seu alcance supera seus seguidores — o algoritmo te ama!');
    } else if (taxaAlcance < 30) {
      dicas.push('📈 Seu alcance está baixo. Foque em Reels com ganchos fortes.');
    }

    // Dicas gerais baseadas no nível
    if (qualidade === 'baixo') {
      dicas.push('⏰ Poste nos horários de pico: 12h, 18h ou 21h.');
      dicas.push('🎬 Use a estrutura Frame-a-Frame nos Reels.');
    }

    setResult({ taxaEngajamento, taxaAlcance, qualidade, insights, dicas });
  };

  const getQualityColor = (q: ResultData['qualidade']) => {
    switch (q) {
      case 'excelente': return 'text-green-400';
      case 'bom': return 'text-blue-400';
      case 'medio': return 'text-yellow-400';
      case 'baixo': return 'text-red-400';
    }
  };

  const getQualityLabel = (q: ResultData['qualidade']) => {
    switch (q) {
      case 'excelente': return '🏆 Excelente!';
      case 'bom': return '👍 Bom';
      case 'medio': return '📊 Médio';
      case 'baixo': return '⚠️ Precisa melhorar';
    }
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
          <Calculator size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Calculadora de Engajamento</h4>
          <p className="text-text-muted text-sm">Analise suas métricas do Instagram</p>
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
                  <Calculator size={24} className="text-dark-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-text-primary">Calculadora de Engajamento</h3>
                  <p className="text-text-muted text-sm">Insira os dados do seu último post</p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { key: 'seguidores', label: 'Seguidores', icon: Users },
                  { key: 'curtidas', label: 'Curtidas', icon: Heart },
                  { key: 'comentarios', label: 'Comentários', icon: MessageCircle },
                  { key: 'compartilhamentos', label: 'Compartilhamentos', icon: Share2 },
                  { key: 'salvamentos', label: 'Salvamentos', icon: Bookmark },
                  { key: 'alcance', label: 'Alcance', icon: TrendingUp },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="flex items-center gap-2 text-text-muted text-xs mb-1">
                      <field.icon size={12} />
                      {field.label}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={metrics[field.key as keyof Metrics] || ''}
                      onChange={(e) => setMetrics({ ...metrics, [field.key]: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 bg-dark-primary border border-white/10 rounded-lg text-text-primary text-sm focus:border-[var(--theme-primary)] focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={calcular}
                disabled={metrics.seguidores === 0}
                className="w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary mb-6 disabled:opacity-50 transition-all"
                style={{ background: 'var(--theme-gradient)' }}
              >
                📊 Calcular Engajamento
              </button>

              {/* Results */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Main Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-dark-primary/50 rounded-xl p-4 text-center">
                        <p className="text-text-muted text-xs mb-1">Taxa de Engajamento</p>
                        <p className={`font-playfair text-3xl font-bold ${getQualityColor(result.qualidade)}`}>
                          {result.taxaEngajamento.toFixed(2)}%
                        </p>
                        <p className={`text-sm mt-1 ${getQualityColor(result.qualidade)}`}>
                          {getQualityLabel(result.qualidade)}
                        </p>
                      </div>
                      <div className="bg-dark-primary/50 rounded-xl p-4 text-center">
                        <p className="text-text-muted text-xs mb-1">Taxa de Alcance</p>
                        <p className="font-playfair text-3xl font-bold text-[var(--theme-primary)]">
                          {result.taxaAlcance.toFixed(1)}%
                        </p>
                        <p className="text-text-muted text-sm mt-1">
                          {result.taxaAlcance > 100 ? 'Viral! 🔥' : 'dos seguidores'}
                        </p>
                      </div>
                    </div>

                    {/* Insights */}
                    {result.insights.length > 0 && (
                      <div className="bg-green-950/20 border border-green-900/30 rounded-xl p-4">
                        <h4 className="flex items-center gap-2 text-green-400 font-bold text-sm mb-2">
                          <CheckCircle size={16} /> Pontos Positivos
                        </h4>
                        <ul className="space-y-1">
                          {result.insights.map((insight, i) => (
                            <li key={i} className="text-green-300/80 text-sm">{insight}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tips */}
                    {result.dicas.length > 0 && (
                      <div className="bg-yellow-950/20 border border-yellow-900/30 rounded-xl p-4">
                        <h4 className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-2">
                          <AlertCircle size={16} /> Dicas de Melhoria
                        </h4>
                        <ul className="space-y-1">
                          {result.dicas.map((dica, i) => (
                            <li key={i} className="text-yellow-300/80 text-sm">{dica}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
