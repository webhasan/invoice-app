import React from "react";
import classes from "./info-header.module.css";
import classnames from "classnames";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

const InfoHeader: React.FC<PropsType> = ({ children, className }) => {
  return (
    <header className={classnames(classes["info-header"], className)}>
      {children}
    </header>
  );
};

export default InfoHeader;
