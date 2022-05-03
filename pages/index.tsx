import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import RecentRecords from '../components/dashboard/recent-records';

const Home = () => {
  const router = useRouter();
  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push(`/login?redirect=${window.location.href}`);
    }
  });

  const loading = status === 'loading';

  if(typeof window === 'undefined' || loading) {
    return null;
  }


  return (
    <>
      <h1 className='text-center page-header'>Invoice Database</h1>
      <RecentRecords/>
    </>
    

  )
}

export default Home
