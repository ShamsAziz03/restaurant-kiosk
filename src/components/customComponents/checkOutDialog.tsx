"use client";
import {
	BaggageClaim,
	CirclePlus,
	MessageSquareText,
	Receipt,
	Trash2,
} from "lucide-react"; // Import for the delete icon
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/source/cartStore";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import CheckOutItemCard from "./checkOutItemCard";
import ExtrasItemsList from "./extrasItemsList";

type CheckoutProps = {
	openCheckOut: boolean;
	setOpenCheckOut: Dispatch<SetStateAction<boolean>>;
};

const CheckOutDialog = (props: CheckoutProps) => {
	const cartItems = useCartStore((state) => state.items);
	const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
	const discount = 2.0;
	const tax = 0.5;
	const totalToPay = subtotal - discount + tax;
	const [specialInstructions, setSpecialInstructions] = useState("");

	return (
		<Dialog
			onOpenChange={(state) => props.setOpenCheckOut(state)}
			open={props.openCheckOut}
		>
			<DialogContent className="!p-0 flex flex-col justify-start items-center max-w-[100%] w-[60%] h-[90vh] overflow-auto">
				<div className="h-[40%] w-[100%] p-10 bg-[url(https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-black/50 bg-blend-overlay">
					<div className="flex justify-between items-center">
						<DialogHeader>
							<h1 className="font-bold text-3xl text-white">Kiosk</h1>
							<DialogTitle className="font-bold text-white text-2xl">
								Check Out Order
							</DialogTitle>
							<DialogDescription className="font-semibold text-lg text-gray-300">
								Confirm Your Order Details
							</DialogDescription>
						</DialogHeader>
						<Avatar className="w-[20%] h-[20%] bg-gray-200">
							<AvatarImage
								alt="cart image"
								src={
									"https://images.unsplash.com/vector-1763382329927-1b1f16b5b5aa?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								}
							/>
							<AvatarFallback>Cart Image</AvatarFallback>
						</Avatar>
					</div>
				</div>

				<div className="flex-1 w-full p-6 space-y-4">
					<div>
						<div className="flex items-center gap-2 mb-4">
							<BaggageClaim className="w-6 h-6 text-black" />
							<h3 className="text-gray-900 font-bold text-xl uppercase">
								Cart Details
							</h3>
						</div>
						<CheckOutItemCard items={cartItems} />
					</div>

					<div>
						<div className="flex items-center gap-2 mb-4">
							<CirclePlus className="w-6 h-6 text-black" />
							<h3 className="text-gray-900 font-bold text-xl uppercase">
								Add-ons
							</h3>
						</div>
						<ExtrasItemsList />
					</div>

					<div>
						<div className="flex items-center gap-2 mb-4 mt-10">
							<MessageSquareText className="w-6 h-6 text-black" />
							<h3 className="text-gray-900 font-bold text-xl uppercase ">
								Special Instructions
							</h3>
						</div>
						<Textarea
							className="bg-[#eaeaea] border-black text-black placeholder:text-gray-900 rounded-xl"
							onChange={(e) => setSpecialInstructions(e.target.value)}
							placeholder="e.g. No onions, extra spicy, etc..."
							value={specialInstructions}
						/>
					</div>

					<div className="pt-6 border-t border-gray-800 space-y-3">
						<div className="flex items-center gap-2 mb-2">
							<Receipt className="w-6 h-6 text-black" />
							<h3 className="text-black font-bold text-xl tracking-widest uppercase">
								Bill Details
							</h3>
						</div>
						<div className="flex justify-between text-black font-bold">
							<span>Total</span>
							<span>${subtotal}</span>
						</div>
						<div className="flex justify-between text-black font-bold">
							<span>Discounts</span>
							<span>-${discount}</span>
						</div>
						<div className="flex justify-between text-black font-bold">
							<span>Tax and fees</span>
							<span>${tax}</span>
						</div>
						<div className="flex justify-between text-black font-bold text-xl pt-2 border-t border-gray-800">
							<span>TO PAY</span>
							<span>${totalToPay > 0 ? totalToPay : "0.00"}</span>
						</div>
					</div>

					<DialogFooter className="flex flex-row items-center gap-3 pb-4 pt-5">
						<Button className="flex-1 bg-[#adadad] text-black font-bold h-14 rounded-2xl flex justify-between px-8 text-lg">
							<span>
								{cartItems.length} ITEMS | ${totalToPay}
							</span>
							<span>CHECKOUT</span>
						</Button>

						<Button
							className="h-14 w-14 rounded-2xl bg-gray-800"
							variant="destructive"
						>
							<Trash2 className="w-6 h-6 text-red-500" />
						</Button>

						<DialogClose asChild>
							<Button
								className="border-gray-600 border-2 text-black font-bold h-14 rounded-2xl"
								variant="outline"
							>
								Cancel
							</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CheckOutDialog;
