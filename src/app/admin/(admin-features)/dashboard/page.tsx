"use client";
import { Clock, DollarSign, ShoppingBag, XCircle } from "lucide-react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const revenueData = [
	{ name: "Jan", revenue: 45000 },
	{ name: "Feb", revenue: 52000 },
	{ name: "Mar", revenue: 48000 },
	{ name: "Apr", revenue: 61000 },
	{ name: "May", revenue: 75000 },
	{ name: "Jun", revenue: 82000 },
	{ name: "Jul", revenue: 68000 },
	{ name: "Aug", revenue: 73000 },
	{ name: "Sep", revenue: 69000 },
	{ name: "Oct", revenue: 81000 },
	{ name: "Nov", revenue: 92000 },
	{ name: "Dec", revenue: 105000 },
];

const ordersData = [
	{ name: "Jan", orders: 450 },
	{ name: "Feb", orders: 520 },
	{ name: "Mar", orders: 480 },
	{ name: "Apr", orders: 610 },
	{ name: "May", orders: 750 },
	{ name: "Jun", orders: 820 },
	{ name: "Jul", orders: 680 },
	{ name: "Aug", orders: 730 },
	{ name: "Sep", orders: 690 },
	{ name: "Oct", orders: 810 },
	{ name: "Nov", orders: 920 },
	{ name: "Dec", orders: 1050 },
];

const stats = [
	{
		name: "Total Orders",
		value: "324",
		icon: ShoppingBag,
		color: "blue",
	},
	{
		name: "Revenue",
		value: "15,240",
		icon: DollarSign,
		color: "green",
	},
	{
		name: "Canceled Orders",
		value: "12",
		icon: XCircle,
		color: "red",
	},
	{
		name: "Pending Orders",
		value: "8",
		icon: Clock,
		color: "orange",
	},
];

const orders = [
	{
		id: "#142",
		customer: "DineIn",
		amount: "$45.50",
		status: "Completed",
	},
	{
		id: "#141",
		customer: "Takeaway",
		amount: "$32.00",
		status: "In Progress",
	},
	{
		id: "#140",
		customer: "DineIn",
		amount: "$78.90",
		status: "Completed",
	},
	{
		id: "#139",
		customer: "Takeaway",
		amount: "$21.50",
		status: "Completed",
	},
];

const data = [
	{ name: "Dine In", value: 400, fill: "#615980" },
	{ name: "Take Away", value: 300, fill: "#9b8cc8" },
];

const DashboardPage = () => {
	return (
		<ScrollArea className="w-[100%] bg-gray-100">
			<div className="p-16">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
					<p className="text-gray-600 mt-1">
						Welcome back! Here's what's happening today.
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{stats.map((stat) => (
						<div className="bg-white rounded-xl shadow-xl p-6" key={stat.name}>
							<stat.icon
								className="w-7 h-7 font-bold mb-2"
								color={stat.color}
							/>
							<h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
							<p className="text-gray-600 text-sm font-semibold mt-1">
								{stat.name}
							</p>
						</div>
					))}
				</div>

				{/* Revenue Chart */}
				<div className="bg-white rounded-xl shadow-xl p-6 mb-8">
					<h2 className="text-xl font-bold text-gray-800 mb-6">
						Revenue By Month
					</h2>
					<ResponsiveContainer height={350} width="100%">
						<AreaChart data={revenueData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Area
								dataKey="revenue"
								fill="#9b8cc8"
								fillOpacity={0.3}
								stroke="#615980"
								type="monotone"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				{/* Orders Chart */}
				<div className="bg-white rounded-xl shadow-xl p-6 mb-8">
					<h2 className="text-xl font-bold text-gray-800 mb-6">
						Orders By Month
					</h2>
					<ResponsiveContainer height={350} width="100%">
						<BarChart data={ordersData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="orders" fill="#615980" radius={[8, 8, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Order Types and Recent Orders */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Order Types Pie Chart */}
					<div className="bg-white rounded-xl shadow-xl p-6 w-full h-[470px] min-h-[470px]">
						<h2 className="text-xl font-bold text-gray-800 mb-6">
							Order Types
						</h2>
						<ResponsiveContainer height="100%" width="100%">
							<PieChart>
								<Pie
									cx="50%"
									cy="45%"
									data={data}
									dataKey="value"
									innerRadius={60}
									label={({ value }) => `${value}`}
									outerRadius={100}
									paddingAngle={5}
								/>
								<Tooltip />
								<Legend align="center" verticalAlign="top" />
							</PieChart>
						</ResponsiveContainer>
					</div>

					{/* Recent Orders */}
					<div className="bg-white rounded-xl shadow-xl p-6 lg:col-span-2">
						<h2 className="text-xl font-bold text-gray-800 mb-6">
							Recent Orders
						</h2>
						<div className="space-y-4">
							{orders.map((order) => (
								<div
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									key={order.id}
								>
									<div className="flex items-center gap-4">
										<div>
											<p className="font-semibold text-gray-800">{order.id}</p>
											<p className="text-sm text-gray-600">{order.customer}</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-semibold text-gray-800">
											{order.amount}
										</p>
									</div>
									<div>
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												order.status === "Completed"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{order.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default DashboardPage;
