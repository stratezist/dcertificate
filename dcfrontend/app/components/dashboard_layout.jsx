import { Outlet, NavLink, Form, useLocation } from "react-router";
import { useState, useEffect } from "react";
import styles from "./styles/dashboard_layout.module.css";
import { useWindowWidth } from "../lib/useWindowWidth";
import { X, Menu } from "lucide-react";


export default function DashboardLayout({ nav_items, title, username, logoutHandlerURL }) {
    const width = useWindowWidth();
    const isMobile = width < 700;
    const [navbarOpen, setNavBarOpen] = useState(false);
    const [navShouldRender, setNavShouldRender] = useState(false);

    const location = useLocation();

    // The following hook
    // is used to close mobile view navbar
    // on successful navigation to a new page/url.
    // This is a UX enhancement.
    useEffect(function () {
        setNavBarOpen(false);
    }, [location]);

    useEffect(function () {
        if(navbarOpen) setNavShouldRender(true);
    }, [navbarOpen]);

    function handleAnimationEnd(){
        if(!navbarOpen) setNavShouldRender(false);
    }

    const navigationBar = <nav className={`${isMobile ? styles.navbarMobile : styles.navbar} ${navbarOpen? styles.slideUpAnimation:styles.slideDownAnimation}`} onAnimationEnd={handleAnimationEnd}>
        {title} Account
        <h1>{username}</h1>
        {Object.entries(nav_items).map(
            ([key, value]) => <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to={value}>{key}</NavLink>
        )}
        <Form method="POST" action={logoutHandlerURL}><button type="submit">Logout</button></Form>
    </nav>;

    return <div className={styles.pagelayout}>
        <Outlet />
        {function () {
            if (isMobile)
                return <>
                    <button className = {styles.toggleNav} onClick = {function () {setNavBarOpen(!navbarOpen);}}>
                        {navbarOpen?<X/>:<Menu/>}
                    </button>
                    {navShouldRender && navigationBar}
                </>;
            else
                return navigationBar;
        }()
        }
    </div>;
}