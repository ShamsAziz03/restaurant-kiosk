import type { NextRequest } from "next/server";
import { employeesService } from "../../../../../services/employees/employeesService";

export async function PUT(request: NextRequest) {
	const field = request.nextUrl.searchParams.get("field");

	if (field === "email") {
		const body = await request.json();
		const result = await employeesService.updateEmployeeEmail(
			body.email,
			body.userId,
		);
		if (result.success) {
			return new Response(JSON.stringify({ success: true, msg: result.msg }), {
				status: 201,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify({ success: false, msg: result.msg }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	} else if (field === "phone") {
		const body = await request.json();
		const result = await employeesService.updateEmployeePhone(
			body.phone,
			body.userId,
		);
		if (result.success) {
			return new Response(JSON.stringify({ success: true, msg: result.msg }), {
				status: 201,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify({ success: false, msg: result.msg }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	} else if (field === "name") {
		const body = await request.json();
		const result = await employeesService.updateEmployeeName(
			body.name,
			body.userId,
		);
		if (result.success) {
			return new Response(JSON.stringify({ success: true, msg: result.msg }), {
				status: 201,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify({ success: false, msg: result.msg }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	} else if (field === "password") {
		const body = await request.json();
		const result = await employeesService.updatePassword(
			body.userId,
			body.oldPassword,
			body.newPassword,
		);
		if (result.success) {
			return new Response(JSON.stringify({ success: true, msg: result.msg }), {
				status: 201,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			return new Response(JSON.stringify({ success: false, msg: result.msg }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			});
		}
	}
}
