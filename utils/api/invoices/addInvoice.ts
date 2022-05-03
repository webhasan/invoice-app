import { InvoiceData } from "../../../types/invoice";
const apiEndPoint = process.env.apiEndPoint + '/invoices';

export type AddInvoiceParams = Omit<InvoiceData, "id" | "user_id">

type AddInvoiceReturnType = {
    success: boolean;
    invoice: InvoiceData
}

export const addInvoice = async (invoiceData: AddInvoiceParams, token: string): Promise<AddInvoiceReturnType> => {
    const res = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData)
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}
