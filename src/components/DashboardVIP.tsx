import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Crown, Calendar, Target, TrendingUp, 
  Download, CheckCircle, Clock, Award, BarChart3, Zap
} from 'lucide-react';
import { cronogramaDias } from '../data/modules';

interface DashboardVIPProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export default function DashboardVIP({ isOpen, onClose, userName }: DashboardVIPProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState({ feitos: 0, total: 60 });

  useEffect(() => {
    const saved = localStorage.getItem('cronograma-progress');
    if (saved) {
      const data = JSON.parse(saved);
      const feitos = Object.values(data).filter(Boolean).length;
      setProgress({ feitos, total: cronogramaDias.length });
    }
  }, [isOpen]);

  const progressPercent = Math.round((progress.feitos / progress.total) * 100);

  const achievements = [
    { icon: '🚀', title: 'Primeiro Passo', desc: 'Acessou a plataforma', unlocked: true },
    { icon: '📅', title: '7 Dias Consecutivos', desc: 'Complete 7 dias seguidos', unlocked: progress.feitos >= 7 },
    { icon: '🔥', title: 'Metade do Caminho', desc: 'Complete 30 dias', unlocked: progress.feitos >= 30 },
    { icon: '👑', title: 'Mestre do Instagram', desc: 'Complete os 60 dias', unlocked: progress.feitos >= 60 },
    { icon: '🤖', title: 'Amigo da IA', desc: 'Conversou com o Agente', unlocked: true },
    { icon: '🔍', title: 'Auto-conhecimento', desc: 'Analisou seu perfil', unlocked: true },
  ];

  const weeklyTasks = [
    { task: 'Postar 3 Reels esta semana', done: false },
    { task: 'Responder todos comentários em 2h', done: false },
    { task: 'Fazer 1 collab', done: false },
    { task: 'Postar Stories diariamente', done: false },
    { task: 'Analisar Insights do perfil', done: false },
  ];

  const tips = [
    '💡 Domingo à noite é ótimo para conteúdo gospel reflexivo',
    '💡 Use a enquete nos Stories antes de postar um Reel para validar o tema',
    '💡 Hashtags em 2026: menos é mais. Use 3-5 estratégicas',
    '💡 O algoritmo ama quando você responde comentários nos primeiros 30 min',
    '💡 Trial Reels são seus melhores amigos para testar ganchos',
  ];

  const [currentTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl flex items-start justify-center overflow-y-auto p-4 pt-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-secondary rounded-3xl border border-gold-primary/20 w-full max-w-5xl relative overflow-hidden mb-8"
          >
            {/* Header */}
            <div className="gold-gradient p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-dark-primary/30 flex items-center justify-center">
                  <Crown size={28} className="text-dark-primary" />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-dark-primary">
                    Área VIP
                  </h2>
                  <p className="text-dark-primary/70">Bem-vindo, {userName}! 👑</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-dark-primary/20 text-dark-primary hover:bg-dark-primary/30 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tip Banner */}
            <div className="bg-gold-primary/10 border-b border-gold-primary/20 px-6 py-3">
              <p className="text-gold-primary text-sm">{currentTip}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5 overflow-x-auto">
              {[
                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                { id: 'progress', label: 'Meu Progresso', icon: Target },
                { id: 'achievements', label: 'Conquistas', icon: Award },
                { id: 'resources', label: 'Downloads', icon: Download },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-gold-primary border-b-2 border-gold-primary bg-gold-primary/5'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Progress Card */}
                  <div className="glass-card rounded-2xl p-6 col-span-1 md:col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                        <TrendingUp size={20} className="text-dark-primary" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-text-primary">Progresso Geral</h3>
                        <p className="text-text-muted text-xs">Cronograma 60 dias</p>
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <div className="relative w-32 h-32 mx-auto">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-dark-tertiary"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gold-gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${progressPercent * 3.52} 352`}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#D4A017" />
                              <stop offset="100%" stopColor="#F5C842" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-playfair text-3xl font-bold text-gold-primary">{progressPercent}%</span>
                        </div>
                      </div>
                      <p className="text-text-secondary mt-4">{progress.feitos} de {progress.total} dias completados</p>
                    </div>
                  </div>

                  {/* Weekly Tasks */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Calendar size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-text-primary">Tarefas da Semana</h3>
                        <p className="text-text-muted text-xs">Mantenha a consistência</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {weeklyTasks.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 bg-dark-primary/30 rounded-lg p-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${t.done ? 'bg-success border-success' : 'border-white/20'}`}>
                            {t.done && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <span className={`text-sm ${t.done ? 'text-text-muted line-through' : 'text-text-secondary'}`}>{t.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Zap size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-text-primary">Estatísticas</h3>
                        <p className="text-text-muted text-xs">Seu desempenho</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Dias completados</span>
                        <span className="text-gold-primary font-bold">{progress.feitos}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Conquistas</span>
                        <span className="text-gold-primary font-bold">{achievements.filter(a => a.unlocked).length}/{achievements.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Nível VIP</span>
                        <span className="text-gold-primary font-bold">👑 Premium</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-muted text-sm">Membro desde</span>
                        <span className="text-text-secondary text-sm">Hoje</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-montserrat font-bold text-text-primary mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-gold-primary" />
                      Linha do Tempo do Cronograma
                    </h3>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold-primary/20" />
                      <div className="space-y-4 pl-10">
                        {[
                          { week: 'Semana 1', days: '1-7', status: progress.feitos >= 7 ? 'complete' : progress.feitos > 0 ? 'current' : 'pending' },
                          { week: 'Semana 2', days: '8-14', status: progress.feitos >= 14 ? 'complete' : progress.feitos > 7 ? 'current' : 'pending' },
                          { week: 'Semana 3', days: '15-21', status: progress.feitos >= 21 ? 'complete' : progress.feitos > 14 ? 'current' : 'pending' },
                          { week: 'Semana 4', days: '22-28', status: progress.feitos >= 28 ? 'complete' : progress.feitos > 21 ? 'current' : 'pending' },
                          { week: 'Semana 5', days: '29-35', status: progress.feitos >= 35 ? 'complete' : progress.feitos > 28 ? 'current' : 'pending' },
                          { week: 'Semana 6', days: '36-42', status: progress.feitos >= 42 ? 'complete' : progress.feitos > 35 ? 'current' : 'pending' },
                          { week: 'Semana 7', days: '43-49', status: progress.feitos >= 49 ? 'complete' : progress.feitos > 42 ? 'current' : 'pending' },
                          { week: 'Semana 8', days: '50-56', status: progress.feitos >= 56 ? 'complete' : progress.feitos > 49 ? 'current' : 'pending' },
                          { week: 'Semana 9', days: '57-60', status: progress.feitos >= 60 ? 'complete' : progress.feitos > 56 ? 'current' : 'pending' },
                        ].map((w, i) => (
                          <div key={i} className="relative">
                            <div className={`absolute -left-10 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              w.status === 'complete' ? 'bg-success border-success' :
                              w.status === 'current' ? 'bg-gold-primary border-gold-primary' :
                              'bg-dark-tertiary border-white/20'
                            }`}>
                              {w.status === 'complete' && <CheckCircle size={12} className="text-white" />}
                            </div>
                            <div className={`bg-dark-primary/30 rounded-lg p-4 ${w.status === 'current' ? 'border border-gold-primary/30' : ''}`}>
                              <div className="flex justify-between items-center">
                                <span className="font-montserrat font-bold text-text-primary">{w.week}</span>
                                <span className="text-text-muted text-sm">Dias {w.days}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((a, i) => (
                    <div
                      key={i}
                      className={`glass-card rounded-xl p-5 transition-all ${
                        a.unlocked ? 'border-gold-primary/30' : 'opacity-50 grayscale'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{a.icon}</span>
                        <div>
                          <h4 className="font-montserrat font-bold text-text-primary text-sm">{a.title}</h4>
                          <p className="text-text-muted text-xs">{a.desc}</p>
                        </div>
                      </div>
                      {a.unlocked && (
                        <div className="flex items-center gap-1 text-success text-xs mt-2">
                          <CheckCircle size={12} /> Desbloqueado!
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: '📋', title: 'Pack de 30 Legendas com SEO', format: 'PDF', size: '2.4 MB' },
                    { icon: '✅', title: 'Checklist Semanal', format: 'PDF', size: '1.2 MB' },
                    { icon: '🎯', title: 'Guia de Bio Otimizada', format: 'PDF', size: '0.8 MB' },
                    { icon: '📅', title: 'Calendário 60 Dias Editável', format: 'XLSX', size: '3.1 MB' },
                    { icon: '🎬', title: '10 Ganchos para Reels', format: 'PDF', size: '1.5 MB' },
                    { icon: '💬', title: '50 CTAs de Alta Conversão', format: 'PDF', size: '0.9 MB' },
                    { icon: '🏷️', title: 'Lista de Hashtags 2026', format: 'PDF', size: '0.6 MB' },
                    { icon: '📊', title: 'Planilha de Métricas', format: 'XLSX', size: '2.8 MB' },
                  ].map((r, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-gold-primary/30 transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{r.icon}</span>
                        <div>
                          <h4 className="font-montserrat font-bold text-text-primary text-sm">{r.title}</h4>
                          <p className="text-text-muted text-xs">{r.format} • {r.size}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-primary/10 text-gold-primary text-sm font-medium hover:bg-gold-primary hover:text-dark-primary transition-all">
                        <Download size={14} />
                        Baixar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
