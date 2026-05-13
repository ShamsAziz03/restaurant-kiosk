"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type OrderFullObject = {
	id: number;
	typeOfOrder: "takeAway" | "dineIn";
	specialInstructions: string;
	orderStatus: "completed" | "inProgress" | "cancelled";
	createdAt: string;
	totalPrice: number;
	orderItems: {
		orderItemId: number;
		quantity: number;
		itemName: string;
	}[];
	orderExtraItems: {
		orderItemId: number;
		quantity: number;
		itemName: string;
	}[];
};

async function fetchData() {
	const data = await fetch("http://localhost:3000/api/orders");
	const result = await data.json();
	if (!result.success) {
		alert(result.msg);
		return null;
	}
	return result.result;
}

const OrdersPage = () => {
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const rowsPerPage = 5;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(rowsPerPage);

	const getStatusColor = (status: string) => {
		switch (status) {
			case "Completed":
				return "bg-green-100 text-green-700";
			case "In Progress":
				return "bg-yellow-100 text-yellow-700";
			case "Pending":
				return "bg-blue-100 text-blue-700";
			case "Canceled":
				return "bg-red-100 text-red-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const { data: ordersData, isLoading } = useQuery({
		queryKey: ["orders"],
		queryFn: fetchData,
		refetchInterval: 300000,
	});

	if (isLoading || !ordersData)
		return <h1 className="font-bold text-xl">Loading...</h1>;
	return (
		<div className="p-8 bg-gray-100 min-h-[100vh]">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
				<p className="text-gray-600 mt-1">
					View and manage all customer orders.
				</p>
			</div>

			{/* Filters */}
			<div className="bg-white rounded-xl shadow-xl p-6 mb-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{/* Status Filter */}
					<div>
						<p className="block text-gray-700 mb-2">Status</p>
						<Select
							onValueChange={(e) => setStatusFilter(e)}
							value={statusFilter}
						>
							<SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg">
								<SelectValue placeholder="Choose ..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="inProgress">In Progress</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="canceled">Canceled</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Type Filter */}
					<div>
						<p className="block text-gray-700 mb-2">Type</p>
						<Select onValueChange={(e) => setTypeFilter(e)} value={typeFilter}>
							<SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg">
								<SelectValue placeholder="Choose ..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All</SelectItem>
								<SelectItem value="dineIn">Dine In</SelectItem>
								<SelectItem value="takeAway">Take Away</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{/* Orders Table */}
			<div className="bg-white rounded-xl shadow-xl overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-50 border-b border-gray-200">
								<TableHead className="w-[100px] pl-6 py-4  text-sm font-semibold text-gray-700">
									Order ID
								</TableHead>
								<TableHead className="py-4  text-sm font-semibold text-gray-700">
									Items
								</TableHead>
								<TableHead className="py-4  text-sm font-semibold text-gray-700">
									Special Instructions
								</TableHead>
								<TableHead className="pl-6 py-4 text-sm font-semibold text-gray-700">
									Type
								</TableHead>
								<TableHead className="py-4  text-sm font-semibold text-gray-700">
									Amount
								</TableHead>
								<TableHead className="py-4  text-sm font-semibold text-gray-700">
									Status
								</TableHead>
								<TableHead className="py-4 text-sm font-semibold text-gray-700">
									Date
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ordersData
								?.slice(startIndex, endIndex)
								.map((order: OrderFullObject) => (
									<TableRow key={order.id}>
										<TableCell className="pl-6 font-semibold text-gray-800">
											{order.id}
										</TableCell>
										<TableCell className="text-gray-700 w-[200px]">
											<ScrollArea className="py-4 h-[70px]">
												<div className="space-y-1">
													{order.orderItems.map((item) => (
														<div className="text-sm" key={item.orderItemId}>
															{item.quantity}x {item.itemName}
														</div>
													))}
													{order.orderExtraItems.map((item) => (
														<div
															className="text-sm text-gray-500"
															key={item.orderItemId}
														>
															+{item.quantity}x {item.itemName}
														</div>
													))}
												</div>
											</ScrollArea>
										</TableCell>
										<TableCell className="pl-6">
											<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
												{order.typeOfOrder === "dineIn"
													? "Dine In"
													: "Take Away"}
											</span>
										</TableCell>
										<TableCell className="font-semibold text-gray-800">
											${order.totalPrice.toFixed(2)}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												<span
													className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.orderStatus)}`}
												>
													{order.orderStatus === "completed"
														? "Completed"
														: order.orderStatus === "inProgress"
															? "In Progress"
															: "Cancelled"}
												</span>
											</div>
										</TableCell>
										<TableCell className="text-gray-700 text-sm">
											{new Date(order.createdAt).toLocaleString([], {
												year: "numeric",
												month: "2-digit",
												day: "2-digit",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={7}>
									<Pagination>
										<PaginationContent className="flex items-center justify-center gap-4 w-full py-2">
											<PaginationItem>
												<PaginationPrevious
													className={`${
														startIndex === 0
															? "pointer-events-none opacity-50"
															: undefined
													} p-3 rounded-md text-black font-bold`}
													onClick={() => {
														setStartIndex(startIndex - rowsPerPage);
														setEndIndex(endIndex - rowsPerPage);
													}}
													size={15}
												/>
											</PaginationItem>

											<PaginationItem>
												<PaginationNext
													className={`${
														endIndex >= ordersData?.length
															? "pointer-events-none opacity-50"
															: undefined
													} p-3 rounded-md text-black font-bold`}
													onClick={() => {
														setStartIndex(startIndex + rowsPerPage);
														setEndIndex(endIndex + rowsPerPage);
													}}
													size={15}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
