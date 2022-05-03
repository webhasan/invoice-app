type PropsType = {
  children?: React.ReactNode | string;
  className?: string;
  onClick?: () => void | undefined;
};
const HeadCell: React.FC<PropsType> = ({ children, ...rest }) => {
    return <th {...rest}>{ children ?? '' }</th>;
};

export default HeadCell;
