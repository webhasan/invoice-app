import React from "react";
import Link from "next/link";
import Container from "./container";
import Logo from "./logo";
import Navbar from "./navbar";
import classes from "./header.module.css";
import classnames from "classnames";

const Header: React.FC = () => {
    return (
        <header className={classnames(classes.header, "noprint")}>
            <Container>
                <div className={classes.logo}>
                    <Link href="/">
                        <a className={classes.logo}>
                            <Logo />
                        </a>
                    </Link>
                </div>
                <div className={classes.nav}>
                    <Navbar />
                </div>
            </Container>
        </header>
    );
};

export default Header;
