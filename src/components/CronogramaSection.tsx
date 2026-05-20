import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, Download, Filter } from 'lucide-react';
import { cronogramaDias } from '../data/modules';

export default function CronogramaSection() {
  const [dias, setDias] = useState(cronogramaDias);
  const [filtro, setFiltro] = useState<string>('Todos');

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cronograma-progress');
    if (saved) {
      const progress: Record<number, boolean> = JSON.parse(saved);
      setDias(prev => prev.map(d => ({ ...d, feito: progress[d.dia] || false })));
    }
  }, []);

  const toggleDia = (dia: number) => {
    setDias(prev => {
      const updated = prev.map(d => d.dia === dia ? { ...d, feito: !d.feito } : d);
      const progress: Record<number, boolean> = {};
      updated.forEach(d => { progress[d.dia] = d.feito; });
      localStorage.setItem('cronograma-progress', JSON.stringify(progress));
      return updated;
    });
  };

  const feitos = dias.filter(d => d.feito).length;
  const progresso = Math.round((feitos / dias.length) * 100);

  const filteredDias = filtro === 'Todos' ? dias : dias.filter(d => d.perfil.includes(filtro));

  const formatColor = (formato: string) => {
    switch (formato) {
      case 'Reel': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Story': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Carrossel': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Live + Reel': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 bg-dark-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Planejamento Completo
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-text-primary mt-3 mb-4">
            Cronograma de <span className="text-gold-primary">60 Dias</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Seu plano completo dia a dia. Marque cada tarefa como feita e acompanhe seu progresso.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Calendar className="text-gold-primary" size={24} />
              <div>
                <p className="font-montserrat font-bold text-text-primary">
                  Progresso: {feitos} de {dias.length} dias
                </p>
                <p className="text-text-muted text-sm">
                  {progresso === 100 ? '🎉 Parabéns! Você completou o cronograma!' : `Continue assim! Faltam ${dias.length - feitos} dias.`}
                </p>
              </div>
            </div>
            <span className="font-playfair text-3xl font-bold text-gold-primary">{progresso}%</span>
          </div>
          <div className="w-full h-4 bg-dark-primary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              className="h-full rounded-full gold-gradient"
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Filter size={18} className="text-text-muted" />
          {['Todos', 'Cantor', 'Teclado', 'Ambos'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filtro === f
                  ? 'gold-gradient text-dark-primary'
                  : 'bg-dark-tertiary text-text-secondary hover:text-text-primary border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-dark-tertiary text-text-secondary border border-white/10 hover:border-gold-primary/30 transition-colors">
            <Download size={16} />
            Exportar PDF
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-tertiary">
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider">✅</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider">Dia</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider hidden sm:table-cell">Data</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider">Perfil</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider">Formato</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider hidden md:table-cell">Série</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider hidden lg:table-cell">Horário</th>
                <th className="px-4 py-3 text-left text-xs font-montserrat font-bold text-gold-primary uppercase tracking-wider">Tema</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDias.map((dia) => (
                <tr
                  key={dia.dia}
                  className={`transition-colors hover:bg-gold-primary/5 ${dia.feito ? 'opacity-60' : ''}`}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleDia(dia.dia)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        dia.feito
                          ? 'bg-success border-success text-white'
                          : 'border-white/20 hover:border-gold-primary'
                      }`}
                    >
                      {dia.feito && <Check size={14} />}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-text-primary">{dia.dia}</td>
                  <td className="px-4 py-3 font-mono text-sm text-text-muted hidden sm:table-cell">{dia.data}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{dia.perfil}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${formatColor(dia.formato)}`}>
                      {dia.formato}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary hidden md:table-cell">{dia.serie}</td>
                  <td className="px-4 py-3 font-mono text-sm text-gold-primary hidden lg:table-cell">{dia.horario}</td>
                  <td className="px-4 py-3 text-sm text-text-primary font-medium">{dia.tema}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
