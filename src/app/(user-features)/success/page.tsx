"use client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { CartItem } from "@/components/customComponents/cart";
import { Button } from "@/components/ui/button";
import type { ExtrasItem, typeOfOrder } from "@/source/cartStore";

export type Order = {
	items: CartItem[];
	typeOfOrder: typeOfOrder;
	extraItems: ExtrasItem[];
	specialInstructions: string;
};

async function addOrderToDB(order: Order) {
	try {
		const id = crypto.randomUUID();
		const orderData = {
			id: id,
			items: order.items,
			typeOfOrder: order.typeOfOrder,
			extraItems: order.extraItems,
			specialInstructions: order.specialInstructions,
		};
		const responseOrder = await fetch("http://localhost:4000/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(orderData),
		});

		if (responseOrder.ok) {
			alert("Order placed successfully!");
		} else {
			alert("Error Occuered");
		}
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
}

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const orderDataRaw = searchParams.get("orderDetails");
	const hasRun = useRef(false);

	useEffect(() => {
		if (orderDataRaw && !hasRun.current) {
			try {
				hasRun.current = true;

				const decodedOrder = decodeURIComponent(orderDataRaw);
				const orderObj = JSON.parse(decodedOrder);

				addOrderToDB(orderObj);
			} catch (error) {
				console.error("Failed to parse order data:", error);
			}
		}
	}, [orderDataRaw]);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
			<div className="max-w-md w-full text-center">
				<div className="mb-4 flex justify-center">
					<CheckCircle className="h-16 w-16 text-green-500" />
				</div>
				<h1 className="text-3xl font-bold mb-2">Thank You!</h1>
				<p className="text-gray-600 mb-8">Your purchase was successful.</p>
				<Link href="/">
					<Button>Return to Store</Button>
				</Link>
			</div>
		</div>
	);
}
