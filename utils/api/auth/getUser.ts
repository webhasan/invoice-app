import { UserData } from "../../../types/user";

const apiEndPoint = process.env.apiEndPoint + '/me';

export const getUser = async (token: string): Promise<UserData> => {
    const res = await fetch(apiEndPoint, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    if(res.ok) {
        return await res.json();
    }
    throw await res.text();
}