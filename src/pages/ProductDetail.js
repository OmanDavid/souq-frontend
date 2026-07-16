import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const currentUserId = token ? parseInt(JSON.parse(atob(token.split('.')[1])).sub) : null;
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id, API_URL]);

  const addToCart = async () => {
    await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_ids: [product.id] })
    });
    navigate('/my-orders');
  };

  const handleDelete = async () => {
    await fetch(`${API_URL}/products/${product.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    navigate('/my-listings');
  };

  if (!product) return <p>Loading...</p>;

  const isOwner = product.user_id === currentUserId;

  return (
    <div className="product-detail-card">
      <div className="product-image-large" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>

      {isOwner ? (
        <div>
          <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <button onClick={addToCart}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductDetail;