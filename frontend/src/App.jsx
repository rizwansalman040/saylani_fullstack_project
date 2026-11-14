import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';
import ProductCatalog from './components/UserPanel/ProductCatalog';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AdminLogin from './components/AdminPanel/AdminLogin';
import UserLogin from './components/UserPanel/UserLogin';
import UserRegister from './components/UserPanel/UserRegister';

axios.defaults.withCredentials = true;

const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/verify`);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (isLoading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Verifying secure connection...</p>;

  return isAuthenticated ? (
    <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  );
};

function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Store Catalog</Link>
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel</Link>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', background: 'white', padding: '5px 10px', borderRadius: '4px' }}>Login</Link>
          <Link to="/register" style={{ color: '#28a745', textDecoration: 'none', background: 'white', padding: '5px 10px', borderRadius: '4px' }}>Register</Link>
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;