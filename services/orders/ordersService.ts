import type { CartItem } from "@/components/customComponents/cart";
import prisma from "@/lib/prisma";
import type { ExtrasItem, typeOfOrder } from "@/source/cartStore";

export type Order = {
	items: CartItem[];
	typeOfOrder: typeOfOrder;
	extraItems: ExtrasItem[];
	specialInstructions: string;
	totalPrice: number;
};

class OrdersService {
	async addNewOrder(order: Order) {
		try {
			await prisma.orders.create({
				data: {
					typeOfOrder: order.typeOfOrder,
					specialInstructions: order.specialInstructions,
					orderStatus: "inProgress",
					totalPrice: order.totalPrice,
					orderExtraItems: {
						create: order.extraItems.map((item) => ({
							itemId: item.id,
							quantity: item.qnt,
						})),
					},
					orderItems: {
						create: order.items.map((item) => ({
							itemId: item.id,
							quantity: item.qnt,
						})),
					},
				},
			});

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
export const ordersService = new OrdersService();
