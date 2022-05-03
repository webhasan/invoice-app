import { FC, ChangeEvent, useState } from "react";
import classNames from "classnames";
import classes from "./select.module.css";
import { EyeIcon } from "../icons/eye";
import { EyeOffIcon } from "../icons/eye-off";

type SelectProps = {
    className?: string;
    name: string;
    value: string;
    id?: string;
    label: string;
    error?: string | null;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    wrapperClass?: string;
    options: {id: string; clientName: string;}[]
};

type SelectAttributes = Omit<
    SelectProps,
    "error" | "wrapperClass" | "label" | "options"
>;

const Select: FC<SelectProps> = (props) => {
    let {
        className,
        name,
        value,
        id,
        label,
        error,
        onChange,
        wrapperClass,
        options,
    } = props;

    const selectAttributes: SelectAttributes = {
        name,
        value,
    };

    if (id) {
        selectAttributes.id = id;
    }

    if (onChange) {
        selectAttributes.onChange = onChange;
    }

    if (className) {
        selectAttributes.className = className;
    }

    return (
        <p className={classNames(classes["form-control"], wrapperClass)}>
            <label htmlFor={id}>{label}</label>
            <span className={classes["select-wrap"]}>
                <select {...selectAttributes}>
                    <option style={{display: 'none'}}>--</option>
                    {options.map(option => {
                        return <option key={option.id} value={option.id}>{option.clientName}</option>
                    })}
                </select>
            </span>
            {error && error.length && (
                <span className={classes.error}>{error}</span>
            )}
        </p>
    );
};

export default Select;
