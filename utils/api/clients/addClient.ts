import { ClientData } from "../../../types/invoice";
const apiEndPoint = process.env.apiEndPoint + '/clients';

export type NewClientInfo = Omit<ClientData, 'id' | 'user_id'>

type ResponseType = {
    success: boolean;
    client: ClientData
}

export const addClient = async (clientInfo: NewClientInfo, userToken: string): Promise<ResponseType>  => {
    
    let res = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
        },
        body: JSON.stringify(clientInfo),
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}