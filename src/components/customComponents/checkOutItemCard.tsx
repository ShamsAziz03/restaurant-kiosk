"use client";
import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCartStore } from "@/source/cartStore";
import { Button } from "../ui/button";
import type { CartItem } from "./cart";
import type { ExtraItem } from "./extrasItemsList";

type Props = { items: CartItem[] | ExtraItem[] };

const CheckOutItemCard = (props: Props) => {
	const removeFromCart = useCartStore((state) => state.removeItem);
	const changeQntOfItem = useCartStore((state) => state.changeItemQnt);
	const changeQntOfExtraItem = useCartStore(
		(state) => state.changeExtraItemQnt,
	);
	const extrasItems = useCartStore((state) => state.orderDetails.extraItems);

	const minusQnt = (item: CartItem | ExtraItem) => {
		if ("qnt" in item) {
			if (item.qnt - 1 === 0) {
				removeFromCart(item.id);
			} else changeQntOfItem(item.id, item.qnt - 1);
		} else {
			changeQntOfExtraItem(item, "dec");
		}
	};

	const isExtraItemExist = (itemId: number) => {
		const indexOfItem = extrasItems.findIndex((t) => t.id === itemId);
		if (indexOfItem !== -1) return extrasItems[indexOfItem].qnt;
		return 0;
	};

	return (
		<ScrollArea>
			<div className="flex gap-4 bg-[#eaeaea] p-4 rounded-2xl border border-gray-800">
				{props.items.map((item) => (
					<Card className="bg-[#1c1c1f] text-white shadow-lg" key={item.id}>
						<CardContent className="min-w-[140px] h-full p-2 flex flex-col items-center justify-center gap-3">
							<div className="flex gap-3 items-center">
								<Avatar className="w-[60px] h-[60px]">
									<AvatarImage alt={item.title} src={item.image} />
									<AvatarFallback>{item.title.toUpperCase()}</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-gray-200 text-md">{item.title}</p>
									<p className="font-bold text-lg">{item.price} $</p>
								</div>
							</div>
							<div className="flex items-center justify-between bg-gray-400 rounded-full p-1 w-[90%] mt-auto">
								<Button
									className="rounded-full bg-black text-white font-bold"
									onClick={() => minusQnt(item)}
									size="icon-xs"
								>
									<Minus />
								</Button>

								<span className="text-md font-bold text-black mx-2">
									{"qnt" in item ? item.qnt : isExtraItemExist(item.id)}
								</span>

								<Button
									className="rounded-full bg-black text-white font-bold"
									onClick={() =>
										"qnt" in item
											? changeQntOfItem(item.id, item.qnt + 1)
											: changeQntOfExtraItem(item, "inc")
									}
									size="icon-xs"
								>
									<Plus />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
				{!props.items.length && (
					<h1 className="font-bold text-lg">No items to show !</h1>
				)}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
};

export default CheckOutItemCard;
