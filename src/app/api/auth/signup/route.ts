import { authService } from "../../../../../services/auth/authService";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await authService.addNewAdmin(body);
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
