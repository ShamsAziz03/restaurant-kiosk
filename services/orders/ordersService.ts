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

	async getTotalOrders() {
		try {
			const totalCount = await prisma.orders.count();
			return totalCount;
		} catch {
			return null;
		}
	}

	async getOrdersRevenue() {
		try {
			const aggregations = await prisma.orders.aggregate({
				_sum: { totalPrice: true },
				where: {
					orderStatus: { in: ["completed", "inProgress"] },
				},
			});
			return aggregations._sum.totalPrice;
		} catch {
			return null;
		}
	}

	async getOrdersNumberByStatus() {
		try {
			const ordersNum = await prisma.orders.groupBy({
				by: ["orderStatus"],
				_count: {
					_all: true,
				},
			});
			const result = ordersNum.map((order) => ({
				status: order.orderStatus,
				count: order._count._all,
			}));
			return result;
		} catch {
			return null;
		}
	}

	async getOrdersNumberByType() {
		try {
			const ordersNum = await prisma.orders.groupBy({
				by: ["typeOfOrder"],
				_count: {
					_all: true,
				},
			});
			const result = ordersNum.map((order) => ({
				typeOfOrder: order.typeOfOrder,
				count: order._count._all,
			}));
			return result;
		} catch {
			return null;
		}
	}

	async getRecentOrders() {
		try {
			const orders = await prisma.orders.findMany({
				take: 5,
				orderBy: {
					createdAt: "desc",
				},
			});
			return orders;
		} catch {
			return null;
		}
	}

	async getOrdersCurrentYear() {
		const currentYear = new Date().getFullYear();
		const orders2026 = await prisma.orders.findMany({
			where: {
				createdAt: {
					gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
					lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
				},
				AND: {
					orderStatus: { in: ["completed", "inProgress"] },
				},
			},
			select: { createdAt: true, totalPrice: true },
		});
		return orders2026;
	}

	async getRevenueByMonth() {
		const orders2026 = await this.getOrdersCurrentYear();
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const result = months.map((month, index) => ({
			month: month,
			value:
				orders2026.reduce((acc, order) => {
					if (order.createdAt.getMonth() === index)
						acc = acc + order.totalPrice;
					return acc;
				}, 0) ?? 0,
		}));
		return result;
	}

	async getOrdersByMonth() {
		const orders2026 = await this.getOrdersCurrentYear();
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const result = months.map((month, index) => ({
			month: month,
			value:
				orders2026.reduce((acc, order) => {
					if (order.createdAt.getMonth() === index) acc = acc + 1;
					return acc;
				}, 0) ?? 0,
		}));
		return result;
	}

	async getOrdersWithItems() {
		try {
			const orders = await prisma.orders.findMany({
				include: {
					orderItems: {
						select: {
							id: true,
							quantity: true,
							item: {
								select: { title: true },
							},
						},
					},
					orderExtraItems: {
						select: {
							id: true,
							quantity: true,
							extraItem: {
								select: { title: true },
							},
						},
					},
				},
				take: 500,
				orderBy: {
					createdAt: "desc",
				},
			});
			return orders;
		} catch {
			return null;
		}
	}

	async getOrders() {
		const orders = await this.getOrdersWithItems();
		const result = orders?.map((order) => ({
			...order,
			orderItems: order.orderItems.map((orderItem) => ({
				orderItemId: orderItem.id,
				quantity: orderItem.quantity,
				itemName: orderItem.item.title,
			})),
			orderExtraItems: order.orderExtraItems.map((orderItem) => ({
				orderItemId: orderItem.id,
				quantity: orderItem.quantity,
				itemName: orderItem.extraItem.title,
			})),
		}));
		return result;
	}

	async updateOrderStatus(
		orderId: number,
		status: "inProgress" | "completed" | "cancelled",
	) {
		const newOrder = await prisma.orders.update({
			where: { id: orderId },
			data: { orderStatus: status },
		});
		if (!newOrder)
			return { success: false, msg: "Error in updating order status" };
		return { success: true, msg: "Update order status success!" };
	}
}
export const ordersService = new OrdersService();
