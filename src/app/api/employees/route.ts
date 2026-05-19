import { employeesService } from "../../../../services/employees/employeesService";

export async function GET() {
	const result = await employeesService.getAllEmployees();
	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

export async function DELETE(request: Request) {
	const body = await request.json();
	const result = await employeesService.deleteEmployee(body.id);
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
