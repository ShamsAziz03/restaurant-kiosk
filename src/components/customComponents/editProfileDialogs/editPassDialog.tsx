"use client";
import bcrypt from "bcryptjs";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
	showEditPassDialog: boolean;
	setShowEditPassDialog: Dispatch<SetStateAction<boolean>>;
	userId: number;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	setShowEditPassDialog: () => void,
	oldPass: string,
	newPass: string,
	newPass2: string,
	userId: number,
) {
	e.preventDefault();

	if (newPass !== newPass2) {
		alert("You must rewrite the same new password!");
		return;
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(newPass, salt);

	const responseOrder = await fetch(
		"http://localhost:3000/api/employees/editInfo?field=password",
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: userId,
				oldPassword: oldPass,
				newPassword: hash,
			}),
		},
	);

	const response = await responseOrder.json();
	if (response.success) {
		alert(response.msg);
		setShowEditPassDialog();
	} else {
		alert(response.msg);
	}
}

export function EditPassDialog(props: Props) {
	const oldPassRef = useRef<HTMLInputElement>(null);
	const newPassRef = useRef<HTMLInputElement>(null);
	const newPassRef2 = useRef<HTMLInputElement>(null);

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowEditPassDialog(false);
			}}
			open={!!props.showEditPassDialog}
		>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Edit Password</DialogTitle>
					<DialogDescription>
						Make changes to your Password here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>
				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							() => props.setShowEditPassDialog(false),
							oldPassRef.current?.value || "",
							newPassRef.current?.value || "",
							newPassRef2.current?.value || "",
							props.userId,
						)
					}
				>
					<FieldGroup>
						<Field>
							<Label htmlFor="currentPassword">Current Password</Label>
							<Input
								id="currentPassword"
								name="currentPassword-1"
								placeholder="••••••••"
								ref={oldPassRef}
								type="password"
							/>
						</Field>
						<Field>
							<Label htmlFor="newPassword">New Password</Label>
							<Input
								id="newPassword"
								name="newPassword-1"
								placeholder="••••••••"
								ref={newPassRef}
								type="password"
							/>
						</Field>
						<Field>
							<Label htmlFor="newPassword2">Repeat New Password</Label>
							<Input
								id="newPassword2"
								name="newPassword-2"
								placeholder="••••••••"
								ref={newPassRef2}
								type="password"
							/>
						</Field>
					</FieldGroup>
					<DialogFooter className="mt-4">
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
