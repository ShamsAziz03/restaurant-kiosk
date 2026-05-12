import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

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
}
export const authService = new AuthService();
