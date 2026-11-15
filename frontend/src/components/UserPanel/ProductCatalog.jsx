import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config'; // <-- Added missing import
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import PromoBlock from './PromoBlock';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from the live database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Cart Functions to Add and Remove items
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // Calculate the total price of the cart
  const cartTotal = cart.reduce((total, item) => total + Number(item.price || 0), 0);

  return (
    <>
      {/* 1. The Hero Banner automatically sits at the very top */}
      <Hero />

      {/* 2. The 4 Image Cards */}
      <CategoryGrid />

      {/* 3. The main Shop Section with NOVA styling */}
      <section className="section shop-section" id="shop">
        <div className="page-width" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left Side: Product Grid */}
          <div style={{ flex: '1 1 70%' }}>
            <div className="section-heading shop-heading">
              <div>
                <span className="eyebrow">A FEW GOOD FINDS</span>
                <h2>Live Storefront<span className="brand-dot">.</span></h2>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No products available yet</h3>
                <p>Add some from the Admin Panel to see them here.</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => (
                  <article key={product._id} className="product-card">
                    <div className="product-image-wrap">
                      <img src={product.imageUrl} alt={product.name} />

                      <button 
                        className="quick-btn" 
                        onClick={() => addToCart(product)}
                      >
                        Add to bag ↗
                      </button>
                    </div>

                    <div className="product-meta">
                      <span className="product-category">{product.category}</span>
                      <h3 className="product-title">{product.name}</h3>
                      <div className="product-bottom">
                        <span className="price">Rs. {product.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: The Shopping Cart Sidebar */}
          <div style={{ flex: '1 1 25%', background: '#fff', padding: '25px', borderRadius: '18px', boxShadow: '0 10px 35px #00000012', position: 'sticky', top: '100px' }}>
            <span className="eyebrow">YOUR BAG</span>
            <h3 style={{ margin: '10px 0 20px', fontFamily: 'var(--display)', fontSize: '22px' }}>Shopping cart</h3>

            {cart.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '12px' }}>Your bag is taking a break. Add something lovely.</p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-line" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '12px', margin: '0 0 4px' }}>{item.name}</h4>
                      <small style={{ color: 'var(--muted)' }}>Rs. {item.price}</small>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)} 
                      className="remove-item"
                      style={{ color: '#dc3545', fontSize: '24px', lineHeight: '1' }}
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div className="cart-bottom" style={{ marginTop: '20px' }}>
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>Rs. {cartTotal.toFixed(2)}</strong>
                  </div>
                  <button 
                    className="btn btn-dark checkout-btn" 
                    onClick={async () => {
                      try {
                        // Map the cart to match the backend schema expectation
                        const orderItems = cart.map(item => ({
                          name: item.name,
                          price: item.price,
                          product: item._id
                        }));

                        await axios.post(`${API_URL}/api/orders`, {
                          orderItems,
                          totalPrice: cartTotal
                        }, { withCredentials: true });

                        alert('Order Placed Successfully! Check My Orders.');
                        setCart([]); // Clear the cart after successful order
                      } catch (error) {
                        console.error("Checkout Error Status:", error.response?.status);
                        console.error("Checkout Error Data:", error.response?.data);
                        console.error("Full Error:", error);
                        alert(error.response?.data?.message || `Order failed (${error.response?.status || 'network error'})`);
                      }
                    }}
                  >
                    Checkout <span>→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Bottom Promo & Newsletter */}
      <PromoBlock />
    </>
  );
};

export default ProductCatalog;
