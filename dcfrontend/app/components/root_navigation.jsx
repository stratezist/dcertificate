import { useState, useEffect } from "react";
import styles from "./styles/root_navigation.module.css";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

export default function RootNavigation() {
    const [open, set_open] = useState(false);
    /* shouldRender is added to facilitate exit animation */
    const [shouldRender, setShouldRender] = useState(false);

    function toggle() {
        set_open((last_state) => !last_state);
    }

    function handleAnimationEnd() {
        if (!open)
            setShouldRender(false);
    }

    useEffect(() => {
        if (open)
            setShouldRender(true);
    }, [open]);

    return <>
        <button className={styles.toggle} onClick={toggle}>
            {open ? <X /> : <Menu />}
        </button>

        {/* Following line is temporary fix for text hiding behind floating button.
            Adds Space at bottom of page if you put this component at bottom of page.
        */}
        <div style={{ height: '100px' }}></div>

        {shouldRender &&
            <div className={`${styles.nav_container} ${open ? styles.slideIn : styles.slideOut}`} onAnimationEnd={handleAnimationEnd}>
                <nav className={styles.root_navigation}>
                    {/* <h1>Menu</h1>
                    <hr style={{width:'300px'}} /> */}
                    <fieldset className={styles.optionsGroupWithLegend}>
                        <legend>Recipients</legend>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/recipient/login'>Login</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/recipient/register'>Register</NavLink>
                    </fieldset>
                    <fieldset className={styles.optionsGroupWithLegend}>
                        <legend>Issuers</legend>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/issuer/login'>Login</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/issuer/register'>Register</NavLink>
                    </fieldset>
                    <fieldset className={styles.optionsGroup}>
                        {/* <legend>Other Options</legend> */}
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/'>Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/search-certificate'>Search</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/user-manual'>Manual</NavLink> {/*User Manual*/}
                        <button>Theme</button>
                    </fieldset>
                </nav>
            </div>
        }
    </>;
}