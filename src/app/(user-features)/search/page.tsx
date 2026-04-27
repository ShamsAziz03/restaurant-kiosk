"use client";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddToCartButton from "@/components/customComponents/addToCartButton";
import DetailsDialogSearch from "@/components/customComponents/detailsDialogSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { FoodItem } from "../categories/page";

const fetchItems = async () => {
	try {
		const response = await fetch("http://localhost:4000/foodItems");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
};

const SearchPage = () => {
	const [query, setQuery] = useState("");
	const [activeItem, setActiveItem] = useState<null | FoodItem>(null);
	const rowsPerPage = 3;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(rowsPerPage);

	const {
		data: items,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["items"],
		queryFn: fetchItems,
	});

	const filteredData = useMemo(() => {
		if (!query) return items;
		const fuse = new Fuse(items, {
			keys: ["title", "description", "price", "specifications"],
			threshold: 0.4,
		});
		const results = fuse.search(query);
		const filteredData = results.map((result) => result.item);
		return filteredData;
	}, [items, query]);

	if (isLoading) return <div>Loading Items...</div>;
	if (error) return <div>Error in fetching items: {error.message}</div>;
	return (
		<div className="p-6 max-w-6xl mx-auto">
			<div className="flex gap-4 w-[100%]">
				<Link
					className="flex items-center gap-2 p-1 bg-gray-700 text-white font-bold h-12 rounded-lg"
					href="/categories?categoryId=1"
				>
					<ArrowLeft size={20} />
					Go Back
				</Link>
				<div className="relative mb-8 flex-1">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
						size={18}
					/>
					<Input
						className="pl-10 h-12 text-md border-gray-300"
						onChange={(event) => {
							setQuery(event.target.value.trim());
						}}
						placeholder="Search for food..."
						value={query}
					/>
				</div>
			</div>

			<p className="text-gray-500 text-sm mb-4">
				{filteredData?.length} items found
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredData?.slice(startIndex, endIndex).map((item: FoodItem) => (
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
								onClick={() => setActiveItem(item)}
								type="button"
							>
								View Details
							</button>

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
			</div>

			<DetailsDialogSearch
				activeItem={activeItem}
				setActiveItem={setActiveItem}
			/>

			<Pagination>
				<PaginationContent className="w-[100%] flex justify-center items-center gap-5 mt-5">
					<PaginationItem>
						<PaginationPrevious
							className={`${
								startIndex === 0 ? "pointer-events-none opacity-50" : undefined
							} p-3 rounded-md text-black font-bold`}
							onClick={() => {
								setStartIndex(startIndex - rowsPerPage);
								setEndIndex(endIndex - rowsPerPage);
							}}
							size={15}
						/>
					</PaginationItem>

					<PaginationItem>
						<PaginationNext
							className={`${
								endIndex >= filteredData.length
									? "pointer-events-none opacity-50"
									: undefined
							} p-3 rounded-md text-black font-bold`}
							onClick={() => {
								setStartIndex(startIndex + rowsPerPage);
								setEndIndex(endIndex + rowsPerPage);
							}}
							size={15}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			{filteredData?.length === 0 && (
				<div className="text-center text-gray-400 mt-20">
					<p className="text-lg font-medium">No items found for "{query}"</p>
				</div>
			)}
		</div>
	);
};

export default SearchPage;
