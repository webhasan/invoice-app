import { useSession } from "next-auth/react";
import { updateProfile } from "../../utils/api/auth/updateCompany";
import UpdateProfileForm from "./update-profile-form";
import {CompanyDetails} from '../../types/company';

//type 
import { UpdateProfileFuncType } from "./update-profile-form";
import { toast } from "react-toastify";

type PropsType = {
    companyDetails: Partial<CompanyDetails> | undefined;
}
const UpdateProfile: React.FC<PropsType> = ({companyDetails}) => {
    const {data: session} = useSession();
    const token = session?.user.token as string;

    const submitUpdateProfile: UpdateProfileFuncType  = async (data, rest, onsubmitError) => {
        try {
            const res = await updateProfile(data, token);
            if(res.success) {
                toast.success('Successfully updated profile');
                rest();
                onsubmitError(null);
            }else {
                toast.error('Unable to update profile, something went wrong!');
            }
        }catch(e) {
            const errorMessage = e as string;
            onsubmitError(errorMessage);
        }
    }
    return <UpdateProfileForm onSubmitHandler={submitUpdateProfile} currentValue={companyDetails}/>
}

export default UpdateProfile;