"use client";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import AddToCartButton from "@/components/customComponents/addToCartButton";
import RatingComponent from "@/components/customComponents/ratingComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
	item: FoodItem;
	activeId: number | null;
	setactiveId: Dispatch<SetStateAction<number | null>>;
};

const DetailsDialog = (props: Props) => {
	const [openDialog, setOpenDialog] = useState(false);

	const isOpen = props.activeId === props.item.id && !openDialog;
	const specifications = (props.item.specifications as string[]) ?? [];

	return (
		<Dialog
			onOpenChange={(state) => {
				setOpenDialog(state);
				props.setactiveId(null);
			}}
			open={isOpen}
		>
			<DialogContent className="max-w-[90%] w-[80%] h-[90vh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Item Details </DialogTitle>
					<DialogDescription>details about item</DialogDescription>
				</DialogHeader>
				<div className="flex gap-10 w-[100%]">
					<Card className="overflow-auto shadow-lg bg-white w-[50%] flex justify-center items-center">
						<CardContent className="w-[1000%] flex justify-center items-center">
							<Avatar className="w-[80%] h-[80%]">
								<AvatarImage alt={props.item.title} src={props.item.image} />
								<AvatarFallback className="bg-slate-200 text-2xl font-bold text-slate-500">
									{props.item.title?.toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-5">
						<div>
							<div className="flex justify-between items-start">
								<h1 className="text-4xl font-bold tracking-tight text-slate-900">
									{props.item.title}
								</h1>
								<p className="text-3xl font-bold text-green-900">
									$ {props.item.price}
								</p>
							</div>

							<div className="flex gap-2 items-center">
								<RatingComponent rating={props.item.rating} />
								<span className="mt-1 font-bold text-lg">
									({props.item.rating})
								</span>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold border-b pb-2">
								Product Description
							</h3>
							<p className="text-slate-600 leading-relaxed italic">
								"{props.item.description}"
							</p>
							<p className="text-slate-700">{props.item.details}</p>
						</div>

						<Card className="border-slate-200">
							<CardHeader className="py-3 px-4 bg-slate-50 border-b">
								<CardTitle className="text-sm font-bold uppercase tracking-wider">
									Specifications
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4 space-y-2">
								{specifications.map((spec) => (
									<div
										className="flex items-center text-md font-bold"
										key={spec}
									>
										<div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
										{spec}
									</div>
								))}
							</CardContent>
						</Card>

						<div className="flex justify-center items-center text-black">
							<span className="mr-5 font-bold text-2xl">Add To Cart</span>
							<AddToCartButton
								categoryId={props.item.categoryId}
								description={props.item.description}
								details={props.item.details}
								id={props.item.id}
								image={props.item.image}
								key={props.item.id}
								price={props.item.price}
								rating={props.item.rating}
								title={props.item.title}
							/>
						</div>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							className="rounded-md text-lg"
							onClick={() => {
								setOpenDialog(false);
								props.setactiveId(null);
							}}
							variant="outline"
						>
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DetailsDialog;
