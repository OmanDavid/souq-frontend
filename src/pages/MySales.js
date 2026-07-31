import { useEffect, useState } from 'react';

function MySales() {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/sales`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setSales(Array.isArray(data) ? data : []));
  }, [token, API_URL]);

  return (
    <div className="order-card">
      <h2>My Sales</h2>
      <table>
        <thead>
          <tr><th>Order ID</th><th>Status</th><th>Total</th></tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.status}</td>
              <td>${s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MySales;