import { InvoiceData } from "../../../types/invoice";
const apiEndPoint = process.env.apiEndPoint + '/invoices';

type AddInvoiceParams = Omit<
    InvoiceData,
    "id" | "user_id" | "projectCode"
>

type AddInvoiceReturnType = {
    success: boolean;
    invoice: InvoiceData
}

export const editInvoice = async (data: Partial<AddInvoiceParams>, id: string, token: string): Promise<AddInvoiceReturnType> => {
    const res = await fetch(apiEndPoint, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, id})
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}
