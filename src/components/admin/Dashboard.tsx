import { useEffect, useState } from 'react';
import { api, type Submission } from '../../lib/api';

interface DashboardProps {
  submissions: Submission[];
  onRefresh: () => void;
}

export default function Dashboard({ submissions, onRefresh }: DashboardProps) {
  const newCount = submissions.filter(s => s.status === 'new').length;
  const doneCount = submissions.filter(s => s.status === 'done').length;
  const recent = submissions.slice(0, 5);

  return (
    <div className="section-panel active">
      <div className="page-header">
        <div>
          <div className="page-title">Дашборд</div>
          <div className="page-subtitle">Обзор сайта и последние заявки</div>
        </div>
        <a href="/" target="_blank" className="btn btn-secondary">Открыть сайт</a>
      </div>
      <div className="dashboard-grid">
        <div className="dash-card">
          <div className="dash-card-label">Всего заявок</div>
          <div className="dash-card-value">{submissions.length}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Новых заявок</div>
          <div className="dash-card-value" style={{ color: 'var(--accent)' }}>{newCount}</div>
        </div>
        <div className="dash-card">
          <div className="dash-card-label">Обработано</div>
          <div className="dash-card-value">{doneCount}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-title">Последние заявки</div>
        {recent.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Заявок пока нет</p>
        ) : (
          <SubmissionTable items={recent} showActions={false} onRefresh={onRefresh} />
        )}
      </div>
    </div>
  );
}

interface SubmissionTableProps {
  items: Submission[];
  showActions: boolean;
  onRefresh: () => void;
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
           d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } catch { return iso || '—'; }
}

export function SubmissionTable({ items, showActions, onRefresh }: SubmissionTableProps) {
  async function markStatus(id: number, status: string) {
    await api.submissions.updateStatus(id, status);
    onRefresh();
  }

  async function remove(id: number) {
    if (!confirm('Удалить заявку?')) return;
    await api.submissions.delete(id);
    onRefresh();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Имя</th>
          <th>Телефон</th>
          <th>Сумма долга</th>
          <th>Статус</th>
          {showActions && <th />}
        </tr>
      </thead>
      <tbody>
        {items.map(s => (
          <tr key={s.id}>
            <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{formatDate(s.created_at)}</td>
            <td>{s.name}</td>
            <td>{s.phone}</td>
            <td>{s.debt}</td>
            <td>
              <span className={`status-badge status-${s.status}`}>
                {s.status === 'new' ? '● Новая' : '✓ Обработана'}
              </span>
            </td>
            {showActions && (
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {s.status === 'new' ? (
                    <button className="btn btn-accent btn-sm" onClick={() => markStatus(s.id, 'done')}>Обработана</button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" onClick={() => markStatus(s.id, 'new')}>Вернуть</button>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => remove(s.id)}>Удалить</button>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
