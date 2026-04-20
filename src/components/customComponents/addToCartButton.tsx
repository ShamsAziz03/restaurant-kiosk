"use client";
import { ShoppingCart } from "lucide-react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/source/cartStore";

const AddToCartButton = (props: FoodItem) => {
	const addToCart = useCartStore((state) => state.addItem);
	const items = useCartStore((state) => state.items);

	function addItemToCart() {
		const newItem = { ...props, qnt: 1 };
		addToCart(newItem);
		console.log(JSON.stringify(items, null, 2));
	}

	return (
		<Button
			className="border-2 border-black rounded-lg"
			onClick={() => addItemToCart()}
		>
			<ShoppingCart />
		</Button>
	);
};

export default AddToCartButton;
