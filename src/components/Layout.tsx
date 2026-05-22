import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ParticlesBackground from './ParticlesBackground';
import AgenteIA from './AgenteIA';
import ThemeSwitcher from './ThemeSwitcher';
import ShareButtons from './ShareButtons';
import KeyboardShortcuts from './KeyboardShortcuts';
import LoginModal from './LoginModal';
import DashboardVIP from './DashboardVIP';
import OnboardingTour from './OnboardingTour';
import { useToast } from './Toast';
import { useAchievement, ACHIEVEMENTS } from './AchievementPopup';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { showToast } = useToast();
  const { unlockAchievement } = useAchievement();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
      <ParticlesBackground />
      
      <Header
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <main>{children}</main>

      <Footer />

      {/* Floating Elements */}
      <AgenteIA />
      <ThemeSwitcher />
      <ShareButtons />
      <KeyboardShortcuts 
        onOpenAgent={() => {}}
        onOpenTheme={() => {}}
      />

      {/* Modals */}
      <OnboardingTour />
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <DashboardVIP
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        userName={userName}
      />
    </div>
  );
}
