import { useState, useEffect } from "react";
import {Client} from '../types/client';
import { getClients } from "../utils/api/clients/getClients";

type PropsType = (
    token: string | null,
    limit?: number,
    offset?: number,
    sort?: "asc" | "desc",
    sortBy?: string,
) => {
    isLoading: boolean,
    clients: Client[],
    total: number | undefined
}

export const useGetClientsState: PropsType = (token, limit, offset, sort, sortBy) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [total, setTotal] = useState<number>();

    useEffect(() => {
        if (token) {
            (async () => {
                const res = await getClients(token, limit, offset, sort, sortBy);
                setClients(res.clients);
                setTotal(res.total);
                setLoading(false);
            })();
        }
    }, [token, limit, offset, sort, sortBy]);

    return {isLoading, clients, total}
}