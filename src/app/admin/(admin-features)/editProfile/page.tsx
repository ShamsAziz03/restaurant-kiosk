"use client";
import { Edit2, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { EditEmailDialog } from "@/components/customComponents/editProfileDialogs/editEmailDialog";
import { EditNameDialog } from "@/components/customComponents/editProfileDialogs/editNameDialog";
import { EditPassDialog } from "@/components/customComponents/editProfileDialogs/editPassDialog";
import { EditPhoneDialog } from "@/components/customComponents/editProfileDialogs/editPhoneDialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLoggedUserStore } from "@/source/loggedUserStore";

const EditProfilePage = () => {
	const loggedUser = useLoggedUserStore((state) => state.loggedUser);
	const [showEditEmail, setShowEditEmail] = useState(false);
	const [showEditName, setShowEditName] = useState(false);
	const [showEditPhone, setShowEditPhone] = useState(false);
	const [showEditPass, setShowEditPass] = useState(false);

	const fields = [
		{
			icon: User,
			label: "Full Name",
			placeholder: "Evil Rabbit",
			value: loggedUser.fullName,
			event: () => setShowEditName(true),
		},

		{
			icon: Mail,
			label: "Email Address",
			placeholder: "rabbit@example.com",
			value: loggedUser.email,
			event: () => setShowEditEmail(true),
		},
		{
			icon: Phone,
			label: "Phone Number",
			placeholder: "9800005",
			value: loggedUser.phone,
			event: () => setShowEditPhone(true),
		},
		{
			icon: Lock,
			label: "Password",
			placeholder: "••••••••",
			value: "••••••••",
			event: () => setShowEditPass(true),
		},
	];

	return (
		<ScrollArea className="w-[100%] min-h-full bg-gray-100">
			<div className="p-6 md:p-8">
				{/* Header Section */}
				<div className="mb-12">
					<div className="mb-4">
						<h1 className="text-4xl font-bold text-gray-900 mb-3">
							Edit Profile
						</h1>
						<p className="text-gray-600 text-lg">
							Update your personal information. Click the edit icon on any field
							to make changes.
						</p>
					</div>
				</div>

				{/* Profile Form */}
				<div className="max-w-4xl mx-auto">
					<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
						{/* Profile Header Card */}
						<div className="mb-10 pb-8 border-b border-gray-200">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
									<User className="w-8 h-8 text-black" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										{loggedUser.fullName}
									</h2>
									<p className="text-gray-500">{loggedUser.email}</p>
								</div>
							</div>
						</div>

						{/* Fields Grid */}
						<div className="grid grid-cols-1 gap-6">
							{/* Full Name Field */}

							{fields.map((field) => (
								<div
									className="group border border-gray-200 rounded-lg p-5 flex items-center justify-between"
									key={field.label}
								>
									<div className="flex gap-3 items-center">
										<div>
											<field.icon color="black" size={20} />
										</div>
										<div className="flex flex-col justify-center mb-2">
											<p className="text-lg font-bold text-black uppercase tracking-wide">
												{field.label}
											</p>
											<p className="text-sm font-semibold text-gray-700">
												{field.value}
											</p>
										</div>
									</div>

									<Button
										aria-label={`Edit ${field.label}`}
										className="p-2 rounded-lg bg-gray-300"
										onClick={field.event}
										type="button"
									>
										<Edit2 className="w-4 h-4 text-black" />
									</Button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<EditEmailDialog
				email={loggedUser.email}
				setShowEditEmailDialog={setShowEditEmail}
				showEditEmailDialog={showEditEmail}
				userId={loggedUser.memberId}
			/>
			<EditNameDialog
				name={loggedUser.fullName}
				setShowEditNameDialog={setShowEditName}
				showEditNameDialog={showEditName}
				userId={loggedUser.memberId}
			/>
			<EditPhoneDialog
				phone={loggedUser.phone}
				setShowEditPhoneDialog={setShowEditPhone}
				showEditPhoneDialog={showEditPhone}
				userId={loggedUser.memberId}
			/>

			<EditPassDialog
				setShowEditPassDialog={setShowEditPass}
				showEditPassDialog={showEditPass}
				userId={loggedUser.memberId}
			/>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default EditProfilePage;
