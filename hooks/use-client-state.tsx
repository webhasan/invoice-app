import { FormEvent, ChangeEvent, useState, useEffect } from "react";

import * as yup from "yup";
import getValidationError from "../utils/validation/getValidationError";


//type
import { ClientData } from "../types/invoice";
import { NewClientInfo } from "../utils/api/clients/addClient";
type AddClientInput = Record<string, string>;
type InputErrors = Record<string, string | null>;
export type SubmitClientCallbackType = (submitData: NewClientInfo, resetData: () => void) => void



let schema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    email: yup
        .string()
        .email("Email address is not valid")
        .required("Email is required!"),
    companyName: yup.string().required("Company name is required!"),
    companyAddress: yup.string().required("Company address is required!"),
    vatNumber: yup.string().required("Vat number is required!"),
    regNumber: yup.string().required("Registration number is required!"),
    iban: yup.string(),
    swift: yup.string(),
});

const initialErrors = {
    name: null,
    email: null,
    companyName: null,
    companyAddress: null,
    vatNumber: null,
    regNumber: null,
    iban: null,
    swift: null,
};

const initialClientInfo = {
    name: "",
    email: "",
    companyName: "",
    companyAddress: "",
    vatNumber: "",
    regNumber: "",
    iban: "",
    swift: "",
};

export const useClientState = (defaultClientData?: ClientData | undefined | null) => {
    const [clientInfo, setClientInfo] =
    useState<AddClientInput>(initialClientInfo);
    const [errors, setErrors] = useState<InputErrors>(initialErrors);

    const formatData= (client: ClientData) => {
        const data = {
            name: client.name,
            email: client.email,
            companyName: client.companyDetails.name,
            companyAddress: client.companyDetails.address,
            vatNumber: client.companyDetails.vatNumber,
            regNumber: client.companyDetails.regNumber,
            iban: client.companyDetails.iban ?? '',
            swift: client.companyDetails.swift ?? '',
        };
    
        return data;
    }

    useEffect(() => {
        if(defaultClientData) {
            setClientInfo(formatData(defaultClientData));
        }
    }, [defaultClientData])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClientInfo((prevSate) => {
            const { name, value } = e.target;
            return {
                ...prevSate,
                [name]: value,
            };
        });
    };

    const getNewClientInfo = ()  => {
        const {name, email, ...restInfo} = clientInfo;
        const {companyName, companyAddress, ...restCompanyInfo} = restInfo;

        const companyDetails = {
            name: companyName,
            address: companyAddress,
            ...restCompanyInfo
        }
        return {name, email, companyDetails} as NewClientInfo;
    }

    const resetClientData = () => {
        setClientInfo(initialClientInfo);
    }

    const handleSubmit = async (e: FormEvent, onSubmitClient: SubmitClientCallbackType ) => {
        e.preventDefault();

        const errorMessages = await getValidationError(schema, clientInfo);

        if (errorMessages) {
            setErrors({ ...initialErrors, ...errorMessages });
            return false;
        }

        const newClientInfo = getNewClientInfo();
        onSubmitClient(newClientInfo, resetClientData);

    };

    return {
        data: clientInfo,
        errors,
        handleChange,
        handleSubmit
    }
}