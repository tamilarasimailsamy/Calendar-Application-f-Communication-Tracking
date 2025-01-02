import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useApp();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute; 