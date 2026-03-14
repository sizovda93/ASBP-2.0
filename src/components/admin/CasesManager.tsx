import { useState, useRef } from 'react';
import { api, type Case, type SiteSettings } from '../../lib/api';
import { Modal, toast } from './shared';

interface Props {
  cases: Case[];
  settings: SiteSettings;
  onRefresh: () => void;
}

export default function CasesManager({ cases, settings, onRefresh }: Props) {
  const [sectionTag, setSectionTag] = useState(settings.cases_tag || '');
  const [sectionTitle, setSectionTitle] = useState(settings.cases_title || '');
  const [modal, setModal] = useState<{ open: boolean; item?: Case }>({ open: false });
  const formRef = useRef<any>({});

  async function saveSection() {
    await api.settings.bulkUpdate({ cases_tag: sectionTag, cases_title: sectionTitle });
    onRefresh();
    toast('Заголовок сохранён');
  }

  function openAdd() {
    formRef.current = { case_number: '', status: '', amount: '', description: '', card_size: 'large', accent: false, category: 'individual' };
    setModal({ open: true });
  }

  function openEdit(item: Case) {
    formRef.current = {
      case_number: item.case_number, status: item.status, amount: item.amount,
      description: item.description, card_size: item.card_size, accent: item.accent,
      category: item.category || 'individual',
    };
    setModal({ open: true, item });
  }

  async function save() {
    if (modal.item) {
      await api.cases.update(modal.item.id, formRef.current);
      toast('Дело обновлено');
    } else {
      await api.cases.create(formRef.current);
      toast('Дело добавлено');
    }
    onRefresh();
  }

  async function remove(id: number) {
    if (!confirm('Удалить это дело?')) return;
    await api.cases.delete(id);
    onRefresh();
    toast('Дело удалено');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Выигранные дела</div></div>
      <div className="card">
        <div className="card-title">Заголовок секции</div>
        <div className="form-grid">
          <div className="form-group">
            <label>Тег</label>
            <input className="form-control" value={sectionTag} onChange={e => setSectionTag(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Заголовок</label>
            <input className="form-control" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={saveSection}>Сохранить заголовок</button>
      </div>
      <div className="card">
        <div className="card-title">
          Список дел
          <button className="btn btn-accent btn-sm" onClick={openAdd}>+ Добавить</button>
        </div>
        <div className="item-list">
          {cases.map(c => (
            <div key={c.id} className="item-row">
              <div className="item-row-info">
                <div className="item-row-title">{c.case_number}</div>
                <div className="item-row-sub">{c.amount}{c.status ? ' · ' + c.status : ''} · {c.card_size === 'large' ? 'Широкая' : 'Узкая'}</div>
              </div>
              <div className="item-row-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => openEdit(c)}>Изменить</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(c.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.item ? 'Редактировать дело' : 'Добавить дело'}
        onSave={save}
        onClose={() => setModal({ open: false })}
      >
        <CaseForm initial={formRef.current} onChange={v => { formRef.current = v; }} />
      </Modal>
    </div>
  );
}

function CaseForm({ initial, onChange }: { initial: any; onChange: (v: any) => void }) {
  const [form, setForm] = useState(initial);
  function update(field: string, value: any) {
    const next = { ...form, [field]: value };
    setForm(next);
    onChange(next);
  }
  return (
    <>
      <div className="form-group">
        <label>Номер дела</label>
        <input className="form-control" value={form.case_number} onChange={e => update('case_number', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Категория</label>
        <select className="form-control" value={form.category || 'individual'} onChange={e => update('category', e.target.value)}>
          <option value="individual">Физические лица</option>
          <option value="corporate">Юридические лица</option>
          <option value="complex">Сложные дела</option>
        </select>
      </div>
      <div className="form-group">
        <label>Результат (badge на карточке)</label>
        <select className="form-control" value={form.status} onChange={e => update('status', e.target.value)}>
          <option value="">— не указывать —</option>
          <option value="Списано">Списано</option>
          <option value="Имущество сохранено">Имущество сохранено</option>
          <option value="Защита директора">Защита директора</option>
          <option value="Освобождение от долгов">Освобождение от долгов</option>
        </select>
      </div>
      <div className="form-group">
        <label>Списанная сумма</label>
        <input className="form-control" value={form.amount} onChange={e => update('amount', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Описание</label>
        <textarea className="form-control" rows={3} value={form.description} onChange={e => update('description', e.target.value)} />
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Размер карточки</label>
          <select className="form-control" value={form.card_size} onChange={e => update('card_size', e.target.value)}>
            <option value="large">Широкая (8/12)</option>
            <option value="small">Узкая (4/12)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Акцентная подсветка</label>
          <select className="form-control" value={String(form.accent)} onChange={e => update('accent', e.target.value === 'true')}>
            <option value="false">Нет</option>
            <option value="true">Да (зелёная)</option>
          </select>
        </div>
      </div>
    </>
  );
}
