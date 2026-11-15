import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in when the Navbar loads
  useEffect(() => {
    const storedUser = localStorage.getItem('nova_user');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/users/logout`, {}, { withCredentials: true });
      localStorage.removeItem('nova_user');
      setUsername(null);
      setIsProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="announcement">
        Free delivery on orders over Rs. 5,000 <span>✦</span> Easy 7-day returns
      </div>
      
      <header className="site-header">
        <Link className="brand" to="/" aria-label="NOVA home">
          <span className="brand-mark">N</span> NOVA<span className="brand-dot">.</span>
        </Link>
        
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className="active" to="/">Home</Link>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn search-toggle" aria-label="Open search">⌕</button>
          <button className="icon-btn cart-trigger" aria-label="Shopping cart">
            ♧ <span className="tiny-count">0</span>
          </button>
          
          <div className="profile-wrap">
            <button 
              className="profile-trigger" 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              {/* Show user's first letter, or 'A' for Account if logged out */}
              <span className="avatar">{username ? username.charAt(0).toUpperCase() : 'A'}</span>
              <span className="profile-label">{username ? username : 'Account'}</span>⌄
            </button>
            
            <div className={`profile-menu ${isProfileMenuOpen ? '' : 'hidden'}`}>
              {username ? (
                <>
                  <Link to="/profile">My profile</Link>
                  <Link to="/orders">My orders</Link>
                  <button onClick={handleLogout} style={{ color: 'red', width: '100%' }}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Log in</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;