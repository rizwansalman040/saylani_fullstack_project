import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/verify`, { withCredentials: true });
        setIsAuthenticated(true); 
      } catch (error) {
        setIsAuthenticated(false); 
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Verifying secure connection...</div>;
  }

  return isAuthenticated ? (
    <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  );
};

export default AdminPanel;