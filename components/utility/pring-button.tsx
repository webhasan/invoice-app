import Button from "../style/button";
import classes from './print-button.module.css'


const PrintButton = ()  => {
    const handlePrint = () => {
        window.print();
    }

    return <Button className={classes['print-button']} onClick={handlePrint}>Print Invoice</Button>
}

export default PrintButton;