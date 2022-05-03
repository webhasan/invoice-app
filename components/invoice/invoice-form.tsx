import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGetClientsState } from "../../hooks/use-get-clients-state";
import { useInvoiceState } from "../../hooks/use-invoice-state";

import Box from "../style/box";
import Input from "../form/input";
import Select from "../form/select";
import Submit from "../form/submit";
import Row from "../layout/grid/row";
import Column from "../layout/grid/column";
import { AddInvoiceParams } from "../../utils/api/invoices/addInvoice";

import FormErrorNotification from "../form/form-error-notification";
import classes from "./invoice-form.module.css";
import { InvoiceData } from "../../types/invoice";



export type SubmitInvoiceFuncType = (
    data: AddInvoiceParams,
    restData: () => void,
    onSubmitError: (message: string | null) => void
) => void;

type PropsTypes = {
    submitText: string;
    onSubmitForm: SubmitInvoiceFuncType;
    defaultSate?: InvoiceData;
};

const InvoiceForm: React.FC<PropsTypes> = ({
    submitText,
    onSubmitForm,
    defaultSate,
}) => {
    const router = useRouter();
    const [addInvoiceError, setAddInvoiceError] = useState<string | null>(null);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`/login?redirect=${window.location.href}`);
        },
    });

    const token = session?.user.token as string;
    const { isLoading: isLoadingClients, clients} = useGetClientsState(token);

    const {
        data: invoiceInfo,
        errors,
        handleChange,
        handleSubmit,
        handleAddService,
        handleRemoveService,
    } = useInvoiceState(defaultSate);

    const loading = status === "loading";

    const onSubmitError = (message: string | null) => {
        setAddInvoiceError(message);
    };

    const handleAddInvoice = async (
        invoiceData: AddInvoiceParams,
        reset: () => void
    ) => {
        onSubmitForm(invoiceData, reset, onSubmitError);
    };

    if (typeof window === "undefined" || loading || isLoadingClients) {
        return null;
    }

    return (
        <Box size={800}>
            <div className={classes["form-wrap"]}>
                <form onSubmit={(e) => handleSubmit(e, handleAddInvoice)}>
                    <Row>
                        <Column>
                            <Select
                                name="client_id"
                                id="client"
                                label="Choose Client"
                                onChange={handleChange}
                                value={invoiceInfo.client_id as string}
                                error={errors.client_id}
                                options={clients.map((client) => ({
                                    id: client.id,
                                    clientName: client.name,
                                }))}
                            />
                        </Column>

                        <Column>
                            <Input
                                name="invoice_number"
                                type="text"
                                onChange={handleChange}
                                value={invoiceInfo.invoice_number as string}
                                id="invoice_number"
                                label="Invoice Number"
                                error={errors.invoice_number}
                            />
                        </Column>

                        <Column>
                            <Input
                                name="projectCode"
                                type="string"
                                onChange={handleChange}
                                value={invoiceInfo.projectCode as string}
                                id="projectCode"
                                label="Project Code"
                                error={errors.projectCode}
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                name="date"
                                type="date"
                                onChange={handleChange}
                                value={invoiceInfo.date}
                                id="date"
                                label="Invoice Date"
                                error={errors.date}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="dueDate"
                                type="date"
                                onChange={handleChange}
                                value={invoiceInfo.dueDate}
                                id="date"
                                label="Invoice Date"
                                error={errors.dueDate}
                            />
                        </Column>
                        
                    </Row>

                    {invoiceInfo.services.map((item, index) => {
                        const serviceFieldName = `services[${index}].serviceName`;
                        const priceFieldName = `services[${index}].servicePrice`;

                        return (
                            <Row
                                className="services"
                                alignItems="center"
                                key={index}
                            >
                                <Column size={4}>
                                    <Input
                                        name={serviceFieldName}
                                        type="text"
                                        onChange={handleChange}
                                        value={item.serviceName}
                                        id={serviceFieldName}
                                        label="Service Title"
                                        error={errors[serviceFieldName]}
                                    />
                                </Column>
                                <Column size={2}>
                                    <Input
                                        name={priceFieldName}
                                        type="number"
                                        onChange={handleChange}
                                        value={item.servicePrice}
                                        id={priceFieldName}
                                        label="Price"
                                        error={errors[priceFieldName]}
                                    />
                                </Column>
                                <Column size={1}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveService(index)
                                        }
                                    >
                                        x
                                    </button>
                                </Column>
                            </Row>
                        );
                    })}

                    <div className="text-right">
                        <button type="button" onClick={handleAddService}>
                            Add Service
                        </button>
                    </div>

                    {!!addInvoiceError && (
                        <FormErrorNotification message={addInvoiceError} />
                    )}

                    <div className={classes.action}>
                        <Submit value={submitText} />
                    </div>
                </form>
            </div>
        </Box>
    );
};

export default InvoiceForm;
