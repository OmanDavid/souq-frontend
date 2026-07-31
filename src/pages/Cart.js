import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
    Promise.all(cartIds.map(id => fetch(`${API_URL}/products/${id}`).then(res => res.json())))
      .then(setItems);
  }, [API_URL]);

  const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]').filter(pid => pid !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setItems(items.filter(p => p.id !== id));
  };

  const checkout = async () => {
    const productIds = items.map(p => p.id);
    await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_ids: productIds })
    });
    localStorage.removeItem('cart'); // clear cart after purchase
    navigate('/my-orders');
  };

  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="cart-card">
      <h2>Cart</h2>
      {items.map(p => (
        <div key={p.id} className="cart-item">
          <span>{p.title} — ${p.price}</span>
          <button onClick={() => removeItem(p.id)}>Remove</button>
        </div>
      ))}
      {items.length > 0 && (
        <>
          <p><strong>Total: ${total}</strong></p>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
      {items.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
}

export default Cart;