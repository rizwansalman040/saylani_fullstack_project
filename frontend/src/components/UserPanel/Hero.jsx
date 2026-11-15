import React from 'react';

const Hero = () => {
  return (
    <>
      <section className="hero page-width">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line"></span> THE NOVA EDIT · 2026
          </span>
          <h1>Everyday,<br /><em>upgraded.</em></h1>
          <p>Good things, thoughtfully picked. Find your next favourite from our latest collection.</p>
          
          <div className="hero-buttons">
            <a className="btn btn-dark" href="#shop">Explore collection <span>↗</span></a>
            <a className="text-link" href="#categories">Browse categories <span>→</span></a>
          </div>
          
          <div className="hero-note">
            <div className="mini-avatars">
              <i>A</i><i>M</i><i>S</i>
            </div>
            <span><strong>2,400+</strong> happy customers</span>
          </div>
        </div>
        
        <div className="hero-art">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=85" 
              alt="Red statement sneaker" 
            />
          </div>
          <div className="floating-tag">
            <span className="tag-star">✳</span>
            <span>New season<br /><strong>New energy.</strong></span>
          </div>
          <div className="hero-index">01 <span>/</span> 04</div>
        </div>
      </section>

      <section className="trust-strip page-width">
        <div>
          <span>✦</span>
          <p><strong>Curated quality</strong><small>Only the good stuff</small></p>
        </div>
        <div>
          <span>↗</span>
          <p><strong>Fast delivery</strong><small>Across Pakistan</small></p>
        </div>
        <div>
          <span>◈</span>
          <p><strong>Easy returns</strong><small>Shop with confidence</small></p>
        </div>
        <div>
          <span>♡</span>
          <p><strong>Made for you</strong><small>Everyday essentials</small></p>
        </div>
      </section>
    </>
  );
};

export default Hero;