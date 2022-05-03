import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { addClient } from "../../utils/api/clients/addClient";
import ClientForm from "./client-form";
import { SubmitClientFuncType } from "./client-form";

const AddClientForm = () => {
    const { data: session } = useSession();
    const token = session?.user.token as string;

    const addNewClient: SubmitClientFuncType = async (data, restData, onSubmitError) => {
        try {
            const res = await addClient(data, token);
            if(res.success) {
                toast.success('Successfully added new client');
                restData();
            }else {
                toast.success('Something went wrong, unable to add client!');
            }
        }catch(e) {
            const errorMessage = e as string;
            onSubmitError(errorMessage);
        }
    }

    return (
        <ClientForm submitButtonText="Add Client" onSubmitHandler={addNewClient}/>
    );
};

export default AddClientForm;
