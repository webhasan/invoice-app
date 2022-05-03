import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import AllInvoicesTable from '../../components/invoice/all-invoice-table';

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
        <h1 className='text-center page-header'>All Invoices</h1>
        <AllInvoicesTable/>
    </div>
  )
}

export default ClientsPage
