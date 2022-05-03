import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { InvoiceData } from "../../types/invoice";
import { editInvoice } from "../../utils/api/invoices/editInvoice";
import InvoiceForm, { SubmitInvoiceFuncType } from "./invoice-form";


type PropsTypes = {
    id: string;
    invoice: InvoiceData;
}

const EditInvoiceForm: React.FC<PropsTypes> = ({id, invoice}) => {
    const { data: session } = useSession();
    const token = session?.user.token as string;

    const submitForm: SubmitInvoiceFuncType = async (
        data,
        restData,
        onSubmitError
    ) => {
        try {
            let res = await editInvoice(data, id, token);

            if (res.success) {
                toast.success("Successfully updated invoice");
                onSubmitError(null);
            } else {
                toast.error("Unable to update invoice, something went wrong!");
            }
        } catch (e) {
            onSubmitError(e as string);
        }
    };

    return (
        <InvoiceForm
            submitText="Update Invoice"
            onSubmitForm={submitForm}
            defaultSate={invoice}
        />
    );
};

export default EditInvoiceForm;
