import { useState, useEffect, useRef } from 'react';
import { toast } from './shared';
import { api } from '../../lib/api';

interface Props {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: Props) {
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.settings.getAll().then(s => {
      if (s.platform_screenshot) setScreenshotUrl(s.platform_screenshot);
    }).catch(() => {});
  }, []);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploaded = await api.media.upload(file);
      await api.settings.update('platform_screenshot', uploaded.file_url);
      setScreenshotUrl(uploaded.file_url);
      toast('Скриншот платформы обновлён');
    } catch (err: any) {
      toast(err.message || 'Ошибка загрузки', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleRemove() {
    try {
      await api.settings.update('platform_screenshot', '');
      setScreenshotUrl('');
      toast('Скриншот удалён — показывается стандартный макет');
    } catch (err: any) {
      toast(err.message || 'Ошибка', 'error');
    }
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Настройки</div></div>

      {/* Platform screenshot */}
      <div className="card" style={{ maxWidth: '600px', marginBottom: '24px' }}>
        <div className="card-title">Скриншот платформы</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
          Изображение отображается в блоке «Цифровая платформа» на главной странице.
          Если не загружено — показывается стандартный макет интерфейса.
        </p>

        {screenshotUrl && (
          <div style={{ marginBottom: '16px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img
              src={screenshotUrl}
              alt="Скриншот платформы"
              style={{ width: '100%', display: 'block', maxHeight: '320px', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Загрузка...' : screenshotUrl ? 'Заменить изображение' : 'Загрузить изображение'}
          </button>
          {screenshotUrl && (
            <button className="btn btn-danger" onClick={handleRemove}>
              Удалить (показывать макет)
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Info */}
      <div className="card" style={{ maxWidth: '400px' }}>
        <div className="card-title">Информация</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
          Пароль администратора хранится в файле .env (VITE_ADMIN_PASSWORD) на сервере.
          Для смены пароля измените это значение и перезапустите приложение.
        </p>
        <button className="btn btn-secondary" onClick={onLogout}>Выйти из панели</button>
      </div>
    </div>
  );
}
