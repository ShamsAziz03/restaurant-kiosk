"use client";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartItemComponent from "@/components/customComponents/cartItem";
import { useCartStore, useCartTotal } from "@/source/cartStore";
import type { FoodItem } from "../../app/(user-features)/categories/page";
import CheckOutDialog from "./checkOutDialog";

export type CartItem = FoodItem & { qnt: number };

const CartComponent = () => {
	const cartItems = useCartStore((state) => state.items);
	const { total, subTotal, tax } = useCartTotal();
	const [openCheckOut, setOpenCheckOut] = useState(false);

	return (
		<div className="bg-gray-50 w-[35%] h-[100vh] border-r-black border-2 sticky top-0">
			{/* first section in cart section - your cart stmt*/}
			<div className="flex flex-row gap-5 items-center justify-start p-6 border-b-gray-300 border-2 w-[100%]">
				<span>
					<ShoppingCart size={35} />
				</span>
				<h1 className="text-3xl font-bold [text-shadow:_2px_2px_3px_rgb(0_0_0_/_40%)]">
					YOUR CART
				</h1>
			</div>
			{/* second section in cart- content of cart*/}
			<div className="flex flex-col w-[100%] h-[65%] overflow-auto p-2 pb-0 pt-0 justify-start items-start">
				{cartItems.map(
					(item) =>
						item.qnt > 0 && (
							<CartItemComponent
								description={item.description}
								id={item.id}
								image={item.image}
								key={item.id}
								price={item.price}
								qnt={item.qnt}
								title={item.title}
							/>
						),
				)}
			</div>
			{/* third secton in cart- total with checout button */}
			<div className="border-2 border-t-gray-400 border-b-gray-400 flex flex-col justify-center items-center">
				<p className="font-bold text-md">
					Subtotal:
					<span className="text-xl ml-8 text-green-500">{subTotal} $</span>
				</p>
				<p className="font-bold text-md">
					Tax:
					<span className="text-xl ml-10 text-green-500">{tax} %</span>
				</p>
				<p className="text-md font-bold">
					Total:
					<span className="text-xl ml-10 text-green-500">{total} $</span>
				</p>
			</div>
			<div className="flex justify-center items-center p-1">
				<button
					className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-2 m-2 border-2"
					onClick={() => setOpenCheckOut(true)}
					type="button"
				>
					Check Out
				</button>

				<CheckOutDialog
					openCheckOut={openCheckOut}
					setOpenCheckOut={setOpenCheckOut}
				/>
			</div>
		</div>
	);
};

export default CartComponent;
