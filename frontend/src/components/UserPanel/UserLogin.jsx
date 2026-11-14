import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await axios.post(`${API_URL}/api/users/login`, credentials, { withCredentials: true });
      navigate('/'); // Send them to the store catalog on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Customer Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Need an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default UserLogin;