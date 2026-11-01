import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export const Cart = () => {
  const { items, addItem, removeItem, setQuantity, clear } = useCartStore();

  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products">Go back to products</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.title}</span>
            <span>${item.price}</span>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addItem(item)}>+</button>
            </div>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button onClick={clear}>Clear Cart</button>
      </div>
    </div>
  );
};