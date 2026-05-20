import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { 
  FileBarChart, Download, TrendingUp, 
  CheckSquare, Wallet, Target, Clock, Printer
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#ef4444'];

type Period = 'week' | 'month' | 'quarter' | 'year';

export default function ReportsPage() {
  const { currentUser, tasks, events, reminders, habits, finances } = useStore();
  const uid = currentUser?.id || '';
  
  const [period, setPeriod] = useState<Period>('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Get date range
  const getDateRange = () => {
    const now = selectedMonth;
    switch (period) {
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - 7);
        return { start: weekStart, end: now };
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'quarter':
        const quarterStart = new Date(now);
        quarterStart.setMonth(quarterStart.getMonth() - 3);
        return { start: startOfMonth(quarterStart), end: endOfMonth(now) };
      case 'year':
        return { start: startOfYear(now), end: endOfYear(now) };
    }
  };

  const { start, end } = getDateRange();
  const dateRangeStr = `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;

  // Filter data by period
  const myTasks = tasks.filter(t => t.userId === uid);
  const myHabits = habits.filter(h => h.userId === uid);
  const myFinances = finances.filter(f => f.userId === uid);
  const myEvents = events.filter(e => e.userId === uid);
  const myReminders = reminders.filter(r => r.userId === uid);

  const periodTasks = myTasks.filter(t => {
    if (!t.createdAt) return true;
    const d = new Date(t.createdAt);
    return d >= start && d <= end;
  });

  const periodFinances = myFinances.filter(f => {
    const d = new Date(f.date);
    return d >= start && d <= end;
  });

  // Calculate stats
  const stats = useMemo(() => {
    const tasksDone = periodTasks.filter(t => t.status === 'done').length;
    const tasksTotal = periodTasks.length;
    const productivity = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;
    
    const income = periodFinances.filter(f => f.type === 'income').reduce((s, f) => s + f.amount, 0);
    const expense = periodFinances.filter(f => f.type === 'expense').reduce((s, f) => s + f.amount, 0);
    const balance = income - expense;
    
    const avgStreak = myHabits.length > 0 
      ? Math.round(myHabits.reduce((s, h) => s + h.streak, 0) / myHabits.length) 
      : 0;
    
    const timeSpent = periodTasks.reduce((s, t) => s + t.timeSpent, 0);
    
    return { tasksDone, tasksTotal, productivity, income, expense, balance, avgStreak, timeSpent };
  }, [periodTasks, periodFinances, myHabits]);

  // Chart data
  const tasksBySector = useMemo(() => {
    const sectors: Record<string, number> = {};
    periodTasks.forEach(t => {
      sectors[t.sector] = (sectors[t.sector] || 0) + 1;
    });
    return Object.entries(sectors).map(([name, value]) => ({ name, value }));
  }, [periodTasks]);

  const financeByCategory = useMemo(() => {
    const cats: Record<string, number> = {};
    periodFinances.filter(f => f.type === 'expense').forEach(f => {
      cats[f.category] = (cats[f.category] || 0) + f.amount;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value })).slice(0, 6);
  }, [periodFinances]);

  // Export functions
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('Nenhum dado para exportar');
      return;
    }
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(v => 
        typeof v === 'string' && v.includes(',') ? `"${v}"` : v
      ).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportTasks = () => {
    const data = periodTasks.map(t => ({
      Tarefa: t.title,
      Status: t.status,
      Prioridade: t.priority,
      Setor: t.sector,
      Criado: t.createdAt ? format(new Date(t.createdAt), 'dd/MM/yyyy') : '',
      TempoGasto: `${t.timeSpent}min`,
    }));
    exportToCSV(data, 'tarefas');
  };

  const exportFinances = () => {
    const data = periodFinances.map(f => ({
      Tipo: f.type === 'income' ? 'Receita' : 'Despesa',
      Categoria: f.category,
      Descricao: f.description,
      Valor: f.amount,
      Data: format(new Date(f.date), 'dd/MM/yyyy'),
      Status: f.status,
    }));
    exportToCSV(data, 'financeiro');
  };

  const exportHabits = () => {
    const data = myHabits.map(h => ({
      Habito: h.name,
      Categoria: h.category,
      StreakAtual: h.streak,
      MelhorStreak: h.bestStreak,
      DiasCompletos: h.completedDates.length,
      Meta: `${h.target}x/semana`,
    }));
    exportToCSV(data, 'habitos');
  };

  const printReport = () => {
    window.print();
  };

  const fmt = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="space-y-6 animate-fade-in print:space-y-4">
      {/* Header - Hide on print */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-dola-text flex items-center gap-2">
            <FileBarChart size={24} className="text-dola-accent" />
            Relatórios
          </h1>
          <p className="text-sm text-dola-muted mt-1">Análises e exportações de dados</p>
        </div>
        <button
          onClick={printReport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-dola-accent to-dola-accent2 text-white text-sm font-medium hover:opacity-90"
        >
          <Printer size={16} />
          Imprimir Relatório
        </button>
      </div>

      {/* Filters - Hide on print */}
      <div className="flex flex-wrap gap-3 print:hidden">
        <div className="glass rounded-xl flex overflow-hidden">
          {(['week', 'month', 'quarter', 'year'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 text-xs font-medium ${period === p ? 'bg-dola-accent text-white' : 'text-dola-muted'}`}>
              {p === 'week' ? 'Semana' : p === 'month' ? 'Mês' : p === 'quarter' ? 'Trimestre' : 'Ano'}
            </button>
          ))}
        </div>
        <input 
          type="month" 
          value={format(selectedMonth, 'yyyy-MM')}
          onChange={e => setSelectedMonth(new Date(e.target.value + '-01'))}
          className="!w-auto !py-2"
        />
      </div>

      {/* Print Header */}
      <div className="hidden print:block text-center mb-8">
        <h1 className="text-2xl font-bold">DOLA AI - Relatório Executivo</h1>
        <p className="text-gray-600">{currentUser?.name}</p>
        <p className="text-sm text-gray-500">{dateRangeStr}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-2">
        <div className="glass rounded-2xl p-4 print:border print:border-gray-200 print:rounded-lg">
          <TrendingUp size={18} className="text-dola-accent mb-2 print:text-gray-600" />
          <p className="text-2xl font-bold text-dola-text print:text-black">{stats.productivity}%</p>
          <p className="text-xs text-dola-muted print:text-gray-500">Produtividade</p>
        </div>
        <div className="glass rounded-2xl p-4 print:border print:border-gray-200 print:rounded-lg">
          <CheckSquare size={18} className="text-dola-success mb-2 print:text-gray-600" />
          <p className="text-2xl font-bold text-dola-text print:text-black">{stats.tasksDone}/{stats.tasksTotal}</p>
          <p className="text-xs text-dola-muted print:text-gray-500">Tarefas Concluídas</p>
        </div>
        <div className="glass rounded-2xl p-4 print:border print:border-gray-200 print:rounded-lg">
          <Wallet size={18} className={`mb-2 ${stats.balance >= 0 ? 'text-dola-success' : 'text-dola-danger'} print:text-gray-600`} />
          <p className={`text-xl font-bold ${stats.balance >= 0 ? 'text-dola-success' : 'text-dola-danger'} print:text-black`}>{fmt(stats.balance)}</p>
          <p className="text-xs text-dola-muted print:text-gray-500">Saldo do Período</p>
        </div>
        <div className="glass rounded-2xl p-4 print:border print:border-gray-200 print:rounded-lg">
          <Target size={18} className="text-dola-warning mb-2 print:text-gray-600" />
          <p className="text-2xl font-bold text-dola-text print:text-black">{stats.avgStreak}</p>
          <p className="text-xs text-dola-muted print:text-gray-500">Média Streaks</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="glass rounded-2xl p-5 print:border print:border-gray-200 print:rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dola-text print:text-black flex items-center gap-2">
            <Wallet size={16} className="text-dola-success print:text-gray-600" />
            Resumo Financeiro
          </h3>
          <button onClick={exportFinances} className="text-xs text-dola-accent hover:underline print:hidden flex items-center gap-1">
            <Download size={12} /> Exportar CSV
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-dola-success">{fmt(stats.income)}</p>
            <p className="text-xs text-dola-muted">Receitas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-dola-danger">{fmt(stats.expense)}</p>
            <p className="text-xs text-dola-muted">Despesas</p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${stats.balance >= 0 ? 'text-dola-success' : 'text-dola-danger'}`}>{fmt(stats.balance)}</p>
            <p className="text-xs text-dola-muted">Saldo</p>
          </div>
        </div>
        {financeByCategory.length > 0 && (
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={financeByCategory} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value" paddingAngle={2}>
                {financeByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => fmt(Number(v))} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Tasks by Sector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5 print:border print:border-gray-200 print:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dola-text print:text-black flex items-center gap-2">
              <CheckSquare size={16} className="text-dola-accent print:text-gray-600" />
              Tarefas por Setor
            </h3>
            <button onClick={exportTasks} className="text-xs text-dola-accent hover:underline print:hidden flex items-center gap-1">
              <Download size={12} /> CSV
            </button>
          </div>
          {tasksBySector.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={tasksBySector} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={80} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2a2a3e', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {tasksBySector.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-dola-muted py-8">Sem dados no período</p>
          )}
        </div>

        <div className="glass rounded-2xl p-5 print:border print:border-gray-200 print:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-dola-text print:text-black flex items-center gap-2">
              <Target size={16} className="text-dola-warning print:text-gray-600" />
              Hábitos
            </h3>
            <button onClick={exportHabits} className="text-xs text-dola-accent hover:underline print:hidden flex items-center gap-1">
              <Download size={12} /> CSV
            </button>
          </div>
          <div className="space-y-2">
            {myHabits.slice(0, 5).map(h => (
              <div key={h.id} className="flex items-center justify-between p-2 rounded-lg bg-dola-bg/50 print:bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{h.icon}</span>
                  <span className="text-sm text-dola-text print:text-black">{h.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-dola-warning">🔥 {h.streak}</span>
                  <span className="text-xs text-dola-muted">/ Best: {h.bestStreak}</span>
                </div>
              </div>
            ))}
            {myHabits.length === 0 && (
              <p className="text-center text-dola-muted py-4">Nenhum hábito cadastrado</p>
            )}
          </div>
        </div>
      </div>

      {/* Time Stats */}
      <div className="glass rounded-2xl p-5 print:border print:border-gray-200 print:rounded-lg">
        <h3 className="text-sm font-semibold text-dola-text print:text-black mb-4 flex items-center gap-2">
          <Clock size={16} className="text-dola-cyan print:text-gray-600" />
          Estatísticas de Tempo
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-xl bg-dola-bg/50 print:bg-gray-50">
            <p className="text-2xl font-bold text-dola-text print:text-black">{Math.floor(stats.timeSpent / 60)}h</p>
            <p className="text-xs text-dola-muted">Horas Focadas</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-dola-bg/50 print:bg-gray-50">
            <p className="text-2xl font-bold text-dola-text print:text-black">{myEvents.length}</p>
            <p className="text-xs text-dola-muted">Total Eventos</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-dola-bg/50 print:bg-gray-50">
            <p className="text-2xl font-bold text-dola-text print:text-black">{myReminders.filter(r => r.done).length}</p>
            <p className="text-xs text-dola-muted">Lembretes Cumpridos</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-dola-bg/50 print:bg-gray-50">
            <p className="text-2xl font-bold text-dola-text print:text-black">
              {myTasks.length > 0 ? Math.round(stats.timeSpent / myTasks.length) : 0}min
            </p>
            <p className="text-xs text-dola-muted">Média/Tarefa</p>
          </div>
        </div>
      </div>

      {/* Export Buttons - Hide on print */}
      <div className="glass rounded-2xl p-5 print:hidden">
        <h3 className="text-sm font-semibold text-dola-text mb-4 flex items-center gap-2">
          <Download size={16} className="text-dola-accent" />
          Exportar Dados
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button onClick={exportTasks} className="p-3 rounded-xl bg-dola-bg/50 hover:bg-dola-accent/10 border border-dola-border/50 flex flex-col items-center gap-2 transition-colors">
            <CheckSquare size={20} className="text-dola-accent" />
            <span className="text-xs text-dola-text">Tarefas (CSV)</span>
          </button>
          <button onClick={exportFinances} className="p-3 rounded-xl bg-dola-bg/50 hover:bg-dola-accent/10 border border-dola-border/50 flex flex-col items-center gap-2 transition-colors">
            <Wallet size={20} className="text-dola-success" />
            <span className="text-xs text-dola-text">Financeiro (CSV)</span>
          </button>
          <button onClick={exportHabits} className="p-3 rounded-xl bg-dola-bg/50 hover:bg-dola-accent/10 border border-dola-border/50 flex flex-col items-center gap-2 transition-colors">
            <Target size={20} className="text-dola-warning" />
            <span className="text-xs text-dola-text">Hábitos (CSV)</span>
          </button>
          <button onClick={printReport} className="p-3 rounded-xl bg-dola-bg/50 hover:bg-dola-accent/10 border border-dola-border/50 flex flex-col items-center gap-2 transition-colors">
            <Printer size={20} className="text-dola-pink" />
            <span className="text-xs text-dola-text">Imprimir/PDF</span>
          </button>
        </div>
      </div>

      {/* Footer for print */}
      <div className="hidden print:block text-center text-xs text-gray-400 mt-8 pt-4 border-t">
        Gerado por DOLA AI Executive Assistant • {format(new Date(), 'dd/MM/yyyy HH:mm')}
      </div>
    </div>
  );
}
