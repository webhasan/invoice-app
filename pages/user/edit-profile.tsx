import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getUser } from "../../utils/api/auth/getUser";
import { toast } from "react-toastify";
import UpdateProfile from "../../components/user/update-profile";

//type
import { UserData } from "../../types/user";

const EditProfilePage = () => {
    const router = useRouter();

    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const token = session?.user.token;

    const [user, setUser] = useState<UserData>();

    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    const data = await getUser(token);
                    setUser(data);
                } catch (e) {
                    toast.error('Something went wrong, please check later.')
                }
            })();
        }
    }, [token]);

    const loading = 'loading' === status;

    if(typeof window === 'undefined' || loading || !user) {
      return null;
    }
  

    return <>
        <Head>
            <title>Edit User Profile | Invoice App</title>
        </Head>
        <div>
            <h1 className="text-center page-header">Edit User Profile</h1>
            <UpdateProfile companyDetails={user.companyDetails}/>
        </div>
    </>
};

export default EditProfilePage;