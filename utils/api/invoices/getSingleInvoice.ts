const apiEndPoint = process.env.apiEndPoint + '/invoices';
import { InvoiceData } from "../../../types/invoice";

type GetInvoiceResponseType = {
    success: boolean;
    invoice: InvoiceData;
}

export const getInvoice =  async (id: string, token: string): Promise<GetInvoiceResponseType>  => {
    const requestURL = apiEndPoint + '/' + id;

    const res = await fetch(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw res.text();
    }
}