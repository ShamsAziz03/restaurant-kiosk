import type { NextRequest } from "next/server";
import { itemsService } from "../../../../services/items/itemsService";

export async function GET(req: NextRequest) {
	const categoryId = req.nextUrl.searchParams.get("categoryId");
	const numericId = categoryId ? Number(categoryId) : null;

	if (numericId) {
		const result = await itemsService.getItemsByCategoryId(numericId);
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		const result = await itemsService.getAllItems();
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await itemsService.addNewItem(body);
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

export async function DELETE(request: Request) {
	const body = await request.json();
	const result = await itemsService.deleteItem(body.id);
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
	const result = await itemsService.updateItem(body);
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
