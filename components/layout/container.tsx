import React from 'react';
import classes from './container.module.css';

type props = {
    children: React.ReactNode,
}

const Container: React.FC<props> = ({children}) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

export default Container;