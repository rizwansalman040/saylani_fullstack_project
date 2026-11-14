import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { useNavigate, Link } from 'react-router-dom';

const UserRegister = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await axios.post(`${API_URL}/api/users/register`, credentials);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Send them to login after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Create Customer Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        {success && <p style={{ color: 'green', margin: 0 }}>{success}</p>}
        
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
          Register
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default UserRegister;