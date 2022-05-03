const apiEndPoint = process.env.apiEndPoint + "/clients";
import { GetClientsResponse } from "../../../types/client";

export const getClients = async (
    token: string,
    limit?: number,
    offset?: number,
    sort?: "asc" | "desc",
    sortBy?: string
): Promise<GetClientsResponse> => {
    const queryParams: Record<string, any> = {}

    if(limit) {
        queryParams.limit = limit;
    }
    
    if(offset) {
        queryParams.offset = offset;
    }
    
    if(sort && sortBy) {
        queryParams.sort = {
            [sortBy]: sort
        }
    }

    const encodeParamsString = encodeURIComponent(JSON.stringify(queryParams));
    const requestURL = apiEndPoint + '?params=' + encodeParamsString;

    const res = await fetch(requestURL, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        return await res.json();
    } else {
        throw await res.text();
    }
};
