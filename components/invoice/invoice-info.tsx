import classes from "./invoice-info.module.css";

type PropsType = {
    invoiceNumber: string;
    projectCode: string;
    invoiceDate: number;
    dueDate: number;
};

const InvoiceInfo: React.FC<PropsType> = ({
    invoiceNumber,
    projectCode,
    invoiceDate,
    dueDate,
}) => {
    return (
        <div className={classes["invoice-info"]}>
            <div className={classes["single-info"]}>
                <strong>Invoice Number: #</strong>
                {invoiceNumber}
            </div>

            <div className={classes["single-info"]}>
                <strong>Project Code: </strong>
                {projectCode}
            </div>

            <div className={classes["single-info"]}>
                <strong>Invoice Date: </strong>
                {invoiceDate}
            </div>

            <div className={classes["single-info"]}>
                <strong>Due Date: </strong>
                {dueDate}
            </div>
        </div>
    );
};

export default InvoiceInfo;
