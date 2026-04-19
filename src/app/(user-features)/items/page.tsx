import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodItem } from "../categories/page";

async function getItemDetails(itemId: string): Promise<FoodItem> {
	const response = await fetch(`http://localhost:4000/foodItems/${itemId}`);
	const result = await response.json();
	return result;
}

export default async function ProductDetails({
	searchParams,
}: {
	searchParams: Promise<{ itemId?: string }>;
}) {
	const { itemId } = await searchParams;

	const product = (await getItemDetails(itemId || "1")) ?? undefined;

	return (
		<div className="w-[100%] h-[100vh] p-20 bg-slate-50 flex flex-col justiy-center items-center">
			<div className="flex w-[100%] justify-start">
				<Link
					className="font-semibold mb-[20px]"
					href="/categories?categoryId=1"
				>
					<Button variant="link">
						<ChevronLeft />
						<span className="text-lg font-bold">HOME</span>
					</Button>
				</Link>
			</div>
			{product !== undefined && (
				<div className="flex gap-10 w-[100%]">
					<Card className="overflow-auto shadow-lg bg-white w-[50%] flex justify-center items-center">
						<CardContent className="w-[1000%] flex justify-center items-center">
							<Avatar className="w-[80%] h-[80%]">
								<AvatarImage alt={product?.title} src={product?.image} />
								<AvatarFallback className="bg-slate-200 text-2xl font-bold text-slate-500">
									{product?.title?.toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-5">
						<div>
							<div className="flex justify-between items-start">
								<h1 className="text-4xl font-bold tracking-tight text-slate-900">
									{product?.title}
								</h1>
								<p className="text-3xl font-bold text-green-900">
									$ {product?.price}
								</p>
							</div>

							<div className="flex items-center mt-2 space-x-2">
								<div className="flex text-yellow-400">
									<Star
										className={"text-yellow-300"}
										fill={"currentColor"}
										size={18}
									/>
									<Star
										className={"text-yellow-300"}
										fill={"currentColor"}
										size={18}
									/>
									<Star
										className={"text-yellow-300"}
										fill={"currentColor"}
										size={18}
									/>
									<Star
										className={"text-yellow-300"}
										fill={"currentColor"}
										size={18}
									/>
									<Star
										className={"text-yellow-300"}
										fill={"currentColor"}
										size={18}
									/>
								</div>
								<span className="text-sm font-medium text-slate-600">
									({product?.rating})
								</span>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold border-b pb-2">
								Product Description
							</h3>
							<p className="text-slate-600 leading-relaxed italic">
								"{product?.description}"
							</p>
							<p className="text-slate-700">{product?.details}</p>
						</div>

						{/* Features / Specs Section based on your image style */}
						<Card className="border-slate-200">
							<CardHeader className="py-3 px-4 bg-slate-50 border-b">
								<CardTitle className="text-sm font-bold uppercase tracking-wider">
									Specifications
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4 space-y-2">
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
									<span className="font-medium mr-2 text-slate-500">
										Freshness:
									</span>
									Organic Ingredients
								</div>
								<div className="flex items-center text-sm">
									<div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
									<span className="font-medium mr-2 text-slate-500">Prep:</span>
									Hand-Stretched Dough
								</div>
							</CardContent>
						</Card>

						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							<Button
								className="flex-1 bg-black hover:bg-slate-800 text-white py-6 text-lg"
								size="lg"
							>
								Add To Cart
								<span className="ml-3">
									<ShoppingCart />
								</span>
							</Button>
						</div>
					</div>
				</div>
			)}

			{!product && <h1>Loading</h1>}
		</div>
	);
}
