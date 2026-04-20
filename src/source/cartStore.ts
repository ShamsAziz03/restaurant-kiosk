import { create } from "zustand";
import type { CartItem } from "@/components/customComponents/cart";

type StoreProps = {
	items: CartItem[];
	tax: number;
	subTotal: number;
	total: number;

	addItem: (item: CartItem) => void;
	changeItemQnt: (itemId: number, qnt: number) => void;
	removeItem: (itemId: number) => void;
	updatePrice: () => void;
};

export const useCartStore = create<StoreProps>((set, get) => ({
	items: [],
	tax: 10,
	subTotal: 0,
	total: 0,
	addItem: (item) => {
		const itemIndex = get().items.findIndex((t) => t.id === item.id);
		if (itemIndex === -1) {
			set((state) => ({ items: [...state.items, item] }));
			get().updatePrice();
		} else {
			const itemQnt = get().items[itemIndex].qnt;
			get().changeItemQnt(item.id, itemQnt + 1);
		}
	},
	changeItemQnt: (itemId, qnt) => {
		if (qnt <= 100) {
			//to prevent overflow of qnt in cart
			const indexOfItem = get().items.findIndex((item) => item.id === itemId);
			const cartItems = [...get().items];
			cartItems[indexOfItem] = { ...cartItems[indexOfItem], qnt: qnt };
			set({ items: cartItems });
			get().updatePrice();
		}
	},
	removeItem: (itemId) => {
		const cartItems = [...get().items];
		const newItems = cartItems.filter((item) => item.id !== itemId);
		set({ items: newItems });
		get().updatePrice();
	},
	updatePrice: () => {
		const items = [...get().items];
		let total = 0;
		let subTotal = 0;
		const tax = get().tax;

		items.forEach((item) => {
			subTotal += item.price * item.qnt;
		});
		total = subTotal + tax;
		set({ total: total, subTotal: subTotal });
	},
}));
