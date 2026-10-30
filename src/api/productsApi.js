export const fetchProducts = async (signal) => {
  const response = await fetch('https://dummyjson.com/products?limit=100', { signal });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchProduct = async (id, signal) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, { signal });
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
};