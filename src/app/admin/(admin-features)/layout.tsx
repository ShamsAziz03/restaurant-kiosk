import "../../globals.css";
import {
	BarChart3,
	ChefHat,
	LayoutDashboard,
	LogOut,
	Menu,
	MessageCircle,
	MessageSquare,
	ShoppingBag,
	Star,
	Tag,
	Users,
} from "lucide-react";
import Link from "next/link";

const navigation = [
	{ name: "Dashboard", href: "/", icon: LayoutDashboard },
	{ name: "Orders", href: "/", icon: ShoppingBag },
	{ name: "Menu", href: "/", icon: Menu },
	{ name: "Complaints", href: "/", icon: MessageSquare },
	{ name: "Reviews", href: "/", icon: Star },
	{ name: "Reports", href: "/", icon: BarChart3 },
	{ name: "Offers", href: "/", icon: Tag },
	{ name: "Employees", href: "/", icon: Users },
	{ name: "Messages", href: "/", icon: MessageCircle },
	{ name: "LogOut", href: "/", icon: LogOut },
];

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-row w-[100%] h-[100vh] relative">
			{/* Sidebar */}
			<div className="w-[20%] bg-white shadow-lg h-[100vh] fixed">
				<div className="flex items-center gap-3 p-6 border-b">
					<ChefHat className="w-8 h-8 text-orange-500" />
					<h1 className="text-xl font-bold text-gray-800">Restaurant Admin</h1>
				</div>

				<nav className="p-4 space-y-2">
					{navigation.map((item) => {
						return (
							<Link
								className={`flex items-center gap-3 p-3 rounded-lg ${"text-gray-700 hover:bg-gray-100"}`}
								href={item.href}
								key={item.name}
							>
								<item.icon className="w-5 h-5" />
								<span>{item.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>

			<div className="flex-1 ml-[20%]">{children}</div>
		</section>
	);
}
