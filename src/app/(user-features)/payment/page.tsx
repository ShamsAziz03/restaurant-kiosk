"use client";
import { createCheckoutSession } from "@/app/actions"; // Import your server action
import { Button } from "@/components/ui/button";
import { useCartStore, useCartTotal } from "@/source/cartStore";

const PaymentPage = () => {
	const orderDetails = useCartStore((state) => state.orderDetails);
	const { cartSubTotal, tax, extrasTotal, finalTotal } = useCartTotal();

	return (
		<div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
			<div className="w-[80%] flex flex-row shadow-2xl rounded-[40px] overflow-hidden border border-gray-100">
				{/* Left Section: Order Summary */}
				<div className="flex-[1] flex flex-col gap-10 bg-white p-8">
					<h1 className="text-4xl font-bold text-[#423E3C] pt-10">
						Review Order
					</h1>
					<div className="flex flex-col gap-5">
						<div className="flex justify-between text-xl">
							<span>Subtotal:</span>
							<span className="font-bold">${cartSubTotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-xl">
							<span>Extras:</span>
							<span className="font-bold">${extrasTotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between text-xl border-b pb-3">
							<span>Tax:</span>
							<span className="font-bold">${tax.toFixed(2)}</span>
						</div>
						<div className="flex justify-between pt-2">
							<span className="text-2xl font-medium">Total:</span>
							<span className="text-3xl font-bold">
								${finalTotal.toFixed(2)}
							</span>
						</div>
					</div>
				</div>

				{/* Right Section: Payment Trigger */}
				<div className="flex-[1] bg-[#F0F0F0] p-9 flex flex-col justify-center items-center text-center">
					<h2 className="text-3xl font-bold text-[#1a1c3d] mb-6">
						Secure Checkout
					</h2>
					<p className="text-gray-600 mb-8">
						You will be redirected to Stripe to complete your payment safely.
					</p>

					{/* This form triggers the Stripe Redirect */}
					<form
						action={() =>
							createCheckoutSession({ ...orderDetails, totalPrice: finalTotal })
						}
						className="w-full"
					>
						<Button className="w-full" type="submit">
							Pay with Stripe
						</Button>
					</form>

					<p className="mt-6 text-sm text-gray-400">
						Encrypted and Secure Payment Processing
					</p>
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
