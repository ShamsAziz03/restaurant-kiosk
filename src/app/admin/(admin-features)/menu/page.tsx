import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MenuPage = () => {
	return (
		<ScrollArea className="w-[100%]">
			<div className="p-16">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
					<p className="text-gray-600 mt-1">
						Welcome back! Here's what's happening today.
					</p>
				</div>
			</div>

			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default MenuPage;
