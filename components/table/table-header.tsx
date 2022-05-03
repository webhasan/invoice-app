import classes from "./table.module.css";

type PropsType = {
  children: React.ReactNode;
};
const TableHead: React.FC<PropsType> = ({ children }) => {
  return <thead className={classes.table}>{ children }</thead>;
};

export default TableHead;
