import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // grab current user id from token payload (simple decode, no verify needed client-side)
  const token = localStorage.getItem('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).sub : null;

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const addToCart = async () => {
    await fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_ids: [product.id] })
    });
    navigate('/my-orders');
  };

  if (!product) return <p>Loading...</p>;

  const isOwner = product.user_id === currentUserId;

  return (
    <div className="product-detail">
      <div className="product-image-large" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>

      {/* owner sees edit/delete, others see buy button */}
      {isOwner ? (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ) : (
        <button onClick={addToCart}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductDetail;