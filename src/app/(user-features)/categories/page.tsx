import { Search } from "lucide-react";
import Link from "next/link";
import CategoriesClient from "@/components/customComponents/categoriesClient";

export type FoodItem = {
	id: number;
	categoryId: number;
	title: string;
	image: string;
	rating: number;
	description: string;
	details: string;
	price: number;
	specifications?: string[];
};

async function getFood(categoryId: string): Promise<FoodItem[]> {
	const response = await fetch(
		`http://localhost:4000/foodItems?categoryId=${categoryId}`,
	);
	return response.json();
}

export default async function Categories({
	searchParams,
}: {
	searchParams: Promise<{ categoryId?: string }>;
}) {
	const { categoryId } = await searchParams;
	const foodItems = await getFood(categoryId || "1");

	return (
		<main>
			<div className="mt-3 flex justify-end mr-10 gap-2">
				<Link
					className="p-2 bg-black text-white rounded-lg flex gap-3"
					href="/search"
				>
					<Search
						className="!w-[25px] !h-[25px] shrink-0"
						color="white"
						size={25}
					/>
					<p className="font-bold text-lg">Search</p>
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 pt-5 justify-items-center">
				<CategoriesClient foodItems={foodItems} />
			</div>
		</main>
	);
}
