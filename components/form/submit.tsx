import classes from "./submit.module.css";
import { FC } from "react";

type SubmitProps = {
  value?: string;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
};

const Submit: FC<SubmitProps> = (props) => {
  return (
    <span className={classes["form-action"]}>
      <input type="submit" {...props} />
    </span>
  );
};

export default Submit;
