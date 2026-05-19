import { ordersService } from "../../../../services/orders/ordersService";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await ordersService.addNewOrder(body);
	if (result) {
		return new Response(JSON.stringify({ ok: true }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ ok: false }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function GET() {
	const result = await ordersService.getOrders();
	if (!result)
		return new Response(
			JSON.stringify({ success: false, msg: "error in getting info" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);

	return new Response(JSON.stringify({ success: true, result: result }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

export async function PUT(request: Request) {
	const body = await request.json();
	const result = await ordersService.updateOrderStatus(
		body.orderId,
		body.orderStatus,
	);
	if (result.success) {
		return new Response(JSON.stringify({ success: true, msg: result.msg }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ success: false, msg: result.msg }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
