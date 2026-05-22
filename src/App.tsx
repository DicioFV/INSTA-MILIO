import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ModulosPage from './pages/ModulosPage';
import InstaquiPage from './pages/InstaquiPage';
import CronogramaPage from './pages/CronogramaPage';
import FerramentasPage from './pages/FerramentasPage';
import AnalisePage from './pages/AnalisePage';
import ViraisPage from './pages/ViraisPage';
import RecursosPage from './pages/RecursosPage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/modulos" element={<ModulosPage />} />
          <Route path="/instaqui" element={<InstaquiPage />} />
          <Route path="/cronograma" element={<CronogramaPage />} />
          <Route path="/ferramentas" element={<FerramentasPage />} />
          <Route path="/analise" element={<AnalisePage />} />
          <Route path="/virais" element={<ViraisPage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
