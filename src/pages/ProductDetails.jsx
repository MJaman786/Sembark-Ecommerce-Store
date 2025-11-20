import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 flex items-center justify-center aspect-square">
          <img src={product.image} alt={product.title} className="max-h-[70%] max-w-[80%] object-contain mix-blend-multiply" />
        </div>

        <div className="space-y-6">
          <span className="bg-blue-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-primary leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-bold text-amber-700">{product.rating?.rate}</span>
              <span className="text-xs text-amber-600">({product.rating?.count} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>

          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={() => addToCart(product)}
              className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-800 hover:scale-105 transition-all duration-200 shadow-xl shadow-primary/20"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;