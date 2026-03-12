import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Admin from './pages/Admin';
import TrainingPage from './pages/TrainingPage';
import PlatformPage from './pages/PlatformPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}
