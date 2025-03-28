import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartSummary() {
  const { totalItems, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center alert alert-info shadow-sm">
      <div>
        🛒 <strong>{totalItems}</strong> item{totalItems !== 1 && 's'} in cart
      </div>
      <div>
        💵 <strong>${cartTotal.toFixed(2)}</strong> total
      </div>
      <button
        className="btn btn-outline-primary btn-sm"
        onClick={() => navigate('/cart')}
      >
        View Cart
      </button>
    </div>
  );
}

export default CartSummary;
