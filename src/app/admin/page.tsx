"use client";
import { ArrowLeft, ChefHat, Lock, Mail } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { User } from "@/source/loggedUserStore";
import { useLoggedUserStore } from "@/source/loggedUserStore";

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	email: string,
	pass: string,
	router: AppRouterInstance,
	setLoggedUser: (user: User) => void,
) {
	e.preventDefault();
	const responseOrder = await fetch("http://localhost:3000/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: email, pass: pass }),
	});

	const response = await responseOrder.json();
	if (response.ok) {
		const user = {
			memberId: response.user.memberId,
			fullName: response.user.fullName,
			email: response.user.email,
			phone: response.user.phone,
			role: response.user.role,
		};
		setLoggedUser(user);
		if (user.role === "admin") router.replace("/admin/dashboard");
		else router.replace("/kitchen-staff-features/orders");
	} else {
		alert("Incorrect Info");
	}
}

const page = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const setLoggedUser = useLoggedUserStore((state) => state.setLoggedUser);

	return (
		<div className="flex items-center justify-center p-4 h-[100vh]">
			<div className="bg-white rounded-2xl shadow-2xl w-[40%] p-8">
				<div className="w-full flex flex-col">
					<div>
						<Link className="w-full flex justify-start" href="/">
							<ArrowLeft color="black" size={30} />
						</Link>
					</div>

					<div className="flex flex-col items-center mb-8">
						<div className="bg-gary-500 p-4 rounded-full mb-4">
							<ChefHat className="w-12 h-12 text-black" />
						</div>
						<h1 className="text-3xl font-bold text-gray-800">Admin Login</h1>
						<p className="text-gray-600 mt-2">
							Welcome back! Please login to your account.
						</p>
					</div>
				</div>

				<form
					className="space-y-6 w-full"
					onSubmit={(e) =>
						handleSumbit(e, email, password, router, setLoggedUser)
					}
				>
					<div>
						<p className="block text-gray-700 mb-2">Email Address</p>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg"
								id="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="test@gmail.com"
								required
								type="email"
								value={email}
							/>
						</div>
					</div>

					<div>
						<p className="block text-gray-700 mb-2">Password</p>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="*********"
								required
								type="password"
								value={password}
							/>
						</div>
					</div>

					<div className="w-full flex justify-center items-center">
						<Button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold text-center text-xl">
							Sign In
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default page;
