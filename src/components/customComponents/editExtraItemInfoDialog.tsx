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
import type { ExtraItem } from "./extrasItemsList";

type Props = {
	activeExtraItem: ExtraItem | null;
	setActiveEditItem: Dispatch<SetStateAction<ExtraItem | null>>;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	formData: ExtraItem,
	setActiveEditItem: () => void,
	queryClient: ReturnType<typeof useQueryClient>,
) {
	e.preventDefault();

	const responseOrder = await fetch("http://localhost:3000/api/extraItems", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Extra Item updated successfully");
		queryClient.invalidateQueries({ queryKey: ["menuExtraItems"] });
		setActiveEditItem();
	} else {
		alert("Error in updating Extra Item");
	}
}

const EditExtraItemDialog = (props: Props) => {
	const queryClient = useQueryClient();
	const [formData, setFormData] = useState<ExtraItem>({
		id: props.activeExtraItem?.id ?? 1,
		title: props.activeExtraItem?.title ?? "",
		image: props.activeExtraItem?.image ?? "",
		price: props.activeExtraItem?.price ?? 1,
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
				props.setActiveEditItem(null);
			}}
			open={!!props.activeExtraItem}
		>
			<DialogContent className="overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Edit Extra Item Info</DialogTitle>
					<DialogDescription>Details about Extra Item</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							formData,
							() => props.setActiveEditItem(null),
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

								{/* Title */}
								<Field>
									<FieldLabel htmlFor="title">Item Name *</FieldLabel>
									<Input
										id="title"
										onChange={handleInputChange}
										required
										value={formData.title}
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

export default EditExtraItemDialog;
