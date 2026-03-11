import { useState, useRef } from 'react';
import { api, type Service, type SiteSettings } from '../../lib/api';
import { Modal, toast } from './shared';

interface Props {
  services: Service[];
  settings: SiteSettings;
  onRefresh: () => void;
  onPickImage: (callback: (url: string) => void) => void;
}

export default function ServicesManager({ services, settings, onRefresh, onPickImage }: Props) {
  const [sectionTag, setSectionTag] = useState(settings.services_tag || '');
  const [sectionTitle, setSectionTitle] = useState(settings.services_title || '');
  const [modal, setModal] = useState<{ open: boolean; item?: Service }>({ open: false });
  const formRef = useRef<any>({});

  async function saveSection() {
    await api.settings.bulkUpdate({ services_tag: sectionTag, services_title: sectionTitle });
    onRefresh();
    toast('Заголовок сохранён');
  }

  function openAdd() {
    formRef.current = { title: '', description: '', icon: 'shield', image_url: '' };
    setModal({ open: true });
  }

  function openEdit(item: Service) {
    formRef.current = { title: item.title, description: item.description, icon: item.icon, image_url: item.image_url };
    setModal({ open: true, item });
  }

  async function save() {
    if (modal.item) {
      await api.services.update(modal.item.id, formRef.current);
      toast('Услуга обновлена');
    } else {
      await api.services.create(formRef.current);
      toast('Услуга добавлена');
    }
    onRefresh();
  }

  async function remove(id: number) {
    if (!confirm('Удалить услугу?')) return;
    await api.services.delete(id);
    onRefresh();
    toast('Услуга удалена');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Услуги</div></div>
      <div className="card">
        <div className="card-title">Заголовок секции</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Тег</label>
            <input className="form-control" value={sectionTag} onChange={e => setSectionTag(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Заголовок секции</label>
            <input className="form-control" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={saveSection}>Сохранить заголовок</button>
      </div>
      <div className="card">
        <div className="card-title">
          Список услуг
          <button className="btn btn-accent btn-sm" onClick={openAdd}>+ Добавить</button>
        </div>
        <div className="item-list">
          {services.map(s => (
            <div key={s.id} className="item-row">
              {s.image_url && <img src={s.image_url} className="item-thumbnail" alt="" />}
              <div className="item-row-info">
                <div className="item-row-title">{s.title}</div>
                <div className="item-row-sub">{s.description}</div>
              </div>
              <div className="item-row-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => openEdit(s)}>Изменить</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.item ? 'Редактировать услугу' : 'Добавить услугу'}
        onSave={save}
        onClose={() => setModal({ open: false })}
      >
        <ServiceForm initial={formRef.current} onChange={v => { formRef.current = v; }} onPickImage={onPickImage} />
      </Modal>
    </div>
  );
}

const ICONS = ['shield', 'box', 'users', 'scale', 'chart', 'doc', 'star'];

function ServiceForm({ initial, onChange, onPickImage }: { initial: any; onChange: (v: any) => void; onPickImage: (cb: (url: string) => void) => void }) {
  const [form, setForm] = useState(initial);
  function update(field: string, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    onChange(next);
  }
  return (
    <>
      <div className="form-group">
        <label>Название услуги</label>
        <input className="form-control" value={form.title} onChange={e => update('title', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Описание</label>
        <textarea className="form-control" rows={3} value={form.description} onChange={e => update('description', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Иконка</label>
        <select className="form-control" value={form.icon} onChange={e => update('icon', e.target.value)}>
          {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Изображение карточки (необязательно)</label>
        <div className="image-input-group">
          <input className="form-control" value={form.image_url} onChange={e => update('image_url', e.target.value)} placeholder="URL или выберите" />
          {form.image_url && <img src={form.image_url} className="image-preview visible" alt="" />}
          <button className="btn btn-secondary" onClick={() => onPickImage((url) => update('image_url', url))}>Выбрать</button>
        </div>
      </div>
    </>
  );
}
