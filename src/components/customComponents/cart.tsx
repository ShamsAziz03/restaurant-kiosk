import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import CartItemComponent from "@/components/customComponents/cartItem";
import type { FoodItem } from "../../app/(user-features)/categories/page";

export type CartItem = FoodItem & { qnt: number };

const carditems: CartItem[] = [
	{
		id: 1,
		categoryId: 1,
		title: "Margherita Pizza",
		image:
			"https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description:
			"Classic pizza with tomato sauce, fresh mozzarella, and basil.",
		details:
			"Made with hand-stretched dough, San Marzano tomatoes, fresh buffalo mozzarella, extra virgin olive oil, and organic basil leaves.",
		rating: 4,
		price: 12.99,
		qnt: 1,
	},
	{
		id: 9,
		categoryId: 3,
		title: "Creamy Fettuccine",
		image:
			"https://images.unsplash.com/photo-1570549986390-6bd150ac3515?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3JlYW15JTIwRmV0dHVjY2luZXxlbnwwfHwwfHx8MA%3D%3D",
		rating: 5,
		description: "Rich white sauce pasta with mushrooms and parmesan.",
		details:
			"Broad fettuccine noodles coated in a velvety sauce made from heavy cream, butter, garlic, and freshly grated parmesan cheese.",
		price: 16.5,
		qnt: 1,
	},
	{
		id: 10,
		categoryId: 1,
		title: "BBQ Chicken Pizza",
		image:
			"https://plus.unsplash.com/premium_photo-1664472696633-4b0b41e95202?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QkJRJTIwQ2hpY2tlbiUyMFBpenphfGVufDB8fDB8fHww",
		rating: 4.5,
		description:
			"Grilled chicken, red onions, and cilantro on tangy BBQ sauce.",
		details:
			"Topped with smoky BBQ sauce, tender grilled chicken breast pieces, thinly sliced red onions, and fresh cilantro over a blend of mozzarella and smoked gouda.",
		price: 16.5,
		qnt: 1,
	},
	{
		id: 11,
		categoryId: 1,
		title: "Truffle Mushroom Pizza",
		image:
			"https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4.8,
		description: "White pizza with wild mushrooms and aromatic truffle oil.",
		details:
			"A sophisticated blend of cremini, shiitake, and oyster mushrooms on a garlic cream base, finished with a drizzle of premium white truffle oil and fresh parsley.",
		price: 18.99,
		qnt: 1,
	},
	{
		id: 12,
		categoryId: 1,
		title: "Quattro Formaggi",
		image:
			"https://images.unsplash.com/photo-1655662844300-e59c3d2e7587?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4.2,
		description: "Rich blend of four premium Italian cheeses.",
		details:
			"A cheese lover's dream featuring Mozzarella, Gorgonzola, Parmesan, and Fontina melted together on a thin, crispy crust with a hint of rosemary.",
		price: 14.5,
		qnt: 1,
	},
	{
		id: 5,
		categoryId: 5,
		title: "Iced Berry Lemonade",
		image:
			"https://plus.unsplash.com/premium_photo-1669807973705-af8d158d5021?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 5,
		description: "Refreshing cold drink with fresh berries and lemon slices.",
		details:
			"Hand-squeezed lemon juice mixed with muddled raspberries and blueberries, served over crushed ice with a hint of mint.",
		price: 4.5,
		qnt: 1,
	},
	{
		id: 6,
		categoryId: 6,
		title: "Chocolate Glazed Donut",
		image:
			"https://images.unsplash.com/photo-1562945431-ce2b63d5a7fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 5,
		description: "Soft donut dipped in rich Belgian chocolate ganache.",
		details:
			"Freshly baked yeast donut, glazed with a smooth 70% cocoa Belgian chocolate and sprinkled with dark chocolate shavings.",
		price: 3.99,
		qnt: 1,
	},
	{
		id: 7,
		categoryId: 1,
		title: "Pepperoni Feast",
		image:
			"https://images.unsplash.com/photo-1692737580547-b45bb4a02356?q=80&w=915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 3.5,
		description: "Loaded with pepperoni and extra mozzarella cheese.",
		details:
			"Our classic crust topped with double portions of spicy pepperoni slices and a blend of mozzarella and provolone cheese.",
		price: 15.99,
		qnt: 1,
	},
];

const CartComponent = () => {
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
				{carditems.map(
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
					<span className="text-xl ml-8 text-green-500">50 $</span>
				</p>
				<p className="font-bold text-md">
					Tax:
					<span className="text-xl ml-10 text-green-500">10 $</span>
				</p>
				<p className="text-md font-bold">
					Total:
					<span className="text-xl ml-10 text-green-500">60 $</span>
				</p>
			</div>
			<div className="flex justify-center items-center p-1">
				<Link
					className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-2 m-2 border-2"
					href="/"
				>
					<button type="button">Check Out</button>
				</Link>
			</div>
		</div>
	);
};

export default CartComponent;
