"use client";
import { useState } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
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

const mockOrders = [
	{
		id: "#142",
		customer: "Table 5",
		items: "2x Burger, 1x Fries, 2x Coke",
		amount: "$45.50",
		status: "Completed",
		type: "Dine In",
		date: "2026-05-06 14:30",
	},
	{
		id: "#141",
		customer: "Takeaway",
		items: "1x Pizza, 1x Salad",
		amount: "$32.00",
		status: "In Progress",
		type: "Take Away",

		date: "2026-05-06 14:25",
	},
	{
		id: "#140",
		customer: "Table 12",
		items: "3x Pasta, 2x Wine, 1x Dessert",
		amount: "$78.90",
		status: "Completed",
		type: "Dine In",

		date: "2026-05-06 14:10",
	},
	{
		id: "#139",
		customer: "Takeaway",
		items: "2x Sandwich, 2x Juice",
		amount: "$21.50",
		status: "Completed",
		type: "Take Away",

		date: "2026-05-06 13:55",
	},
	{
		id: "#138",
		customer: "Table 8",
		items: "1x Steak, 1x Salad, 1x Beer",
		amount: "$55.00",
		status: "Pending",
		type: "Dine In",

		date: "2026-05-06 13:40",
	},
	{
		id: "#137",
		customer: "Takeaway",
		items: "4x Burger, 4x Fries",
		amount: "$68.00",
		status: "Canceled",
		type: "Take Away",

		date: "2026-05-06 13:30",
	},
	{
		id: "#136",
		customer: "Table 3",
		items: "2x Chicken, 1x Rice, 2x Soda",
		amount: "$42.00",
		status: "Completed",
		type: "Dine In",
		date: "2026-05-06 13:15",
	},
];

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

	return (
		<div className="p-8 bg-gray-100 h-[100vh]">
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
								<SelectItem value="pending">Pending</SelectItem>
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
									Customer
								</TableHead>
								<TableHead className="py-4  text-sm font-semibold text-gray-700">
									Items
								</TableHead>
								<TableHead className="py-4 text-sm font-semibold text-gray-700">
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
							{mockOrders.slice(startIndex, endIndex).map((order) => (
								<TableRow key={order.id}>
									<TableCell className=" pl-6 py-4 font-semibold text-gray-800">
										{order.id}
									</TableCell>
									<TableCell className="py-4 text-gray-700">
										{order.customer}
									</TableCell>
									<TableCell className="py-4 text-gray-700">
										{order.items}
									</TableCell>
									<TableCell className="py-4">
										<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
											{order.type}
										</span>
									</TableCell>
									<TableCell className="py-4 font-semibold text-gray-800">
										{order.amount}
									</TableCell>

									<TableCell className="py-4">
										<div className="flex items-center gap-2">
											<span
												className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
											>
												{order.status}
											</span>
										</div>
									</TableCell>

									<TableCell className="py-4 text-gray-700 text-sm">
										{order.date}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell className="bg-gray-100" colSpan={7}>
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
														endIndex >= mockOrders.length
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
