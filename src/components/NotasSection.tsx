import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, X, Save, Trash2, Plus, Edit2 } from 'lucide-react';

interface Nota {
  id: string;
  titulo: string;
  conteudo: string;
  cor: string;
  criadaEm: string;
  atualizadaEm: string;
}

const cores = [
  { nome: 'Dourado', valor: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/30' },
  { nome: 'Azul', valor: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30' },
  { nome: 'Verde', valor: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/30' },
  { nome: 'Rosa', valor: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/30' },
  { nome: 'Roxo', valor: 'from-purple-500/20 to-violet-500/10', border: 'border-purple-500/30' },
];

export default function NotasSection() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notaAtual, setNotaAtual] = useState<Nota | null>(null);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [corSelecionada, setCorSelecionada] = useState(0);

  // Carregar notas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('im-notas');
    if (saved) {
      setNotas(JSON.parse(saved));
    }
  }, []);

  // Salvar notas no localStorage
  const salvarNotas = (novasNotas: Nota[]) => {
    setNotas(novasNotas);
    localStorage.setItem('im-notas', JSON.stringify(novasNotas));
  };

  const abrirModal = (nota?: Nota) => {
    if (nota) {
      setNotaAtual(nota);
      setTitulo(nota.titulo);
      setConteudo(nota.conteudo);
      setCorSelecionada(cores.findIndex(c => c.valor === nota.cor) || 0);
    } else {
      setNotaAtual(null);
      setTitulo('');
      setConteudo('');
      setCorSelecionada(0);
    }
    setIsModalOpen(true);
  };

  const salvarNota = () => {
    if (!titulo.trim()) return;

    const agora = new Date().toISOString();
    
    if (notaAtual) {
      // Editar nota existente
      const novasNotas = notas.map(n => 
        n.id === notaAtual.id 
          ? { ...n, titulo, conteudo, cor: cores[corSelecionada].valor, atualizadaEm: agora }
          : n
      );
      salvarNotas(novasNotas);
    } else {
      // Nova nota
      const novaNota: Nota = {
        id: Date.now().toString(),
        titulo,
        conteudo,
        cor: cores[corSelecionada].valor,
        criadaEm: agora,
        atualizadaEm: agora,
      };
      salvarNotas([novaNota, ...notas]);
    }

    setIsModalOpen(false);
  };

  const deletarNota = (id: string) => {
    salvarNotas(notas.filter(n => n.id !== id));
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <StickyNote size={24} className="text-[var(--theme-primary)]" />
          <h3 className="font-playfair text-xl font-bold text-text-primary">
            Minhas Anotações
          </h3>
          <span className="px-2 py-0.5 bg-[var(--theme-primary)]/10 rounded-full text-xs text-[var(--theme-primary)]">
            {notas.length}
          </span>
        </div>
        <button
          onClick={() => abrirModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-dark-primary"
          style={{ background: 'var(--theme-gradient)' }}
        >
          <Plus size={16} />
          Nova Nota
        </button>
      </div>

      {notas.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <StickyNote size={48} className="text-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-text-muted">Nenhuma anotação ainda.</p>
          <p className="text-text-muted text-sm mt-1">Crie notas para lembrar de ideias, hinos e estratégias!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notas.map((nota) => {
            const cor = cores.find(c => c.valor === nota.cor) || cores[0];
            return (
              <motion.div
                key={nota.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-gradient-to-br ${nota.cor} rounded-xl p-4 border ${cor.border} group relative`}
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => abrirModal(nota)}
                    className="p-1.5 rounded-lg bg-dark-primary/50 text-text-muted hover:text-[var(--theme-primary)] transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => deletarNota(nota.id)}
                    className="p-1.5 rounded-lg bg-dark-primary/50 text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h4 className="font-montserrat font-bold text-text-primary mb-2 pr-16">{nota.titulo}</h4>
                <p className="text-text-secondary text-sm whitespace-pre-wrap line-clamp-4">{nota.conteudo}</p>
                <p className="text-text-muted text-xs mt-3">
                  {new Date(nota.atualizadaEm).toLocaleDateString('pt-BR')}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal de Edição */}
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
                {notaAtual ? 'Editar Nota' : 'Nova Nota'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-text-muted text-sm mb-1 block">Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Ideia para Reel"
                    className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-[var(--theme-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-sm mb-1 block">Conteúdo</label>
                  <textarea
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    placeholder="Escreva sua anotação..."
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary focus:border-[var(--theme-primary)] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-text-muted text-sm mb-2 block">Cor</label>
                  <div className="flex gap-2">
                    {cores.map((cor, i) => (
                      <button
                        key={cor.nome}
                        onClick={() => setCorSelecionada(i)}
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${cor.valor} border-2 transition-all ${
                          corSelecionada === i ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        title={cor.nome}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={salvarNota}
                  disabled={!titulo.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-montserrat font-bold text-dark-primary disabled:opacity-50"
                  style={{ background: 'var(--theme-gradient)' }}
                >
                  <Save size={18} />
                  Salvar Nota
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
