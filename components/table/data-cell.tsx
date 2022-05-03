type PropsType = {
  children?: React.ReactNode | string | null;
};
const DataCell: React.FC<PropsType> = ({ children }) => {
  return <td>{ children }</td>;
};

export default DataCell;
