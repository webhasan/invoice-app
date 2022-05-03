import Link from "next/link";
import { MouseEvent } from "react";
import classes from "./button.module.css";
import classnames from "classnames";

interface PrimaryButtonProps {
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children: string;
}

interface LinkProps {
  link?: string;
}

type ButtonProps = PrimaryButtonProps & LinkProps;

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  link,
}) => {

  const buttonAttributes: {
    className?: string;
    onClick?: (e: MouseEvent<HTMLElement>) => void;
  } = {};

  if (onClick) {
    buttonAttributes.onClick = onClick;
  }

  const button = (
    <button
      {...buttonAttributes}
      className={classnames(classes.button, className, 'noprint')}
    >
      {children}
    </button>
  );

  if (link) {
    return <Link href={link}>{button}</Link>;
  } else {
    return button;
  }
};

export default Button;
