import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [API_URL]);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className='message'> Available Items</h1>
      <div className="product-grid">
        {filteredProducts.map(p => (
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