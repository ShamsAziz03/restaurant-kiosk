import { CircleMinus, CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CartItem } from "../../components/customComponents/cart";

type CartItemInfo = Omit<CartItem, "categoryId" | "rating" | "details">;

const CartItemComponent = (props: CartItemInfo) => {
	return (
		<div className="flex flex-row gap-3 border-b-gray-300 border-b-2 w-[100%] p-3 flex-wrap">
			<Avatar className="w-[65px] h-[65px]">
				<AvatarImage alt={props.description} src={props.image} />
				<AvatarFallback>{props.description.toUpperCase()}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col justify-center items-start w-[50%] gap-2">
				<p className="font-bold">{props.title}</p>
				<p className="font-bold">{props.price} $</p>
			</div>
			<div className="flex justify-start items-center gap-3 w-[10%]">
				<button type="button">
					<CirclePlus size={25} />
				</button>
				<p className="font-bold">{props.qnt}</p>
				<button type="button">
					<CircleMinus size={25} />
				</button>
			</div>
		</div>
	);
};

export default CartItemComponent;
