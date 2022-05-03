const apiEndPoint = process.env.apiEndPoint + '/clients';
import { ClientData } from "../../../types/invoice";

type SingleClientData = {
    success: boolean,
    client: ClientData
}

export const getClient = async (id: string, token: string): Promise<SingleClientData> => {
    const requestURL = apiEndPoint + '/' + id;
    const res = await fetch(requestURL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}