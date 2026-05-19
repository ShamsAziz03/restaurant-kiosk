"use client";
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
import type { User } from "@/source/loggedUserStore";
import { useLoggedUserStore } from "@/source/loggedUserStore";

type Props = {
	showEditNameDialog: boolean;
	setShowEditNameDialog: Dispatch<SetStateAction<boolean>>;
	name: string;
	userId: number;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	setShowEditEmailDialog: () => void,
	name: string,
	userId: number,
	setLoggedUser: (user: User) => void,
	loggedUser: User,
) {
	e.preventDefault();

	const responseOrder = await fetch(
		"http://localhost:3000/api/employees/editInfo?field=name",
		{
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name, userId: userId }),
		},
	);

	const response = await responseOrder.json();
	if (response.success) {
		alert(response.msg);
		setLoggedUser({
			...loggedUser,
			fullName: name,
		});
		setShowEditEmailDialog();
	} else {
		alert(response.msg);
	}
}

export function EditNameDialog(props: Props) {
	const nameRef = useRef<HTMLInputElement>(null);
	const setLoggedUser = useLoggedUserStore((state) => state.setLoggedUser);
	const loggedUser = useLoggedUserStore((state) => state.loggedUser);

	return (
		<Dialog
			onOpenChange={() => {
				props.setShowEditNameDialog(false);
			}}
			open={!!props.showEditNameDialog}
		>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Edit Name</DialogTitle>
					<DialogDescription>
						Make changes to your Name here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							() => props.setShowEditNameDialog(false),
							nameRef.current?.value || props.name,
							props.userId,
							setLoggedUser,
							loggedUser,
						)
					}
				>
					<FieldGroup>
						<Field>
							<Label htmlFor="name">Name</Label>
							<Input
								defaultValue={props.name}
								id="name"
								name="name-1"
								ref={nameRef}
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
