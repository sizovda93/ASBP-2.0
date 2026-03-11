import { type Submission } from '../../lib/api';
import { SubmissionTable } from './Dashboard';

interface Props {
  submissions: Submission[];
  onRefresh: () => void;
}

export default function PlatformDemoSubmissions({ submissions, onRefresh }: Props) {
  const demoSubmissions = submissions.filter(s => s.interest === 'Демонстрация платформы');

  return (
    <div className="section-panel active">
      <div className="page-header">
        <div>
          <div className="page-title">Заявки на платформу</div>
          <div className="page-subtitle">
            Заявки на демонстрацию и подключение цифровой платформы — {demoSubmissions.length} шт.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          {demoSubmissions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Заявок пока нет</p>
          ) : (
            <SubmissionTable items={demoSubmissions} showActions={true} onRefresh={onRefresh} />
          )}
        </div>
      </div>
    </div>
  );
}
