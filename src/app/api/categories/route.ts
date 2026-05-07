import { categoriesService } from "../../../../services/categories/categoriesService";

export async function GET() {
	const result = await categoriesService.getAllCategories();
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
