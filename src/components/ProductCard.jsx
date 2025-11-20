import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-50 mb-4 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 bg-primary text-white p-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block flex-1">
          <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-accent transition-colors mb-2">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1 text-amber-400 text-sm">
            ★ <span className="text-gray-400">{product.rating?.rate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;