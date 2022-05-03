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
import Link from "next/link";
import ActionMenu from "../form/action-menu";
import { useRouter } from "next/router";
import { useGetInvoicesState } from "../../hooks/use-get-invoices-state";
import Pagination from "../table/pagination";

import classnames from "classnames";
import classes from "./all-invoice-table.module.css";

type Sort = "asc" | "desc";
type SortBy = string;

const AllInvoicesTable = () => {
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
        isLoading: isLoadingInvoices,
        invoices,
        total,
    } = useGetInvoicesState(token, limit, offset, sort, sortBy);
    const numberOfPages = Math.ceil((total as number) / limit);


    const handleEdit = (id: string) => {
        router.push(`invoices/edit/${id}`);
    };

    const handleView = (id: string) => {
        router.push(`invoices/${id}`);
    };

    const setQueryURL = (queryObject: object) => {
        router.push(
            {
                pathname: "/invoices",
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
                <h2>{!!total &&`Total:  ${total}`} </h2>
                <div>
                    <Button link="/invoices/add">Add Invoice</Button>
                </div>
            </InfoHeader>

            <Table>
                <TableHead>
                    <TableRow>
                        <HeadCell
                            onClick={() => handleSort("invoice_number")}
                            className={sortClass("invoice_number")}
                        >
                            INVOICE NUMBER
                        </HeadCell>
                        <HeadCell>COMPANY NAME</HeadCell>
                        <HeadCell
                            onClick={() => handleSort("value")}
                            className={sortClass("value")}
                        >
                            VALUE
                        </HeadCell>
                        <HeadCell
                            onClick={() => handleSort("due_date")}
                            className={sortClass("due_date")}
                        >
                            DUE DATE
                        </HeadCell>
                        <HeadCell></HeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoadingInvoices && <LoadingCell />}
                    {!isLoadingInvoices &&
                        invoices.map((singleInvoice) => {
                            const invoiceNumber =
                                singleInvoice.invoice.invoice_number;
                            const value = singleInvoice.invoice.value;
                            const invoiceId = singleInvoice.invoice.id;
                            const due_date = new Date(
                                singleInvoice.invoice.dueDate
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            });
                            const companyName =
                                singleInvoice.client.companyDetails.name;

                            return (
                                <TableRow key={invoiceNumber}>
                                    <DataCell>
                                        <Link
                                            href={`/invoices/${invoiceId}`}
                                        >{`#${invoiceNumber}`}</Link>
                                    </DataCell>
                                    <DataCell>{companyName}</DataCell>
                                    <DataCell>{`$${value}`}</DataCell>
                                    <DataCell>{due_date}</DataCell>
                                    <DataCell>
                                        <ActionMenu>
                                            <button
                                                onClick={() =>
                                                    handleView(invoiceId)
                                                }
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleEdit(invoiceId)
                                                }
                                            >
                                                Edit
                                            </button>
                                        </ActionMenu>
                                    </DataCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <Pagination current={currentPage} total={numberOfPages as number} onPageChange={handleChangePage}/>
        </>
    );
};

export default AllInvoicesTable;
