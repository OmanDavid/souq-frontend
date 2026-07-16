import { useEffect, useState } from 'react';

function Cart() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data.filter(o => o.status === 'pending')));
  }, [token]);

  return (
    <div>
      <h2>Cart</h2>
      {orders.map(o => (
        <div key={o.id}>Order #{o.id} — ${o.total} — {o.status}</div>
      ))}
    </div>
  );
}

export default Cart;