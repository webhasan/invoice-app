import { FC, ReactNode } from "react";
import classes from "./column.module.css";
import classNames from "classnames";

export type PropsType = {
    children: ReactNode;
    className?: string;
    size?: number;
};

const Column: FC<PropsType> = ({
    children,
    className,
    size,
}) => {
    return (
        <div
            style={{
               flexGrow: size ?? 1
            }}
            className={classNames(classes.column, className)}
        >
            {children}
        </div>
    );
};

export default Column;
