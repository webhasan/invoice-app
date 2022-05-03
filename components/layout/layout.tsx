import Header from './header';
import Container from './container';
import classes from './layout.module.css';


type props = {
    children: React.ReactNode
}
const Layout:React.FC<props> = ({children}) => {
    return (
        <>
            <Header/>
            <main className={classes.main}>
                <Container>
                    {children}
                </Container>
            </main>
        </>
    )
}

export default Layout;
