import { categoriesService } from "../../../../services/categories/categoriesService";

export async function GET() {
	const result = await categoriesService.getAllCategories();
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await categoriesService.addNewItem(body);
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
