import classes from './loading-cell.module.css';

const LoadingCell = ({colSpan = 4}) => {
  return (
    <tr>
      <td colSpan={colSpan} className={classes['loader-wrap']}>
        <div className={classes.loader}></div>
      </td>
    </tr>
  );
};
export default LoadingCell;
