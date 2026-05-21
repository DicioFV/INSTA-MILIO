import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProvasSociais from './components/ProvasSociais';
import ComoFuncionaSection from './components/ComoFuncionaSection';
import ModulosSection from './components/ModulosSection';
import InstaquiSection from './components/InstaquiSection';
import PlanoConteudo from './components/PlanoConteudo';
import AlgoritmoSection from './components/AlgoritmoSection';
import AgenteSection from './components/AgenteSection';
import CronogramaSection from './components/CronogramaSection';
import DepoimentosSection from './components/DepoimentosSection';
import AntesDepoisSection from './components/AntesDepoisSection';
import ErrosSection from './components/ErrosSection';
import ViraisSection from './components/ViraisSection';
import SeriesSection from './components/SeriesSection';
import FerramentasSection from './components/FerramentasSection';
import RecursosSection from './components/RecursosSection';
import AnalisePerfilSection from './components/AnalisePerfilSection';
import FAQSection from './components/FAQSection';
import AgenteIA from './components/AgenteIA';
import LoginModal from './components/LoginModal';
import DashboardVIP from './components/DashboardVIP';
import ParticlesBackground from './components/ParticlesBackground';
import FloatingCTA from './components/FloatingCTA';
import ThemeSwitcher from './components/ThemeSwitcher';
import OnboardingTour from './components/OnboardingTour';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import ShareButtons from './components/ShareButtons';
import Footer from './components/Footer';
import { useToast } from './components/Toast';
import { useAchievement, ACHIEVEMENTS } from './components/AchievementPopup';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { showToast } = useToast();
  const { unlockAchievement } = useAchievement();
  
  // Refs for keyboard shortcuts
  const agenteTriggerRef = useRef<(() => void) | null>(null);
  const themeTriggerRef = useRef<(() => void) | null>(null);

  // Conquista de primeira visita
  useEffect(() => {
    const timer = setTimeout(() => {
      unlockAchievement(ACHIEVEMENTS.FIRST_VISIT);
    }, 3000);
    return () => clearTimeout(timer);
  }, [unlockAchievement]);

  // Restaurar sessão do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('im-user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user.isLoggedIn) {
          setIsLoggedIn(true);
          setUserName(user.name);
        }
      } catch {
        // Ignorar erro de parse
      }
    }
  }, []);

  const handleLogin = (email: string, name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem('im-user', JSON.stringify({ email, name, isLoggedIn: true }));
    showToast('success', 'Login realizado!', `Bem-vindo, ${name}! 👑`);
    unlockAchievement(ACHIEVEMENTS.VIP_LOGIN);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('im-user');
    showToast('info', 'Você saiu', 'Até a próxima! 👋');
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsDashboardOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary relative">
      {/* Partículas de fundo */}
      <ParticlesBackground />

      {/* Header Fixo */}
      <Header
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Prova Social / Números Animados */}
      <ProvasSociais />

      {/* 2.5 Como Funciona */}
      <ComoFuncionaSection />

      {/* 3. Os 7 Módulos */}
      <ModulosSection />

      {/* 3.5 InstAqui - Guia do Instagram */}
      <InstaquiSection />

      {/* 4. Plano de Conteúdo por Perfil */}
      <PlanoConteudo />

      {/* 5. Cronograma 60 Dias */}
      <div id="cronograma">
        <CronogramaSection />
      </div>

      {/* 5.5 Depoimentos */}
      <DepoimentosSection />

      {/* 6. Sinais do Algoritmo 2026 */}
      <AlgoritmoSection />

      {/* 6.5 Agente IA - Seção Dedicada */}
      <AgenteSection />

      {/* 7. Análise de Perfil */}
      <AnalisePerfilSection />

      {/* 7.5 Antes vs Depois */}
      <AntesDepoisSection />

      {/* 8. Erros que Travam o Crescimento */}
      <ErrosSection />

      {/* 9. Vídeos Virais + YouTube */}
      <ViraisSection />

      {/* 10. As 5 Séries Fixas */}
      <SeriesSection />

      {/* 10.5 Ferramentas Interativas */}
      <FerramentasSection />

      {/* 11. Ferramentas e Recursos */}
      <RecursosSection
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      {/* 12. FAQ */}
      <FAQSection />

      {/* 13. Footer */}
      <Footer />

      {/* Agente IA - Botão Flutuante */}
      <AgenteIA />

      {/* CTA Flutuante */}
      <FloatingCTA />

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Share Buttons */}
      <ShareButtons />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts 
        onOpenAgent={() => agenteTriggerRef.current?.()}
        onOpenTheme={() => themeTriggerRef.current?.()}
      />

      {/* Onboarding Tour */}
      <OnboardingTour />

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Dashboard VIP */}
      <DashboardVIP
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        userName={userName}
      />
    </div>
  );
}

export default App;
