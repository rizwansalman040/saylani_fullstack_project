import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/auth/login`, credentials);
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0 }}>Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required autoComplete="username" />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required autoComplete="current-password" />
        {error && <p style={{ color: '#dc3545', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={isSubmitting} style={{ padding: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;