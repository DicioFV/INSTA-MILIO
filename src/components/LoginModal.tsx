import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, LogIn, UserPlus, LogOut } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userName: string;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
}

export default function LoginModal({ isOpen, onClose, isLoggedIn, userName, onLogin, onLogout }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== '1234fv') {
      setError('Senha incorreta. A senha padrão VIP é: 1234fv');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Digite seu nome');
      return;
    }

    const displayName = mode === 'register' ? name : email.split('@')[0];
    onLogin(email, displayName);
    
    // Save to localStorage
    localStorage.setItem('im-user', JSON.stringify({ email, name: displayName, isLoggedIn: true }));
    
    setEmail('');
    setName('');
    setPassword('');
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('im-user');
    onLogout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-secondary rounded-2xl border border-gold-primary/20 max-w-md w-full p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold-primary transition-colors"
            >
              <X size={20} />
            </button>

            {isLoggedIn ? (
              /* Logged In View */
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 gold-gradient rounded-full flex items-center justify-center">
                  <span className="text-3xl">👑</span>
                </div>
                <h2 className="font-playfair text-2xl font-bold text-text-primary mb-2">
                  Bem-vindo, {userName}!
                </h2>
                <p className="text-text-secondary mb-6">Você tem acesso VIP a todos os recursos</p>
                
                <div className="space-y-3 text-left mb-6">
                  <div className="bg-dark-primary/50 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-success">✅</span>
                    <span className="text-text-secondary text-sm">Acesso a todos os downloads</span>
                  </div>
                  <div className="bg-dark-primary/50 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-success">✅</span>
                    <span className="text-text-secondary text-sm">Edição do cronograma</span>
                  </div>
                  <div className="bg-dark-primary/50 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-success">✅</span>
                    <span className="text-text-secondary text-sm">Progresso salvo automaticamente</span>
                  </div>
                  <div className="bg-dark-primary/50 rounded-lg p-3 flex items-center gap-3">
                    <span className="text-success">✅</span>
                    <span className="text-text-secondary text-sm">Agente IA ilimitado</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-error/30 text-error rounded-xl hover:bg-error/10 transition-colors"
                >
                  <LogOut size={18} />
                  Sair da Conta
                </button>
              </div>
            ) : (
              /* Login / Register Form */
              <>
                <div className="text-center mb-6">
                  <span className="text-4xl mb-3 block">🔐</span>
                  <h2 className="font-playfair text-2xl font-bold text-text-primary">
                    {mode === 'login' ? 'Login VIP' : 'Criar Conta VIP'}
                  </h2>
                  <p className="text-text-secondary text-sm mt-1">
                    Acesse todos os recursos exclusivos
                  </p>
                </div>

                {/* Mode Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => { setMode('login'); setError(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      mode === 'login' ? 'gold-gradient text-dark-primary' : 'bg-dark-tertiary text-text-secondary'
                    }`}
                  >
                    <LogIn size={16} /> Entrar
                  </button>
                  <button
                    onClick={() => { setMode('register'); setError(''); }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      mode === 'register' ? 'gold-gradient text-dark-primary' : 'bg-dark-tertiary text-text-secondary'
                    }`}
                  >
                    <UserPlus size={16} /> Registrar
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-montserrat font-bold text-gold-primary mb-1.5">Nome</label>
                      <div className="relative">
                        <UserPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full pl-10 pr-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary text-sm placeholder-text-muted focus:border-gold-primary focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-montserrat font-bold text-gold-primary mb-1.5">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full pl-10 pr-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary text-sm placeholder-text-muted focus:border-gold-primary focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat font-bold text-gold-primary mb-1.5">Senha VIP</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha VIP"
                        className="w-full pl-10 pr-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary text-sm placeholder-text-muted focus:border-gold-primary focus:outline-none"
                        required
                      />
                    </div>
                    <p className="text-text-muted text-xs mt-1">💡 Senha padrão VIP: 1234fv</p>
                  </div>

                  {error && (
                    <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 gold-gradient rounded-xl font-montserrat font-bold text-dark-primary hover:opacity-90 transition-opacity"
                  >
                    {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                    {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
