import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type FoodItem = {
	id: number;
	categoryId: number;
	title: string;
	image: string;
	rating: number;
	description: string;
	details: string;
	price: number;
};

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function getFood(categoryId: string): Promise<FoodItem[]> {
	const response = await fetch(
		`http://localhost:4000/foodItems?categoryId=${categoryId}`,
	);
	const result = await response.json();
	return result;
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
			<div className="grid grid-cols-3 gap-8 p-10 m-5">
				{foodItems.length > 0 &&
					foodItems?.map((item) => (
						<Card
							className="relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px]"
							key={item.id}
						>
							<CardHeader className="flex flex-col gap-3 justify-center items-center">
								<Avatar className="w-[150px] h-[150px] border-2 border-gray-100 bg-slate-100 flex justify-center items-center">
									<AvatarImage alt={item.description} src={item.image} />
									<AvatarFallback>
										{item.description.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<CardTitle className="text-2xl">{item.title}</CardTitle>
								<CardDescription className="text-sm">
									{item.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="font-bold text-green-400 text-2xl mb-2">
									{item.price} $
								</p>
							</CardContent>
							<CardFooter className="flex justify-center items-center gap-3">
								<Link
									className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
									href={`/items?itemId=${item.id}`}
								>
									<button type="button">View Details</button>
								</Link>

								<Button className="border-2 border-black rounded-lg">
									<ShoppingCart />
								</Button>
							</CardFooter>
						</Card>
					))}
				{foodItems.length === 0 && <p>No Items to Show</p>}
			</div>
		</main>
	);
}
