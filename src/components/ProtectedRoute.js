import { Navigate } from 'react-router-dom';

// wraps a route; redirects to login if no token found
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;