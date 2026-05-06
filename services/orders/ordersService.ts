import type { CartItem } from "@/components/customComponents/cart";
import prisma from "@/lib/prisma";
import type { ExtrasItem, typeOfOrder } from "@/source/cartStore";

export type Order = {
	items: CartItem[];
	typeOfOrder: typeOfOrder;
	extraItems: ExtrasItem[];
	specialInstructions: string;
};

class OrdersService {
	async addNewOrder(order: Order) {
		try {
			const { id } = await prisma.orders.create({
				data: {
					typeOfOrder: order.typeOfOrder,
					specialInstructions: order.specialInstructions,
				},
			});

			//now insert extra items in orderExtra table
			await prisma.orderExtraItem.createMany({
				data: order.extraItems.map((item) => ({
					orderId: id,
					itemId: item.id,
					quantity: item.qnt,
				})),
				skipDuplicates: true,
			});

			//now insert  items in order items table
			await prisma.orderItem.createMany({
				data: order.items.map((item) => ({
					orderId: id,
					itemId: item.id,
					quantity: item.qnt,
				})),
				skipDuplicates: true,
			});

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
}
export const ordersService = new OrdersService();
