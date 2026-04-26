"use client";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CartItem } from "@/components/customComponents/cart";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type {
	ExtrasItem,
	TransactionDetails,
	typeOfOrder,
} from "@/source/cartStore";
import { useCartStore, useCartTotal } from "@/source/cartStore";

export type Order = {
	items: CartItem[];
	typeOfOrder: typeOfOrder;
	extraItems: ExtrasItem[];
	specialInstructions: string;
	transactionDetails: TransactionDetails;
};

async function addTransactionToDB(
	transactionDetails: TransactionDetails,
	router: AppRouterInstance,
	clearOrder: () => void,
) {
	try {
		const transactionId = crypto.randomUUID();
		const trasactionData = { id: transactionId, ...transactionDetails };
		const responseTrasaction = await fetch(
			"http://localhost:4000/transactions",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(trasactionData),
			},
		);

		if (responseTrasaction) {
			alert("Order placed successfully!");
			clearOrder();
			router.push("/");
		} else {
			alert("Error Occuered");
		}
	} catch (error) {
		console.error("Failed: ", error);
	}
}

async function addOrderToDB(
	order: Order,
	router: AppRouterInstance,
	clearOrder: () => void,
) {
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
			addTransactionToDB(order.transactionDetails, router, clearOrder);
		} else {
			alert("Error Occuered");
		}
	} catch (error) {
		console.error("Failed to fetch extras:", error);
	}
}

const PaymentPage = () => {
	const orderDetails = useCartStore((state) => state.orderDetails);
	const setTransactionDetail = useCartStore(
		(state) => state.setTransactionDetail,
	);
	const clearOrder = useCartStore((state) => state.clearOrder);
	const { cartSubTotal, tax, extrasTotal, finalTotal } = useCartTotal();
	const years = [
		2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037,
		2038, 2039, 2040,
	];
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const [selectedMonth, setSelectedMonth] = useState("");
	const [selectedYear, setSelectedYear] = useState("");
	const router = useRouter();

	function handleSubmit() {
		if (!selectedMonth || !selectedYear) alert("Select Month and Year");
		else addOrderToDB(orderDetails, router, clearOrder);
	}

	return (
		<div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
			<div className="w-[80%] flex flex-row shadow-2xl rounded-[40px] overflow-hidden border border-gray-100">
				{/* left section */}
				<div className="flex-[1] flex flex-col gap-20 bg-white p-8">
					<h1 className="text-4xl font-bold text-[#423E3C] pt-10">Payment</h1>

					<div className="flex flex-col gap-5">
						<div className="flex justify-between items-center text-xl">
							<span className="text-gray-700 font-medium">Amount:</span>
							<span className="font-bold text-[#1a1c3d]">
								${cartSubTotal.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-between items-center text-xl">
							<span className="text-gray-700 font-medium">Extras:</span>
							<span className="font-bold text-[#1a1c3d]">
								${extrasTotal.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-between items-center text-xl border-b border-gray-700 pb-3">
							<span className="text-gray-700 font-medium">Tax:</span>
							<span className="font-bold text-[#1a1c3d]">
								${tax.toFixed(2)}
							</span>
						</div>

						<div className="flex justify-between items-center pt-2">
							<span className="text-2xl text-gray-900 font-medium">
								Amount to pay:
							</span>
							<span className="text-3xl font-bold text-gray-800">
								${finalTotal.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				{/* right section*/}
				<div className="flex-[1] bg-[#F0F0F0] p-9 border-lg border-gray-100">
					<h2 className="text-3xl font-bold text-[#1a1c3d] mb-12">
						Card Details
					</h2>

					<form
						className="flex flex-col gap-3"
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<FieldGroup>
							<Field>
								<FieldLabel className="text-gray-700 font-normal uppercase text-md">
									Cardholder's Name
								</FieldLabel>
								<Input
									className="font-bold border-t-0 border-x-0 border-b border-gray-400 focus-visible:border-gray-700 text-lg text-[#1a1c3d]"
									id="card-name"
									onChange={(e) =>
										setTransactionDetail("cardholderName", e.target.value)
									}
									placeholder="e.g. Calvin Bowen"
									required
									value={orderDetails.transactionDetails.cardholderName}
								/>
							</Field>

							<Field>
								<FieldLabel className="text-gray-700 font-normal uppercase text-md">
									Card number
								</FieldLabel>
								<div className="relative">
									<Input
										className="font-bold border-t-0 border-x-0 border-b border-gray-400 focus-visible:border-gray-700 text-lg text-[#1a1c3d]"
										id="card-number"
										onChange={(e) =>
											setTransactionDetail("cardNumber", e.target.value)
										}
										placeholder="5352 7372 7726 2241"
										required
										value={orderDetails.transactionDetails.cardNumber}
									/>
								</div>
							</Field>

							<div className="grid grid-cols-2 gap-8">
								<Field>
									<FieldLabel className="text-gray-700 font-normal uppercase text-md">
										Expiry Date
									</FieldLabel>
									<div className="flex gap-2">
										<Select
											onValueChange={(val) => setSelectedMonth(val)}
											value={selectedMonth}
										>
											<SelectTrigger className="font-bold border-t-0 border-x-0 border-b border-gray-700 text-md">
												<SelectValue placeholder="MM" />
											</SelectTrigger>
											<SelectContent>
												{months.map((month) => (
													<SelectItem key={month} value={month.toString()}>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											onValueChange={(val) => {
												if (selectedMonth !== "") {
													setTransactionDetail(
														"expiryDate",
														`${selectedMonth}/${val}`,
													);
													setSelectedYear(val);
												} else {
													alert("Please Choose Month First");
													setSelectedYear("");
												}
											}}
											value={selectedYear}
										>
											<SelectTrigger className="font-bold border-t-0 border-x-0 border-b border-gray-700 text-md">
												<SelectValue placeholder="YYYY" />
											</SelectTrigger>
											<SelectContent>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</Field>

								<Field>
									<FieldLabel className="text-gray-700 font-normal uppercase text-md">
										CVC/CVV
									</FieldLabel>
									<Input
										className="font-bold border-t-0 border-x-0 border-b border-gray-400 focus-visible:border-gray-500 text-md"
										id="cvv"
										placeholder="***"
										required
									/>
								</Field>
							</div>
						</FieldGroup>

						<Button
							className="w-full bg-[#1a1c3d] hover:bg-gray-400 text-white h-16 rounded-3xl text-xl font-bold shadow-lg shadow-gray-200 mt-8"
							type="submit"
						>
							Pay
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
