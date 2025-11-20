import { Link } from 'react-router-dom';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tighter">
            Sembark<span className="text-accent">.</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-primary transition">
              Shop
            </Link>
            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-accent transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;