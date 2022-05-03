import classes from "./table.module.css";
import classnames from 'classnames';

type PropsType = {
  children: React.ReactNode;
  className?: string;
};
const Table: React.FC<PropsType> = ({ children, className }) => {
  return <table className={classnames(classes.table, className)}>{ children }</table>;
}

export default Table;
