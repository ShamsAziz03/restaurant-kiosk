"use client";
import "../../globals.css";
import {
	ChefHat,
	LayoutDashboard,
	LogOut,
	Menu,
	Pencil,
	PlusCircle,
	ShoppingBag,
	Users,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLoggedUserStore } from "@/source/loggedUserStore";

const navigation = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "Orders", href: "/admin/orders", icon: ShoppingBag },
	{ name: "Menu", href: "/admin/menu", icon: Menu },
	{ name: "Employees", href: "/admin/employees", icon: Users },
	{ name: "Add New Admin", href: "/admin/newAdmin", icon: PlusCircle },
	{ name: "Edit Profile", href: "/admin/editProfile", icon: Pencil },
];

function handleLogOut(router: AppRouterInstance, removeUser: () => void) {
	removeUser();
	router.replace("/admin");
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const removeUser = useLoggedUserStore((state) => state.removeLoggedUser);

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
				<div className="flex items-center justify-center w-[90%] p-3 mt-8">
					<Button
						className="w-[70%] rounded-lg border-l-4"
						onClick={() => handleLogOut(router, removeUser)}
						type="button"
					>
						<LogOut className="w-5 h-5" />
						<span>Log Out</span>
					</Button>
				</div>
			</div>

			<div className="flex-1 ml-[20%]">{children}</div>
		</section>
	);
}
