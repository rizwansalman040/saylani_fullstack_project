const CategoryGrid = () => {
  return (
    <section className="section page-width" id="categories">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FIND YOUR THING</span>
          <h2>Shop by category<span className="brand-dot">.</span></h2>
        </div>
        <a className="text-link" href="#shop">View all <span>→</span></a>
      </div>
      <div className="category-grid">
        <button className="category-card cat-fashion" data-category="Fashion">
          <span className="cat-number">01 / STYLE</span>
          <span className="cat-name">Fashion</span>
          <span className="cat-arrow">↗</span>
        </button>
        <button className="category-card cat-tech" data-category="Technology">
          <span className="cat-number">02 / GADGETS</span>
          <span className="cat-name">Technology</span>
          <span className="cat-arrow">↗</span>
        </button>
        <button className="category-card cat-home" data-category="Home">
          <span className="cat-number">03 / LIVING</span>
          <span className="cat-name">Home & living</span>
          <span className="cat-arrow">↗</span>
        </button>
        <button className="category-card cat-accessories" data-category="Accessories">
          <span className="cat-number">04 / DETAILS</span>
          <span className="cat-name">Accessories</span>
          <span className="cat-arrow">↗</span>
        </button>
      </div>
    </section>
  );
};

export default CategoryGrid;