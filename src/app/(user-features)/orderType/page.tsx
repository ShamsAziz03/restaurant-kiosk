import Link from "next/link";
import OrderTypes from "@/components/customComponents/orderTypes";

export default function orderTypeComponent() {
	return (
		<main className="flex justify-center items-center w-[100%] h-[100vh] bg-[url(https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-black/50 bg-blend-overlay">
			<div className="flex flex-col justify-center items-start gap-5">
				<h1 className="text-5xl text-center text-white font-bold">KIOSK</h1>
				<p className="text-3xl text-center text-gray-100 font-bold">
					Self checkout
				</p>
				<p className="text-xl text-center text-gray-300">
					Empower Your Checkout Experience Seamless Self-Checkout at Your
					Fingertip
				</p>
				<OrderTypes />
				<div className="w-[100%] flex justify-end items-center mt-10">
					<Link
						className="p-3 pl-7 pr-7 border-2 border-black rounded-lg bg-white font-bold"
						href="/categories?categoryId=1"
					>
						Next
					</Link>
				</div>
			</div>
		</main>
	);
}
