"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import AddExtraItemDialog from "./addNewExtraItem";
import EditExtraItemDialog from "./editExtraItemInfoDialog";
import type { ExtraItem } from "./extrasItemsList";

type Props = {
	showExtraItemsDialog: boolean;
	setShowExtraItemsDialog: Dispatch<SetStateAction<boolean>>;
};

async function fetchMenuExtraItems() {
	try {
		const response = await fetch("http://localhost:3000/api/extraItems");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
}
async function deleteExtraItem(
	itemId: number,
	setShowDeleteExtraItem: Dispatch<SetStateAction<ExtraItem | null>>,
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const payload = {
		id: itemId,
	};
	const responseOrder = await fetch("http://localhost:3000/api/extraItems", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Extra Item deleted successfully");
		queryClient.invalidateQueries({ queryKey: ["menuExtraItems"] });
		setShowDeleteExtraItem(null);
	} else {
		alert("Error in deleting Extra Item");
	}
}

const ExtraItemsDialog = (props: Props) => {
	const queryClient = useQueryClient();
	const {
		data: menuExtraItems,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["menuExtraItems"],
		queryFn: fetchMenuExtraItems,
	});

	const [activeExtraItem, setActiveExtraItem] = useState<ExtraItem | null>(
		null,
	);
	const [showAddExtraItemDialog, setShowAddExtraItem] = useState(false);
	const [showDeleteExtraItemDialog, setShowDeleteExtraItem] =
		useState<ExtraItem | null>(null);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowExtraItemsDialog(false);
			}}
			open={!!props.showExtraItemsDialog}
		>
			<DialogContent className="overflow-auto max-h-[90vh] w-[90vw] max-w-5xl">
				<DialogHeader>
					<DialogTitle>Extra Items Management</DialogTitle>
					<DialogDescription>
						Manage extra items like drinks, sides, and sauces
					</DialogDescription>
				</DialogHeader>
				{/* Extra Items Table */}
				<div className="mt-6">
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold mb-4 text-gray-800">
							Extra Items List
						</h3>
						<Button
							className="flex items-center gap-2 font-semibold p-3 text-center text-white bg-gray-800 rounded-[10px] shadow-xl hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
							onClick={() => setShowAddExtraItem(true)}
						>
							<Plus className="w-5 h-5" />
							Add New Extra Item
						</Button>
						<AddExtraItemDialog
							setShowAddExtraItemDialog={setShowAddExtraItem}
							showAddExtraItemDialog={showAddExtraItemDialog}
						/>
					</div>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="bg-gray-50 border-b border-gray-200">
									<TableHead className="w-[80px] pl-6 py-4 text-sm font-semibold text-gray-700">
										ID
									</TableHead>
									<TableHead className="py-4 text-sm font-semibold text-gray-700">
										Image
									</TableHead>
									<TableHead className="py-4 text-sm font-semibold text-gray-700">
										Title
									</TableHead>
									<TableHead className="py-4 text-sm font-semibold text-gray-700">
										Price
									</TableHead>
									<TableHead className="py-4 text-sm font-semibold text-gray-700">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{menuExtraItems?.map((item: ExtraItem) => (
									<TableRow key={item.id}>
										<TableCell className="pl-6 font-semibold text-gray-800">
											{item.id}
										</TableCell>
										<TableCell className="py-4">
											<Avatar className="w-[60px] h-[60px] border border-gray-200">
												<AvatarImage alt={item.title} src={item.image} />
											</Avatar>
										</TableCell>
										<TableCell className="py-4 text-gray-700">
											{item.title}
										</TableCell>
										<TableCell className="py-4 font-semibold text-gray-800">
											${item.price.toFixed(2)}
										</TableCell>
										<TableCell className="py-4">
											<div className="flex items-center gap-3">
												<Button
													className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-200"
													onClick={() => {
														setActiveExtraItem(item);
													}}
												>
													Edit
												</Button>

												<Button
													className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm cursor-pointer hover:bg-red-200"
													onClick={() => setShowDeleteExtraItem(item)}
												>
													Delete
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					{menuExtraItems?.length === 0 && (
						<p className="text-center text-gray-500 py-8">
							No extra items added yet.
						</p>
					)}
				</div>
			</DialogContent>
			<EditExtraItemDialog
				activeExtraItem={activeExtraItem}
				key={activeExtraItem?.id}
				setActiveEditItem={setActiveExtraItem}
			/>
			<Dialog
				onOpenChange={() => setShowDeleteExtraItem(null)}
				open={!!showDeleteExtraItemDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you absolutely sure to delete the
							{` ${showDeleteExtraItemDialog?.title}` || "Extra Item"}?
						</DialogTitle>
						<DialogDescription>
							This action will permanently delete the Extra Item.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								className="rounded-md text-lg"
								onClick={() => setShowDeleteExtraItem(null)}
								variant="outline"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							className="rounded-md text-lg"
							onClick={() =>
								deleteExtraItem(
									showDeleteExtraItemDialog?.id || 0,
									setShowDeleteExtraItem,
									queryClient,
								)
							}
							type="submit"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Dialog>
	);
};

export default ExtraItemsDialog;
