import { useState, useEffect } from 'react';

export const useFetchProducts = (category, sortOrder) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Create an AbortController to manage the network request
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

        // 2. Pass the 'signal' to the fetch call
        const res = await fetch(url, { signal });
        
        if (!res.ok) throw new Error('Failed to fetch products');
        
        const result = await res.json();
        setData(result);
      } catch (err) {
        // 3. Ignore errors caused by us cancelling the request deliberately
        if (err.name !== 'AbortError') {
          console.error("Fetch error:", err);
          setError(err.message);
        }
      } finally {
        // Only turn off loading if the component is still mounted and request wasn't aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 4. Cleanup function: Cancels the request if the component unmounts 
    // or if dependencies (category/sortOrder) change quickly.
    return () => controller.abort();

  }, [category, sortOrder]);

  return { data, loading, error };
};