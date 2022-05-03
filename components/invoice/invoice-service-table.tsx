import Table from "../table/table";
import TableHead from "../table/table-header";
import TableBody from "../table/table-body";
import TableRow from "../table/table-row";
import HeadCell from "../table/head-cell";
import DataCell from "../table/data-cell";

type PropsType = {
    services: { serviceName: string; servicePrice: number }[];
    total: number;
};

const InvoiceServicesTable: React.FC<PropsType> = ({ services, total }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <HeadCell>Product/Services</HeadCell>
                    <HeadCell>Unit Price</HeadCell>
                    <HeadCell>Amount</HeadCell>
                    <HeadCell>VAT</HeadCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {services.map((service, index) => (
                    <TableRow key={index}>
                        <DataCell>{service.serviceName}</DataCell>
                        <DataCell>{service.servicePrice}</DataCell>
                        <DataCell>1</DataCell>
                        <DataCell>0</DataCell>
                    </TableRow>
                ))}

                    <TableRow>
                        <DataCell>Additional Details</DataCell>
                        <DataCell></DataCell>
                        <DataCell></DataCell>
                        <DataCell><strong>SubTotal:</strong> {total} <br/> <strong>Vat: </strong>0<br/> <strong>Total:</strong> {total} </DataCell>
                    </TableRow>

            </TableBody>
        </Table>
    );
};

export default InvoiceServicesTable;
