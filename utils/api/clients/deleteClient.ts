const apiEndPoint = process.env.apiEndPoint + '/clients';

export const deleteClient = async (id: string, token: string) => {
    let res = await fetch(apiEndPoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    });

    if(res.ok) {
        return await res.json();
    }else {
        throw await res.text();
    }
}
