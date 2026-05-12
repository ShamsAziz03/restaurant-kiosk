import { create } from "zustand";

export type User = {
	fullName: string;
	email: string;
	phone: string;
	role: "admin" | "kitchenStaff";
};

type StoreProps = {
	loggedUser: User;
	setLoggedUser: (user: User) => void;
	removeLoggedUser: () => void;
};

export const useLoggedUserStore = create<StoreProps>((set) => ({
	loggedUser: {
		fullName: "",
		email: "",
		phone: "",
		role: "admin",
	},

	setLoggedUser: (user) => {
		set(() => ({
			loggedUser: {
				email: user.email,
				fullName: user.fullName,
				phone: user.phone,
				role: user.role,
			},
		}));
	},
	removeLoggedUser: () => {
		set(() => ({
			loggedUser: {
				email: "",
				fullName: "",
				phone: "",
				role: "admin",
			},
		}));
	},
}));
