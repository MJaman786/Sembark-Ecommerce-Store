import { useState, useEffect } from 'react';

export const useFetchProducts = (category, sortOrder) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = 'https://fakestoreapi.com/products';
        if (category) {
          url += `/category/${category}`;
        }
        url += `?sort=${sortOrder}`;

      
        const res = await fetch(url, { signal });
        
        if (!res.ok) throw new Error('Failed to fetch products');
        
        const result = await res.json();
        setData(result);
      } catch (err) {
        
        if (err.name !== 'AbortError') {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      } finally {
        
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();

  }, [category, sortOrder]);

  return { data, loading, error };
};