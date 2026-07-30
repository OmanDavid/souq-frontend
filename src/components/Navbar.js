import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = () => {
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    
    <nav className="navbar">
      <Link to="/" className="logo">Souq</Link>
      <input
        placeholder="Search for items"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
        <button className="search-btn" onClick={handleSearch}>search</button>
      {token ? (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/my-listings">My Listings</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/add-product">Sell</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;