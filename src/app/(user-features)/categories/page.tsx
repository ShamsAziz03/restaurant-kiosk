type Recipe = {
	id: string;
	title: string;
	image: string;
	time: number;
	description: string;
	vegan: boolean;
};

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

async function getRecipes(categoryId: string): Promise<Recipe[]> {
	console.log(categoryId);
	const url = categoryId
		? `http://localhost:4000/recipes?categoryId=${categoryId}`
		: `http://localhost:4000/recipes`;
	const response = await fetch(url, { cache: "no-store" });
	const result = await response.json();
	return result;
}

export default async function Categories({
	searchParams,
}: {
	searchParams: Promise<{ categoryId?: string }>;
}) {
	const { categoryId } = await searchParams;

	const recipes = await getRecipes(categoryId || "1");

	return (
		<main>
			<div className="grid grid-cols-3 gap-8 p-10 m-5 border-black border-2">
				{recipes.length > 0 &&
					recipes?.map((recipe) => (
						<Card key={recipe.id}>
							<CardHeader>
								<CardTitle>{recipe.title}</CardTitle>
								<CardDescription>{recipe.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{recipe.description}</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<button type="button">View Recipe</button>
								{recipe.vegan && <p>Vegan!</p>}
							</CardFooter>
						</Card>
					))}
				{recipes.length === 0 && <p>No Items to Show</p>}
			</div>
		</main>
	);
}
