"use client";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useState } from "react";
import type { Categories } from "@/app/(user-features)/categories/layout";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type ItemInfo = {
	id: number;
	categoryId: number;
	price: number;
	title: string;
	description: string;
	details: string;
	rating: number;
	image: string;
	specifications: string[];
};

type Props = {
	showEditItemDialog: boolean;
	setShowEditItemDialog: Dispatch<SetStateAction<boolean>>;
	categories: Categories[];
	item: FoodItem;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	formData: ItemInfo,
	setShowEditItemDialog: () => void,
	queryClient: ReturnType<typeof useQueryClient>,
) {
	e.preventDefault();

	const responseOrder = await fetch("http://localhost:3000/api/items", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Item updated successfully");
		queryClient.invalidateQueries({ queryKey: ["restuarentItems"] });
		setShowEditItemDialog();
	} else {
		alert("Error in updating Item");
	}
}

const EditItemDialog = (props: Props) => {
	const queryClient = useQueryClient();
	const specifications = (props.item.specifications as string[]) ?? [];
	const [formData, setFormData] = useState<ItemInfo>({
		id: props.item.id ?? 1,
		categoryId: props.item.categoryId ?? 1,
		title: props.item.title ?? "",
		image: props.item.image ?? "",
		rating: props.item.rating ?? 1,
		description: props.item.description ?? "",
		details: props.item.details ?? "",
		price: props.item.price ?? 1,
		specifications: specifications,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowEditItemDialog(false);
			}}
			open={!!props.showEditItemDialog}
		>
			<DialogContent className="overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Edit Item Info</DialogTitle>
					<DialogDescription>Details about Item</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							formData,
							() => props.setShowEditItemDialog(false),
							queryClient,
						)
					}
				>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								<Field>
									{formData.image && (
										<div className="flex justify-center items-center">
											<Avatar className="w-[150px] h-[150px] border-2 border-gray-100 bg-slate-100">
												<AvatarImage alt="Item Image" src={formData.image} />
											</Avatar>
										</div>
									)}
								</Field>

								{/* Category Select */}
								<Field>
									<FieldLabel htmlFor="categoryId">Category *</FieldLabel>
									<Select
										onValueChange={(value) =>
											setFormData((prev) => ({
												...prev,
												categoryId: parseInt(value, 10),
											}))
										}
										value={formData.categoryId.toString()}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											{props.categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id.toString()}
												>
													{category.value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</Field>

								{/* Title */}
								<Field>
									<FieldLabel htmlFor="title">Item Name *</FieldLabel>
									<Input
										id="title"
										onChange={handleInputChange}
										placeholder="Ex: BBQ Pizza, Classic Burger"
										required
										value={formData.title}
									/>
								</Field>

								{/* Description */}
								<Field>
									<FieldLabel htmlFor="description">Description *</FieldLabel>
									<Input
										id="description"
										onChange={handleInputChange}
										placeholder="Brief description of the item"
										required
										value={formData.description}
									/>
								</Field>

								{/* Details */}
								<Field>
									<FieldLabel htmlFor="details">Details *</FieldLabel>
									<Input
										id="details"
										onChange={handleInputChange}
										placeholder="More details about the item"
										required
										value={formData.details}
									/>
								</Field>

								{/* Price */}
								<Field>
									<FieldLabel htmlFor="price">Price *</FieldLabel>
									<Input
										id="price"
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												price: parseFloat(e.target.value) || 0,
											}))
										}
										placeholder="0.00"
										required
										step="0.01"
										type="number"
										value={formData.price}
									/>
								</Field>

								{/* Upload Image */}
								<Field>
									<FieldLabel htmlFor="imageUrl">Upload Image</FieldLabel>
									<Input
										accept="image/*"
										id="imageUrl"
										onChange={(e) => {
											const selectedFile = e.target.files?.[0];
											if (selectedFile) {
												const objectUrl = URL.createObjectURL(selectedFile);
												setFormData((prev) => ({
													...prev,
													image: objectUrl,
												}));
											}
										}}
										type="file"
									/>
								</Field>

								{/* Image URL */}
								<Field>
									<FieldLabel htmlFor="image">Or paste Image URL</FieldLabel>
									<Input
										id="image"
										onChange={handleInputChange}
										placeholder="https://example.com/image.jpg"
										value={formData.image}
									/>
								</Field>

								{/* Specifications */}
								<Field>
									<FieldLabel htmlFor="specifications">
										Specifications (comma-separated)
									</FieldLabel>
									<Input
										id="specifications"
										onChange={(e) => {
											const specs = e.target.value
												.split(",")
												.map((spec) => spec.trim());
											setFormData((prev) => ({
												...prev,
												specifications: specs,
											}));
										}}
										placeholder="200g Beef Patty, Contains Gluten, Contains Dairy, Grilled"
										value={formData.specifications.join(", ")}
									/>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />
						<Field orientation="horizontal">
							<Button type="submit">Submit</Button>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EditItemDialog;
