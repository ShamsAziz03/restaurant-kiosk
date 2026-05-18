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
}
export const employeesService = new EmployeesService();
