import { useEffect, useState } from 'react';

function Cart() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem('token');
          window.location.href = '/login';
          return [];
        }
        return res.json();
      })
      .then(data => setOrders(Array.isArray(data) ? data.filter(o => o.status === 'pending') : []));
  }, [token, API_URL]);

  return (
    <div className="cart-card">
      <h2>Cart</h2>
      {orders.map(o => (
        <div key={o.id}>Order #{o.id} — ${o.total} — {o.status}</div>
      ))}
    </div>
  );
}

export default Cart;