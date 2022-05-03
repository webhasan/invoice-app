import Head from "next/head";
import AddClientForm from "../../components/clients/add-client-from";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AddClientPage = () => {
    const router = useRouter();

    const {status} = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const loading = 'loading' === status;

    if(typeof window === 'undefined' || loading) {
      return null;
    }
  

    return <>
        <Head>
            <title>Add Client | Invoice App</title>
        </Head>
        <div>
            <h1 className="text-center page-header">Add Client</h1>
            <AddClientForm/>
        </div>
    </>
};

export default AddClientPage;