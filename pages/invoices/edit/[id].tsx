import Head from "next/head";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EditInvoiceForm from "../../../components/invoice/edit-invoice-form";
import { useRouter } from "next/router";
import { getInvoice } from "../../../utils/api/invoices/getSingleInvoice";

import { InvoiceData } from "../../../types/invoice";

const AddInvoicePage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const token = session?.user.token as string;

    const [invoice, setInvoice] = useState<InvoiceData | null>(null);

    useEffect(() => {
        if(id && token) {
            (async () => {
                try {
                    const result = await getInvoice(id, token);
                    setInvoice(result.invoice);
                }catch(e) {
                    router.push('/404');
                }
            })();
        }
    }, [id, router, token]);

    const loading = 'loading' === status;

    if(typeof window === undefined || loading || !invoice) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Add Invoice | Invoice App</title>
            </Head>
            <div>
                <h1 className="text-center page-header">Add Invoice</h1>
                <EditInvoiceForm id={id} invoice={invoice}/>
            </div>
        </>
    );
};

export default AddInvoicePage;
