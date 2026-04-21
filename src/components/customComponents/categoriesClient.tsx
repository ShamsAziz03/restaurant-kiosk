"use client";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import AddToCartButton from "./addToCartButton";
import DetailsDialog from "./detailsDialog";

export default function CategoriesClient({
	foodItems,
}: {
	foodItems: FoodItem[];
}) {
	const [activeId, setActiveId] = useState<null | number>(null);

	return (
		<>
			{foodItems.length > 0 &&
				foodItems.map((item) => (
					<Card
						className="relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px]"
						key={item.id}
					>
						<CardHeader className="flex flex-col gap-3 justify-center items-center">
							<Avatar className="w-[80%] h-[80%] border-2 border-gray-100 bg-slate-100 flex justify-center items-center">
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
							<button onClick={() => setActiveId(item.id)} type="button">
								<Newspaper size={25} />
							</button>
							<DetailsDialog
								activeId={activeId}
								item={item}
								setactiveId={setActiveId}
							/>
							<AddToCartButton
								categoryId={item.categoryId}
								description={item.description}
								details={item.details}
								id={item.id}
								image={item.image}
								price={item.price}
								rating={item.rating}
								title={item.title}
							/>
						</CardFooter>
					</Card>
				))}
			{foodItems.length === 0 && (
				<h1 className="text-center font-bold">No Items to Show!</h1>
			)}
		</>
	);
}
