import prisma from "@/lib/prisma";

class CategoriesService {
	async getAllCategories() {
		return await prisma.categories.findMany();
	}
}
export const categoriesService = new CategoriesService();
