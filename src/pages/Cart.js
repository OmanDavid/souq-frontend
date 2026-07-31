import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    Promise.all(
      cart.map(entry =>
        fetch(`${API_URL}/products/${entry.id}`)
          .then(res => res.json())
          .then(product => ({ ...product, quantity: entry.quantity }))
      )
    ).then(setItems);
  }, [API_URL]);

  const updateQuantity = (id, delta) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    localStorage.setItem('cart', JSON.stringify(updated));
    setItems(items.map(p => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p));
  };

  const removeItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]').filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setItems(items.filter(p => p.id !== id));
  };

  const checkout = async () => {
    // expand product_ids based on quantity, since your backend order model doesn't track qty per line yet
    const productIds = items.flatMap(p => Array(p.quantity).fill(p.id));
    await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_ids: productIds })
    });
    localStorage.removeItem('cart');
    navigate('/my-orders');
  };

  const total = items.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="cart-card">
      <h2>Cart</h2>
      {items.map(p => (
        <div key={p.id} className="cart-item">
          <span>{p.title} — ${p.price} x {p.quantity}</span>
          <div>
            <button onClick={() => updateQuantity(p.id, -1)}>-</button>
            <button onClick={() => updateQuantity(p.id, 1)}>+</button>
            <button onClick={() => removeItem(p.id)}>Remove</button>
          </div>
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