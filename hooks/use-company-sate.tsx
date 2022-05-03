import { FormEvent, ChangeEvent, useState, useEffect } from "react";

import * as yup from "yup";
import getValidationError from "../utils/validation/getValidationError";


//type
import {CompanyDetails} from '../types/company';

type UserCompanyInput = Record<string, string>;
type InputErrors = Record<string, string | null>;
export type UpdateProfileCallbackType = (submitData: CompanyDetails, resetData: () => void) => void


let schema = yup.object().shape({
    name: yup.string().required("Company name is required!"),
    address: yup.string().required("Company address is required!"),
    vatNumber: yup.string().required("Vat number is required!"),
    regNumber: yup.string().required("Registration number is required!"),
    iban: yup.string(),
    swift: yup.string(),
});

const initialCompanyDetails = {
    name: '',
    address: '',
    vatNumber: '',
    regNumber: '',
    iban: '',
    swift: '',
};


const initialErrors = {
    name: null,
    address: null,
    vatNumber: null,
    regNumber: null,
    iban: null,
    swift: null,
};


export const useUserCompany = (currentCompanyDetails?: Partial<CompanyDetails> | undefined | null) => {

    const [companyDetails, setCompanyDetails] = useState<UserCompanyInput>(initialCompanyDetails);

    const [errors, setErrors] = useState<InputErrors>(initialErrors);

    const formatData= (currentCompanyDetails: Partial<CompanyDetails>) => {
        const data = {
            name: currentCompanyDetails.name ?? '',
            address: currentCompanyDetails.address ?? '',
            vatNumber: currentCompanyDetails.vatNumber ?? '',
            regNumber: currentCompanyDetails.regNumber ?? '',
            iban: currentCompanyDetails.iban ?? '',
            swift: currentCompanyDetails.swift ?? '',
        };
    
        return data;
    }

    useEffect(() => {
        if(currentCompanyDetails) {
            setCompanyDetails(formatData(currentCompanyDetails));
        }
    }, [currentCompanyDetails])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCompanyDetails((prevSate) => {
            const { name, value } = e.target;
            return {
                ...prevSate,
                [name]: value,
            };
        });
    };


    const resetCompanyData = () => {
        setCompanyDetails(initialCompanyDetails);
    }

    const handleSubmit = async (e: FormEvent, onSubmitClient: UpdateProfileCallbackType ) => {
        e.preventDefault();

        const errorMessages = await getValidationError(schema, companyDetails);

        if (errorMessages) {
            setErrors({ ...initialErrors, ...errorMessages });
            return false;
        }
        onSubmitClient(companyDetails as CompanyDetails, resetCompanyData);

    };

    return {
        data: companyDetails,
        errors,
        handleChange,
        handleSubmit
    }
}