import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Clock, Target, Award, TrendingUp, BookOpen, Zap } from 'lucide-react';
import { cronogramaDias } from '../data/modules';

export default function AnalyticsPessoal() {
  const [stats, setStats] = useState({
    diasAcesso: 0,
    modulosVistos: 0,
    ferramentasUsadas: 0,
    quizCompletados: 0,
    notasCriadas: 0,
    favoritosSalvos: 0,
    cronogramaCompleto: 0,
    tempoTotal: '0h',
  });

  const [sequencia, setSequencia] = useState(0);

  useEffect(() => {
    // Calcular estatísticas do localStorage
    const calcularStats = () => {
      // Progresso do cronograma
      const cronograma = localStorage.getItem('cronograma-progress');
      let cronogramaCompleto = 0;
      if (cronograma) {
        const progress = JSON.parse(cronograma);
        cronogramaCompleto = Object.values(progress).filter(Boolean).length;
      }

      // Notas
      const notas = localStorage.getItem('im-notas');
      const notasCriadas = notas ? JSON.parse(notas).length : 0;

      // Favoritos
      const favoritos = localStorage.getItem('im-favoritos');
      const favoritosSalvos = favoritos ? JSON.parse(favoritos).length : 0;

      // Conquistas (representa módulos/ferramentas exploradas)
      const conquistas = localStorage.getItem('im-achievements');
      const conquistasLista = conquistas ? JSON.parse(conquistas) : [];

      // Dias de acesso (simplificado)
      const acessos = localStorage.getItem('im-acessos') || '[]';
      const diasAcesso = new Set(JSON.parse(acessos)).size || 1;

      // Sequência de dias
      const hoje = new Date().toDateString();
      const ultimaVisitaSalva = localStorage.getItem('im-ultima-visita');
      
      if (ultimaVisitaSalva !== hoje) {
        // Registrar acesso de hoje
        const acessosArray = JSON.parse(acessos);
        acessosArray.push(hoje);
        localStorage.setItem('im-acessos', JSON.stringify(acessosArray));
        localStorage.setItem('im-ultima-visita', hoje);
        
        // Calcular sequência
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);
        if (ultimaVisitaSalva === ontem.toDateString()) {
          const seq = parseInt(localStorage.getItem('im-sequencia') || '0') + 1;
          localStorage.setItem('im-sequencia', seq.toString());
          setSequencia(seq);
        } else if (ultimaVisitaSalva !== hoje) {
          localStorage.setItem('im-sequencia', '1');
          setSequencia(1);
        }
      }

      setSequencia(parseInt(localStorage.getItem('im-sequencia') || '1'));

      setStats({
        diasAcesso,
        modulosVistos: conquistasLista.length,
        ferramentasUsadas: Math.min(conquistasLista.length, 5),
        quizCompletados: conquistasLista.includes('quiz-completed') ? 1 : 0,
        notasCriadas,
        favoritosSalvos,
        cronogramaCompleto,
        tempoTotal: `${Math.max(1, diasAcesso * 15)}min`,
      });
    };

    calcularStats();
  }, []);

  const porcentagemCronograma = Math.round((stats.cronogramaCompleto / cronogramaDias.length) * 100);

  const cards = [
    { icon: Calendar, label: 'Dias de Acesso', valor: stats.diasAcesso, cor: 'from-blue-500/20 to-blue-600/10' },
    { icon: Zap, label: 'Sequência Atual', valor: `${sequencia} 🔥`, cor: 'from-orange-500/20 to-orange-600/10' },
    { icon: BookOpen, label: 'Módulos Explorados', valor: stats.modulosVistos, cor: 'from-purple-500/20 to-purple-600/10' },
    { icon: Target, label: 'Cronograma', valor: `${porcentagemCronograma}%`, cor: 'from-green-500/20 to-green-600/10' },
    { icon: Award, label: 'Favoritos', valor: stats.favoritosSalvos, cor: 'from-pink-500/20 to-pink-600/10' },
    { icon: Clock, label: 'Tempo na Plataforma', valor: stats.tempoTotal, cor: 'from-cyan-500/20 to-cyan-600/10' },
  ];

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 size={24} className="text-[var(--theme-primary)]" />
        <h3 className="font-playfair text-xl font-bold text-text-primary">
          Seu Progresso
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${card.cor} rounded-xl p-4 border border-white/5`}
          >
            <card.icon size={20} className="text-text-muted mb-2" />
            <p className="font-playfair text-2xl font-bold text-text-primary">{card.valor}</p>
            <p className="text-text-muted text-xs mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progresso do Cronograma */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-[var(--theme-primary)]" />
            <div>
              <h4 className="font-montserrat font-bold text-text-primary">Progresso do Cronograma</h4>
              <p className="text-text-muted text-sm">{stats.cronogramaCompleto} de {cronogramaDias.length} dias completados</p>
            </div>
          </div>
          <span className="font-playfair text-2xl font-bold text-[var(--theme-primary)]">{porcentagemCronograma}%</span>
        </div>
        
        <div className="h-4 bg-dark-primary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${porcentagemCronograma}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full rounded-full"
            style={{ background: 'var(--theme-gradient)' }}
          />
        </div>

        {porcentagemCronograma === 100 ? (
          <p className="text-center text-success mt-4 font-semibold">🎉 Parabéns! Você completou o cronograma de 60 dias!</p>
        ) : porcentagemCronograma >= 50 ? (
          <p className="text-center text-[var(--theme-primary)] mt-4 text-sm">🔥 Mais da metade! Continue assim!</p>
        ) : porcentagemCronograma > 0 ? (
          <p className="text-center text-text-muted mt-4 text-sm">💪 Ótimo começo! Continue marcando seus dias.</p>
        ) : (
          <p className="text-center text-text-muted mt-4 text-sm">📅 Comece marcando seu primeiro dia no cronograma!</p>
        )}
      </div>
    </section>
  );
}
