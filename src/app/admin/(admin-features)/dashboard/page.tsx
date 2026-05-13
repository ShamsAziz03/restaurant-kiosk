"use client";
import { useQuery } from "@tanstack/react-query";
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

export type OrderStructure = {
	id: number;
	totalPrice: number;
	typeOfOrder: "takeAway" | "dineIn";
	specialInstructions: string | null;
	orderStatus: "inProgress" | "completed" | "cancelled";
	createdAt: Date;
};
type NumberByMonth = {
	month: string;
	value: number;
};

type FullDataObj = {
	totalOrders: number;
	ordersRevenue: number;
	ordersNumberByType: {
		typeOfOrder: "takeAway" | "dineIn";
		count: number;
	}[];
	ordersNumberByStatus: {
		status: "inProgress" | "completed" | "cancelled";
		count: number;
	}[];
	recentOrders: OrderStructure[];
	ordersByMonth: NumberByMonth[];
	revenueByMonth: NumberByMonth[];
};

async function fetchData() {
	const data = await fetch("http://localhost:3000/api/orders/dashboard");
	const result = await data.json();
	if (!result.success) {
		alert(result.msg);
		return null;
	}
	return result.result;
}

function calculateStats(dashboardData: FullDataObj) {
	const canceledOrder =
		dashboardData?.ordersNumberByStatus?.find(
			(order) => order.status === "cancelled",
		)?.count ?? 0;
	const pendingOrder =
		dashboardData?.ordersNumberByStatus?.find(
			(order) => order.status === "inProgress",
		)?.count ?? 0;
	const stats = [
		{
			name: "Total Orders",
			value: dashboardData?.totalOrders ?? 0,
			icon: ShoppingBag,
			color: "blue",
		},
		{
			name: "Revenue",
			value: dashboardData?.ordersRevenue ?? 0,
			icon: DollarSign,
			color: "green",
		},
		{
			name: "Canceled Orders",
			value: canceledOrder ?? 0,
			icon: XCircle,
			color: "red",
		},
		{
			name: "Pending Orders",
			value: pendingOrder ?? 0,
			icon: Clock,
			color: "orange",
		},
	];
	return stats;
}

const orderTypeColors = ["#615980", "#9b8cc8"];

function getOrdersByType(dashboardData: FullDataObj) {
	const result = dashboardData?.ordersNumberByType.map((order, index) => ({
		name: order.typeOfOrder,
		value: order.count,
		fill: orderTypeColors[index],
	}));
	return result;
}

const DashboardPage = () => {
	const { data: dashboardData, isLoading } = useQuery({
		queryKey: ["dataKey"],
		queryFn: fetchData,
		// 5 minutes in milliseconds (5 * 60 * 1000)
		refetchInterval: 300000,
	});

	const stats = calculateStats(dashboardData);
	const ordersByType = getOrdersByType(dashboardData);

	if (isLoading) return <h1 className="font-bold text-xl">Loding...</h1>;
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
						<AreaChart data={dashboardData?.revenueByMonth ?? []}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Area
								dataKey="value"
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
						<BarChart data={dashboardData?.ordersByMonth ?? []}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="value" fill="#615980" radius={[8, 8, 0, 0]} />
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
									data={ordersByType}
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
							{dashboardData.recentOrders.map((order: OrderStructure) => (
								<div
									className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
									key={order.id}
								>
									<div className="flex items-center gap-4">
										<div>
											<p className="font-semibold text-gray-800">
												# {order.id}
											</p>
											<p className="text-sm text-gray-600">
												{order.typeOfOrder}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-semibold text-gray-800">
											{order.totalPrice} $
										</p>
									</div>
									<div>
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												order.orderStatus === "completed"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{order.orderStatus}
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
