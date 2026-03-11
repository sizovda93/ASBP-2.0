import { useState, useEffect, useCallback } from 'react';
import { api, type SiteSettings, type Stat, type Service, type Case, type Submission, type MediaFile } from '../lib/api';
import Login from '../components/admin/Login';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import SubmissionsManager from '../components/admin/SubmissionsManager';
import { TopBarEditor, NavEditor, HeroEditor, ContactEditor, FooterEditor } from '../components/admin/SectionEditors';
import StatsManager from '../components/admin/StatsManager';
import ServicesManager from '../components/admin/ServicesManager';
import CasesManager from '../components/admin/CasesManager';
import GalleryManager from '../components/admin/GalleryManager';
import SettingsPanel from '../components/admin/SettingsPanel';
import { ImagePicker } from '../components/admin/shared';

export default function Admin() {
  const [auth, setAuth] = useState(sessionStorage.getItem('aspb_admin') === '1');
  const [section, setSection] = useState('dashboard');
  const [settings, setSettings] = useState<SiteSettings>({});
  const [stats, setStats] = useState<Stat[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [imagePicker, setImagePicker] = useState<{ open: boolean; callback?: (url: string) => void }>({ open: false });

  const loadAll = useCallback(async () => {
    const [s, st, sv, cs, sb] = await Promise.all([
      api.settings.getAll(),
      api.stats.list(),
      api.services.list(),
      api.cases.list(),
      api.submissions.list(),
    ]);
    setSettings(s);
    setStats(st);
    setServices(sv);
    setCases(cs);
    setSubmissions(sb);
  }, []);

  useEffect(() => { if (auth) loadAll(); }, [auth, loadAll]);

  function handleLogin() {
    setAuth(true);
  }

  function handleLogout() {
    sessionStorage.removeItem('aspb_admin');
    setAuth(false);
  }

  function openImagePicker(callback: (url: string) => void) {
    setImagePicker({ open: true, callback });
  }

  if (!auth) return <div className="admin-panel"><Login onLogin={handleLogin} /></div>;

  const newCount = submissions.filter(s => s.status === 'new').length;

  function renderSection() {
    switch (section) {
      case 'dashboard':
        return <Dashboard submissions={submissions} onRefresh={loadAll} />;
      case 'submissions':
        return <SubmissionsManager submissions={submissions} onRefresh={loadAll} />;
      case 'topbar':
        return <TopBarEditor settings={settings} onRefresh={loadAll} />;
      case 'navigation':
        return <NavEditor settings={settings} onRefresh={loadAll} />;
      case 'hero':
        return <HeroEditor settings={settings} onRefresh={loadAll} onPickImage={openImagePicker} />;
      case 'stats':
        return <StatsManager stats={stats} onRefresh={loadAll} />;
      case 'services':
        return <ServicesManager services={services} settings={settings} onRefresh={loadAll} onPickImage={openImagePicker} />;
      case 'cases':
        return <CasesManager cases={cases} settings={settings} onRefresh={loadAll} />;
      case 'contacts':
        return <ContactEditor settings={settings} onRefresh={loadAll} />;
      case 'footer':
        return <FooterEditor settings={settings} onRefresh={loadAll} />;
      case 'gallery':
        return <GalleryManager onRefresh={loadAll} />;
      case 'settings':
        return <SettingsPanel onLogout={handleLogout} />;
      default:
        return <Dashboard submissions={submissions} onRefresh={loadAll} />;
    }
  }

  return (
    <div className="admin-panel">
      <AdminLayout currentSection={section} onNavigate={setSection} newCount={newCount} onLogout={handleLogout}>
        {renderSection()}
      </AdminLayout>

      {imagePicker.open && (
        <ImagePicker
          onSelect={(url: string) => {
            imagePicker.callback?.(url);
            setImagePicker({ open: false });
          }}
          onClose={() => setImagePicker({ open: false })}
        />
      )}
    </div>
  );
}
