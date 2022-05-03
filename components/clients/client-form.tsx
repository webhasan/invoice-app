import { useState } from "react";
import { useSession } from "next-auth/react";
import Box from "../style/box";
import Input from "../form/input";
import Submit from "../form/submit";
import { useRouter } from "next/router";
import Row from "../layout/grid/row";
import Column from "../layout/grid/column";
import FormErrorNotification from "../form/form-error-notification";
import { useClientState } from "../../hooks/use-client-state";
import { NewClientInfo } from "../../utils/api/clients/addClient";
import { SubmitClientCallbackType } from "../../hooks/use-client-state";

import classes from "./client-form.module.css";


//type 
import { ClientData } from "../../types/invoice";


export type SubmitClientFuncType = (
    data: NewClientInfo,
    restData: () => void,
    onSubmitError: (message: string | null) => void
) => void;

type PropsType = {
    submitButtonText: string;
    onSubmitHandler: SubmitClientFuncType,
    defaultValue?: ClientData
}

const ClientForm: React.FC<PropsType> = ({onSubmitHandler, submitButtonText, defaultValue}) => {
    const router = useRouter();
    const [addClientError, setAddClientError] = useState<string | null >(null);

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const loading = status === "loading";

    const {data: clientInfo, errors, handleChange, handleSubmit} = useClientState(defaultValue);

    const onSubmitError = (message: string | null = null) => {
        setAddClientError(message)
    }

    const submitClient: SubmitClientCallbackType = (data, reset) => {
        onSubmitHandler(data, reset, onSubmitError);
    }


    if (typeof window === "undefined" || loading) {
        return null;
    }

    return (
        <Box size={800}>
            <div className={classes["form-wrap"]}>
                <form onSubmit={(e) => handleSubmit(e, submitClient)}>
                    <Row>
                        <Column>
                            <Input
                                name="name"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.name}
                                id="name"
                                label="Name"
                                error={errors.name}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="email"
                                type="email"
                                onChange={handleChange}
                                value={clientInfo.email}
                                id="email"
                                label="Email"
                                error={errors.email}
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                name="companyName"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.companyName}
                                id="companyName"
                                label="Company Name"
                                error={errors.companyName}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="companyAddress"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.companyAddress}
                                id="companyAddress"
                                label="Company Address"
                                error={errors.companyAddress}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Input
                                name="vatNumber"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.vatNumber}
                                id="vatNumber"
                                label="Company VAT Number"
                                error={errors.vatNumber}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="regNumber"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.regNumber}
                                id="regNumber"
                                label="Company Registration Number"
                                error={errors.regNumber}
                            />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Input
                                name="iban"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.iban}
                                id="iban"
                                label="Company IBAN"
                                error={errors.iban}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="swift"
                                type="text"
                                onChange={handleChange}
                                value={clientInfo.swift}
                                id="swift"
                                label="Company SWIFT"
                                error={errors.swift}
                            />
                        </Column>
                    </Row>

                    {!!addClientError && <FormErrorNotification message={addClientError}/>}
                    
                    <div className={classes.action}>
                        <Submit value={submitButtonText} />
                    </div>
                    
                </form>
            </div>
        </Box>
    );
};

export default ClientForm;
