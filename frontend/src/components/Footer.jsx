import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark">N</span> NOVA<span className="brand-dot">.</span>
          </Link>
          <p>Good things for everyday living.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram">ig</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="TikTok">tk</a>
          </div>
        </div>
        
        <div>
          <h4>Explore</h4>
          <Link to="/">Shop all</Link>
          <a href="#categories">Categories</a>
          <a href="#about">Our story</a>
        </div>
        
        <div>
          <h4>Help</h4>
          <a href="#contact">Contact us</a>
          <a href="#contact">Shipping & returns</a>
          <a href="#contact">FAQs</a>
        </div>
        
        <div>
          <h4>Let's talk</h4>
          <a href="mailto:hello@nova.example">hello@nova.example</a>
          <span>Karachi, Pakistan</span>
          <span>Mon–Sat · 9am–6pm</span>
        </div>
      </div>
      
      <div className="footer-bottom page-width">
        <span>© 2026 NOVA. All rights reserved.</span>
        <span>Secure payments · Visa · Mastercard · COD</span>
        <span>Made with intention. ✳</span>
      </div>
    </footer>
  );
};

export default Footer;