import { useEffect, useState } from 'react';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          localStorage.removeItem('token'); // expired/invalid token
          window.location.href = '/login';
          return [];
        }
        return res.json();
      })
      .then(data => setOrders(Array.isArray(data) ? data : []));
  }, [token, API_URL]);

  return (
    <div className="order-card">
      <h2>My Orders</h2>
      <table>
  <thead>
    <tr><th>Order ID</th><th>Products</th><th>Status</th><th>Total</th></tr>
  </thead>
  <tbody>
    {orders.map(o => (
      <tr key={o.id}>
        <td>{o.id}</td>
        <td>{o.products.join(', ')}</td>
        <td>{o.status}</td>
        <td>${o.total}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default MyOrders;