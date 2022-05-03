type PropsType = {
  children: React.ReactNode;
};
const TableRow: React.FC<PropsType> = ({ children }) => {
  return <tr>{ children }</tr>;
};

export default TableRow;
