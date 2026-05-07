import { itemsService } from "../../../../services/items/itemsService";

export async function GET() {
	const result = await itemsService.getAllExtraItems();
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
