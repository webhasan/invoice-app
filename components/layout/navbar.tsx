import { MouseEvent } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar } from "../icons/avatar";
import classes from "./navbar.module.css";
import Button from "../style/button";

const Navbar = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const handleLogout = async (e: MouseEvent) => {
		e.preventDefault();

		const data = await signOut({ redirect: false, callbackUrl: "/login" });
		router.replace(data.url);
	};

	return (
		<nav className={classes.nav}>
			<ul>
				{status === "unauthenticated" && (
					<li>
						<Button link="/login">Login</Button>
					</li>
				)}


				{status === "authenticated" && (
					<>
            <li>
              <Link href="/invoices">Invoices</Link>
            </li>
            <li>
              <Link href="/clients">Clients</Link>
            </li>
						<li>
							<Link href="/user">
								<a className={classes.avatar}>
									{session.user.email && <Avatar size={20} />}
									{session.user?.name}
								</a>
							</Link>
						</li>
						<li>
							<Button link="/logout" onClick={handleLogout}>
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
