import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQty } = useCart();

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 items-center shadow-sm">
      <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center p-2">
        <img 
          src={item.image} 
          alt={item.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply" 
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
        <p className="text-gray-500 text-sm capitalize">{item.category}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
            <button 
              onClick={() => updateQty(item.id, -1)} 
              className="p-1 hover:text-accent transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
            <button 
              onClick={() => updateQty(item.id, 1)} 
              className="p-1 hover:text-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <span className="font-bold text-primary">${(item.price * item.qty).toFixed(2)}</span>
        </div>
      </div>
      
      <button 
        onClick={() => removeFromCart(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;