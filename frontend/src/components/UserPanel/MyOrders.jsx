import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/orders/myorders`, { withCredentials: true });
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#f39c12'; // Orange
      case 'On the way': return '#3498db'; // Blue
      case 'Delivered': return '#2ecc71'; // Green
      case 'Cancelled': return '#e74c3c'; // Red
      default: return '#777';
    }
  };

  return (
    <section className="section page-width" style={{ marginTop: '40px', minHeight: '60vh' }}>
      <div className="section-heading">
        <div>
          <span className="eyebrow">ORDER HISTORY</span>
          <h2>My Orders<span className="brand-dot">.</span></h2>
        </div>
      </div>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <span>📦</span>
          <h3>No orders yet</h3>
          <p>When you place an order, it will show up here.</p>
          <Link to="/" className="btn btn-dark" style={{ marginTop: '20px' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map((order) => (
            <div key={order._id} style={{ background: '#fff', padding: '25px', borderRadius: '14px', boxShadow: '0 5px 20px #00000008', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '15px', marginBottom: '15px' }}>
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--muted)' }}>ORDER ID: {order._id}</span>
                  <p style={{ margin: '5px 0 0', fontWeight: 'bold', fontSize: '14px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span style={{ background: getStatusColor(order.status), color: 'white', padding: '5px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 'bold' }}>
                  {order.status}
                </span>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                    <span>{item.name}</span>
                    <span>Rs. {item.price}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line)', paddingTop: '15px', fontWeight: 'bold', fontSize: '14px' }}>
                <span>Total:</span>
                <span>Rs. {order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyOrders;