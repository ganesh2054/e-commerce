import { Icon } from '@iconify/react';
import '../style/navbar-style.css'
import { selectCart } from '../features/cartSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const cart = useSelector(selectCart)
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link className="home-button" to='/'>
        <a href="#" className="home-button">
          Home
        </a>
        </Link>
      </div>
      <div className="right-section">
        <a href="#" className="profile-icon">
          <Icon icon="solar:user-bold-duotone" width="30" height="30" />
        </a>
        <a href="#" className="cart-icon" style={{ display: 'flex' }}>
          <Link to='/cart'>
            <Icon icon="mdi:cart-outline" color='white' width="30" height="30" />
          </Link>
          <div className='cart-item-count'>
            {cart?.totalQuantity ? cart.totalQuantity : 0}
          </div>
        </a>
      </div>
    </nav>
  );
};