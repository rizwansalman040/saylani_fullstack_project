import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  // 1. We add a new state to hold the cart items
  const [cart, setCart] = useState([]);

  // Fetch products from the live database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // 2. Cart Functions to Add and Remove items
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // 3. Calculate the total price of the cart
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Main Storefront Area */}
      <div style={{ flex: '2' }}>
        <h2>Live Storefront</h2>
        {products.length === 0 ? (
          <p>No products available yet. Add some from the Admin Panel!</p>
        ) : (
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {products.map((product) => (
              <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', width: '250px', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', marginBottom: '10px', backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px' }}></div>
                <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#28a745' }}>${product.price}</p>
                <span style={{ fontSize: '12px', background: '#007bff', color: 'white', padding: '3px 8px', borderRadius: '12px', alignSelf: 'flex-start' }}>{product.category}</span>
                <p style={{ fontSize: '14px', color: '#555', marginTop: '10px', flexGrow: 1 }}>{product.description}</p>
                
                {/* 4. We trigger the addToCart function when this button is clicked */}
                <button onClick={() => addToCart(product)} style={{ width: '100%', padding: '10px', marginTop: '15px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. The new Shopping Cart Sidebar */}
      <div style={{ flex: '1', borderLeft: '2px solid #eee', paddingLeft: '30px' }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: '#777' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <strong>{item.name}</strong>
                  <span style={{ color: '#555', fontSize: '14px' }}>${item.price}</span>
                </div>
                <button onClick={() => removeFromCart(index)} style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>
                  X
                </button>
              </div>
            ))}
            
            <div style={{ marginTop: '20px', borderTop: '2px solid #333', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button onClick={() => alert('Order Placed Successfully!')} style={{ width: '100%', padding: '15px', marginTop: '20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                Simulate Checkout
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductCatalog;