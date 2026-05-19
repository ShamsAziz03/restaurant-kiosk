import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

class EmployeesService {
	async getAllEmployees() {
		return await prisma.members.findMany();
	}

	async deleteEmployee(memberId: number) {
		return await prisma.members.delete({
			where: {
				memberId: memberId,
			},
		});
	}

	async updateEmployeeEmail(email: string, userId: number) {
		try {
			const existingUserWithEmail = await prisma.members.findUnique({
				where: { email: email },
			});

			if (existingUserWithEmail && existingUserWithEmail.memberId !== userId) {
				return { success: false, msg: "Email already used, try another one" };
			}
			const updatedUser = await prisma.members.update({
				where: { memberId: userId },
				data: { email: email },
			});
			if (!updatedUser) {
				return { success: false, msg: "Error in updating Email" };
			}
			return { success: true, msg: "Email updated successfully" };
		} catch (error) {
			console.error("Prisma Error:", error);
			return { success: false, msg: "Database error or user not found" };
		}
	}

	async updateEmployeePhone(phone: string, userId: number) {
		try {
			const updatedUser = await prisma.members.update({
				where: { memberId: userId },
				data: { phone: phone },
			});
			if (!updatedUser) {
				return { success: false, msg: "Error in updating Phone" };
			}
			return { success: true, msg: "Phone updated successfully" };
		} catch (error) {
			console.error("Prisma Error:", error);
			return { success: false, msg: "Database error or user not found" };
		}
	}

	async updateEmployeeName(name: string, userId: number) {
		try {
			const updatedUser = await prisma.members.update({
				where: { memberId: userId },
				data: { fullName: name },
			});
			if (!updatedUser) {
				return { success: false, msg: "Error in updating Full Name" };
			}
			return { success: true, msg: "Full Name updated successfully" };
		} catch (error) {
			console.error("Prisma Error:", error);
			return { success: false, msg: "Database error or user not found" };
		}
	}

	async updatePassword(userId: number, oldPass: string, newPass: string) {
		const user = await prisma.members.findUnique({
			where: { memberId: userId },
		});
		if (!user) {
			return { success: false, msg: "Can't find user" };
		}
		const isValidPass = await bcrypt.compare(oldPass, user.passwordHash);
		if (!isValidPass)
			return { success: false, msg: "The current password not correct" };

		const newUser = await prisma.members.update({
			where: { memberId: userId },
			data: {
				passwordHash: newPass,
			},
		});
		if (!newUser) return { success: false, msg: "Error in updating password" };
		return { success: true, msg: "Password Updated" };
	}
}
export const employeesService = new EmployeesService();
