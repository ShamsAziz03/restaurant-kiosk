"use client";
import type { Dispatch, SetStateAction } from "react";
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

const AddCategoryDialog = (props: Props) => {
	const [file, setFile] = useState<string | undefined>(undefined);
	async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) setFile(URL.createObjectURL(selectedFile));
	}
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
						e.preventDefault(); // Stop page reload
						if (!file) return;
					}}
				>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								<Field>
									{file && (
										<div className="flex justify-center items-center">
											<Avatar className="w-[150px] h-[150px] border-2 border-gray-100 bg-slate-100">
												<AvatarImage alt="Category Image" src={file} />
											</Avatar>
										</div>
									)}
									<FieldLabel htmlFor="categoryName">
										Name Of Category
									</FieldLabel>
									<Input
										id="categoryName"
										placeholder="Ex: Pizza, Burger, ...etc"
										required
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor="imageUrl">Upload Image</FieldLabel>
									{/* <Input id="imageUrl" placeholder="https://splash.com" /> */}
									<Input
										accept="image/*"
										id="imageUrl"
										onChange={handleUpload}
										placeholder="https://splash.com"
										type="file"
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor="imageUrlFromInternet">
										Image URL from Internet
									</FieldLabel>
									<Input
										id="imageUrlFromInternet"
										onChange={(e) => setFile(e.target.value)}
										placeholder="https://splash.com"
										required
									/>
								</Field>
							</FieldGroup>
						</FieldSet>
						<FieldSeparator />

						<Field orientation="horizontal">
							<Button type="submit">Submit</Button>
							<Button
								onClick={() => {
									props.setShowAddCategoryDialog(false);
								}}
								type="button"
								variant="outline"
							>
								Cancel
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddCategoryDialog;
