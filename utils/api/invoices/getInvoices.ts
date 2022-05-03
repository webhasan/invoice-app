const apiEndPoint = process.env.apiEndPoint + "/invoices";
import { GetInvoicesResponse } from "../../../types/invoice";

type Sort = "asc" | "desc" | null;
type SortBy = string | null;

type QueryParams = {
    sort?: Record<string, any>
    limit?: number;
    offset?: number;
}

export const getInvoices = async (
    token: string,
    limit?: number,
    offset?: number,
    sort?: Sort,
    sortBy?: SortBy,
): Promise<GetInvoicesResponse> => {

    const queryParams: QueryParams = {}

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
        }
    });


    if (res.ok) {
        return await res.json();
    } else {
        throw res.text();
    }
};
