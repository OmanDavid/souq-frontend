import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  // fetch all products on page load
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [API_URL]);

  return (
    <div>
      <div className="product-grid">
        {products.map(p => (
          <Link to={`/products/${p.id}`} key={p.id} className="product-card">
            <div className="product-image" />
            <h4>{p.title}</h4>
            <p className="price">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;