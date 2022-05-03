type PropsType = {
  children: React.ReactNode;
};
const TableBody: React.FC<PropsType> = ({ children }) => {
  return <thead>{ children }</thead>;
};

export default TableBody;
