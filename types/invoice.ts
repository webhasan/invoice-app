import { CompanyDetails } from "./company";
export type InvoiceData = {
    id: string;
    invoice_number: string;
    user_id: string;
    client_id: string;
    date: number;
    dueDate: number;
    value: number;
    projectCode: string;
    meta?: Record<string, any>;
}

export type ClientData = {
    id: string;
    user_id: string;
    email: string;
    name: string;
    companyDetails: CompanyDetails;
}

export type InvoiceWithClientDetails = {
    invoice: InvoiceData
    client: ClientData
}

export type GetInvoicesResponse = {
    invoices: InvoiceWithClientDetails[], 
    total: number;
}