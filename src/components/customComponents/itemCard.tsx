import { Edit, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { FoodItem } from "@/app/(user-features)/categories/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DetailsDialogManager from "./detailsDialogManager";

type Props = {
	item: FoodItem;
	activeItem: FoodItem | null;
	setActiveItem: Dispatch<SetStateAction<FoodItem | null>>;
};

const ItemCard = (props: Props) => {
	return (
		<Card
			className="relative top-0 transition-[top] duration-[350ms] ease-in-out hover:-top-[10px] border-gray-300 border-2"
			key={props.item.id}
		>
			<CardHeader className="flex flex-col gap-3 justify-center items-center">
				<Avatar className="w-[80%] h-[80%] border-2 border-gray-100 bg-slate-100 flex justify-center items-center">
					<AvatarImage alt={props.item.description} src={props.item.image} />
					<AvatarFallback>
						{props.item.description.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<CardTitle className="text-2xl">{props.item.title}</CardTitle>
				<CardDescription className="text-sm">
					{props.item.description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-bold text-green-400 text-2xl mb-2">
					{props.item.price} $
				</p>
			</CardContent>
			<CardFooter className="flex justify-between items-center gap-3">
				<button
					className="text-center text-xl font-semibold text-white bg-gray-800 rounded-[10px] shadow-xl w-[100%] p-1 hover:bg-gray-400 border-2 hover:shadow-2xl hover:text-black"
					onClick={() => props.setActiveItem(props.item)}
					type="button"
				>
					View Details
				</button>

				<DetailsDialogManager
					activeItem={props.activeItem}
					setActiveItem={props.setActiveItem}
				/>

				<div className="flex gap-2">
					<button
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						type="button"
					>
						<Edit className="w-5 h-5 text-blue-600" />
					</button>
					<button
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						type="button"
					>
						<Trash2 className="w-5 h-5 text-red-600" />
					</button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ItemCard;
