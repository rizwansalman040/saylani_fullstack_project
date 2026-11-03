import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCatalog from './components/UserPanel/ProductCatalog';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AdminLogin from './components/AdminPanel/AdminLogin';

axios.defaults.withCredentials = true;

const ProtectedAdminRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get('https://saylani-full-stack-project.onrender.com/api/auth/verify');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (isLoading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Verifying secure connection...</p>;

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
};

function App() {
  return (
    <Router>
      <nav style={{ padding: '20px', background: '#333', color: 'white', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>User Panel (Catalog)</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Admin Panel (Dashboard)</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;