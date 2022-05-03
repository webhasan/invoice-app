import Head from "next/head";
import EditClientForm from "../../../components/clients/edit-client-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getClient } from "../../../utils/api/clients/getSingleClient";

import { ClientData } from "../../../types/invoice";

const EditClientPage = () => {
    const router = useRouter();
    const id = router.query.id as string;

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });

    const token = session?.user.token;

    const [client, setClient] = useState<ClientData>();
    useEffect(() => {
        if(token && id) {
            (async () => {
                try{
                    const res = await getClient(id, token);
                    setClient(res.client);
                }catch(e) {
                    router.push('/404');
                }
            })();
        }

    }, [id, token, router])

    const loading = 'loading' === status;

    if(typeof window === 'undefined' || loading || !client) {
      return null;
    }
  

    return <>
        <Head>
            <title>Edit Client | Invoice App</title>
        </Head>
        <div>
            <h1 className="text-center page-header">Edit Client</h1>
            <EditClientForm client={client} id={id}/>
        </div>
    </>
};

export default EditClientPage;