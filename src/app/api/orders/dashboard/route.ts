import { ordersService } from "../../../../../services/orders/ordersService";

export async function GET() {
	const totalOrders = await ordersService.getTotalOrders();
	const ordersRevenue = await ordersService.getOrdersRevenue();
	const ordersNumberByStatus = await ordersService.getOrdersNumberByStatus();
	const ordersNumberByType = await ordersService.getOrdersNumberByType();
	const recentOrders = await ordersService.getRecentOrders();
	const ordersByMonth = await ordersService.getOrdersByMonth();
	const revenueByMonth = await ordersService.getRevenueByMonth();

	if (
		!totalOrders ||
		!ordersNumberByStatus ||
		!ordersNumberByType ||
		!ordersRevenue ||
		!recentOrders ||
		!ordersByMonth ||
		!revenueByMonth
	) {
		return new Response(
			JSON.stringify({ success: false, msg: "error in getting info" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}

	const result = {
		totalOrders: totalOrders,
		ordersRevenue: ordersRevenue,
		ordersNumberByType: ordersNumberByType,
		ordersNumberByStatus: ordersNumberByStatus,
		recentOrders: recentOrders,
		ordersByMonth: ordersByMonth,
		revenueByMonth: revenueByMonth,
	};

	return new Response(JSON.stringify({ success: true, result: result }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
