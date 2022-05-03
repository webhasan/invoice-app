import classnames from "classnames";
import classes from "./pagination.module.css";

type PropsTypes = {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
};

const getAllPages = (numberOfPages: number) => {
    let pages: number[] = [];

    if (!!numberOfPages) {
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push(i);
        }
    }

    return pages;
};

const Pagination: React.FC<PropsTypes> = ({ current, total, onPageChange }) => {
    const pagination = (
        <ul className={classes.pagination}>
            {current > 1 && <li onClick={() => onPageChange(current - 1 )}>{`<`}</li>}
            
            {getAllPages(total).map((page) => {
                const isCurrentPage = page === current;
                return (
                    
                    <li
                        className={classnames({
                            [classes.current]: isCurrentPage,
                        })}
                        key={page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </li>
                );
            })}
            {current < total && <li onClick={() => onPageChange(current + 1 )}>{`>`}</li>}
        </ul>
    );

    return total > 1 ? pagination : null;
};

export default Pagination;
