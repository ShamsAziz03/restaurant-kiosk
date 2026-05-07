import prisma from "@/lib/prisma";

class ItemsService {
	async getItemsByCategoryId(categoryId: number) {
		return await prisma.foodItems.findMany({
			where: {
				categoryId: categoryId,
			},
		});
	}

	async getAllItems() {
		return await prisma.foodItems.findMany();
	}

	async getAllExtraItems() {
		return await prisma.extraItems.findMany();
	}
}
export const itemsService = new ItemsService();
