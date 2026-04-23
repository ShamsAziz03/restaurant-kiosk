"use client";
import { useQuery } from "@tanstack/react-query";
import CheckOutItemCard from "./checkOutItemCard";

export type ExtraItem = {
	id: number;
	title: string;
	price: number;
};

const fetchExtras = async () => {
	try {
		const response = await fetch("http://localhost:4000/extrasItems");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
};

const ExtrasItemsList = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["extrasItems"],
		queryFn: fetchExtras,
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return <CheckOutItemCard items={data} />;
};

export default ExtrasItemsList;
