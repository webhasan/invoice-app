import { CompanyDetails } from "./company";

export type Client = {
    totalBilled: number;
    invoicesCount: number;
    id: string;
    user_id: string;
    email: string;
    name: string;
    companyDetails: CompanyDetails;
}

export type GetClientsResponse = {
    clients: Client[],
    total: number; 
}