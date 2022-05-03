import { CompanyDetails } from "./company";
export type UserData = {
    id: string
    name: string
    email: string
    companyDetails?: CompanyDetails
};