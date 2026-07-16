import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token'); // clear JWT
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Souq</Link>
      <input placeholder="Search for items" className="search-bar" />

      {token ? (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/my-listings">My Listings</Link>
          <Link to="/my-orders">My Orders</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;