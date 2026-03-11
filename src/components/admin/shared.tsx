import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { api } from '../../lib/api';

// ─── Toast ────────────────────────────────────────────────
let toastContainer: HTMLElement | null = null;

export function toast(message: string, type: 'success' | 'error' = 'success') {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
  }
  if (!toastContainer) return;

  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span style="font-size:16px">${type === 'success' ? '✓' : '✕'}</span><span>${message}</span>`;
  toastContainer.appendChild(el);
  setTimeout(() => el.classList.add('show'), 10);
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

// ─── Modal ────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onSave: () => Promise<void>;
  onClose: () => void;
}

export function Modal({ open, title, children, onSave, onClose }: ModalProps) {
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave();
      onClose();
    } catch (e: any) {
      toast('Ошибка: ' + (e.message || 'Неизвестная ошибка'), 'error');
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div className="modal-close" onClick={onClose}>×</div>
        </div>
        <div>{children}</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Image Picker ─────────────────────────────────────────
interface ImagePickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function ImagePicker({ onSelect, onClose }: ImagePickerProps) {
  const [images, setImages] = useState<{ id: string; file_url: string; file_name: string }[]>([]);

  useEffect(() => {
    api.media.list().then(setImages);
  }, []);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      await api.media.upload(file);
      const updated = await api.media.list();
      setImages(updated);
      e.target.value = '';
    }
  }

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal modal-large">
        <div className="modal-header">
          <div className="modal-title">Выбрать изображение</div>
          <div className="modal-close" onClick={onClose}>×</div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
            + Загрузить новое
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </label>
        </div>
        <div className="gallery-grid">
          {images.length === 0 ? (
            <p className="gallery-no-images">Нет изображений</p>
          ) : (
            images.map(img => (
              <div key={img.id} className="gallery-item" onClick={() => { onSelect(img.file_url); onClose(); }}>
                <img src={img.file_url} alt={img.file_name} loading="lazy" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
