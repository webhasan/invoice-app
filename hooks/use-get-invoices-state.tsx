import { useRouter } from "next/router";
import { InvoiceWithClientDetails } from "../types/invoice";
import { getInvoices } from "../utils/api/invoices/getInvoices";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


type PropsType = (
    token: string | null,
    limit?: number,
    offset?: number,
    sort?: "asc" | "desc",
    sortBy?: string,
) => {
    isLoading: boolean,
    invoices: InvoiceWithClientDetails[],
    total: number | undefined
}



export const useGetInvoicesState: PropsType = (token, limit, offset, sort, sortBy) => {
    
    const router = useRouter();
    const [invoices, setInvoices] = useState<InvoiceWithClientDetails[]>([]);
    const [total, setTotal] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (router.isReady) {
            (async () => {
                if (token) {
                    setIsLoading(true);
                    try {
                        const result = await getInvoices(
                            token,
                            limit,
                            offset,
                            sort,
                        );

                        setInvoices(result.invoices);
                        setTotal(result.total)
                        setIsLoading(false);
                    } catch (e: unknown) {
                        setIsLoading(false);
                        toast.error("Unable to load invoices!");
                    }
                }
            })();
        }
    }, [token, sort, sortBy, offset, limit, router.isReady]);

    return {isLoading, invoices, total}
};
