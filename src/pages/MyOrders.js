import { useEffect, useState } from 'react';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  // fetch only my orders (backend already filters by JWT identity)
  useEffect(() => {
    fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [token, API_URL]);

  return (
    <div>
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr><th>Order ID</th><th>Status</th><th>Total</th></tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
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