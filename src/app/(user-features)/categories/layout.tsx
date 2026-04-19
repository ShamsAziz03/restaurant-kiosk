import "../../globals.css";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "./page";

type Category = {
	id: string;
	value: string;
	icon: string;
	alt: string;
};

const carditems: FoodItem[] = [
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
	},
];
const categories: Category[] = [
	{
		id: "1",
		value: "Pizza",
		icon: "https://img.icons8.com/doodle/48/pizza--v1.png",
		alt: "pizzaIcon",
	},
	{
		id: "2",
		value: "Burger",
		icon: "https://img.icons8.com/office/40/hamburger.png",
		alt: "burgerIcon",
	},
	{
		id: "3",
		value: "Pasta",
		icon: "https://img.icons8.com/office/40/spaghetti.png",
		alt: "pastaIcon",
	},
	{
		id: "4",
		value: "Salads",
		icon: "https://img.icons8.com/office/40/avocado.png",
		alt: "saladsIcon",
	},
	{
		id: "5",
		value: "Drinks",
		icon: "https://img.icons8.com/office/40/cocktail.png",
		alt: "drinksIcon",
	},
	{
		id: "6",
		value: "Deserts",
		icon: "https://img.icons8.com/office/40/doughnut.png",
		alt: "dessertsIcon",
	},
];
export default function CategoriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-row w-[100%] h-[100%] bg-[url(https://img.freepik.com/free-photo/sandwich-with-sundried-tomato-tasty-snack-concept_185193-109453.jpg?semt=ais_hybrid&w=740&q=80)] bg-cover bg-center">
			{/* cart section */}
			<div className="bg-gray-50 w-[40%] h-[100vh] border-r-black border-2 sticky top-0">
				{/* first section in cart section - your cart stmt*/}
				<h1 className="text-3xl text-bold [text-shadow:_2px_2px_3px_rgb(0_0_0_/_40%)] p-6 border-b-gray-300 border-2">
					YOUR CART
				</h1>
				{/* second section in cart- content of cart*/}
				<div className="flex flex-col gap-6 w-[100%] h-[65%] overflow-auto p-5 justify-start items-start">
					{carditems.map((item) => (
						<div
							className="flex flex-row gap-10 border-b-gray-300 border-b-2 w-[100%]"
							key={item.id}
						>
							<Avatar className="w-[50px] h-[50px] border-2 border-gray-100 bg-slate-100">
								<AvatarImage alt={item.description} src={item.image} />
								<AvatarFallback>
									{item.description.toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col justify-center items-center">
								<p>{item.title}</p> <p>{item.price} $</p>
							</div>
						</div>
					))}
				</div>
				{/* third secton in cart- total with checout button */}
				<div className="mt-1 mb-1 border-2 border-t-gray-400 border-b-gray-400 flex flex-col justify-center items-center gap-1">
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
				<div className="flex justify-center items-center p-2">
					<Link
						className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-2 border-2"
						href="/"
					>
						<button type="button">Check Out</button>
					</Link>
				</div>
			</div>
			{/* navbar section */}
			<div className="flex flex-col items-center w-[100%]">
				<nav className="flex flex-row gap-20 p-3 justify-center flex-wrap bg-gray-100 w-full border-2 border-b-black">
					{categories.map((category) => (
						<Link
							href={`/categories?categoryId=${category.id}`}
							key={category.id}
						>
							<div className="flex flex-col gap-2">
								<Avatar className="w-[78px] h-[78px] p-2 border-2 border-primary bg-slate-100">
									<AvatarImage alt={category.alt} src={category.icon} />
									<AvatarFallback>{category.alt.toUpperCase()}</AvatarFallback>
								</Avatar>

								<Button className="text-xl font-bold" variant="link">
									{category.value}
								</Button>
							</div>
						</Link>
					))}
				</nav>
				{children}
			</div>
		</section>
	);
}
