import { itemsService } from "../../../../services/items/itemsService";

export async function GET() {
	const result = await itemsService.getAllExtraItems();
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

export async function DELETE(request: Request) {
	const body = await request.json();
	const result = await itemsService.deleteExtraItem(body.id);
	if (result) {
		return new Response(JSON.stringify({ success: true }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await itemsService.addNewExtraItem(body);
	if (result) {
		return new Response(JSON.stringify({ success: true }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function PUT(request: Request) {
	const body = await request.json();
	const result = await itemsService.updateExtraItem(body);
	if (result) {
		return new Response(JSON.stringify({ success: true }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
