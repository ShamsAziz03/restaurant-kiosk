import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/customComponents/addToCartButton";
import RatingComponent from "@/components/customComponents/ratingComponent";
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

							<div className="flex gap-2 items-center">
								<RatingComponent rating={product.rating} />
								<span className="mt-1 font-bold text-lg">
									({product.rating})
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
								{product.specifications?.map((spec) => (
									<div
										className="flex items-center text-md font-bold"
										key={spec}
									>
										<div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
										{spec}
									</div>
								))}
							</CardContent>
						</Card>

						<div className="flex justify-center items-center bg-gray-200 hover:bg-slate-400 text-black p-3">
							<span className="mr-5 font-bold text-xl">Add To Cart</span>
							<AddToCartButton
								categoryId={product.categoryId}
								description={product.description}
								details={product.details}
								id={product.id}
								image={product.image}
								key={product.id}
								price={product.price}
								rating={product.rating}
								title={product.title}
							/>
						</div>
					</div>
				</div>
			)}

			{!product && <h1>Loading</h1>}
		</div>
	);
}
