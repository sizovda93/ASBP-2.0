import { useState, type FormEvent } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('aspb_admin', '1');
      onLogin();
    } else {
      setError(true);
    }
  }

  return (
    <div id="login-screen" style={{ display: 'flex' }}>
      <div className="login-box">
        <div className="login-logo">АСПБ <span className="logo-dot" /></div>
        <p className="login-subtitle">Войдите в панель управления сайтом</p>
        {error && <div className="login-error" style={{ display: 'block' }}>Неверный пароль</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" className="form-control" name="password" autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
