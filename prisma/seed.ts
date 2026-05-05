import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma";

const adapter = new PrismaMariaDb({
	host: process.env.DB_HOST ?? "localhost",
	user: process.env.DB_USER ?? "root",
	password: process.env.DB_PASSWORD ?? "",
	database: process.env.DB_NAME ?? "restuarent-kiosk",
	port: Number(process.env.DB_PORT) || 3306,
});

export const prisma = new PrismaClient({ adapter });
const categoriesData = [
	{
		value: "Pizza",
		icon: "https://img.icons8.com/doodle/48/pizza--v1.png",
		alt: "pizzaIcon",
	},
	{
		value: "Burger",
		icon: "https://img.icons8.com/office/40/hamburger.png",
		alt: "burgerIcon",
	},
	{
		value: "Pasta",
		icon: "https://img.icons8.com/office/40/spaghetti.png",
		alt: "pastaIcon",
	},
	{
		value: "Salads",
		icon: "https://img.icons8.com/office/40/avocado.png",
		alt: "saladsIcon",
	},
	{
		value: "Drinks",
		icon: "https://img.icons8.com/office/40/cocktail.png",
		alt: "drinksIcon",
	},
	{
		value: "Deserts",
		icon: "https://img.icons8.com/office/40/doughnut.png",
		alt: "dessertsIcon",
	},
];

const foodItemsData = [
	{
		categoryId: 1,
		title: "Margherita Pizza",
		image:
			"https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		description:
			"Classic pizza with tomato sauce, fresh mozzarella, and basil.",
		details:
			"Made with hand-stretched dough, San Marzano tomatoes, fresh buffalo mozzarella, extra virgin olive oil, and organic basil leaves.",
		rating: 4,
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
	{
		categoryId: 1,
		title: "Pepperoni Feast",
		image:
			"https://images.unsplash.com/photo-1692737580547-b45bb4a02356?q=80&w=915&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 3.5,
		description: "Loaded with pepperoni and double extra mozzarella cheese.",
		details:
			"Our classic crust topped with double portions of spicy pepperoni slices and a blend of mozzarella and provolone cheese.",
		price: 16,
		specifications: [
			"Contains Gluten",
			"Contains Dairy",
			"Contains Pork",
			"Extra Cheese",
			"Size: 12 inch",
		],
	},
	{
		categoryId: 2,
		title: "Veggie Garden Burger",
		image:
			"https://images.unsplash.com/photo-1546441471-c81f0586d0a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FyZGVuJTIwQnVyZ2VyfGVufDB8fDB8fHww",
		rating: 2.4,
		description: "Plant-based patty with avocado and sprouts.",
		details:
			"A homemade patty made from black beans, quinoa, and roasted vegetables, topped with smashed avocado and organic alfalfa sprouts.",
		price: 11,
		specifications: [
			"Vegan",
			"Contains Gluten",
			"No Dairy",
			"Plant-Based",
			"Served with Fries",
		],
	},
	{
		categoryId: 3,
		title: "Creamy Fettuccine",
		image:
			"https://images.unsplash.com/photo-1570549986390-6bd150ac3515?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q3JlYW15JTIwRmV0dHVjY2luZXxlbnwwfHwwfHx8MA%3D%3D",
		rating: 5,
		description: "Rich white sauce pasta with mushrooms and parmesan.",
		details:
			"Broad fettuccine noodles coated in a velvety sauce made from heavy cream, butter, garlic, and freshly grated parmesan cheese.",
		price: 16.5,
		specifications: [
			"Vegetarian",
			"Contains Gluten",
			"Contains Dairy",
			"Creamy",
			"Contains Mushrooms",
		],
	},
	{
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
		specifications: [
			"Contains Gluten",
			"Contains Dairy",
			"Contains Chicken",
			"Smoky BBQ",
			"Size: 12 inch",
		],
	},
	{
		categoryId: 1,
		title: "Truffle Mushroom Pizza",
		image:
			"https://images.unsplash.com/photo-1604917877934-07d8d248d396?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4.8,
		description: "White pizza with wild mushrooms and aromatic truffle oil.",
		details:
			"A sophisticated blend of cremini, shiitake, and oyster mushrooms on a garlic cream base, finished with a drizzle of premium white truffle oil and fresh parsley.",
		price: 19,
		specifications: [
			"Vegetarian",
			"Contains Gluten",
			"Contains Dairy",
			"Contains Truffle Oil",
			"Size: 12 inch",
		],
	},
	{
		categoryId: 1,
		title: "Quattro Formaggi",
		image:
			"https://images.unsplash.com/photo-1655662844300-e59c3d2e7587?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		rating: 4.2,
		description: "Rich blend of four premium Italian cheeses.",
		details:
			"A cheese lover's dream featuring Mozzarella, Gorgonzola, Parmesan, and Fontina melted together on a thin, crispy crust with a hint of rosemary.",
		price: 14.5,
		specifications: [
			"Vegetarian",
			"Contains Gluten",
			"Contains Dairy",
			"4 Cheese Blend",
			"Size: 12 inch",
		],
	},
];

const extrasItemsData = [
	{
		title: "Pepsi",
		price: 3,
		image:
			"https://images.unsplash.com/photo-1613685009254-d77e6f7377dc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Fries",
		price: 5,
		image:
			"https://images.unsplash.com/photo-1615485290836-4ebcebf44aaf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Sauce",
		price: 1,
		image:
			"https://images.unsplash.com/photo-1656269438626-9e900263bc64?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Onion Rings",
		price: 6,
		image:
			"https://images.unsplash.com/photo-1767469576632-ccabc373871f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T25pb24lMjBSaW5ncyUyMHdpdGglMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
	},
	{
		title: "Chicken Wings",
		price: 10,
		image:
			"https://images.unsplash.com/photo-1624153064067-566cae78993d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Side Salad",
		price: 5,
		image:
			"https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

async function main() {
	await prisma.categories.createMany({
		data: categoriesData,
		skipDuplicates: true,
	});

	await prisma.foodItems.createMany({
		data: foodItemsData,
		skipDuplicates: true,
	});

	await prisma.extraItems.createMany({
		data: extrasItemsData,
		skipDuplicates: true,
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
