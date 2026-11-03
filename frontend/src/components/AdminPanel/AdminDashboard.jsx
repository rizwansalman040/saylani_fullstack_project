import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  
  // New state variables to track if we are editing an existing product
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://saylani-full-stack-project.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price) };
    try {

      if (isEditing) {
        // Send a PUT request to update the specific product
        await axios.put(`${API_URL}/api/products/${editId}`, payload);
        alert('Product updated successfully!');
      } else {
        // Send a POST request to create a new product
        await axios.post(`${API_URL}/api/products`, payload);
        alert('Product added successfully!');
      }
      
      // Reset the form and editing state
      setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
      setIsEditing(false);
      setEditId(null);
      fetchProducts(); 
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.response?.data?.message || 'Could not save the product. Please try again.');
    }
  };
  // Triggered when the Admin clicks "Edit" on a product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl
    });
    setIsEditing(true);
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll back to the form
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts(); 
      } catch (error) {
       console.error('Error deleting product:', error);
        alert(error.response?.data?.message || 'Could not delete the product. Please try again.');
      }
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setFormData({ name: '', price: '', description: '', category: '', imageUrl: '' });
    setIsEditing(false);
    setEditId(null);
  };
const handleLogout = async () => {
    try {
      // Added empty data {} and explicit withCredentials
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      window.location.reload(); // Instantly boots you back to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    }
  };
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: isEditing ? '#007bff' : 'black' }}>
          {isEditing ? 'Admin Dashboard: Edit Product' : 'Admin Dashboard: Add New Product'}
        </h2>
        <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          Logout Securely
        </button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px', padding: '20px', border: isEditing ? '2px solid #007bff' : '1px solid #ddd', borderRadius: '8px' }}>
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
        <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} required rows="4" />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: 1, padding: '10px', background: isEditing ? '#007bff' : '#28a745', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} style={{ flex: 1, padding: '10px', background: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2>Current Inventory</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px' }}>
            <div>
              <strong>{product.name}</strong> - ${product.price} <br/>
              <small>{product.category}</small>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(product)} style={{ background: '#ffc107', color: 'black', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '4px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '4px' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;