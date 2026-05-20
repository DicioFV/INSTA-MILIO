import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProvasSociais from './components/ProvasSociais';
import ModulosSection from './components/ModulosSection';
import InstaquiSection from './components/InstaquiSection';
import PlanoConteudo from './components/PlanoConteudo';
import AlgoritmoSection from './components/AlgoritmoSection';
import AgenteSection from './components/AgenteSection';
import CronogramaSection from './components/CronogramaSection';
import ErrosSection from './components/ErrosSection';
import ViraisSection from './components/ViraisSection';
import SeriesSection from './components/SeriesSection';
import RecursosSection from './components/RecursosSection';
import AnalisePerfilSection from './components/AnalisePerfilSection';
import FAQSection from './components/FAQSection';
import AgenteIA from './components/AgenteIA';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

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
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('im-user');
  };

  return (
    <div className="min-h-screen bg-dark-primary text-text-primary">
      {/* Header Fixo */}
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Prova Social / Números Animados */}
      <ProvasSociais />

      {/* 3. Os 7 Módulos */}
      <ModulosSection />

      {/* 3.5 InstAqui - Guia do Instagram */}
      <InstaquiSection />

      {/* 4. Plano de Conteúdo por Perfil */}
      <PlanoConteudo />

      {/* 5. Cronograma 60 Dias */}
      <CronogramaSection />

      {/* 6. Sinais do Algoritmo 2026 */}
      <AlgoritmoSection />

      {/* 6.5 Agente IA - Seção Dedicada */}
      <AgenteSection />

      {/* 7. Análise de Perfil */}
      <AnalisePerfilSection />

      {/* 8. Erros que Travam o Crescimento */}
      <ErrosSection />

      {/* 9. Vídeos Virais + YouTube */}
      <ViraisSection />

      {/* 10. As 5 Séries Fixas */}
      <SeriesSection />

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

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
