import { create } from 'zustand';

type WishItem = {
  id: string;
  type?: string;
  title: string;
  image: any;
  oldPrice?: string;
  newPrice: string;
  size42?: string;
  selectedSize: number;
  isNew?: boolean;
  description?: string;
  weight32?: string;
  weight42?: string;
};

type WishState = {
  orders: WishItem[];
  lastLikedItem: WishItem | null;
  isRemoveAction: boolean;
  wishlistVisible: boolean;
  
  openWishlist: () => void;
  closeWishlist: () => void;
  isItemLiked: (item: WishItem) => boolean;
  setOrdersWish: (orderItem: WishItem) => void;
  removeOrderWishItem: (orderItem: WishItem) => void;
  getPriceForSize: (item: WishItem) => { pricePizza: string; price: number; volume: string };
};

export const useOrderWishStore = create<WishState>((set, get) => ({
  orders: [],
  lastLikedItem: null,
  isRemoveAction: false,
  wishlistVisible: false,

  openWishlist: () => set({ wishlistVisible: true }),
  closeWishlist: () => set({ wishlistVisible: false }),

  isItemLiked: (item) => {
    return get().orders.some(
      (order) => order.id === item.id && order.selectedSize === item.selectedSize
    );
  },

  setOrdersWish: (orderItem) =>
    set((state) => {
      const exists = state.orders.some(
        (item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
      );
      if (exists) return state;
      
      return {
        orders: [...state.orders, orderItem],
        lastLikedItem: orderItem
      };
    }),

  removeOrderWishItem: (orderItem) =>
    set((state) => ({
      orders: state.orders.filter(
        (item) => !(item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)
      )
    })),

  getPriceForSize: (item) => {
    const basePrice = item.selectedSize === 42 ? item.size42 || '0' : item.newPrice;
    const pricePizza = basePrice;
    const price = parseFloat(basePrice.replace('$', ''));
    return {
      pricePizza,
      price,
      volume: ''
    };
  }
}));