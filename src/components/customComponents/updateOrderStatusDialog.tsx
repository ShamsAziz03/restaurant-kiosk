"use client";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { useState } from "react";
import type { OrderFullObject } from "@/app/kitchen-staff-features/orders/page";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Props = {
	activeOrder: OrderFullObject | null;
	setActiveOrder: Dispatch<SetStateAction<OrderFullObject | null>>;
};

async function handleSumbit(
	e: SubmitEvent<HTMLFormElement>,
	setShowEditOrderStatusDialog: () => void,
	queryClient: ReturnType<typeof useQueryClient>,
	orderStatus: "inProgress" | "completed" | "cancelled",
	orderId: number,
) {
	e.preventDefault();

	const responseOrder = await fetch("http://localhost:3000/api/orders", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ orderId: orderId, orderStatus: orderStatus }),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert(response.msg);
		queryClient.invalidateQueries({ queryKey: ["ordersStaff"] });
		setShowEditOrderStatusDialog();
	} else {
		alert(response.msg);
	}
}

const status = [
	{ label: "In Progress", value: "inProgress" },
	{ label: "Completed", value: "completed" },
	{ label: "Cancelled", value: "cancelled" },
];

export function EditOrderStatusDialog(props: Props) {
	const [orderStatus, setOrderStatus] = useState<
		"inProgress" | "completed" | "cancelled"
	>(props.activeOrder?.orderStatus || "inProgress");
	const queryClient = useQueryClient();

	return (
		<Dialog
			onOpenChange={() => {
				props.setActiveOrder(null);
			}}
			open={!!props.activeOrder}
		>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Edit Order Status</DialogTitle>
					<DialogDescription>
						Make changes to Order Status here. Click save when you are done.
					</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={(e) =>
						handleSumbit(
							e,
							() => props.setActiveOrder(null),
							queryClient,
							orderStatus,
							props.activeOrder?.id || 0,
						)
					}
				>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="orderStatus">Order Status *</FieldLabel>
							<Select
								onValueChange={(
									value: "inProgress" | "completed" | "cancelled",
								) => setOrderStatus(value)}
								value={orderStatus}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a Status" />
								</SelectTrigger>
								<SelectContent>
									{status.map((status) => (
										<SelectItem key={status.value} value={status.value}>
											{status.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
