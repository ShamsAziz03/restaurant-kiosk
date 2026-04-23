"use client";
import { useEffect, useState } from "react";
import CheckOutItemCard from "./checkOutItemCard";

export type ExtraItem = {
	id: number;
	title: string;
	price: number;
};

const ExtrasItemsList = () => {
	const [items, setItems] = useState<ExtraItem[]>([]);

	useEffect(() => {
		const fetchExtras = async () => {
			try {
				const response = await fetch("http://localhost:4000/extrasItems");
				const data = await response.json();
				setItems(data);
			} catch (error) {
				console.error("Failed to fetch extras:", error);
			}
		};
		fetchExtras();
	}, []);

	return <CheckOutItemCard items={items} />;
};

export default ExtrasItemsList;
