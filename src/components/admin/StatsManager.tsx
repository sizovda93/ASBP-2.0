import { useState, useRef } from 'react';
import { api, type Stat } from '../../lib/api';
import { Modal, toast } from './shared';

interface Props {
  stats: Stat[];
  onRefresh: () => void;
}

export default function StatsManager({ stats, onRefresh }: Props) {
  const [modal, setModal] = useState<{ open: boolean; item?: Stat }>({ open: false });
  const formRef = useRef<{ value: string; unit: string; label: string; badge: string }>({
    value: '', unit: '', label: '', badge: '',
  });

  function openAdd() {
    formRef.current = { value: '', unit: '', label: '', badge: '' };
    setModal({ open: true });
  }

  function openEdit(item: Stat) {
    formRef.current = { value: item.value, unit: item.unit, label: item.label, badge: item.badge };
    setModal({ open: true, item });
  }

  async function save() {
    const data = formRef.current;
    if (modal.item) {
      await api.stats.update(modal.item.id, data);
      toast('Карточка обновлена');
    } else {
      await api.stats.create(data);
      toast('Карточка добавлена');
    }
    onRefresh();
  }

  async function remove(id: number) {
    if (!confirm('Удалить карточку?')) return;
    await api.stats.delete(id);
    onRefresh();
    toast('Карточка удалена');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Статистика</div></div>
      <div className="card">
        <div className="card-title">
          Карточки с цифрами
          <button className="btn btn-accent btn-sm" onClick={openAdd}>+ Добавить</button>
        </div>
        <div className="item-list">
          {stats.map(s => (
            <div key={s.id} className="item-row">
              <div className="item-row-info">
                <div className="item-row-title">{s.label}</div>
                <div className="item-row-sub">{s.value} {s.unit}{s.badge ? ' · ' + s.badge : ''}</div>
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
        title={modal.item ? 'Редактировать карточку' : 'Добавить карточку'}
        onSave={save}
        onClose={() => setModal({ open: false })}
      >
        <StatForm initial={formRef.current} onChange={v => { formRef.current = v; }} />
      </Modal>
    </div>
  );
}

function StatForm({ initial, onChange }: { initial: any; onChange: (v: any) => void }) {
  const [form, setForm] = useState(initial);
  function update(field: string, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    onChange(next);
  }
  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label>Значение (число)</label>
          <input className="form-control" value={form.value} onChange={e => update('value', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Единица (K, %, Млрд ₽)</label>
          <input className="form-control" value={form.unit} onChange={e => update('unit', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label>Подпись</label>
        <input className="form-control" value={form.label} onChange={e => update('label', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Бейдж (необязательно)</label>
        <input className="form-control" value={form.badge} onChange={e => update('badge', e.target.value)} />
      </div>
    </>
  );
}
