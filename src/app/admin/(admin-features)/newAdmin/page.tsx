"use client";

import { Lock, Mail, Phone, User } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type FormData = {
	fullName: string;
	email: string;
	password: string;
	phone: string;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	formData: FormData,
	router: AppRouterInstance,
) {
	e.preventDefault();
	const responseOrder = await fetch("http://localhost:3000/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert(response.msg);
		router.replace("/admin/dashboard");
	} else {
		alert(response.msg);
	}
}

const NewAdminPage = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
		phone: "",
	});

	const handleChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	return (
		<ScrollArea className="w-full bg-gray-50 h-screen">
			<div className="flex items-center justify-center p-8">
				<div className="bg-white rounded-2xl shadow-2xl w-[70%] p-8">
					<form onSubmit={(e) => handleSumbit(e, formData, router)}>
						<FieldGroup className="mt-4">
							<FieldSet>
								<FieldLegend className="text-3xl font-bold text-gray-800">
									Add New Admin
								</FieldLegend>
								<FieldDescription className="text-gray-600 mt-2">
									Create a new administrative account to manage your kitchen.
								</FieldDescription>
								<FieldGroup>
									{/* Full Name Field */}
									<Field>
										<FieldLabel>Full Name</FieldLabel>
										<div className="relative">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
											<Input
												className="pl-10"
												onChange={(e) =>
													handleChange("fullName", e.target.value)
												}
												placeholder="Evil Rabbit"
												required
												value={formData.fullName}
											/>
										</div>
									</Field>

									{/* Email Field */}
									<Field>
										<FieldLabel>Email Address</FieldLabel>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
											<Input
												className="pl-10"
												onChange={(e) => handleChange("email", e.target.value)}
												placeholder="rabbit@example.com"
												required
												type="email"
												value={formData.email}
											/>
										</div>
									</Field>

									{/* Phone Field */}
									<Field>
										<FieldLabel>Phone Number</FieldLabel>
										<div className="relative">
											<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
											<Input
												className="pl-10"
												onChange={(e) => handleChange("phone", e.target.value)}
												placeholder="9800005"
												required
												type="tel"
												value={formData.phone}
											/>
										</div>
									</Field>

									{/* Password Field */}
									<Field>
										<FieldLabel>Password</FieldLabel>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
											<Input
												className="pl-10"
												onChange={(e) =>
													handleChange("password", e.target.value)
												}
												placeholder="••••••••"
												required
												type="password"
												value={formData.password}
											/>
										</div>
									</Field>
								</FieldGroup>
							</FieldSet>
							<FieldSeparator />
							<Field orientation="horizontal">
								<Button className="rounded-lg" type="submit">
									Submit
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</div>
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default NewAdminPage;
