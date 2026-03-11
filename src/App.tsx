import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Admin from './pages/Admin';
import TrainingPage from './pages/TrainingPage';
import PlatformPage from './pages/PlatformPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/training" element={<TrainingPage />} />
      <Route path="/platform" element={<PlatformPage />} />
    </Routes>
  );
}
