import { authService } from "../../../../../services/auth/authService";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const result = await authService.checkUserExist(body.email, body.pass);
	if (result) {
		return new Response(JSON.stringify({ ok: true, user: result }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} else {
		return new Response(JSON.stringify({ ok: false }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}
}
