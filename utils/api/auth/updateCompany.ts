import { UserData } from "../../../types/user";
const apiEndPoint = process.env.apiEndPoint + '/me/company';


type UpdateProfileResponse = {
    success: boolean,
    client: UserData
}


export const updateProfile = async (data: Partial<UserData>, token: string): Promise<UpdateProfileResponse> => {
    const res = await fetch(apiEndPoint, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}