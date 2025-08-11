import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    // Redirect authenticated users to their dashboard
    const dashboardPath = user.role === 'counsellor' ? '/counsellor/dashboard' : '/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }
  
  // Redirect to landing page for non-authenticated users
  return <Navigate to="/" replace />;
};

export default Index;
