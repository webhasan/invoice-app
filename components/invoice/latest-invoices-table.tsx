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

const LatestInvoicesTable = () => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const token = session?.user.token as string;

    const loading = status === "loading";
    const {invoices, isLoading: isLoadingInvoices} = useGetInvoicesState(token, 6);

    if (loading) {
        return null;
    }

    const handleEdit = (id: string) => {
        router.push(`invoices/edit/${id}`);
    };

    const handleView = (id: string) => {
        router.push(`invoices/${id}`);
    };

    return (
        <>
            <InfoHeader>
                <h2>Latest Invoice</h2>
                <div>
                    <Button link="/invoices/add">Add Invoice</Button>
                    <Button link="/invoices">All Invoice</Button>
                </div>
            </InfoHeader>

            <Table>
                <TableHead>
                    <TableRow>
                        <HeadCell>INVOICE NUMBER</HeadCell>
                        <HeadCell>COMPANY NAME</HeadCell>
                        <HeadCell>VALUE</HeadCell>
                        <HeadCell>DUE DATE</HeadCell>
                        <HeadCell></HeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoadingInvoices && <LoadingCell colSpan={5}/>}
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
        </>
    );
};

export default LatestInvoicesTable;
