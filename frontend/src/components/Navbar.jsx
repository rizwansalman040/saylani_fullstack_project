import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        
        <div className="header-actions">
          <button className="icon-btn search-toggle" aria-label="Open search">⌕</button>
          
          <button className="icon-btn" aria-label="Wishlist">
            ♡ <span className="tiny-count">0</span>
          </button>
          
          <button className="icon-btn cart-trigger" aria-label="Shopping cart">
            ♧ <span className="tiny-count">0</span>
          </button>
          
          <div className="profile-wrap">
            <button 
              className="profile-trigger" 
              aria-label="Profile menu"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <span className="avatar">G</span>
              <span className="profile-label">Account</span>⌄
            </button>
            
            {/* The dropdown menu toggles based on React state */}
            <div className={`profile-menu ${isProfileMenuOpen ? '' : 'hidden'}`}>
              <Link to="/profile">My profile</Link>
              <Link to="/orders">My orders</Link>
              <Link to="/login">Log in</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <Link to="/"><span>⌂</span>Home</Link>
        <a href="#categories"><span>▦</span>Categories</a>
        <button><span>⌕</span>Search</button>
        <button><span>♧<i>0</i></span>Cart</button>
        <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}><span>◉</span>Profile</button>
      </nav>
    </>
  );
};

export default Navbar;