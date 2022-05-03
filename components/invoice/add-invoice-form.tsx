import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { addInvoice } from "../../utils/api/invoices/addInvoice";
import InvoiceForm, { SubmitInvoiceFuncType } from "./invoice-form";

const AddInvoiceForm = () => {
    const { data: session } = useSession();
    const token = session?.user.token as string;

    const submitForm: SubmitInvoiceFuncType = async (
        data,
        restData,
        onSubmitError
    ) => {
        try {
            let res = await addInvoice(data, token);

            if (res.success) {
                toast.success("Successfully add new invoice");
                onSubmitError(null);
                restData();
            } else {
                toast.error("Something wen't wrong! Unable to add invoice!");
            }
        } catch (e) {
            onSubmitError(e as string);
        }
    };

    return <InvoiceForm submitText="Add Invoice" onSubmitForm={submitForm} />;
};

export default AddInvoiceForm;
