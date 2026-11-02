import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Live Storefront</h2>
      {products.length === 0 ? (
        <p>No products available yet. Add some from the Admin Panel!</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', width: '250px', borderRadius: '8px' }}>
              {/* If you use a real image URL, it will display here */}
              <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', marginBottom: '10px', backgroundImage: `url(${product.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#28a745' }}>${product.price}</p>
              <span style={{ fontSize: '12px', background: '#007bff', color: 'white', padding: '3px 8px', borderRadius: '12px' }}>{product.category}</span>
              <p style={{ fontSize: '14px', color: '#555', marginTop: '10px' }}>{product.description}</p>
              <button style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;