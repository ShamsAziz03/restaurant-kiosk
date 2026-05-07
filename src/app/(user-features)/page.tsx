import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex justify-center items-center w-[100%] h-[100vh] bg-[url(https://images.unsplash.com/photo-1543353071-10c8ba85a904?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)] bg-cover bg-center">
			<div className="flex flex-col justify-center items-center">
				<h1 className="p-5 text-5xl text-center mt-20">Wlecome to our KIOSK</h1>
				<Link
					className="text-center border-gray-900 border-2 mt-10"
					href="/orderType"
				>
					<Button className="text-xl" variant="link">
						Order Now
					</Button>
				</Link>

				<Link className="text-center font-bold mt-10" href="/admin">
					<Button className="text-xl" variant="link">
						Admin's Log In
					</Button>
				</Link>
			</div>
		</main>
	);
}
