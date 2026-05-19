import { create } from "zustand";

export type User = {
	memberId: number;
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
		memberId: 1,
		fullName: "",
		email: "",
		phone: "",
		role: "admin",
	},

	setLoggedUser: (user) => {
		set(() => ({
			loggedUser: {
				memberId: user.memberId,
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
				memberId: 1,
				email: "",
				fullName: "",
				phone: "",
				role: "admin",
			},
		}));
	},
}));
