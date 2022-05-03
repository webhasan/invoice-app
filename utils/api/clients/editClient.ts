import { ClientData } from "../../../types/invoice";
const apiEndPoint = process.env.apiEndPoint + '/clients';


type UpdateClientResponse = {
    success: boolean,
    client: ClientData
}


export const editClient = async (data: Partial<ClientData>, id:string, token: string): Promise<UpdateClientResponse> => {
    const res = await fetch(apiEndPoint, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...data, id})
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}