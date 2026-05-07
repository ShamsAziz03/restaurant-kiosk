"use client";
import { useMemo, useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AddToCartButton from "./addToCartButton";
import DetailsDialog from "./detailsDialog";

export default function CategoriesClient({
	foodItems,
}: {
	foodItems: FoodItem[];
}) {
	const [activeId, setActiveId] = useState<null | number>(null);
	const [selecedtFilter, setSelectedFilter] = useState("");

	const items = useMemo(() => {
		if (!selecedtFilter) return foodItems;
		if (selecedtFilter === "priceHL") {
			return [...foodItems].sort((a, b) => b.price - a.price);
		} else if (selecedtFilter === "priceLH") {
			return [...foodItems].sort((a, b) => a.price - b.price);
		}
	}, [selecedtFilter, foodItems]);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex justify-end mt-3 mr-3">
				<p className="font-bold text-lg mr-2">Sort: </p>
				<div className="w-[30%]">
					<Select
						onValueChange={(val) => setSelectedFilter(val)}
						value={selecedtFilter}
					>
						<SelectTrigger className="font-bold border-2 border-gray-700 text-md bg-white">
							<SelectValue placeholder="Choose ..." />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="priceHL">Price - High to Low</SelectItem>
							<SelectItem value="priceLH">Price - Low to High</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 pt-5 justify-items-center">
				{!!items &&
					items?.map((item) => (
						<Card
							className="relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px] border-gray-300 border-2"
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
								<button
									className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
									onClick={() => setActiveId(item.id)}
									type="button"
								>
									View Details
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
			</div>
		</div>
	);
}
