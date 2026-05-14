"use client";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import AddCategoryDialog from "@/components/customComponents/addCategoryDialog";
import ItemCard from "@/components/customComponents/itemCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const mockCategories = [
	"Burgers",
	"Pizza",
	"Pasta",
	"Salads",
	"Desserts",
	"Beverages",
];

const mockMenuItems = [
	{
		id: 1,
		categoryId: 1,
		title: "Margherita Pizza",
		image:
			"https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4,
		description:
			"Classic pizza with tomato sauce, fresh mozzarella, and basil.",
		details:
			"Made with hand-stretched dough, San Marzano tomatoes, fresh buffalo mozzarella, extra virgin olive oil, and organic basil leaves.",
		price: 13,
		specifications: [
			"Vegetarian",
			"Contains Gluten",
			"Contains Dairy",
			"Wood-fired",
			"Size: 12 inch",
		],
	},
	{
		id: 2,
		categoryId: 2,
		title: "Classic Beef Burger",
		image:
			"https://media.istockphoto.com/id/115042687/photo/hamburger-over-white-background.webp?s=1024x1024&w=is&k=20&c=zregkh8UX5_XQd-ckkUAEvOQPzFal8BsjF2yEgI9O04=",
		rating: 3.5,
		description: "Juicy beef patty with lettuce, tomato, and our secret sauce.",
		details:
			"A 200g prime beef patty grilled to perfection, served on a toasted brioche bun with cheddar cheese, pickles, and our signature house sauce.",
		price: 10.5,
		specifications: [
			"200g Beef Patty",
			"Contains Gluten",
			"Contains Dairy",
			"Grilled",
			"Served with Fries",
		],
	},
	{
		id: 3,
		categoryId: 3,
		title: "Penne Arrabbiata",
		image:
			"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 2.5,
		description:
			"Spicy pasta with garlic, tomatoes, and dried red chili peppers.",
		details:
			"Al dente penne pasta tossed in a fiery tomato sauce made with fresh garlic, chili flakes, and parsley. Finished with a drizzle of spicy olive oil.",
		price: 14,
		specifications: [
			"Vegan",
			"Contains Gluten",
			"Spicy",
			"Al dente",
			"No Dairy",
		],
	},
	{
		id: 4,
		categoryId: 4,
		title: "Greek Salad",
		image:
			"https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4,
		description:
			"Fresh cucumbers, tomatoes, olives, and feta cheese with olive oil.",
		details:
			"Crisp cucumbers, vine-ripened tomatoes, red onions, Kalamata olives, and a thick slice of premium feta cheese, seasoned with dried oregano.",
		price: 8.5,
		specifications: [
			"Vegetarian",
			"Gluten Free",
			"Contains Dairy",
			"Raw",
			"No Added Sugar",
		],
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
		specifications: [
			"Vegan",
			"Gluten Free",
			"No Dairy",
			"Cold Served",
			"500ml",
		],
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
		price: 4,
		specifications: [
			"Vegetarian",
			"Contains Gluten",
			"Contains Dairy",
			"70% Belgian Chocolate",
			"Freshly Baked",
		],
	},
];
const MenuPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
	const [activeItem, setActiveItem] = useState<FoodItem | null>(null);

	const items = useMemo(() => {
		if (selectedCategory === "all") return mockMenuItems;
		return mockMenuItems.filter(
			(item) => item.categoryId === mockCategories.indexOf(selectedCategory),
		);
	}, [selectedCategory]);

	return (
		<ScrollArea className="w-[100%]">
			<div className="p-8">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-800">
							Menu Management
						</h1>
						<p className="text-gray-600 mt-1">
							Add, edit, or remove menu items and categories.
						</p>
					</div>
					<button
						className="flex items-center font-semibold p-3 text-center text-white bg-gray-800 rounded-[10px] shadow-xl hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
						onClick={() => {}}
						type="button"
					>
						<Plus className="w-5 h-5" />
						Add New Item
					</button>
				</div>

				{/* Categories */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-4">
						Categories
					</h2>
					<div className="flex flex-wrap gap-3">
						<button
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								selectedCategory === "all"
									? "bg-gray-800 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
							onClick={() => setSelectedCategory("all")}
							type="button"
						>
							All Items
						</button>
						{mockCategories.map((category) => (
							<button
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									selectedCategory === category
										? "bg-gray-800 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
								key={category}
								onClick={() => setSelectedCategory(category)}
								type="button"
							>
								{category}
							</button>
						))}
						<button
							className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg font-medium text-gray-600 hover:border-gray-500 hover:text-gray-500 transition-colors"
							onClick={() => setShowAddCategoryDialog(true)}
							type="button"
						>
							+ Add Category
						</button>
						<AddCategoryDialog
							setShowAddCategoryDialog={setShowAddCategoryDialog}
							showAddCategoryDialog={showAddCategoryDialog}
						/>
					</div>
				</div>

				{/* Search */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search menu items..."
							type="text"
							value={searchTerm}
						/>
					</div>
				</div>

				{/* Menu Items Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map((item) => (
						<ItemCard
							activeItem={activeItem}
							item={item}
							key={item.id}
							setActiveItem={setActiveItem}
						/>
					))}
				</div>
			</div>

			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default MenuPage;
