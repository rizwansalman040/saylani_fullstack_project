const PromoBlock = () => {
  return (
    <>
      <section className="promo page-width" id="about">
        <div className="promo-art">
          <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=900&q=85" alt="Minimal modern interior" loading="lazy" />
        </div>
        <div className="promo-copy">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>Less scrolling.<br /><em>Better finding.</em></h2>
          <p>NOVA is a considered edit of useful, beautiful things. We believe shopping should feel simple, personal and a little inspiring.</p>
          <a className="btn btn-dark" href="#contact">Get to know us <span>↗</span></a>
        </div>
      </section>

      <section className="newsletter page-width" id="contact">
        <div>
          <span className="eyebrow">THE GOOD MAIL</span>
          <h2>A little something<br />for your inbox<span className="brand-dot">.</span></h2>
          <p>New drops, thoughtful picks and first access to offers. No noise.</p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
          <label htmlFor="newsletterEmail">Your email address</label>
          <div className="newsletter-input">
            <input type="email" id="newsletterEmail" placeholder="you@example.com" required />
            <button type="submit" aria-label="Subscribe">→</button>
          </div>
          <small>By subscribing, you agree to receive NOVA updates.</small>
        </form>
      </section>
    </>
  );
};

export default PromoBlock;