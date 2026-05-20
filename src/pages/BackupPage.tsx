import { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useWhatsAppStore } from '../store/useWhatsAppStore';
import { 
  Download, Upload, Shield, Database, FileJson, CheckCircle2, 
  AlertTriangle, Clock, HardDrive, RefreshCw, Info,
  User, Calendar, CheckSquare, Bell, Target, Wallet, Heart, FileText
} from 'lucide-react';
import { format } from 'date-fns';

interface BackupData {
  version: string;
  type: 'user' | 'full';
  createdAt: string;
  createdBy: string;
  data: {
    tasks?: any[];
    events?: any[];
    reminders?: any[];
    habits?: any[];
    finances?: any[];
    familyEvents?: any[];
    notes?: any[];
    chatMessages?: any[];
    users?: any[];
    whatsappConfig?: any;
    notificationSettings?: any;
    notificationLogs?: any[];
  };
}

export default function BackupPage() {
  const store = useStore();
  const whatsappStore = useWhatsAppStore();
  const { currentUser, tasks, events, reminders, habits, finances, familyEvents, notes, chatMessages, users } = store;
  const { whatsappConfig, notificationSettings, notificationLogs } = whatsappStore;
  
  const uid = currentUser?.id || '';
  const isAdmin = currentUser?.role === 'admin';
  
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);
  const [lastBackup, setLastBackup] = useState<string | null>(localStorage.getItem('dola-last-backup'));
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Count user data
  const userDataCounts = {
    tasks: tasks.filter(t => t.userId === uid).length,
    events: events.filter(e => e.userId === uid).length,
    reminders: reminders.filter(r => r.userId === uid).length,
    habits: habits.filter(h => h.userId === uid).length,
    finances: finances.filter(f => f.userId === uid).length,
    familyEvents: familyEvents.filter(f => f.userId === uid).length,
    notes: notes.filter(n => n.userId === uid).length,
    chatMessages: chatMessages.length,
  };

  const totalUserItems = Object.values(userDataCounts).reduce((a, b) => a + b, 0);

  // Generate backup filename
  const generateFilename = (type: 'user' | 'full') => {
    const date = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const name = currentUser?.name?.replace(/\s+/g, '_') || 'user';
    return `DOLA_AI_backup_${type}_${name}_${date}.json`;
  };

  // Create user backup (only logged user's data)
  const createUserBackup = (): BackupData => {
    return {
      version: '1.3.0',
      type: 'user',
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.email || '',
      data: {
        tasks: tasks.filter(t => t.userId === uid),
        events: events.filter(e => e.userId === uid),
        reminders: reminders.filter(r => r.userId === uid),
        habits: habits.filter(h => h.userId === uid),
        finances: finances.filter(f => f.userId === uid),
        familyEvents: familyEvents.filter(f => f.userId === uid),
        notes: notes.filter(n => n.userId === uid),
        chatMessages: chatMessages,
        notificationSettings: notificationSettings[uid] ? { [uid]: notificationSettings[uid] } : {},
        notificationLogs: notificationLogs.filter(l => l.userId === uid),
      },
    };
  };

  // Create full backup (all data - admin only)
  const createFullBackup = (): BackupData => {
    return {
      version: '1.3.0',
      type: 'full',
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.email || '',
      data: {
        users,
        tasks,
        events,
        reminders,
        habits,
        finances,
        familyEvents,
        notes,
        chatMessages,
        whatsappConfig,
        notificationSettings,
        notificationLogs,
      },
    };
  };

  // Download backup file
  const downloadBackup = (type: 'user' | 'full') => {
    const backup = type === 'user' ? createUserBackup() : createFullBackup();
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = generateFilename(type);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Save last backup time
    const now = new Date().toISOString();
    localStorage.setItem('dola-last-backup', now);
    setLastBackup(now);
  };

  // Handle file import
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    setImportResult(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backup: BackupData = JSON.parse(content);
        
        // Validate backup structure
        if (!backup.version || !backup.type || !backup.data) {
          throw new Error('Arquivo de backup inválido');
        }
        
        // Check if full backup and user is not admin
        if (backup.type === 'full' && !isAdmin) {
          throw new Error('Apenas administradores podem restaurar backup completo');
        }
        
        // Import data
        importBackupData(backup);
        
        setImportResult({
          success: true,
          message: `Backup restaurado com sucesso! (${backup.type === 'full' ? 'Completo' : 'Dados do usuário'})`,
        });
      } catch (error: any) {
        setImportResult({
          success: false,
          message: error.message || 'Erro ao importar backup',
        });
      }
      setImporting(false);
    };
    
    reader.onerror = () => {
      setImportResult({
        success: false,
        message: 'Erro ao ler arquivo',
      });
      setImporting(false);
    };
    
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Import backup data into store
  const importBackupData = (backup: BackupData) => {
    const { data } = backup;
    
    if (backup.type === 'user') {
      // For user backup, merge with existing data (replace user's data)
      
      // Clear existing user data first
      tasks.filter(t => t.userId === uid).forEach(t => store.deleteTask(t.id));
      events.filter(e => e.userId === uid).forEach(e => store.deleteEvent(e.id));
      reminders.filter(r => r.userId === uid).forEach(r => store.deleteReminder(r.id));
      habits.filter(h => h.userId === uid).forEach(h => store.deleteHabit(h.id));
      finances.filter(f => f.userId === uid).forEach(f => store.deleteFinance(f.id));
      familyEvents.filter(f => f.userId === uid).forEach(f => store.deleteFamilyEvent(f.id));
      notes.filter(n => n.userId === uid).forEach(n => store.deleteNote(n.id));
      
      // Import new data
      data.tasks?.forEach(t => {
        store.addTask({ ...t, userId: uid, id: undefined, createdAt: undefined });
      });
      data.events?.forEach(e => {
        store.addEvent({ ...e, userId: uid, id: undefined });
      });
      data.reminders?.forEach(r => {
        store.addReminder({ ...r, userId: uid, id: undefined });
      });
      data.habits?.forEach(h => {
        // Special handling for habits to preserve streaks
        const { id, ...habitData } = h;
        const newHabit = { ...habitData, userId: uid };
        // We need to add habit with existing data
        store.addHabit(newHabit);
      });
      data.finances?.forEach(f => {
        store.addFinance({ ...f, userId: uid, id: undefined });
      });
      data.familyEvents?.forEach(f => {
        store.addFamilyEvent({ ...f, userId: uid, id: undefined });
      });
      data.notes?.forEach(n => {
        store.addNote({ ...n, userId: uid, id: undefined, createdAt: undefined, updatedAt: undefined });
      });
      
      // Import notification settings
      if (data.notificationSettings && data.notificationSettings[uid]) {
        whatsappStore.setNotificationSettings(uid, data.notificationSettings[uid]);
      }
      
    } else if (backup.type === 'full' && isAdmin) {
      // For full backup, replace everything (admin only)
      // This requires direct localStorage manipulation for complete restore
      
      const fullState = {
        users: data.users || users,
        tasks: data.tasks || [],
        events: data.events || [],
        reminders: data.reminders || [],
        habits: data.habits || [],
        finances: data.finances || [],
        familyEvents: data.familyEvents || [],
        notes: data.notes || [],
        chatMessages: data.chatMessages || [],
      };
      
      // Save to localStorage directly
      localStorage.setItem('dola-ai-storage', JSON.stringify({ state: fullState }));
      
      // Save WhatsApp config
      if (data.whatsappConfig || data.notificationSettings || data.notificationLogs) {
        const whatsappState = {
          whatsappConfig: data.whatsappConfig || whatsappConfig,
          notificationSettings: data.notificationSettings || {},
          notificationLogs: data.notificationLogs || [],
          messageQueue: [],
        };
        localStorage.setItem('dola-whatsapp-storage', JSON.stringify({ state: whatsappState }));
      }
      
      // Reload page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  // Auto backup (save to localStorage)
  const createAutoBackup = () => {
    const backup = createUserBackup();
    localStorage.setItem('dola-auto-backup', JSON.stringify(backup));
    localStorage.setItem('dola-last-auto-backup', new Date().toISOString());
    alert('✅ Backup automático salvo no navegador!');
  };

  // Restore from auto backup
  const restoreAutoBackup = () => {
    const savedBackup = localStorage.getItem('dola-auto-backup');
    if (!savedBackup) {
      alert('Nenhum backup automático encontrado.');
      return;
    }
    
    if (confirm('Restaurar dados do último backup automático? Seus dados atuais serão substituídos.')) {
      try {
        const backup: BackupData = JSON.parse(savedBackup);
        importBackupData(backup);
        setImportResult({
          success: true,
          message: 'Backup automático restaurado com sucesso!',
        });
      } catch (error) {
        alert('Erro ao restaurar backup automático.');
      }
    }
  };

  const lastAutoBackup = localStorage.getItem('dola-last-auto-backup');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dola-text flex items-center gap-2">
            <Database size={24} className="text-dola-accent" />
            Backup & Restauração
          </h1>
          <p className="text-sm text-dola-muted mt-1">Proteja seus dados com backups regulares</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass rounded-2xl p-4 text-center">
          <HardDrive size={20} className="mx-auto text-dola-accent mb-2" />
          <p className="text-2xl font-bold text-dola-text">{totalUserItems}</p>
          <p className="text-xs text-dola-muted">Itens Salvos</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <Clock size={20} className="mx-auto text-dola-warning mb-2" />
          <p className="text-sm font-bold text-dola-text">
            {lastBackup ? format(new Date(lastBackup), 'dd/MM HH:mm') : 'Nunca'}
          </p>
          <p className="text-xs text-dola-muted">Último Backup</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <Shield size={20} className="mx-auto text-dola-success mb-2" />
          <p className="text-sm font-bold text-dola-success">{isAdmin ? 'Admin' : 'Usuário'}</p>
          <p className="text-xs text-dola-muted">Nível de Acesso</p>
        </div>
        <div className="glass rounded-2xl p-4 text-center">
          <RefreshCw size={20} className="mx-auto text-dola-info mb-2" />
          <p className="text-sm font-bold text-dola-text">
            {lastAutoBackup ? format(new Date(lastAutoBackup), 'dd/MM HH:mm') : 'Nunca'}
          </p>
          <p className="text-xs text-dola-muted">Auto Backup</p>
        </div>
      </div>

      {/* Data Summary */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-dola-text mb-4 flex items-center gap-2">
          <FileJson size={16} className="text-dola-accent" />
          Seus Dados
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: CheckSquare, label: 'Tarefas', count: userDataCounts.tasks, color: 'text-dola-accent' },
            { icon: Calendar, label: 'Eventos', count: userDataCounts.events, color: 'text-dola-accent2' },
            { icon: Bell, label: 'Lembretes', count: userDataCounts.reminders, color: 'text-dola-warning' },
            { icon: Target, label: 'Hábitos', count: userDataCounts.habits, color: 'text-dola-success' },
            { icon: Wallet, label: 'Financeiro', count: userDataCounts.finances, color: 'text-dola-pink' },
            { icon: Heart, label: 'Família', count: userDataCounts.familyEvents, color: 'text-dola-danger' },
            { icon: FileText, label: 'Notas', count: userDataCounts.notes, color: 'text-dola-cyan' },
            { icon: User, label: 'Mensagens IA', count: userDataCounts.chatMessages, color: 'text-dola-muted' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-dola-bg/50">
                <Icon size={18} className={item.color} />
                <div>
                  <p className="text-lg font-bold text-dola-text">{item.count}</p>
                  <p className="text-[10px] text-dola-muted">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* User Backup */}
        <div className="glass rounded-2xl p-5 border border-dola-accent/20">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-dola-accent/10 flex items-center justify-center shrink-0">
              <Download size={24} className="text-dola-accent" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-dola-text">Backup Meus Dados</h3>
              <p className="text-xs text-dola-muted mt-1">
                Exporta apenas os dados da sua conta: tarefas, eventos, lembretes, hábitos, finanças, notas, etc.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => downloadBackup('user')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-dola-accent to-dola-accent2 text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Baixar Backup (Meus Dados)
            </button>
            <button
              onClick={createAutoBackup}
              className="w-full py-2.5 rounded-xl glass border border-dola-border text-dola-text font-medium text-sm hover:bg-dola-border/30 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Salvar Backup no Navegador
            </button>
          </div>
          <p className="text-[10px] text-dola-muted mt-3 text-center">
            📁 Arquivo JSON • ~{(JSON.stringify(createUserBackup()).length / 1024).toFixed(1)} KB
          </p>
        </div>

        {/* Full Backup (Admin) */}
        <div className={`glass rounded-2xl p-5 border ${isAdmin ? 'border-dola-success/20' : 'border-dola-border/30 opacity-60'}`}>
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isAdmin ? 'bg-dola-success/10' : 'bg-dola-border/30'}`}>
              <Shield size={24} className={isAdmin ? 'text-dola-success' : 'text-dola-muted'} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-dola-text flex items-center gap-2">
                Backup Completo
                {!isAdmin && <span className="text-[10px] px-2 py-0.5 rounded-full bg-dola-warning/10 text-dola-warning">Admin</span>}
              </h3>
              <p className="text-xs text-dola-muted mt-1">
                Exporta TODOS os dados: usuários, configurações, WhatsApp, tudo do sistema.
              </p>
            </div>
          </div>
          <button
            onClick={() => downloadBackup('full')}
            disabled={!isAdmin}
            className="w-full py-3 rounded-xl bg-dola-success text-white font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Shield size={16} />
            Baixar Backup Completo
          </button>
          {!isAdmin && (
            <p className="text-[10px] text-dola-warning mt-3 text-center">
              ⚠️ Apenas administradores podem fazer backup completo
            </p>
          )}
          {isAdmin && (
            <p className="text-[10px] text-dola-muted mt-3 text-center">
              🔐 Inclui: {users.length} usuários, configurações WhatsApp, todos os dados
            </p>
          )}
        </div>
      </div>

      {/* Import Section */}
      <div className="glass rounded-2xl p-5 border border-dola-warning/20">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-dola-warning/10 flex items-center justify-center shrink-0">
            <Upload size={24} className="text-dola-warning" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-dola-text">Importar / Restaurar Backup</h3>
            <p className="text-xs text-dola-muted mt-1">
              Restaure seus dados a partir de um arquivo de backup JSON exportado anteriormente.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
              id="backup-file-input"
            />
            <label
              htmlFor="backup-file-input"
              className="w-full py-3 rounded-xl bg-dola-warning text-white font-semibold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {importing ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Selecionar Arquivo .JSON
                </>
              )}
            </label>
          </div>
          
          <button
            onClick={restoreAutoBackup}
            disabled={!lastAutoBackup}
            className="w-full py-3 rounded-xl glass border border-dola-border text-dola-text font-semibold text-sm hover:bg-dola-border/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Restaurar Auto Backup
          </button>
        </div>

        {/* Import Result */}
        {importResult && (
          <div className={`mt-4 p-3 rounded-xl flex items-center gap-2 ${
            importResult.success ? 'bg-dola-success/10 text-dola-success' : 'bg-dola-danger/10 text-dola-danger'
          }`}>
            {importResult.success ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span className="text-sm">{importResult.message}</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-dola-text mb-4 flex items-center gap-2">
          <Info size={16} className="text-dola-info" />
          Como Funciona
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-dola-bg/50 border border-dola-border/30">
            <h4 className="text-sm font-semibold text-dola-accent mb-2">📥 Backup Meus Dados</h4>
            <ul className="text-xs text-dola-muted space-y-1">
              <li>• Exporta apenas os dados da SUA conta logada</li>
              <li>• Inclui: tarefas, eventos, lembretes, hábitos, finanças, família, notas</li>
              <li>• Arquivo JSON que você pode guardar em qualquer lugar</li>
              <li>• Ideal para trocar de dispositivo ou fazer backup pessoal</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-dola-bg/50 border border-dola-border/30">
            <h4 className="text-sm font-semibold text-dola-success mb-2">🔐 Backup Completo (Admin)</h4>
            <ul className="text-xs text-dola-muted space-y-1">
              <li>• Exporta TODOS os dados do sistema</li>
              <li>• Inclui: todos os usuários, configurações, WhatsApp, logs</li>
              <li>• Apenas administradores podem usar</li>
              <li>• Ideal para migração completa ou segurança do sistema</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-dola-bg/50 border border-dola-border/30">
            <h4 className="text-sm font-semibold text-dola-warning mb-2">📤 Importar / Restaurar</h4>
            <ul className="text-xs text-dola-muted space-y-1">
              <li>• Selecione um arquivo .JSON de backup</li>
              <li>• Backup pessoal: substitui seus dados atuais pelos do arquivo</li>
              <li>• Backup completo: só admin pode restaurar (recarrega a página)</li>
              <li>• Auto backup: salvo no navegador, restauração rápida</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-dola-accent/10 border border-dola-accent/30">
            <h4 className="text-sm font-semibold text-dola-accent mb-2">💡 Dicas</h4>
            <ul className="text-xs text-dola-muted space-y-1">
              <li>• <strong>Faça backup regularmente</strong> - pelo menos 1x por semana</li>
              <li>• <strong>Guarde em lugar seguro</strong> - Google Drive, Dropbox, email</li>
              <li>• <strong>Auto backup</strong> é salvo no navegador (não limpe dados do navegador!)</li>
              <li>• <strong>Antes de atualizar</strong> o sistema, sempre faça backup completo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
