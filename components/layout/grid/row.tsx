import { FC, ReactElement} from "react";
import classes from "./row.module.css";
import classNames from "classnames";
import {PropsType as ChildrenPropsType} from './column';

type PropsType = {
    children: ReactElement<ChildrenPropsType> | ReactElement<ChildrenPropsType>[];
    className?: string;
    justifyContent?: string;
    alignItems?: string;
};
const Row: FC<PropsType> = ({
    children,
    className,
    justifyContent,
    alignItems,
}) => {
    return (
        <div
            style={{
                justifyContent: justifyContent ?? "space-between",
                alignItems: alignItems ?? "flex-start",
            }}
            className={classNames(classes.row, className)}
        >
            {children}
        </div>
    );
};

export default Row;
