import type { ItemInfo } from "@/components/customComponents/editItemInfo";
import prisma from "@/lib/prisma";

type Data = {
	categoryId: number;
	price: number;
	title: string;
	description: string;
	details: string;
	rating: number;
	image: string;
	specifications: string[];
};
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

	async addNewItem(item: Data) {
		return await prisma.foodItems.create({
			data: {
				categoryId: item.categoryId,
				title: item.title,
				image: item.image,
				description: item.description,
				details: item.details,
				rating: item.rating,
				price: item.price,
				specifications: item.specifications,
			},
		});
	}

	async deleteItem(itemId: number) {
		return await prisma.foodItems.delete({
			where: {
				id: itemId,
			},
		});
	}

	async updateItem(data: ItemInfo) {
		return await prisma.foodItems.update({
			where: {
				id: data.id,
			},
			data: {
				categoryId: data.categoryId,
				title: data.title,
				image: data.image,
				description: data.description,
				details: data.details,
				rating: data.rating,
				price: data.price,
				specifications: data.specifications,
			},
		});
	}
}
export const itemsService = new ItemsService();
