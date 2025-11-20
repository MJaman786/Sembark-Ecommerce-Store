import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { useFetchProducts } from '../hooks/useFetchProducts';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeCategory = searchParams.get('category');
  const sortOrder = searchParams.get('sort') || 'asc';

  // Use our new custom hook
  const { data: products, loading, error } = useFetchProducts(activeCategory, sortOrder);

  const handleCategoryChange = (cat) => {
    if (!cat) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (sortVal) => {
    searchParams.set('sort', sortVal);
    setSearchParams(searchParams);
  };

  if (error) return <div className="text-center py-20 text-red-500">Error loading products.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <FilterBar 
        activeCategory={activeCategory}
        sortOrder={sortOrder}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;