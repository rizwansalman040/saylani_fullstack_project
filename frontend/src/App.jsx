import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import your pages
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
      <Navbar />

      <div style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/admin" element={<ProtectedAdminRoute />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;