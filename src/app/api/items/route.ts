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
