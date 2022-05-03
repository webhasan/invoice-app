import { useSession } from "next-auth/react";
import Button from "../style/button";
import InfoHeader from "../utility/info-header";
import Table from "../table/table";
import TableHead from "../table/table-header";
import TableBody from "../table/table-body";
import TableRow from "../table/table-row";
import HeadCell from "../table/head-cell";
import DataCell from "../table/data-cell";
import LoadingCell from "../table/loading-cell";
import { Avatar } from "../icons/avatar";
import ActionMenu from "../form/action-menu";
import { useRouter } from "next/router";
import { useGetClientsState } from "../../hooks/use-get-clients-state";
import Pagination from "../table/pagination";

import classnames from "classnames";
import classes from "./all-clients-table.module.css";

type Sort = "asc" | "desc";
type SortBy = string;

const AllClientsTable = () => {
	const router = useRouter();

	const { data: session, status } = useSession();
	const token = session?.user.token as string;
	const isLoadingSession = status === "loading";

	const limit = router.query.limit
		? parseInt(router.query.limit as string)
		: 4;
	const currentPage = router.query.page
		? parseInt(router.query.page as string)
		: 1;
	const sort = router.query.sort as Sort;
	const sortBy = router.query.sortBy as SortBy;
	const offset = (currentPage - 1) * limit;

	const {
		isLoading: isLoadingClient,
		clients,
		total,
	} = useGetClientsState(token, limit, offset, sort, sortBy);
	const numberOfPages = Math.ceil((total as number) / limit);

	const handleEdit = (id: string) => {
		router.push(`clients/edit/${id}`);
	};

	const handleView = (id: string) => {
		router.push(`clients/${id}`);
	};

	const setQueryURL = (queryObject: object) => {
		router.push(
			{
				pathname: "/clients",
				query: { ...router.query, ...queryObject },
			},
			undefined,
			{
				scroll: false,
				shallow: true,
			}
		);
	};

	const handleSort = (selectedSortBy: string) => {
		const sortObject: Record<string, string> = {};

		if (selectedSortBy !== sortBy) {
			sortObject.sortBy = selectedSortBy;
			sortObject.sort = "asc";
		} else {
			sortObject.sort = sort === "asc" ? "desc" : "asc";
		}

		setQueryURL(sortObject);
	};

	const handleChangePage = (page: number) => {
		setQueryURL({ page });
	};

	const sortClass = (selectedSortBy: string) => {
		const isActiveSort = sortBy === selectedSortBy;

		return classnames(classes.sortable, {
			[classes[sort as string]]: isActiveSort,
		});
	};

	if (isLoadingSession) {
		return null;
	}

	return (
		<>
			<InfoHeader>
				<h2>{!!total && `Total:  ${total}`} </h2>
				<div>
					<Button link="/clients/add">Add Client</Button>
				</div>
			</InfoHeader>

			<Table>
				<TableHead>
					<TableRow>
						<HeadCell
							className={sortClass("name")}
							onClick={() => handleSort("name")}
						>
							CLIENT NAME
						</HeadCell>
						<HeadCell
							className={sortClass("companyName")}
							onClick={() => handleSort("companyName")}
						>
							COMPANY NAME
						</HeadCell>
						<HeadCell></HeadCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{isLoadingClient && <LoadingCell />}
					{!isLoadingClient &&
						clients.map((client) => (
							<TableRow key={client.id}>
								<DataCell>
									<div className={classes["client-details"]}>
										<span className={classes["avatar"]}>
											<Avatar size={35} />
										</span>
										<span
											className={classes["client-info"]}
										>
											<span className={classes["name"]}>
												{client.name}
											</span>
											<span className={classes["email"]}>
												<a
													href={`mailto: ${client.email}`}
												>
													{client.email}
												</a>
											</span>
										</span>
									</div>
								</DataCell>
								<DataCell>
									{client.companyDetails.name}
								</DataCell>
								<DataCell>
									<ActionMenu>
										<button
											onClick={() =>
												handleView(client.id)
											}
										>
											View
										</button>
										<button
											onClick={() =>
												handleEdit(client.id)
											}
										>
											Edit
										</button>
									</ActionMenu>
								</DataCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<Pagination
				current={currentPage}
				total={numberOfPages as number}
				onPageChange={handleChangePage}
			/>
		</>
	);
};

export default AllClientsTable;
