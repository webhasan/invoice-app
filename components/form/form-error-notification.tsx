import {FC} from 'react';
import classes from './form-error-notification.module.css';


type Props = {
    message: string;
}

const FormErrorNotification:FC<Props> = ({message}) => {
    return <span className={classes['error-message']}>{message}</span>
}

export default FormErrorNotification;