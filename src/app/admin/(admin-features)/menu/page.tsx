"use client";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import AddCategoryDialog from "@/components/customComponents/addCategoryDialog";
import AddItemDialog from "@/components/customComponents/addNewItem";
import ItemCard from "@/components/customComponents/itemCard";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Categories } from "../../../(user-features)/categories/layout";

async function fetchCategories() {
	try {
		const response = await fetch("http://localhost:3000/api/categories");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
	}
}

const fetchItems = async () => {
	try {
		const response = await fetch(`http://localhost:3000/api/items`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
};

const MenuPage = () => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
	const [showAddItemDialog, setShowAddItemDialog] = useState(false);
	const [activeItem, setActiveItem] = useState<FoodItem | null>(null);
	const rowsPerPage = 6;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(rowsPerPage);

	const {
		data: categories,
		isLoading: categoriesIsLoading,
		error: categoriesError,
	} = useQuery({
		queryKey: ["categories", showAddCategoryDialog],
		queryFn: fetchCategories,
	});

	const {
		data: restuarentItems,
		isLoading: itemsIsLoading,
		error: itmesError,
	} = useQuery({
		queryKey: ["restuarentItems", showAddItemDialog],
		queryFn: fetchItems,
	});

	const items = useMemo(() => {
		if (selectedCategoryId === 0 && searchTerm === "") return restuarentItems;
		else if (selectedCategoryId && !searchTerm)
			return restuarentItems.filter(
				(item: FoodItem) => item.categoryId === selectedCategoryId,
			);
		else {
			const fuse = new Fuse(restuarentItems, {
				keys: ["title", "description", "details", "specifications"],
				threshold: 0.4,
			});
			const results = fuse.search(searchTerm);
			const filteredData = results.map((result) => result.item);
			return filteredData;
		}
	}, [selectedCategoryId, restuarentItems, searchTerm]);

	if (categoriesIsLoading || itemsIsLoading) return <div>Loading Items...</div>;
	if (categoriesError || itmesError)
		return (
			<div>
				Error in fetching items: {(categoriesError || itmesError)?.message}
			</div>
		);
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
						onClick={() => setShowAddItemDialog(true)}
						type="button"
					>
						<Plus className="w-5 h-5" />
						Add New Item
					</button>
					<AddItemDialog
						categories={categories}
						setShowAddItemDialog={setShowAddItemDialog}
						showAddItemDialog={showAddItemDialog}
					/>
				</div>

				{/* Categories */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-4">
						Categories
					</h2>
					<div className="flex flex-wrap gap-3">
						<button
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								selectedCategoryId === 0
									? "bg-gray-800 text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
							onClick={() => setSelectedCategoryId(0)}
							type="button"
						>
							All Items
						</button>
						{categories.map((category: Categories) => (
							<button
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									selectedCategoryId === category.id
										? "bg-gray-800 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
								key={category.id}
								onClick={() => setSelectedCategoryId(category.id)}
								type="button"
							>
								{category.value.toUpperCase()}
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
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-gray-500"
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search menu items..."
							type="text"
							value={searchTerm}
						/>
					</div>
				</div>

				{/* Menu Items Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{items?.slice(startIndex, endIndex).map((item: FoodItem) => (
						<ItemCard
							activeItem={activeItem}
							categories={categories}
							item={item}
							key={item.id}
							setActiveItem={setActiveItem}
						/>
					))}
				</div>
				<Pagination>
					<PaginationContent className="w-[100%] flex justify-center items-center gap-5 mt-5">
						<PaginationItem>
							<PaginationPrevious
								className={`${
									startIndex === 0
										? "pointer-events-none opacity-50"
										: undefined
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
									endIndex >= items?.length
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
			</div>

			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default MenuPage;
