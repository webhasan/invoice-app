import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "../../utils/api/auth/getUser";
import Box from "../../components/style/box";
import Row from "../../components/layout/grid/row";
import Column from "../../components/layout/grid/column";
import Button from "../../components/style/button";

//type
import { UserData } from "../../types/user";
import { toast } from "react-toastify";

const UserProfilePage = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const loading = "loading" === status;
    const token = session?.user.token as string;

    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);

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

    if (typeof window === undefined || loading || !user) {
        return null;
    }

    return (
        <>
            <Box size={800}>
                <h1 className="text-center page-header">User Profile</h1>
                <Row>
                    <Column>
                        <h2>Personal Info:</h2>
                        <p>Name: {user.name}</p>
                        <p>
                            Email:{" "}
                            <a href={`mailto: ${user.email}`}>
                                {user.email}
                            </a>
                        </p>
                    </Column>
                    <Column>
                        <h2>Company Info: </h2>
                        <p>Company Name: {user.companyDetails?.name}</p>
                        <p>
                            Company Address:
                            <address>{user.companyDetails?.address}</address>
                        </p>
                        <p>Vat Number: {user.companyDetails?.vatNumber}</p>
                        <p>
                            Registration Number:{" "}
                            {user.companyDetails?.regNumber}
                        </p>
                    </Column>
                </Row>
            </Box>
            <p className="text-center">
                <Button link={`/user/edit-profile`}>
                    Edit Profile
                </Button>
            </p>
        </>
    );
};

export default UserProfilePage;
