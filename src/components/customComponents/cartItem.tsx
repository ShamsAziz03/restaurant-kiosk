"use client";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
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
import type { CartItem } from "../../components/customComponents/cart";
import { Button } from "../ui/button";

type CartItemInfo = Omit<CartItem, "categoryId" | "rating" | "details">;

const CartItemComponent = (props: CartItemInfo) => {
	const [openCloseDialog, setOpenCloseDialog] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	const removeFromCart = useCartStore((state) => state.removeItem);
	const changeQntOfItem = useCartStore((state) => state.changeItemQnt);

	function minusQnt() {
		if (props.qnt - 1 === 0) {
			setOpenCloseDialog(true);
		} else changeQntOfItem(props.id, props.qnt - 1);
	}

	function setStates(state: boolean) {
		setDeleteItem(state);
		setOpenCloseDialog(false);
	}

	useEffect(() => {
		if (deleteItem) {
			removeFromCart(props.id);
			setDeleteItem(false);
		}
	}, [deleteItem, props, removeFromCart]);

	return (
		<div className="flex flex-row gap-3 border-b-gray-300 border-b-2 w-[100%] p-3 flex-wrap">
			<Dialog
				onOpenChange={(state) => setOpenCloseDialog(state)}
				open={openCloseDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you absolutely sure to detele the item from cart?
						</DialogTitle>
						<DialogDescription>
							This action will permanently delete the item from cart.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								className="rounded-md text-lg"
								onClick={() => setStates(false)}
								variant="outline"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							className="rounded-md text-lg"
							onClick={() => setStates(true)}
							type="submit"
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Avatar className="w-[65px] h-[65px]">
				<AvatarImage alt={props.description} src={props.image} />
				<AvatarFallback>{props.description.toUpperCase()}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col justify-center items-start w-[50%] gap-2">
				<p className="font-bold">{props.title}</p>
				<p className="font-bold">{props.price} $</p>
			</div>
			<div className="flex justify-start items-center gap-3 w-[10%]">
				<button
					onClick={() => changeQntOfItem(props.id, props.qnt + 1)}
					type="button"
				>
					<CirclePlus size={25} />
				</button>
				<p className="font-bold">{props.qnt}</p>
				<button onClick={() => minusQnt()} type="button">
					<CircleMinus size={25} />
				</button>
			</div>
		</div>
	);
};

export default CartItemComponent;
