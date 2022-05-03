import classes from './company-details.module.css';

type PropsType = {
    name: string; 
    address: string;
    vatNumber: string;
    iban?: string;
    swift?: string;
}
const CompanyDetails:React.FC<PropsType> = ({name, address, vatNumber, iban, swift}) => {
    return <div className={classes['company-details']}>
        <span className={classes['single-info']}>
            <strong>Name: </strong> {name}
        </span>

        <span className={classes['single-info']}>
            <strong>Address: </strong> {address}
        </span>

        <span className={classes['single-info']}>
            <strong>Vat Number: </strong> {vatNumber}
        </span>

        {iban && 
        <span className={classes['single-info']}>
            <strong>IBAN: </strong> {iban}
        </span>
        }

        {swift && 
        <span className={classes['single-info']}>
            <strong>SWIFT: </strong> {swift}
        </span>
        }
    </div>
}

export default CompanyDetails;