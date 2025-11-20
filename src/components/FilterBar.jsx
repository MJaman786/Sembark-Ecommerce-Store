import { useState, useEffect, useRef } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const FilterBar = ({ activeCategory, sortOrder, onCategoryChange, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // UX Improvement: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsSortOpen(false);
  };

  const sortOptions = [
    { label: 'Price: Low to High', value: 'asc' },
    { label: 'Price: High to Low', value: 'desc' },
  ];

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title Section */}
        <div>
          <h1 className="text-3xl font-bold text-primary">New Arrivals</h1>
          <p className="text-gray-500 mt-1">Explore our latest collection</p>
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-sm font-medium transition-all duration-200 ${
              isSortOpen 
                ? 'border-accent ring-2 ring-accent/10 text-primary shadow-lg' 
                : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ArrowUpDown size={16} className={isSortOpen ? 'text-accent' : 'text-gray-400'} />
            <span>Sort by</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${isSortOpen ? 'rotate-180 text-accent' : 'text-gray-400'}`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      sortOrder === option.value
                        ? 'bg-blue-50 text-accent font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {option.label}
                    {sortOrder === option.value && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs (Pill Design) */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
            !activeCategory 
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          All Items
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 border ${
              activeCategory === cat 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;