import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem'; // Importing the new component

const Cart = () => {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List - Now using the CartItem component */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-primary">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
            Checkout <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;