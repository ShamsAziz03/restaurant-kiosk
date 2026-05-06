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
