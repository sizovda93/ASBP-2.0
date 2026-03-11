import { type Submission } from '../../lib/api';
import { SubmissionTable } from './Dashboard';

interface Props {
  submissions: Submission[];
  onRefresh: () => void;
}

export default function SubmissionsManager({ submissions, onRefresh }: Props) {
  return (
    <div className="section-panel active">
      <div className="page-header">
        <div>
          <div className="page-title">Заявки</div>
          <div className="page-subtitle">Обращения с формы обратной связи</div>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          {submissions.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Заявок пока нет</p>
          ) : (
            <SubmissionTable items={submissions} showActions={true} onRefresh={onRefresh} />
          )}
        </div>
      </div>
    </div>
  );
}
