import { create } from 'zustand';

const getInitialCart = () => {
  try {
    const stored = window.localStorage.getItem('cart_storage');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const useCartStore = create((set) => ({
  items: getInitialCart(),
  addItem: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { 
      items: [...state.items, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        quantity: 1 
      }] 
    };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  setQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) {
      return { items: state.items.filter((item) => item.id !== id) };
    }
    return {
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    };
  }),
  clear: () => set({ items: [] }),
}));

useCartStore.subscribe((state) => {
  try {
    window.localStorage.setItem('cart_storage', JSON.stringify(state.items));
  } catch (error) {
    console.error(error);
  }
});