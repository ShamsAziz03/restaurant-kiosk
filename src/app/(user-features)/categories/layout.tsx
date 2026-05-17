import "../../globals.css";
import Link from "next/link";
import CartComponent from "@/components/customComponents/cart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type Categories = {
	id: number;
	value: string;
	icon: string;
	alt: string;
};
async function getCategories(): Promise<Categories[]> {
	const data = await fetch("http://localhost:3000/api/categories");
	if (!data.ok) {
		throw new Error(`API error: ${data.status}`);
	}
	const result = await data.json();
	return result;
}

export default async function CategoriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const categories = await getCategories();
	return (
		<section className="flex flex-row w-[100%] h-[100%] bg-[url(https://img.freepik.com/free-photo/sandwich-with-sundried-tomato-tasty-snack-concept_185193-109453.jpg?semt=ais_hybrid&w=740&q=80)] bg-cover bg-center">
			{/* cart section */}
			<CartComponent />
			{/* navbar section */}
			<div className="flex flex-col items-center w-[100%] ">
				{categories?.length > 0 && (
					<nav className="flex flex-row gap-20 p-3 justify-center bg-gray-100 w-full border-2 border-b-black overflow-auto">
						{categories?.map((category) => (
							<Link
								href={`/categories?categoryId=${category.id}`}
								key={category.id}
							>
								<div className="flex flex-col gap-2">
									<Avatar className="w-[78px] h-[78px] p-2 border-2 border-primary bg-slate-100">
										<AvatarImage alt={category.alt} src={category.icon} />
										<AvatarFallback>
											{category.alt.toUpperCase()}
										</AvatarFallback>
									</Avatar>

									<Button className="text-xl font-bold" variant="link">
										{category.value}
									</Button>
								</div>
							</Link>
						))}
					</nav>
				)}
				{children}
			</div>
		</section>
	);
}
