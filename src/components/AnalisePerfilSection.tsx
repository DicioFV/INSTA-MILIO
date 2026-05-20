import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, Lightbulb, ArrowLeft } from 'lucide-react';

interface AnaliseResult {
  positivos: string[];
  negativos: string[];
  plano: string[];
  canais: string[];
}

export default function AnalisePerfilSection() {
  const [link, setLink] = useState('');
  const [nivel, setNivel] = useState('');
  const [nicho, setNicho] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [praticas, setPraticas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<AnaliseResult | null>(null);
  const [loading, setLoading] = useState(false);

  const praticasList = [
    'Uso hashtags estratégicas',
    'Escrevo legendas longas com SEO',
    'Respondo todos os comentários',
    'Posto Stories diariamente',
    'Uso áudio original nos Reels',
    'Coloco texto na tela dos Reels',
    'Faço collabs com outros criadores',
    'Tenho série de conteúdo definida',
  ];

  const togglePratica = (p: string) => {
    setPraticas(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const analisar = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const positivos: string[] = [];
      const negativos: string[] = [];
      const plano: string[] = [];

      // Generate personalized results based on input
      if (praticas.includes('Uso hashtags estratégicas')) positivos.push('Bom uso de hashtags — você já entende a importância da descoberta');
      else negativos.push('Sem hashtags estratégicas — você está invisível na busca do Instagram');

      if (praticas.includes('Escrevo legendas longas com SEO')) positivos.push('Legendas com SEO — o algoritmo está indexando seu conteúdo');
      else negativos.push('Legendas fracas — sem SEO, o Instagram não sabe do que você fala');

      if (praticas.includes('Respondo todos os comentários')) positivos.push('Responde comentários — sinal forte de engajamento para o algoritmo');
      else negativos.push('Não responde comentários — o algoritmo interpreta como desinteresse');

      if (praticas.includes('Posto Stories diariamente')) positivos.push('Stories diários — mantém sua audiência aquecida');
      else negativos.push('Stories irregulares — seus seguidores estão esfriando');

      if (praticas.includes('Uso áudio original nos Reels')) positivos.push('Áudio original — o Instagram valoriza conteúdo autêntico');
      else negativos.push('Sem áudio original — você está perdendo pontos de originalidade');

      if (praticas.includes('Coloco texto na tela dos Reels')) positivos.push('Texto nos Reels — acessibilidade + SEO visual');
      else negativos.push('Sem texto nos Reels — perdendo camada extra de indexação');

      if (praticas.includes('Faço collabs com outros criadores')) positivos.push('Collabs ativas — dobrando seu alcance organicamente');
      else negativos.push('Sem collabs — crescimento limitado ao seu público atual');

      if (praticas.includes('Tenho série de conteúdo definida')) positivos.push('Séries definidas — gera expectativa e fidelização');
      else negativos.push('Sem séries fixas — conteúdo sem previsibilidade = menos fidelização');

      // Level-based suggestions
      if (nivel === 'Nunca postei nada' || nivel === 'Menos de 100 seguidores') {
        plano.push('PASSO 1: Configure seu perfil profissional usando nosso checklist do Módulo 1');
        plano.push('PASSO 2: Publique 3 Reels esta semana seguindo a estrutura Frame-a-Frame');
        plano.push('PASSO 3: Poste Stories diários por 14 dias consecutivos para aquecer o algoritmo');
      } else if (nivel === '100 a 1.000 seguidores') {
        plano.push('PASSO 1: Revise sua bio com as keywords do seu nicho gospel');
        plano.push('PASSO 2: Crie uma série fixa semanal (ex: "Hinos que Marcaram Gerações")');
        plano.push('PASSO 3: Faça 2 collabs com artistas gospel do mesmo porte este mês');
      } else {
        plano.push('PASSO 1: Ative o Broadcast Channel para engajar seu público fiel');
        plano.push('PASSO 2: Use Trial Reels para testar novos formatos sem risco');
        plano.push('PASSO 3: Crie uma isca digital para capturar emails e monetizar');
      }

      const canais = [
        '@gabrielarocha — Referência em adoração + conteúdo emocional',
        '@isadorapompeo — Mestra em Reels com storytelling gospel',
        '@fernandinho — Engajamento consistente + Lives poderosas',
        '@alinbarros — Nostalgia + hinos clássicos = saves massivos',
      ];

      setResultado({ positivos, negativos, plano, canais });
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="analise" className="py-20 bg-dark-primary relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Diagnóstico Completo
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Analise Seu <span className="text-gold-primary">Perfil</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Preencha o formulário e receba um diagnóstico personalizado com pontos positivos, negativos e plano de ação
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!resultado ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={analisar}
              className="glass-card rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Link */}
              <div>
                <label className="block text-sm font-montserrat font-bold text-gold-primary mb-2">
                  Cole o link do seu perfil:
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://instagram.com/seuperfil"
                  className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:border-gold-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-montserrat font-bold text-gold-primary mb-2">
                  Qual é seu nível atual?
                </label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-gold-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Selecione...</option>
                  <option>Nunca postei nada</option>
                  <option>Menos de 100 seguidores</option>
                  <option>100 a 1.000 seguidores</option>
                  <option>1.000 a 10.000 seguidores</option>
                  <option>Acima de 10.000 seguidores</option>
                </select>
              </div>

              {/* Niche */}
              <div>
                <label className="block text-sm font-montserrat font-bold text-gold-primary mb-2">
                  Qual é seu nicho principal?
                </label>
                <select
                  value={nicho}
                  onChange={(e) => setNicho(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-gold-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Selecione...</option>
                  <option>Cantor Gospel</option>
                  <option>Músico / Instrumentista</option>
                  <option>Pastor / Pregador</option>
                  <option>Igreja / Ministério</option>
                  <option>Outro</option>
                </select>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-montserrat font-bold text-gold-primary mb-2">
                  Com que frequência você posta?
                </label>
                <select
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-gold-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Selecione...</option>
                  <option>Nunca postei</option>
                  <option>Raramente (1x por mês)</option>
                  <option>1–2x por semana</option>
                  <option>3–5x por semana</option>
                  <option>Todos os dias</option>
                </select>
              </div>

              {/* Practices */}
              <div>
                <label className="block text-sm font-montserrat font-bold text-gold-primary mb-3">
                  O que você já faz?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {praticasList.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePratica(p)}
                      className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl text-sm transition-all ${
                        praticas.includes(p)
                          ? 'bg-gold-primary/10 border border-gold-primary/30 text-gold-primary'
                          : 'bg-dark-primary/50 border border-white/5 text-text-secondary hover:border-gold-primary/20'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        praticas.includes(p) ? 'border-gold-primary bg-gold-primary text-dark-primary' : 'border-white/20'
                      }`}>
                        {praticas.includes(p) && <span className="text-xs">✓</span>}
                      </span>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 gold-gradient rounded-xl font-montserrat font-bold text-dark-primary text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-primary/30 border-t-dark-primary rounded-full animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    ANALISAR MEU PERFIL
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <button
                onClick={() => setResultado(null)}
                className="flex items-center gap-2 text-gold-primary hover:text-gold-secondary transition-colors mb-4"
              >
                <ArrowLeft size={18} />
                Nova análise
              </button>

              {/* Positivos */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-montserrat font-bold text-success text-lg mb-4">
                  <CheckCircle size={24} />
                  Pontos Positivos
                </h3>
                <div className="space-y-2">
                  {resultado.positivos.length > 0 ? resultado.positivos.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 bg-green-950/20 border border-green-900/20 rounded-lg p-3">
                      <span className="text-success shrink-0">🟢</span>
                      <span className="text-text-secondary text-sm">{p}</span>
                    </div>
                  )) : (
                    <p className="text-text-muted text-sm">Nenhuma prática positiva identificada ainda. Não se preocupe — vamos mudar isso!</p>
                  )}
                </div>
              </div>

              {/* Negativos */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-montserrat font-bold text-error text-lg mb-4">
                  <XCircle size={24} />
                  Pontos a Melhorar
                </h3>
                <div className="space-y-2">
                  {resultado.negativos.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 bg-red-950/20 border border-red-900/20 rounded-lg p-3">
                      <span className="text-error shrink-0">🔴</span>
                      <span className="text-text-secondary text-sm">{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plano */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-montserrat font-bold text-gold-primary text-lg mb-4">
                  <Lightbulb size={24} />
                  Plano de Ação em 3 Passos
                </h3>
                <div className="space-y-3">
                  {resultado.plano.map((p, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gold-primary/5 border border-gold-primary/15 rounded-lg p-4">
                      <span className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center font-bold text-dark-primary text-sm shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-text-primary text-sm font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canais */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-montserrat font-bold text-gold-primary text-lg mb-4">
                  🎯 Canais Virais para Estudar
                </h3>
                <div className="space-y-2">
                  {resultado.canais.map((c, i) => (
                    <div key={i} className="bg-dark-primary/50 rounded-lg p-3 text-text-secondary text-sm border border-white/5">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
