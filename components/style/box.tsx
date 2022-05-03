import { FC, ReactNode } from "react";
import classes from "./box.module.css";

type Props = {
    children: ReactNode;
    size?: number;
};

const Box: FC<Props> = ({ children, size }) => {
    return (
        <div style={{ width: size ?? 400 }} className={classes.box}>
            {children}
        </div>
    );
};

export default Box;
