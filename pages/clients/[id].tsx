import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ClientData } from "../../types/invoice";
import { getClient } from "../../utils/api/clients/getSingleClient";
import Box from "../../components/style/box";
import Row from "../../components/layout/grid/row";
import Column from "../../components/layout/grid/column";
import Button from "../../components/style/button";

const SingleClientPage = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
          router.push(`/login?redirect=${window.location.href}`);
        }
    });
    const loading = "loading" === status;
    const token = session?.user.token as string;
    const router = useRouter();
    const userId = router?.query.id as string;
    const [client, setClient] = useState<ClientData | null>(null);

    useEffect(() => {
        if (userId && token) {
            (async () => {
                try {
                    const data = await getClient(userId, token);
                    setClient(data.client);
                } catch (e) {
                    router.push("/404");
                }
            })();
        }
    }, [userId, token, router]);

    if (typeof window === undefined || loading || !client) {
        return null;
    }

    return (
        <>
            <Box size={800}>
                <h1 className="text-center page-header">Information Information</h1>
                <Row>
                    <Column>
                        <h2>Basic Information:</h2>
                        <p>Name: {client.name}</p>
                        <p>
                            Email:{" "}
                            <a href={`mailto: ${client.email}`}>
                                {client.email}
                            </a>
                        </p>
                    </Column>
                    <Column>
                        <h2>Company Information</h2>
                        <p>Company Name: {client.companyDetails.name}</p>
                        <p>
                            Company Address:{" "}
                            <address>{client.companyDetails.address}</address>
                        </p>
                        <p>Vat Number: {client.companyDetails.vatNumber}</p>
                        <p>
                            Registration Number:{" "}
                            {client.companyDetails.regNumber}
                        </p>
                    </Column>
                </Row>
            </Box>
            <p className="text-center">
                <Button link={`/clients/edit/${client.id}`}>
                    Edit Details
                </Button>
            </p>
        </>
    );
};

export default SingleClientPage;
