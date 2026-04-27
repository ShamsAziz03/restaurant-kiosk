import { create } from "zustand";
import type { CartItem } from "@/components/customComponents/cart";
import type { ExtraItem } from "@/components/customComponents/extrasItemsList";

export type typeOfOrder = "dineIn" | "takeAway";
export type ExtrasItem = ExtraItem & { qnt: number };
type Action = "inc" | "dec";

type StoreProps = {
	orderDetails: {
		items: CartItem[];
		typeOfOrder: typeOfOrder;
		extraItems: ExtrasItem[];
		specialInstructions: string;
	};

	addItem: (item: CartItem) => void;
	changeItemQnt: (itemId: number, qnt: number) => void;
	removeItem: (itemId: number) => void;
	setTypeofOrder: (type: typeOfOrder) => void;
	addExtraItem: (item: ExtrasItem) => void;
	removeExtraItem: (itemId: number) => void;
	changeExtraItemQnt: (item: ExtraItem, action: Action) => void;
	setSpecialInstructions: (instructions: string) => void;
};

export const useCartStore = create<StoreProps>((set, get) => ({
	orderDetails: {
		items: [],
		typeOfOrder: "takeAway",
		extraItems: [],
		specialInstructions: "",
	},

	addItem: (item) => {
		const itemIndex = get().orderDetails.items.findIndex(
			(t) => t.id === item.id,
		);
		if (itemIndex === -1) {
			set((state) => ({
				orderDetails: {
					...get().orderDetails,
					items: [...state.orderDetails.items, item],
				},
			}));
		} else {
			const itemQnt = get().orderDetails.items[itemIndex].qnt;
			get().changeItemQnt(item.id, itemQnt + 1);
		}
	},
	changeItemQnt: (itemId, qnt) => {
		if (qnt <= 100) {
			//to prevent overflow of qnt in cart
			const indexOfItem = get().orderDetails.items.findIndex(
				(item) => item.id === itemId,
			);
			const cartItems = [...get().orderDetails.items];
			cartItems[indexOfItem] = { ...cartItems[indexOfItem], qnt: qnt };
			set({ orderDetails: { ...get().orderDetails, items: cartItems } });
		}
	},
	removeItem: (itemId) => {
		const cartItems = [...get().orderDetails.items];
		const newItems = cartItems.filter((item) => item.id !== itemId);
		set({ orderDetails: { ...get().orderDetails, items: newItems } });
	},
	setTypeofOrder: (type) =>
		set({ orderDetails: { ...get().orderDetails, typeOfOrder: type } }),

	addExtraItem: (item) => {
		set({
			orderDetails: {
				...get().orderDetails,
				extraItems: [...get().orderDetails.extraItems, item],
			},
		});
	},

	removeExtraItem: (itemId) => {
		const extrasItems = [...get().orderDetails.extraItems];
		const newItems = extrasItems.filter((item) => item.id !== itemId);
		set({ orderDetails: { ...get().orderDetails, extraItems: newItems } });
	},

	changeExtraItemQnt: (item, action) => {
		const extrasItems = [...get().orderDetails.extraItems];
		const indexOfItem = extrasItems.findIndex((t) => t.id === item.id);
		if (indexOfItem === -1) {
			//item not exist
			if (action === "inc") get().addExtraItem({ ...item, qnt: 1 });
		} else {
			//item exist
			const qnt = extrasItems[indexOfItem].qnt;
			if (action === "dec") {
				if (qnt - 1 === 0) get().removeExtraItem(item.id);
				else if (qnt !== 0) {
					extrasItems[indexOfItem] = {
						...extrasItems[indexOfItem],
						qnt: qnt - 1,
					};
					set({
						orderDetails: { ...get().orderDetails, extraItems: extrasItems },
					});
				}
			} else if (action === "inc") {
				extrasItems[indexOfItem] = {
					...extrasItems[indexOfItem],
					qnt: qnt + 1,
				};
				set({
					orderDetails: { ...get().orderDetails, extraItems: extrasItems },
				});
			}
		}
	},

	setSpecialInstructions: (instructions) =>
		set({
			orderDetails: {
				...get().orderDetails,
				specialInstructions: instructions,
			},
		}),
}));

export const useCartTotal = () => {
	const items = useCartStore((state) => state.orderDetails.items);
	const extraItems = useCartStore((state) => state.orderDetails.extraItems);

	let cartTotal = 0;
	let cartSubTotal = 0;
	let finalTotal = 0;
	let extrasTotal = 0;
	const tax = 10; //10%

	items.forEach((item) => {
		cartSubTotal += item.price * item.qnt;
	});

	extraItems.forEach((item) => {
		extrasTotal += item.price * item.qnt;
	});

	cartTotal = cartSubTotal + cartSubTotal * (tax / 100);
	finalTotal =
		extrasTotal + cartSubTotal + (extrasTotal + cartSubTotal) * (tax / 100);

	return { cartTotal, cartSubTotal, tax, extrasTotal, finalTotal };
};
