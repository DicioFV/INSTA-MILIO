import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';

export interface Favorito {
  id: string;
  tipo: 'modulo' | 'ferramenta' | 'viral' | 'hino' | 'dica';
  titulo: string;
  descricao: string;
  link?: string;
  emoji: string;
  salvadoEm: string;
}

// Hook para usar favoritos em qualquer componente
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('im-favoritos');
    if (saved) {
      setFavoritos(JSON.parse(saved));
    }
  }, []);

  const adicionarFavorito = (favorito: Omit<Favorito, 'id' | 'salvadoEm'>) => {
    const novo: Favorito = {
      ...favorito,
      id: Date.now().toString(),
      salvadoEm: new Date().toISOString(),
    };
    const novos = [novo, ...favoritos];
    setFavoritos(novos);
    localStorage.setItem('im-favoritos', JSON.stringify(novos));
    return novo;
  };

  const removerFavorito = (id: string) => {
    const novos = favoritos.filter(f => f.id !== id);
    setFavoritos(novos);
    localStorage.setItem('im-favoritos', JSON.stringify(novos));
  };

  const isFavorito = (titulo: string) => {
    return favoritos.some(f => f.titulo === titulo);
  };

  return { favoritos, adicionarFavorito, removerFavorito, isFavorito };
}

// Botão de favoritar reutilizável
export function BotaoFavoritar({ 
  item, 
  className = '' 
}: { 
  item: Omit<Favorito, 'id' | 'salvadoEm'>;
  className?: string;
}) {
  const { favoritos, adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();
  const [animating, setAnimating] = useState(false);
  const favoritado = isFavorito(item.titulo);
  const favoritoAtual = favoritos.find(f => f.titulo === item.titulo);

  const toggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    
    if (favoritado && favoritoAtual) {
      removerFavorito(favoritoAtual.id);
    } else {
      adicionarFavorito(item);
    }
    
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <motion.button
      onClick={toggleFavorito}
      whileTap={{ scale: 0.8 }}
      className={`p-2 rounded-lg transition-all ${
        favoritado 
          ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)]' 
          : 'bg-dark-primary/50 text-text-muted hover:text-[var(--theme-primary)]'
      } ${className}`}
      title={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <motion.div animate={animating ? { scale: [1, 1.3, 1] } : {}}>
        <Bookmark size={18} fill={favoritado ? 'currentColor' : 'none'} />
      </motion.div>
    </motion.button>
  );
}

// Seção completa de favoritos
export default function FavoritosSection() {
  const { favoritos, removerFavorito } = useFavoritos();
  const [filtro, setFiltro] = useState<string>('todos');

  const filtrados = filtro === 'todos' 
    ? favoritos 
    : favoritos.filter(f => f.tipo === filtro);

  const tipos = [
    { key: 'todos', label: 'Todos', emoji: '📚' },
    { key: 'modulo', label: 'Módulos', emoji: '📖' },
    { key: 'ferramenta', label: 'Ferramentas', emoji: '🛠️' },
    { key: 'viral', label: 'Virais', emoji: '🔥' },
    { key: 'hino', label: 'Hinos', emoji: '🎵' },
    { key: 'dica', label: 'Dicas', emoji: '💡' },
  ];

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bookmark size={24} className="text-[var(--theme-primary)]" />
          <h3 className="font-playfair text-xl font-bold text-text-primary">
            Meus Favoritos
          </h3>
          <span className="px-2 py-0.5 bg-[var(--theme-primary)]/10 rounded-full text-xs text-[var(--theme-primary)]">
            {favoritos.length}
          </span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tipos.map(tipo => (
          <button
            key={tipo.key}
            onClick={() => setFiltro(tipo.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
              filtro === tipo.key
                ? 'bg-[var(--theme-primary)] text-dark-primary'
                : 'bg-dark-tertiary text-text-muted hover:text-text-primary'
            }`}
          >
            <span>{tipo.emoji}</span>
            {tipo.label}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <Bookmark size={48} className="text-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-text-muted">
            {filtro === 'todos' 
              ? 'Nenhum favorito ainda.' 
              : `Nenhum ${tipos.find(t => t.key === filtro)?.label.toLowerCase()} favoritado.`}
          </p>
          <p className="text-text-muted text-sm mt-1">
            Clique no ícone de bookmark para salvar conteúdos!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtrados.map((favorito) => (
              <motion.div
                key={favorito.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card rounded-xl p-4 group relative"
              >
                <button
                  onClick={() => removerFavorito(favorito.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-dark-primary/50 text-text-muted hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{favorito.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[var(--theme-primary)] uppercase tracking-wider">
                      {favorito.tipo}
                    </span>
                    <h4 className="font-montserrat font-bold text-text-primary text-sm truncate">
                      {favorito.titulo}
                    </h4>
                    <p className="text-text-muted text-xs mt-1 line-clamp-2">{favorito.descricao}</p>
                    
                    {favorito.link && (
                      <Link
                        to={favorito.link}
                        className="inline-flex items-center gap-1 text-[var(--theme-primary)] text-xs mt-2 hover:underline"
                      >
                        Acessar <ExternalLink size={12} />
                      </Link>
                    )}
                    
                    <p className="text-text-muted text-[10px] mt-2">
                      Salvo em {new Date(favorito.salvadoEm).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
