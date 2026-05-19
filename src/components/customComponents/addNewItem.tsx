"use client";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useState } from "react";
import type { Categories } from "@/app/(user-features)/categories/layout";
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

type Props = {
	showAddItemDialog: boolean;
	setShowAddItemDialog: Dispatch<SetStateAction<boolean>>;
	categories: Categories[];
};

type FormData = {
	title: string;
	description: string;
	details: string;
	price: string;
	rating: number;
	categoryId: string;
	image: string;
	specifications: string[];
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	formData: FormData,
	setShowAddItemDialog: () => void,
	queryClient: ReturnType<typeof useQueryClient>,
	setFormData: Dispatch<SetStateAction<FormData>>,
) {
	e.preventDefault();

	const payload = {
		...formData,
		categoryId: parseInt(formData.categoryId, 10),
		price: parseFloat(formData.price),
	};

	const responseOrder = await fetch("http://localhost:3000/api/items", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Item added successfully");
		queryClient.invalidateQueries({ queryKey: ["restuarentItems"] });
		setFormData({
			title: "",
			description: "",
			details: "",
			price: "",
			rating: 2,
			categoryId: "",
			image: "",
			specifications: [],
		});
		setShowAddItemDialog();
	} else {
		alert("Error in adding Item");
	}
}

const AddItemDialog = (props: Props) => {
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<FormData>({
		title: "",
		description: "",
		details: "",
		price: "",
		rating: 2,
		categoryId: "",
		image: "",
		specifications: [],
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
				props.setShowAddItemDialog(false);
			}}
			open={!!props.showAddItemDialog}
		>
			<DialogContent className="overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Add New Item</DialogTitle>
					<DialogDescription>Details about new Item</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							formData,
							() => props.setShowAddItemDialog(false),
							queryClient,
							setFormData,
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
												categoryId: value,
											}))
										}
										value={formData.categoryId}
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
										onChange={handleInputChange}
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

export default AddItemDialog;
