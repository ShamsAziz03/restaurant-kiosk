"use server";

import { redirect } from "next/navigation";
import Stripe from "stripe";
import type { Order } from "../../services/orders/ordersService";

export async function createCheckoutSession(orderDetails: Order) {
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing Stripe secret key");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2026-04-22.dahlia",
	});

	// 1. Map Cart Items to Stripe format
	const lineItems = orderDetails.items.map((item) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: item.title,
				images: [item.image],
			},
			unit_amount: Math.round(item.price * 100), // Convert to cents
		},
		quantity: item.qnt,
	}));

	// 2. Map Extra Items to Stripe format
	const extraItems = orderDetails.extraItems.map((extra) => ({
		price_data: {
			currency: "usd",
			product_data: {
				name: `Extra: ${extra.title}`,
				images: [extra.image],
			},
			unit_amount: Math.round(extra.price * 100), // Convert to cents
		},
		quantity: extra.qnt,
	}));

	// Combine both arrays
	const allLineItems = [...lineItems, ...extraItems];

	const encodedOrder = encodeURIComponent(JSON.stringify(orderDetails));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: allLineItems,
		mode: "payment",
		success_url: `${"http://localhost:3000"}/success?orderDetails=${encodedOrder}`,
		cancel_url: `${"http://localhost:3000"}`,
	});

	if (session.url) {
		redirect(session.url);
	}
}
