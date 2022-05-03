import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import classes from "./latest-clients-table.module.css";
import Button from "../style/button";
import { Avatar } from "../icons/avatar";
import ActionMenu from "../form/action-menu";
import InfoHeader from "../utility/info-header";
import Table from "../table/table";
import TableHead from "../table/table-header";
import TableBody from "../table/table-body";
import TableRow from "../table/table-row";
import HeadCell from "../table/head-cell";
import DataCell from "../table/data-cell";
import LoadingCell from "../table/loading-cell";
import { toast } from "react-toastify";
import { getClients } from "../../utils/api/clients/getClients";
import { GetClientsResponse } from "../../types/client";
import { Client } from "../../types/client";
import { useRouter } from "next/router";

const ActionTable = () => {
    const router = useRouter();
    const [isLoadingClient, setIsLoadingClient] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);

    const { data: session, status } = useSession();
    const loading = status === "loading";

    useEffect(() => {
        (async () => {
            if (session?.user.token) {
                try {
                    const data = await getClients(session?.user.token, 5);

                    const { clients } = data as GetClientsResponse;
                    setClients(clients);
                    setIsLoadingClient(false);
                } catch (e: unknown) {
                    setIsLoadingClient(false);
                    toast.error("Error: Unable to load clients!");
                }
            }
        })();
    }, [session?.user.token]);

    if (loading) {
        return null;
    }

    const handleEdit = (id: string) => {
        router.push(`clients/edit/${id}`);
    };

    const handleView = (id: string) => {
        router.push(`clients/${id}`);
    };

    return (
        <div>
            <InfoHeader>
                <h2>Latest Clients</h2>
                <div>
                    <Button link="/clients/add">Add Client</Button>
                    <Button link="/clients">All Clients</Button>
                </div>
            </InfoHeader>

            <Table>
                <TableHead>
                    <TableRow>
                        <HeadCell>CLIENT NAME</HeadCell>
                        <HeadCell>COMPANY NAME</HeadCell>
                        <HeadCell></HeadCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoadingClient && <LoadingCell />}
                    {!isLoadingClient &&
                        clients.map((client) => (
                            <TableRow key={client.id}>
                                <DataCell>
                                    <div className={classes["client-details"]}>
                                        <span className={classes["avatar"]}>
                                            <Avatar size={35} />
                                        </span>
                                        <span
                                            className={classes["client-info"]}
                                        >
                                            <span className={classes["name"]}>
                                                {client.name}
                                            </span>
                                            <span className={classes["email"]}>
                                                <a
                                                    href={`mailto: ${client.email}`}
                                                >
                                                    {client.email}
                                                </a>
                                            </span>
                                        </span>
                                    </div>
                                </DataCell>
                                <DataCell>
                                    {client.companyDetails.name}
                                </DataCell>
                                <DataCell>
                                    <ActionMenu>
                                        <button
                                            onClick={() =>
                                                handleView(client.id)
                                            }
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleEdit(client.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </ActionMenu>
                                </DataCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ActionTable;
