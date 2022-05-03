import LatestInvoicesTable from "../invoice/latest-invoices-table";
import LatestClientsTable from "../clients/latest-clients-table";
import Row from "../layout/grid/row";
import Column from "../layout/grid/column";

const RecentRecords = () => {
    return (
        <Row>
            <Column size={2}>
                <LatestClientsTable/>
            </Column>
            <Column size={3}>
                <LatestInvoicesTable/>
            </Column>
        </Row>
    );
};
export default RecentRecords;
