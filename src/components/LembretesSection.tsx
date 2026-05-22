import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, X, Trash2, Clock, Check } from 'lucide-react';

interface Lembrete {
  id: string;
  titulo: string;
  horario: string;
  diasSemana: string[];
  ativo: boolean;
  criadoEm: string;
}

const diasDaSemana = [
  { key: 'dom', label: 'D' },
  { key: 'seg', label: 'S' },
  { key: 'ter', label: 'T' },
  { key: 'qua', label: 'Q' },
  { key: 'qui', label: 'Q' },
  { key: 'sex', label: 'S' },
  { key: 'sab', label: 'S' },
];

const sugestoesLembretes = [
  { titulo: '📹 Postar Reel', horario: '12:00' },
  { titulo: '📱 Postar Stories', horario: '09:00' },
  { titulo: '💬 Responder Comentários', horario: '14:00' },
  { titulo: '📊 Verificar Insights', horario: '20:00' },
  { titulo: '🎬 Gravar Conteúdo', horario: '10:00' },
];

export default function LembretesSection() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('12:00');
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>(['seg', 'qua', 'sex']);

  // Carregar lembretes
  useEffect(() => {
    const saved = localStorage.getItem('im-lembretes');
    if (saved) {
      setLembretes(JSON.parse(saved));
    }
  }, []);

  // Salvar lembretes
  const salvarLembretes = (novos: Lembrete[]) => {
    setLembretes(novos);
    localStorage.setItem('im-lembretes', JSON.stringify(novos));
  };

  const criarLembrete = () => {
    if (!titulo.trim()) return;

    const novo: Lembrete = {
      id: Date.now().toString(),
      titulo,
      horario,
      diasSemana: diasSelecionados,
      ativo: true,
      criadoEm: new Date().toISOString(),
    };

    salvarLembretes([novo, ...lembretes]);
    setIsModalOpen(false);
    setTitulo('');
    setHorario('12:00');
    setDiasSelecionados(['seg', 'qua', 'sex']);

    // Simular notificação
    if ('Notification' in window && Notification.permission === 'granted') {
      // Notificação seria agendada aqui
    }
  };

  const toggleLembrete = (id: string) => {
    const novos = lembretes.map(l => 
      l.id === id ? { ...l, ativo: !l.ativo } : l
    );
    salvarLembretes(novos);
  };

  const deletarLembrete = (id: string) => {
    salvarLembretes(lembretes.filter(l => l.id !== id));
  };

  const usarSugestao = (sugestao: typeof sugestoesLembretes[0]) => {
    setTitulo(sugestao.titulo);
    setHorario(sugestao.horario);
  };

  const toggleDia = (dia: string) => {
    setDiasSelecionados(prev =>
      prev.includes(dia)
        ? prev.filter(d => d !== dia)
        : [...prev, dia]
    );
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-[var(--theme-primary)]" />
          <h3 className="font-playfair text-xl font-bold text-text-primary">
            Lembretes de Postagem
          </h3>
          <span className="px-2 py-0.5 bg-[var(--theme-primary)]/10 rounded-full text-xs text-[var(--theme-primary)]">
            {lembretes.filter(l => l.ativo).length} ativos
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-dark-primary"
          style={{ background: 'var(--theme-gradient)' }}
        >
          <Plus size={16} />
          Novo Lembrete
        </button>
      </div>

      {lembretes.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <Bell size={48} className="text-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-text-muted">Nenhum lembrete configurado.</p>
          <p className="text-text-muted text-sm mt-1">Crie lembretes para nunca esquecer de postar!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lembretes.map(lembrete => (
            <motion.div
              key={lembrete.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card rounded-xl p-4 flex items-center gap-4 transition-all ${
                !lembrete.ativo && 'opacity-50'
              }`}
            >
              <button
                onClick={() => toggleLembrete(lembrete.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  lembrete.ativo
                    ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]'
                    : 'bg-dark-tertiary text-text-muted'
                }`}
              >
                {lembrete.ativo ? <Bell size={18} /> : <Bell size={18} />}
              </button>

              <div className="flex-1 min-w-0">
                <h4 className="font-montserrat font-bold text-text-primary text-sm">{lembrete.titulo}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Clock size={12} className="text-text-muted" />
                  <span className="text-text-muted text-xs">{lembrete.horario}</span>
                  <span className="text-text-muted text-xs">•</span>
                  <div className="flex gap-1">
                    {diasDaSemana.map(dia => (
                      <span
                        key={dia.key}
                        className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center ${
                          lembrete.diasSemana.includes(dia.key)
                            ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]'
                            : 'bg-dark-tertiary text-text-muted'
                        }`}
                      >
                        {dia.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deletarLembrete(lembrete.id)}
                className="p-2 text-text-muted hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-md w-full p-6 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="font-playfair text-xl font-bold text-text-primary mb-6">
                Novo Lembrete
              </h3>

              {/* Sugestões */}
              <div className="mb-4">
                <label className="text-text-muted text-sm mb-2 block">Sugestões rápidas:</label>
                <div className="flex flex-wrap gap-2">
                  {sugestoesLembretes.map(s => (
                    <button
                      key={s.titulo}
                      onClick={() => usarSugestao(s)}
                      className="px-3 py-1.5 bg-dark-primary/50 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-dark-primary transition-all"
                    >
                      {s.titulo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-text-muted text-sm mb-1 block">Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Postar Reel"
                    className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-[var(--theme-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-sm mb-1 block">Horário</label>
                  <input
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-[var(--theme-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-sm mb-2 block">Dias da Semana</label>
                  <div className="flex gap-2">
                    {diasDaSemana.map(dia => (
                      <button
                        key={dia.key}
                        onClick={() => toggleDia(dia.key)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                          diasSelecionados.includes(dia.key)
                            ? 'bg-[var(--theme-primary)] text-dark-primary'
                            : 'bg-dark-primary text-text-muted hover:text-text-primary'
                        }`}
                      >
                        {dia.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={criarLembrete}
                  disabled={!titulo.trim() || diasSelecionados.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-montserrat font-bold text-dark-primary disabled:opacity-50"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Check size={18} />
                  Criar Lembrete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
