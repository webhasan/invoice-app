import { useState } from "react";
import Box from "../style/box";
import Input from "../form/input";
import Submit from "../form/submit";
import { useRouter } from "next/router";
import Row from "../layout/grid/row";
import Column from "../layout/grid/column";
import FormErrorNotification from "../form/form-error-notification";
import classes from "./update-profile.module.css";
import { useUserCompany } from "../../hooks/use-company-sate";

//type
import { UpdateProfileCallbackType } from "../../hooks/use-company-sate";
import {CompanyDetails} from '../../types/company';



export type UpdateProfileFuncType = (
    data: CompanyDetails,
    restData: () => void,
    onSubmitError: (message: string | null) => void
) => void;

type PropsType = {
    onSubmitHandler: UpdateProfileFuncType,
    currentValue: Partial<CompanyDetails> | undefined;
}

const UpdateProfileForm: React.FC<PropsType> = ({onSubmitHandler, currentValue}) => {
    const router = useRouter();

    const {data: companyDetails, handleChange, handleSubmit, errors } = useUserCompany(currentValue);

    const [updateProfileError, setUpdateProfileError] = useState<string | null >(null);

    const onSubmitError = (message: string | null = null) => {
        setUpdateProfileError(message)
    }

    const handleUpdateProfile: UpdateProfileCallbackType = (data, reset) => {
        onSubmitHandler(data, reset, onSubmitError);
    }

    return (
        <Box size={800}>
            <div className={classes["form-wrap"]}>
                <form onSubmit={(e) => handleSubmit(e, handleUpdateProfile)}>
                    <Row>
                        <Column>
                            <Input
                                name="name"
                                type="text"
                                onChange={handleChange}
                                value={companyDetails.name}
                                id="name"
                                label="Company Name"
                                error={errors.name}
                            />
                        </Column>
                        <Column>
                            <Input
                                name="address"
                                type="text"
                                onChange={handleChange}
                                value={companyDetails.address}
                                id="address"
                                label="Company Address"
                                error={errors.address}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Input
                                name="vatNumber"
                                type="text"
                                onChange={handleChange}
                                value={companyDetails.vatNumber}
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
                                value={companyDetails.regNumber}
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
                                value={companyDetails.iban}
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
                                value={companyDetails.swift}
                                id="swift"
                                label="Company SWIFT"
                                error={errors.swift}
                            />
                        </Column>
                    </Row>

                    {!!updateProfileError && <FormErrorNotification message={updateProfileError}/>}
                    
                    <div className={classes.action}>
                        <Submit value='Update Company' />
                    </div>
                    
                </form>
            </div>
        </Box>
    );
};

export default UpdateProfileForm;
