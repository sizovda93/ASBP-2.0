import { useState, useEffect, useRef } from 'react';
import { api, type MediaFile } from '../../lib/api';
import { toast } from './shared';

interface Props {
  onRefresh: () => void;
}

export default function GalleryManager({ onRefresh }: Props) {
  const [images, setImages] = useState<MediaFile[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  async function load() {
    const list = await api.media.list();
    setImages(list);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(file: File) {
    try {
      await api.media.upload(file);
      toast('Изображение загружено');
      load();
    } catch (e: any) {
      toast(e.message || 'Ошибка загрузки', 'error');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить изображение?')) return;
    await api.media.delete(id);
    toast('Изображение удалено');
    load();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    dropRef.current?.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  }

  return (
    <div className="section-panel active">
      <div className="page-header">
        <div>
          <div className="page-title">Галерея изображений</div>
          <div className="page-subtitle">Загружайте изображения и используйте их на сайте</div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Загрузить изображение</div>
        <div
          ref={dropRef}
          className="upload-zone"
          onClick={() => document.getElementById('gallery-file-input')?.click()}
          onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('dragover'); }}
          onDragLeave={() => dropRef.current?.classList.remove('dragover')}
          onDrop={handleDrop}
        >
          <div className="upload-zone-icon">📁</div>
          <div>Нажмите или перетащите файл сюда</div>
          <div style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>
            JPG, PNG, GIF, WebP, SVG — до 10 МБ
          </div>
        </div>
        <input
          type="file"
          id="gallery-file-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) { handleUpload(file); e.target.value = ''; }
          }}
        />
      </div>
      <div className="card">
        <div className="card-title">Загруженные изображения</div>
        <div className="gallery-grid">
          {images.length === 0 ? (
            <p className="gallery-no-images">Нет изображений</p>
          ) : (
            images.map(img => (
              <div key={img.id} className="gallery-item">
                <img src={img.file_url} alt={img.file_name} loading="lazy" />
                <div className="gallery-item-actions">
                  <button
                    className="gallery-btn gallery-btn-delete"
                    onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
