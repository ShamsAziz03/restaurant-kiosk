import type { JsonValue } from "@prisma/client/runtime/client";
import { Search } from "lucide-react";
import Link from "next/link";
import CategoriesClient from "@/components/customComponents/categoriesClient";
import prisma from "@/lib/prisma";

export type FoodItem = {
	id: number;
	categoryId: number;
	title: string;
	image: string;
	rating: number;
	description: string;
	details: string;
	price: number;
	specifications?: JsonValue;
};

export default async function Categories({
	searchParams,
}: {
	searchParams: Promise<{ categoryId?: string }>;
}) {
	const { categoryId } = await searchParams;
	const foodItems = await prisma.foodItems.findMany({
		where: {
			categoryId: Number(categoryId) ?? 1,
		},
	});

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
			<CategoriesClient foodItems={foodItems} />
		</main>
	);
}
