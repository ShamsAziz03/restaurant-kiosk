"use client";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useState } from "react";
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

type Props = {
	showAddCategoryDialog: boolean;
	setShowAddCategoryDialog: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
	value: string;
	icon: string;
	alt: string;
};

async function handleSubmit(
	e: SubmitEvent<HTMLFormElement>,
	formData: FormData,
	setShowAddCategoryDialog: () => void,
	queryClient: ReturnType<typeof useQueryClient>,
	setFormData: Dispatch<SetStateAction<FormData>>,
) {
	e.preventDefault();
	try {
		const response = await fetch("http://localhost:3000/api/categories", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		if (data.success) {
			alert("Category added successfully!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			setFormData({ value: "", icon: "", alt: "" });
			setShowAddCategoryDialog();
		} else {
			alert("Failed to add category");
		}
	} catch (error) {
		console.error("Failed to add category:", error);
		alert("Error adding category");
	}
}

const AddCategoryDialog = (props: Props) => {
	const queryClient = useQueryClient();

	const [formData, setFormData] = useState<FormData>({
		value: "",
		icon: "",
		alt: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowAddCategoryDialog(false);
			}}
			open={!!props.showAddCategoryDialog}
		>
			<DialogContent className="overflow-auto">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
					<DialogDescription>Details about new category</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						handleSubmit(
							e,
							formData,
							() => props.setShowAddCategoryDialog(false),
							queryClient,
							setFormData,
						);
					}}
				>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								{/* Preview */}
								<Field>
									{formData.icon && (
										<div className="flex justify-center items-center">
											<Avatar className="w-[100px] h-[100px] border-2 border-gray-100 bg-slate-100">
												<AvatarImage
													alt={formData.alt || "Category Image"}
													src={formData.icon}
												/>
											</Avatar>
										</div>
									)}
								</Field>

								{/* Category Name */}
								<Field>
									<FieldLabel htmlFor="categoryName">
										Category Name *
									</FieldLabel>
									<Input
										id="value"
										onChange={handleInputChange}
										placeholder="Ex: Pizza, Burger, Desserts"
										required
										value={formData.value}
									/>
								</Field>

								{/* Alt Text */}
								<Field>
									<FieldLabel htmlFor="alt">Image Alt Text *</FieldLabel>
									<Input
										id="alt"
										onChange={handleInputChange}
										placeholder="Ex: Pizza category icon"
										required
										value={formData.alt}
									/>
								</Field>

								{/* Upload Image */}
								<Field>
									<FieldLabel htmlFor="imageUrl">Upload Image</FieldLabel>
									<Input
										accept="image/*"
										id="icon"
										onChange={(e) => {
											const selectedFile = e.target.files?.[0];
											if (selectedFile) {
												const objectUrl = URL.createObjectURL(selectedFile);
												setFormData((prev) => ({
													...prev,
													icon: objectUrl,
												}));
											}
										}}
										placeholder="Choose image file"
										type="file"
									/>
								</Field>

								{/* Or Image URL */}
								<Field>
									<FieldLabel htmlFor="imageUrlFromInternet">
										Or paste Image URL
									</FieldLabel>
									<Input
										id="icon"
										onChange={handleInputChange}
										placeholder="https://example.com/image.jpg"
										value={formData.icon}
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

export default AddCategoryDialog;
