'use client';

import { useState, FormEvent, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import styles from './LoginPage.module.css';
import logoPlanurbi from '../../../../public/logo-planurbi-stagVerde.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login, user } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
   
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user, router]); 

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    
    } catch (err) {
      setError('Falha no login. Verifique o seu e-mail e senha.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  
  if (user) {
    return null; 
  }

  return (
    <div className={styles.page}>
      <main className={styles.loginBox}>
        <div className={styles.header}>
          <Image src={logoPlanurbi} alt="Logo Planurbi" width={180} />
          <h2>Acesso Restrito</h2>
          <p>Faça login para aceder ao painel de administrador.</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="seu.email@exemplo.com"
              disabled={loading}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="Sua senha"
              disabled={loading}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'A entrar...' : 'Entrar'}
          </button>
        </form>
      </main>
    </div>
  );
}