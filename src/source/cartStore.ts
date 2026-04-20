import { create } from "zustand";
import type { CartItem } from "@/components/customComponents/cart";

type StoreProps = {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	changeItemQnt: (itemId: number, qnt: number) => void;
	removeItem: (itemId: number) => void;
};

export const useCartStore = create<StoreProps>((set, get) => ({
	items: [],
	addItem: (item) => set((state) => ({ items: [...state.items, item] })),
	changeItemQnt: (itemId, qnt) => {
		if (qnt <= 100) {
			//to prevent overflow of qnt in cart
			const indexOfItem = get().items.findIndex((item) => item.id === itemId);
			const cartItems = [...get().items];
			cartItems[indexOfItem] = { ...cartItems[indexOfItem], qnt: qnt };
			set({ items: cartItems });
		}
	},
	removeItem: (itemId) => {
		const cartItems = [...get().items];
		const newItems = cartItems.filter((item) => item.id !== itemId);
		set({ items: newItems });
	},
}));
