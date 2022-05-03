import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import AllClientsTable from '../../components/clients/all-clients-table';

const ClientsPage = () => {

  const router = useRouter();
  
  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?redirect=${window.location.href}`);
    }
  });

  const loading = status === 'loading';

  if(typeof window === "undefined" || loading) {
    return null;
  }


  return (
    <div>
        <h1 className='text-center page-header'>All Clients</h1>
        <AllClientsTable/>
    </div>
  )
}

export default ClientsPage
