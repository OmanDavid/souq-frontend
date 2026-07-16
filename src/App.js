import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import MyListings from './pages/MyListings';
import MyOrders from './pages/MyOrders';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* protected routes */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;