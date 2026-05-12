import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

type Admin = {
	fullName: string;
	email: string;
	password: string;
	phone: string;
};
class AuthService {
	async checkUserExist(email: string, pass: string) {
		const user = await prisma.members.findUnique({
			where: { email: email },
		});
		if (!user) {
			return null;
		}
		const isValidPass = await bcrypt.compare(pass, user.passwordHash);
		if (!isValidPass) return null;
		return user;
	}

	async createPass(pass: string) {
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(pass, salt);
		return hashedPass;
	}

	async addNewAdmin(body: Admin) {
		try {
			//check if email used
			const user = await prisma.members.findUnique({
				where: { email: body.email },
			});
			if (user) {
				return {
					success: false,
					msg: "Email Exist! try another one",
				};
			}
			const hashedPass = await this.createPass(body.password);
			await prisma.members.create({
				data: {
					email: body.email,
					fullName: body.fullName,
					passwordHash: hashedPass,
					phone: body.phone,
					role: "admin",
				},
			});

			return {
				success: true,
				msg: "Admin Added Successfuly",
			};
		} catch (error) {
			return {
				success: false,
				msg:
					error instanceof Error
						? error.message
						: "An unexpected error occurred",
			};
		}
	}
}
export const authService = new AuthService();
