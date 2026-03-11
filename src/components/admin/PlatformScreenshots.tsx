import { useState } from 'react';
import { api, type SiteSettings } from '../../lib/api';
import { toast } from './shared';

const SLOTS = [
  { key: 'platform_screenshot_1', label: 'Личный кабинет партнёра' },
  { key: 'platform_screenshot_2', label: 'Карточка дела' },
  { key: 'platform_screenshot_3', label: 'Экран внутреннего чата' },
  { key: 'platform_screenshot_4', label: 'Экран мобильного приложения' },
];

interface Props {
  settings: SiteSettings;
  onRefresh: () => void;
}

export default function PlatformScreenshots({ settings, onRefresh }: Props) {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  async function handleUpload(slotKey: string, file: File) {
    setUploading(prev => ({ ...prev, [slotKey]: true }));
    try {
      const media = await api.media.upload(file);
      await api.settings.update(slotKey, media.file_url);
      toast('Скриншот загружен');
      onRefresh();
    } catch (e: any) {
      toast(e.message || 'Ошибка загрузки', 'error');
    } finally {
      setUploading(prev => ({ ...prev, [slotKey]: false }));
    }
  }

  async function handleRemove(slotKey: string) {
    if (!confirm('Удалить скриншот?')) return;
    await api.settings.update(slotKey, '');
    toast('Скриншот удалён');
    onRefresh();
  }

  return (
    <div className="section-panel active">
      <div className="page-header">
        <div>
          <div className="page-title">Скриншоты платформы</div>
          <div className="page-subtitle">Загрузите скриншоты для раздела «Интерфейс платформы» на странице /platform</div>
        </div>
      </div>
      <div className="screenshots-admin-grid">
        {SLOTS.map((slot) => {
          const url = settings[slot.key] || '';
          const isUploading = uploading[slot.key];
          return (
            <div key={slot.key} className="screenshot-admin-card card">
              <div className="card-title">{slot.label}</div>
              <div
                className="screenshot-upload-zone"
                onClick={() => !isUploading && document.getElementById(`file-${slot.key}`)?.click()}
              >
                {url ? (
                  <img src={url} alt={slot.label} className="screenshot-preview" />
                ) : (
                  <div className="screenshot-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span>{isUploading ? 'Загрузка...' : 'Нажмите для загрузки'}</span>
                  </div>
                )}
              </div>
              <input
                id={`file-${slot.key}`}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) { handleUpload(slot.key, file); e.target.value = ''; }
                }}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  disabled={isUploading}
                  onClick={() => document.getElementById(`file-${slot.key}`)?.click()}
                >
                  {url ? 'Заменить' : 'Загрузить'}
                </button>
                {url && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(slot.key)}
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
