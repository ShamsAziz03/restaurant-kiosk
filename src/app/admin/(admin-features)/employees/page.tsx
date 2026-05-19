"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Users } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import NewMemberPage from "@/components/customComponents/addNewMemberDialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type Roles = "admin" | "kitchenStaff";

export type Employee = {
	memberId: number;
	fullName: string;
	email: string;
	passwordHash: string;
	phone: string;
	role: Roles;
	createdAt: string;
};

async function fetchEmployees() {
	try {
		const response = await fetch("http://localhost:3000/api/employees");
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Failed to fetch employees:", error);
	}
}

async function deleteMemberFunc(
	memberId: number,
	setDeletedMember: Dispatch<SetStateAction<Employee | null>>,
	queryClient: ReturnType<typeof useQueryClient>,
) {
	const payload = {
		id: memberId,
	};
	const responseOrder = await fetch("http://localhost:3000/api/employees", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const response = await responseOrder.json();
	if (response.success) {
		alert("Employee deleted successfully");
		queryClient.invalidateQueries({ queryKey: ["employees"] });
		setDeletedMember(null);
	} else {
		alert("Error in deleting Employee");
	}
}

const EmployeeManagementPage = () => {
	const queryClient = useQueryClient();
	const [selectedRole, setSelectedRole] = useState<
		"admin" | "kitchenStaff" | "all"
	>("all");
	const rowsPerPage = 6;
	const [startIndex, setStartIndex] = useState(0);
	const [endIndex, setEndIndex] = useState(rowsPerPage);
	const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
	const [deleteMember, setDeletedMember] = useState<Employee | null>(null);

	const {
		data: employees,
		isLoading: employeesIsLoading,
		error: employeesError,
	} = useQuery({
		queryKey: ["employees"],
		queryFn: fetchEmployees,
	});

	const roles = useMemo(() => {
		const membersRoles = employees?.map((emp: Employee) => emp.role);
		const rolesResult = membersRoles?.filter(
			(item: Roles, index: number) => membersRoles.indexOf(item) === index,
		);
		return rolesResult;
	}, [employees]);

	const filteredEmployees = useMemo(() => {
		let result = employees;
		if (selectedRole !== "all") {
			result = result.filter((emp: Employee) => emp.role === selectedRole);
		}
		return result;
	}, [selectedRole, employees]);

	if (employeesIsLoading)
		return <div className="p-8">Loading employees...</div>;
	if (employeesError)
		return (
			<div className="p-8 text-red-600">
				Error fetching employees:
				{employeesError?.message}
			</div>
		);

	return (
		<ScrollArea className="w-[100%] bg-gray-100 min-h-full">
			<div className="p-6">
				{/* Header Section */}
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-800">
							Employee Management
						</h1>
						<p className="text-gray-600 mt-2">
							Manage staff members, roles, and access permissions.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<button
							className="flex items-center gap-2 px-6 py-3 text-white bg-gray-800 rounded-lg shadow-lg hover:shadow-xl"
							onClick={() => setShowAddMemberDialog(true)}
							type="button"
						>
							<Plus className="w-5 h-5" />
							Add New Employee
						</button>
					</div>
				</div>

				{/* Role Filter */}
				<div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-slate-200">
					<h2 className="text-lg text-black mb-4">Filter by Role</h2>
					<div className="flex flex-wrap gap-3">
						<button
							className={`px-5 py-2 rounded-lg ${
								selectedRole === "all"
									? "bg-gray-800 text-white shadow-md"
									: "bg-gray-100 text-gray-700"
							}`}
							onClick={() => setSelectedRole("all")}
							type="button"
						>
							All Employees
						</button>
						{roles?.map((role: Roles) => (
							<button
								className={`px-5 py-2 rounded-lg ${
									selectedRole === role
										? "bg-gray-800 text-white shadow-md"
										: "bg-gray-100 text-gray-700"
								}`}
								key={role}
								onClick={() => setSelectedRole(role)}
								type="button"
							>
								{role}
							</button>
						))}
					</div>
				</div>

				{/* Employees Table/Cards */}
				<div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
					{filteredEmployees.length === 0 ? (
						<div className="text-center py-12">
							<Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
							<p className="text-slate-500 text-lg">No employees found</p>
						</div>
					) : (
						<div>
							<div className="hidden md:block overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-slate-200">
											<th className="text-left py-4 px-4 font-semibold text-slate-700">
												Name
											</th>
											<th className="text-left py-4 px-4 font-semibold text-slate-700">
												Email
											</th>
											<th className="text-left py-4 px-4 font-semibold text-slate-700">
												Phone
											</th>
											<th className="text-left py-4 px-4 font-semibold text-slate-700">
												Role
											</th>
											<th className="text-left py-4 px-4 font-semibold text-slate-700">
												Joined
											</th>
											<th className="text-center py-4 px-4 font-semibold text-slate-700">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{filteredEmployees
											.slice(startIndex, endIndex)
											.map((employee: Employee) => (
												<tr
													className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
													key={employee.memberId}
												>
													<td className="py-4 px-4 font-medium text-slate-900">
														{employee.fullName}
													</td>
													<td className="py-4 px-4 text-slate-600">
														{employee.email}
													</td>
													<td className="py-4 px-4 text-slate-600">
														{employee.phone}
													</td>
													<td className="py-4 px-4">
														<span
															className={`px-3 py-1 rounded-full text-sm font-medium ${
																employee.role === "admin"
																	? "bg-purple-100 text-purple-800"
																	: "bg-green-100 text-green-800"
															}`}
														>
															{employee.role === "admin"
																? "Admin"
																: "Kitchen Staff"}
														</span>
													</td>
													<td className="py-4 px-4 text-slate-600">
														{new Date(employee.createdAt).toLocaleDateString()}
													</td>
													<td className="py-4 px-4 flex justify-center gap-2">
														<button
															className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
															onClick={() => setDeletedMember(employee)}
															type="button"
														>
															<Trash2 className="w-5 h-5" />
														</button>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>

				<Pagination>
					<PaginationContent className="w-[100%] flex justify-center items-center gap-5 mt-8">
						<PaginationItem>
							<PaginationPrevious
								className={`${
									startIndex === 0
										? "pointer-events-none opacity-50"
										: "cursor-pointer hover:bg-slate-100"
								} p-3 rounded-md text-slate-700 font-bold transition-colors`}
								onClick={() => {
									setStartIndex(Math.max(0, startIndex - rowsPerPage));
									setEndIndex(Math.max(rowsPerPage, endIndex - rowsPerPage));
								}}
								size={15}
							/>
						</PaginationItem>

						<span className="text-slate-600 font-medium">
							Page {Math.floor(startIndex / rowsPerPage) + 1} of{" "}
							{Math.ceil(filteredEmployees.length / rowsPerPage)}
						</span>

						<PaginationItem>
							<PaginationNext
								className={`${
									endIndex >= filteredEmployees.length
										? "pointer-events-none opacity-50"
										: "cursor-pointer hover:bg-slate-100"
								} p-3 rounded-md text-slate-700 font-bold transition-colors`}
								onClick={() => {
									setStartIndex(startIndex + rowsPerPage);
									setEndIndex(endIndex + rowsPerPage);
								}}
								size={15}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>

				<NewMemberPage
					roles={roles}
					setShowAddMemberDialog={setShowAddMemberDialog}
					showAddMemberDialog={showAddMemberDialog}
				/>

				<Dialog
					onOpenChange={() => setDeletedMember(null)}
					open={!!deleteMember}
				>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Are you absolutely sure to delete the
								{` ${deleteMember?.fullName}` || "Member"}?
							</DialogTitle>
							<DialogDescription>
								This action will permanently delete the Member.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									className="rounded-md text-lg"
									onClick={() => setDeletedMember(null)}
									variant="outline"
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								className="rounded-md text-lg"
								onClick={() =>
									deleteMemberFunc(
										deleteMember?.memberId || 0,
										setDeletedMember,
										queryClient,
									)
								}
								type="submit"
							>
								Delete
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};

export default EmployeeManagementPage;
