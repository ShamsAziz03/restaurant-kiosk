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
	showAddExtraItemDialog: boolean;
	setShowAddExtraItemDialog: Dispatch<SetStateAction<boolean>>;
};

type FormData = {
	title: string;
	price: string;
	image: string;
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
		price: parseFloat(formData.price),
	};

	const responseOrder = await fetch("http://localhost:3000/api/extraItems", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Extra Item added successfully");
		queryClient.invalidateQueries({ queryKey: ["menuExtraItems"] });
		setFormData({
			title: "",
			price: "",
			image: "",
		});
		setShowAddItemDialog();
	} else {
		alert("Error in adding Extra Item");
	}
}

const AddExtraItemDialog = (props: Props) => {
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<FormData>({
		title: "",
		price: "",
		image: "",
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
				props.setShowAddExtraItemDialog(false);
			}}
			open={!!props.showAddExtraItemDialog}
		>
			<DialogContent className="overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Add New Extra Item</DialogTitle>
					<DialogDescription>Details about new Extra Item</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							formData,
							() => props.setShowAddExtraItemDialog(false),
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

								{/* Title */}
								<Field>
									<FieldLabel htmlFor="title">Extra Item Name *</FieldLabel>
									<Input
										id="title"
										onChange={handleInputChange}
										placeholder="Ex: onion Rings"
										required
										value={formData.title}
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

export default AddExtraItemDialog;
