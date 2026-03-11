import { toast } from './shared';

interface Props {
  onLogout: () => void;
}

export default function SettingsPanel({ onLogout }: Props) {
  function changePassword() {
    const newPwd = (document.getElementById('new-pwd') as HTMLInputElement)?.value;
    const confirmPwd = (document.getElementById('confirm-pwd') as HTMLInputElement)?.value;
    if (!newPwd) { toast('Введите новый пароль', 'error'); return; }
    if (newPwd !== confirmPwd) { toast('Пароли не совпадают', 'error'); return; }
    // Password is stored in .env VITE_ADMIN_PASSWORD — need to change there
    toast('Для смены пароля измените VITE_ADMIN_PASSWORD в файле .env на сервере');
  }

  return (
    <div className="section-panel active">
      <div className="page-header"><div className="page-title">Настройки</div></div>
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
