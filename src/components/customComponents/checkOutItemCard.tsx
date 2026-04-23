import { Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import type { CartItem } from "./cart";
import type { ExtraItem } from "./extrasItemsList";

type Props = { items: CartItem[] | ExtraItem[] };

const CheckOutItemCard = (props: Props) => {
	return (
		<div className="flex gap-4 overflow-x-auto bg-[#eaeaea] p-4 rounded-2xl border border-gray-800">
			{props.items.map((item) => (
				<Card
					className="min-w-[140px] h-auto bg-[#1c1c1f] text-white shadow-lg"
					key={item.id}
				>
					<CardContent className="p-4 flex flex-col gap-3 items-center">
						<div>
							<p className="text-gray-200 text-md">{item.title}</p>
							<p className="font-bold text-lg">{item.price} $</p>
						</div>

						<div className="flex items-center justify-between bg-gray-400 rounded-full p-1 w-[110px]">
							<Button
								className="rounded-full bg-black text-white font-bold"
								size="icon-xs"
							>
								<Minus />
							</Button>

							<span className="text-md font-bold text-black mx-2">0</span>

							<Button
								className="rounded-full bg-black text-white font-bold"
								size="icon-xs"
							>
								<Plus />
							</Button>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default CheckOutItemCard;
