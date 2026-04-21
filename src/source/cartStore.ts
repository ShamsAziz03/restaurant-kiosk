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

	addItem: (item) => {
		const itemIndex = get().items.findIndex((t) => t.id === item.id);
		if (itemIndex === -1) {
			set((state) => ({ items: [...state.items, item] }));
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
		}
	},
	removeItem: (itemId) => {
		const cartItems = [...get().items];
		const newItems = cartItems.filter((item) => item.id !== itemId);
		set({ items: newItems });
	},
}));

export const useCartTotal = () => {
	const items = useCartStore((state) => state.items);

	let total = 0;
	let subTotal = 0;
	const tax = 10; //10%

	items.forEach((item) => {
		subTotal += item.price * item.qnt;
	});
	total = subTotal + subTotal * (tax / 100);
	return { total, subTotal, tax };
};
