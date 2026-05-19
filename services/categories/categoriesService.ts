import type { FormData } from "@/components/customComponents/addCategoryDialog";
import prisma from "@/lib/prisma";

class CategoriesService {
	async getAllCategories() {
		return await prisma.categories.findMany();
	}
	async addNewItem(item: FormData) {
		return await prisma.categories.create({
			data: {
				alt: item.alt,
				value: item.value,
				icon: item.icon,
			},
		});
	}
}
export const categoriesService = new CategoriesService();
