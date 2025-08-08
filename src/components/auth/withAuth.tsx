'use client';

import { useEffect, ComponentType } from 'react'; 
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';


const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  
  
  const Wrapper = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
     
      if (!loading && !user) {
        router.replace('/admin/login');
      }
    }, [user, loading, router]);

    
    if (loading || !user) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontFamily: 'var(--font-body)', 
          color: 'var(--cor-marrom)' 
        }}>
          <p>Verificando autenticação...</p>
        </div>
      );
    }

    
    return <WrappedComponent {...props} />;
  };

  
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return Wrapper;
};

export default withAuth;