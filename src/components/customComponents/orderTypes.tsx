"use client";
import { type LucideProps, ShoppingBag, Utensils } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/source/cartStore";

type myCard = {
	id: string;
	type: "takeAway" | "dineIn";
	title: "Take Away" | "Dine In";
	description: string;
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
	>;
};

const cardInfo: myCard[] = [
	{
		id: "1",
		type: "takeAway",
		title: "Take Away",
		description: "Order ahead and pick up at the counter",
		icon: Utensils,
	},
	{
		id: "2",
		type: "dineIn",
		title: "Dine In",
		description: "Select items from menu and enjoy your meal here",
		icon: ShoppingBag,
	},
];

const OrderTypes = () => {
	const [type, setType] = useState<"takeAway" | "dineIn">("takeAway");
	const setTypeOfOrder = useCartStore((state) => state.setTypeofOrder);

	useEffect(() => {
		setTypeOfOrder(type);
	}, [type, setTypeOfOrder]);

	return (
		<div className="w-[100%] flex gap-10">
			{cardInfo.map((card) => {
				const isSelected = type === card.type;

				return (
					<button
						className="w-1/2"
						key={card.id}
						onClick={() => setType(card.type)}
						type="button"
					>
						<Card
							className={`flex h-[200px] flex-col items-center justify-center border-2
                ${
									isSelected
										? "border-black bg-white"
										: "border-gray-400 bg-gray-400 opacity-80"
								}`}
						>
							<CardHeader className="pb-2">
								<card.icon
									className={isSelected ? "text-black" : "text-gray-500"}
									size={40}
								/>
							</CardHeader>

							<CardContent className="text-center">
								<CardTitle className="text-xl mb-1">{card.title}</CardTitle>
								<p className="text-sm text-gray-600">{card.description}</p>
							</CardContent>
						</Card>
					</button>
				);
			})}
		</div>
	);
};

export default OrderTypes;
