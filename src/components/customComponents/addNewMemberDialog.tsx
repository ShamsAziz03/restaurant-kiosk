"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Lock, Mail, Phone, User } from "lucide-react";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useState } from "react";
import type { Roles } from "@/app/admin/(admin-features)/employees/page";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FormData = {
	fullName: string;
	email: string;
	password: string;
	phone: string;
	role: Roles;
};

type Props = {
	showAddMemberDialog: boolean;
	setShowAddMemberDialog: Dispatch<SetStateAction<boolean>>;
	roles: Roles[];
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	formData: FormData,
	queryClient: ReturnType<typeof useQueryClient>,
	setShowAddMemberDialog: () => void,
	setFormData: Dispatch<SetStateAction<FormData>>,
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
		queryClient.invalidateQueries({ queryKey: ["employees"] });
		setShowAddMemberDialog();
		setFormData({
			fullName: "",
			email: "",
			password: "",
			phone: "",
			role: "kitchenStaff",
		});
	} else {
		alert(response.msg);
	}
}

const NewMemberPage = (props: Props) => {
	const queryClient = useQueryClient();

	const [formData, setFormData] = useState<FormData>({
		fullName: "",
		email: "",
		password: "",
		phone: "",
		role: "kitchenStaff",
	});

	const handleChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowAddMemberDialog(false);
			}}
			open={!!props.showAddMemberDialog}
		>
			<DialogContent className="overflow-auto max-h-[90vh]">
				<DialogHeader>
					<DialogTitle>Add New Member</DialogTitle>
					<DialogDescription>Details about new Member</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							formData,
							queryClient,
							() => props.setShowAddMemberDialog(false),
							setFormData,
						)
					}
				>
					<FieldGroup>
						<FieldSet>
							<FieldGroup>
								{/* Full Name Field */}
								<Field>
									<FieldLabel>Full Name</FieldLabel>
									<div className="relative">
										<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
										<Input
											className="pl-10"
											onChange={(e) => handleChange("fullName", e.target.value)}
											placeholder="Evil Rabbit"
											required
											value={formData.fullName}
										/>
									</div>
								</Field>

								{/* Role Select */}
								<Field>
									<FieldLabel htmlFor="role">role *</FieldLabel>
									<Select
										onValueChange={(value) => handleChange("role", value)}
										value={formData.role}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											{props.roles.map((role) => (
												<SelectItem key={role} value={role}>
													{role}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
											onChange={(e) => handleChange("password", e.target.value)}
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
			</DialogContent>
		</Dialog>
	);
};

export default NewMemberPage;
