import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import getValidationError from "../utils/validation/getValidationError";
import * as yup from "yup";
import { InvoiceData } from "../types/invoice";
import { AddInvoiceParams } from "../utils/api/invoices/addInvoice";

type InputErrors = Record<string, string | null>;

interface ServicesKeysValues {
    [key: string]: string;
}
interface ServiceType extends ServicesKeysValues {
    serviceName: string;
    servicePrice: string;
}

type InputFieldKeys = Record<string, string | number | Date | any[]>;
interface AddInvoiceInput extends InputFieldKeys {
    invoice_number: string;
    client_id: string;
    date: string;
    dueDate: string;
    projectCode: string;
    services: ServiceType[];
}

let schema = yup.object().shape({
    invoice_number: yup.string().required("Invoice number is required!"),
    client_id: yup.string().required("Client is not selected!"),
    date: yup
        .date()
        .typeError("Date is required!")
        .required("Date is required!"),
    dueDate: yup
        .date()
        .typeError("Date is required!")
        .required("Due date is required!"),

    projectCode: yup
        .string()
        .required("Project code is required!"),
    services: yup.array(
        yup.object({
            serviceName: yup.string().required("Service name is required"),
            servicePrice: yup.string().required("Service price is required"),
        })
    ),
});

const initialErrors = {
    invoice_number: null,
    client_id: null,
    date: null,
    dueDate: null,
    value: null,
    services: null,
};

const initialInvoiceInfo = {
    invoice_number: "",
    client_id: "",
    date: "",
    dueDate: "",
    projectCode: "",
    services: [],
};

export const useInvoiceState = (defaultData?: InvoiceData | undefined) => {
    const [invoiceInfo, setInvoiceInfo] =
        useState<AddInvoiceInput>(initialInvoiceInfo);

    const [errors, setErrors] = useState<InputErrors>(initialErrors);

    useEffect(() => {
        if (defaultData) {
            let defaultInvoiceInfo = {
                client_id: defaultData.client_id,
                invoice_number: defaultData.invoice_number,
                date: new Date(defaultData.date).toISOString().split('T')[0],
                dueDate: new Date(defaultData.dueDate).toISOString().split('T')[0],
                projectCode: defaultData.projectCode,
                services: defaultData.meta?.services ?? [],
            };
            setInvoiceInfo(defaultInvoiceInfo);
        }
    }, [defaultData]);

    const handleChange = async (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name.indexOf("services") !== -1) {
            const nameValue = name.match(
                /\d+|(serviceName|servicePrice)/g
            ) as string[];
            const index = parseInt(nameValue[0]);
            const fieldName = nameValue[1];

            if (
                index !== undefined &&
                typeof index === "number" &&
                fieldName !== undefined
            ) {
                setInvoiceInfo((prevSate) => {
                    const services = [...(prevSate.services as ServiceType[])];
                    const currentService = { ...services[index] };

                    currentService[fieldName] = value;
                    services[index] = currentService;

                    return { ...prevSate, services };
                });
            }
        } else {
            setInvoiceInfo((prevSate) => {
                return {
                    ...prevSate,
                    [name]: value,
                };
            });
        }
    };

    const formattedData = () => {   
        const value = invoiceInfo.services.reduce((prev, current) => {
            return prev + parseInt(current.servicePrice);
        }, 0);

        const addInvoiceParams = {
            client_id: invoiceInfo.client_id,
            invoice_number: invoiceInfo.invoice_number,
            date: Date.parse(invoiceInfo.date),
            dueDate: Date.parse(invoiceInfo.dueDate),
            projectCode: invoiceInfo.projectCode,
            value,
            meta: {
                services: invoiceInfo.services,
            },
        };

        return addInvoiceParams as AddInvoiceParams;
    };

    const resetInvoiceData = () => {
        setInvoiceInfo(initialInvoiceInfo);
    };

    const handleRemoveService = (index: number) => {
        setInvoiceInfo((prevSate) => {
            let services = [...prevSate.services];
            services.splice(index, 1);

            return { ...prevSate, services };
        });
    };

    const handleAddService = () => {
        setInvoiceInfo((prevSate) => {
            const newService = {
                serviceName: "",
                servicePrice: "",
            };

            let services = prevSate.services;
            services.push(newService);
            return { ...prevSate, services };
        });
    };

    const handleSubmit = async (
        e: FormEvent,
        cb: (invoiceData: AddInvoiceParams, rest: () => void) => void
    ) => {
        e.preventDefault();

        const errors = await getValidationError(schema, invoiceInfo);

        if (errors) {
            setErrors({ ...initialErrors, ...errors });
            return false;
        } else {
            setErrors(initialErrors);
            cb(formattedData(), resetInvoiceData);
        }
    };

    return {
        data: invoiceInfo,
        errors,
        handleChange,
        handleSubmit,
        handleAddService,
        handleRemoveService,
    };
};
