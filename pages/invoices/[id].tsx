import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getInvoice } from "../../utils/api/invoices/getSingleInvoice";
import { getClient } from "../../utils/api/clients/getSingleClient";
import Row from "../../components/layout/grid/row";
import Column from "../../components/layout/grid/column";
import { getUser } from "../../utils/api/auth/getUser";
import CompanyDetails from "../../components/invoice/company-details";
import { InvoiceData } from "../../types/invoice";
import { ClientData } from "../../types/invoice";
import { UserData } from "../../types/user";
import { toast } from "react-toastify";
import Box from "../../components/style/box";
import InvoiceInfo from "../../components/invoice/invoice-info";
import InvoiceServicesTable from "../../components/invoice/invoice-service-table";
import PrintButton from "../../components/utility/pring-button";
import Head from "next/head";

const SingleInvoicePage = () => {
    const router = useRouter();
    const invoiceId = router.query.id as string;
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push(`/login?redirect=${window.location.href}`);
        },
    });
    const token = session?.user.token as string;
    const loading = "loading" === status;

    const [invoice, setInvoice] = useState<InvoiceData>();
    const [client, setClient] = useState<ClientData>();
    const [user, setUser] = useState<UserData>();

    useEffect(() => {
        if (invoiceId && token) {
            (async () => {
                try {
                    const response = await getInvoice(invoiceId, token);
                    if (response.success) {
                        setInvoice(response.invoice);
                    }
                } catch (e) {
                    router.push("/404");
                }
            })();
        }
    }, [invoiceId, token, router]);

    useEffect(() => {
        const clientId = invoice?.client_id;
        if (clientId && token) {
            (async () => {
                try {
                    const res = await getClient(clientId, token);
                    if (res.success) {
                        setClient(res.client);
                    }
                } catch (e) {
                    toast.error("Error, unable to load client data");
                }
            })();
        }
    }, [invoice?.client_id, token, router]);

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const user = await getUser(token);
                    setUser(user);
                } catch (e) {
                    toast.error("Error, unable to load client data");
                }
            })();
        }
    }, [token]);

    if (
        typeof window === undefined ||
        loading ||
        !invoice ||
        !client ||
        !user
    ) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Invoice {invoiceId}</title>
            </Head>
            <Box size={1000}>
                <Row>
                    <Column>
                        <h2>Supplier:</h2>
                        <CompanyDetails
                            name={user.companyDetails?.name as string}
                            address={user.companyDetails?.address as string}
                            vatNumber={user.companyDetails?.vatNumber as string}
                            iban={user.companyDetails?.iban}
                            swift={user.companyDetails?.swift}
                        />
                    </Column>

                    <Column>
                        <h2>Client:</h2>
                        <CompanyDetails
                            name={client.companyDetails?.name as string}
                            address={client.companyDetails?.address as string}
                            vatNumber={
                                client.companyDetails?.vatNumber as string
                            }
                            iban={client.companyDetails?.iban}
                            swift={client.companyDetails?.swift}
                        />
                    </Column>
                </Row>

                <InvoiceInfo
                    invoiceNumber={invoice.invoice_number}
                    projectCode={invoice.projectCode}
                    invoiceDate={invoice.date}
                    dueDate={invoice.dueDate}
                />

                <InvoiceServicesTable
                    services={invoice.meta?.services}
                    total={invoice.value}
                />

                <div className="text-center">
                    <PrintButton />
                </div>
            </Box>
        </>
    );
};

export default SingleInvoicePage;
