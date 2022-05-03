import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import ClientForm from "./client-form";
import { editClient } from "../../utils/api/clients/editClient";
import { SubmitClientFuncType } from "./client-form";

// type 
import { ClientData } from "../../types/invoice";

type PropsType = {
    client: ClientData,
    id: string;
}

const EditClientForm: React.FC<PropsType> = ({id, client: defaultValue}) => {
    const { data: session } = useSession();
    const token = session?.user.token as string;

    const addNewClient: SubmitClientFuncType = async (data, restData, onSubmitError) => {
        try {
            const res = await editClient(data, id, token);
            if(res.success) {
                toast.success('Successfully updated client');
            }else {
                toast.success('Something went wrong, unable to update client!');
            }
        }catch(e) {
            const errorMessage = e as string;
            onSubmitError(errorMessage);
        }
    }

    return (
        <ClientForm submitButtonText="Update Client" onSubmitHandler={addNewClient} defaultValue={defaultValue}/>
    );
};

export default EditClientForm;
