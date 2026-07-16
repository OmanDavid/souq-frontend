import { useEffect, useState } from 'react';

function MyListings() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const currentUserId = token ? parseInt(JSON.parse(atob(token.split('.')[1])).sub) : null;
  const API_URL = process.env.REACT_APP_API_URL;

  // fetch all products, filter to only mine (simple approach, fine for capstone scope)
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.filter(p => p.user_id === currentUserId)));
  }, [currentUserId, API_URL]);

  const deleteProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setProducts(products.filter(p => p.id !== id)); // update UI immediately
  };

  return (
    <div>
      <h2>My Listings</h2>
      <div className="product-grid">
        {products.map(p => (
          <div className="product-card" key={p.id}>
            <div className="product-image" />
            <h4>{p.title}</h4>
            <p className="price">${p.price}</p>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;