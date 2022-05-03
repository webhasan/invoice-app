import Head from "next/head";
import { useSession } from "next-auth/react";
import AddInvoiceForm from "../../components/invoice/add-invoice-form";
import { useRouter } from "next/router";

const AddInvoicePage = () => {
    const router = useRouter();
    const {status} = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push(`/login?redirect=${window.location.href}`);
        }
    });

    const loading = 'loading' === status;

    if(typeof window === undefined || loading) {
        return null;
    }

    return (
        <>
            <Head>
                <title>Add Invoice | Invoice App</title>
            </Head>
            <div>
                <h1 className="text-center page-header">Add Invoice</h1>
                <AddInvoiceForm />
            </div>
        </>
    );
};

export default AddInvoicePage;
