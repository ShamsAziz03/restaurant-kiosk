"use client";
import "../../globals.css";
import {
	ChefHat,
	LayoutDashboard,
	LogOut,
	Menu,
	MessageCircle,
	Pencil,
	PlusCircle,
	ShoppingBag,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "Orders", href: "/admin/orders", icon: ShoppingBag },
	{ name: "Menu", href: "/admin/menu", icon: Menu },
	{ name: "Employees", href: "/admin/employees", icon: Users },
	{ name: "Messages", href: "/admin/messages", icon: MessageCircle },
	{ name: "Add New Admin", href: "/admin/newAdmin", icon: PlusCircle },
	{ name: "Edit Profile", href: "/admin/editProfile", icon: Pencil },
	{ name: "LogOut", href: "/admin", icon: LogOut },
];

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<section className="flex flex-row w-[100%] h-[100vh] relative">
			{/* Sidebar */}
			<div className="w-[20%] bg-white h-[100vh] fixed">
				<div className="flex items-center gap-3 p-6 border-b">
					<ChefHat className="w-8 h-8 text-gray-500" />
					<h1 className="text-xl font-bold text-gray-800">Restaurant Admin</h1>
				</div>

				<nav className="p-4 space-y-2">
					{navigation.map((item) => {
						return (
							<Link
								className={`flex items-center gap-3 p-3 rounded-lg border-l-4
    ${
			pathname === item.href
				? "border-indigo-500 bg-indigo-50 text-indigo-700"
				: "text-gray-500 border-transparent"
		}`}
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
