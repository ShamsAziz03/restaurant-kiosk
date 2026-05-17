"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { Categories } from "@/app/(user-features)/categories/layout";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import EditItemDialog from "@/components/customComponents/editItemInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import DetailsDialogManager from "./detailsDialogManager";

type Props = {
	item: FoodItem;
	activeItem: FoodItem | null;
	setActiveItem: Dispatch<SetStateAction<FoodItem | null>>;
	categories: Categories[];
};

async function deleteItem(
	itemId: number,
	setDeleteItemDialog: Dispatch<SetStateAction<boolean>>,
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const payload = {
		id: itemId,
	};
	const responseOrder = await fetch("http://localhost:3000/api/items", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Item deleted successfully");
		queryClient.invalidateQueries({ queryKey: ["restuarentItems"] });
		setDeleteItemDialog(false);
	} else {
		alert("Error in deleting Item");
	}
}

const ItemCard = (props: Props) => {
	const queryClient = useQueryClient();
	const [deleteItemDialog, setDeleteItemDialog] = useState(false);
	const [activeEditItem, setActiveEditItem] = useState(false);

	return (
		<Card
			className="relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px] border-gray-300 border-2"
			key={props.item.id}
		>
			<CardHeader className="flex flex-col gap-3 justify-center items-center">
				<Avatar className="w-[80%] h-[80%] border-2 border-gray-100 bg-slate-100 flex justify-center items-center">
					<AvatarImage alt={props.item.description} src={props.item.image} />
					<AvatarFallback>
						{props.item.description.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<CardTitle className="text-2xl">{props.item.title}</CardTitle>
				<CardDescription className="text-sm">
					{props.item.description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-bold text-green-400 text-2xl mb-2">
					{props.item.price} $
				</p>
			</CardContent>
			<CardFooter className="flex justify-between items-center gap-3">
				<button
					className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
					onClick={() => props.setActiveItem(props.item)}
					type="button"
				>
					View Details
				</button>

				<DetailsDialogManager
					activeItem={props.activeItem}
					setActiveItem={props.setActiveItem}
				/>

				<div className="flex gap-2">
					<button
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onClick={() => setActiveEditItem(true)}
						type="button"
					>
						<Edit className="w-5 h-5 text-blue-600" />
					</button>
					<EditItemDialog
						categories={props.categories}
						item={props.item}
						setShowEditItemDialog={setActiveEditItem}
						showEditItemDialog={activeEditItem}
					/>
					<button
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						onClick={() => setDeleteItemDialog(true)}
						type="button"
					>
						<Trash2 className="w-5 h-5 text-red-600" />
					</button>
					<Dialog
						onOpenChange={(state) => setDeleteItemDialog(state)}
						open={deleteItemDialog}
					>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									Are you absolutely sure to detele the item?
								</DialogTitle>
								<DialogDescription>
									This action will permanently delete the item.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										className="rounded-md text-lg"
										onClick={() => setDeleteItemDialog(false)}
										variant="outline"
									>
										Cancel
									</Button>
								</DialogClose>
								<Button
									className="rounded-md text-lg"
									onClick={() =>
										deleteItem(props.item.id, setDeleteItemDialog, queryClient)
									}
									type="submit"
								>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ItemCard;
