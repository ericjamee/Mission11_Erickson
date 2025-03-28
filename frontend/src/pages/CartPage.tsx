import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty.
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.book.bookID}>
                  <td>{item.book.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.book.price.toFixed(2)}</td>
                  <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.book.bookID)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center my-4">
            <h4>Total: ${cartTotal.toFixed(2)}</h4>
            <div>
              <button className="btn btn-secondary me-2" onClick={() => navigate('/')}>
                ← Continue Shopping
              </button>
              <button className="btn btn-outline-danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
