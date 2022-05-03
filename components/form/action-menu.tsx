import React, { FC, ReactNode, useState, useEffect, useRef} from "react";
import classes from './action-menu.module.css';
import { OptionDots } from "../icons/option-dots";


type PropsType = {
    children: ReactNode
}

const Dropdown: FC<PropsType> = ({children}) => {

    const [show, setShow] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeMenu = ( e: globalThis.MouseEvent) => {
            let target  =  e.target as Element;

            if(show && target.closest('.item-wrapper') !== inputRef.current) {
                setShow(false);
            }
        }

        document.body.addEventListener('click', closeMenu);

        return function cleanup() {
            document.body.removeEventListener('click', closeMenu );
        } 
    });

    const handleClick = () => {
        setShow(prevState => !prevState);
    } 
    
    return (
        <div className={classes['action-menu']}>
            <div className="item-wrapper" ref={inputRef}>
                <div className={classes['drop-down-menu']}>
                    <button onClick={handleClick} className={classes['dropdown-toggle']}>
                        <OptionDots/>
                    </button>
                    {show && <div className={classes.children}>{children}</div>}
                </div>
            </div>
        </div>
    )
}

export default Dropdown;