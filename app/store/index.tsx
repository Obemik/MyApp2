import { create } from 'zustand';
type OrderItem = {
  id: string;
  type?: string;
  oldPrice?: string;
  newPrice: string;
  size42?: string;
  selectedSize: number;
  quantity?: number;
  price?: string | {pricePizza : string; price:number; volume: string};
  volume?: string;
  selectToppings?: {price:string}[];

};
type OrderState = {
  orders: OrderItem[];
  setOrders: (orderItem: OrderItem) => void;
  removeOrder: (orderItem: OrderItem) => void;
  clearOrders: () => void;
  confirmOrder: () => void;
  increaseQuantity: (orderItem: OrderItem) => void;
  decreaseQuantity: (orderItem: OrderItem) => void;
  calculateTotal: () => {totalAmount: string; totalDiscount: string};
  totalItems: () => void;
  getPriceForSize: (item: OrderItem) => {pricePizza : string; price:number; volume: string};
};

const parsePrice = (value?: string) => parseFloat((value || '0').replace('$', '')) || 0;
export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],

  setOrders: (orderItem) =>
    set((state) => {
      const existingOrder = state.orders.find(
        (item) => item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
      );
      if(existingOrder){
        return{
        orders:state.orders.map((item)=>
        item.id === orderItem.id && item.selectedSize=== orderItem.selectedSize
         ? {...item, quantity:(item.quantity ||1) +1}
        :item
    )
      };
    }
    return{orders:[...state.orders,{...orderItem, quantity:1}]};
}),
 
    getPriceForSize: (item) => {
        const basePrice = item.selectedSize === 42 ? item.size42 || '0' : item.newPrice;
        const pricePizza = parseFloat(basePrice.replace('$', ''));
       const priceString = typeof item.price === 'string' ? item.price:"0";
       return {
        pricePizza,
       };
    },
    totalItems: () => get().orders.reduce((total, item) => total + (item.quantity || 0), 0),
    removeOrder: (orderItem) => 
        set((state) => ({
        orders: state.orders.filter(
            (item) => !(item.id === orderItem.id && item.selectedSize === orderItem.selectedSize)
        )
    })),
    clearOrders: () => set({ orders: [] }),
    confirmOrder: () => set({ orders: [] }),
    increaseQuantity: (orderItem) =>
        set((state) => ({
        orders: state.orders.map((item) =>
            item.id === orderItem.id && item.selectedSize === orderItem.selectedSize
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item)
    })),
    decreaseQuantity: (orderItem) =>
        set((state) => ({
        orders: state.orders.map((item) => {
            if (item.id === orderItem.id && item.selectedSize === orderItem.selectedSize) {
                const nextQuantity = (item.quantity || 1) - 1;
                return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : item;
            }
            return item;
        })
    })),
    calculateTotal: () => {
    const orders = get().orders;
    let totalAmount = 0;
    let totalDiscount = 0;

    orders.forEach((item) => {
      const { pricePizza } = get().getPriceForSize(item);
      const quantity = item.quantity || 1;
      const itemTotal = pricePizza * quantity;
      totalAmount += itemTotal;

      if (item.oldPrice) {
        const oldPriceValue = parsePrice(item.oldPrice);
        const discount = (oldPriceValue - pricePizza) * quantity;
        totalDiscount += discount;
      }
    });

    return {
      totalAmount: `$${totalAmount.toFixed(2)}`,
      totalDiscount: `$${totalDiscount.toFixed(2)}`
    };
  },
}));
export default useOrderStore;