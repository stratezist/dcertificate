import { useState, useEffect } from "react";
import styles from "./styles/root_navigation.module.css";
import { NavLink } from "react-router";
import { Moon, Sun, X, Menu, LeafIcon, ArrowRight } from "lucide-react";
import { flash } from "../lib/flash";
import { useTheme } from "../lib/useTheme";

export default function RootNavigation() {
    const [open, set_open] = useState(false);
    /* shouldRender is added to facilitate exit animation */
    const [shouldRender, setShouldRender] = useState(false);
    const [theme, setTheme] = useTheme();

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

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

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
                    <h1>Menu</h1>
                    {/* <hr style={{width:'300px'}} /> */}
                    
                    <fieldset className={styles.optionsGroup}>
                        {/* <legend>Recipients</legend> */}
                        {/* <legend>Navigation</legend> */}
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/'>Home <ArrowRight size={15}/></NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/search-certificate'>Search <ArrowRight size={15}/></NavLink> 
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/recipient/login'>Recipient Login <ArrowRight size={15}/></NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/recipient/register'>Recipient Register <ArrowRight size={15}/></NavLink>
                    {/* </fieldset>
                    <fieldset className={styles.optionsGroup}> */}
                        {/* <legend>Issuers</legend> */}
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/issuer/login'>Issuer Login <ArrowRight size={15}/></NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/issuer/register'>Issuer Register <ArrowRight size={15}/></NavLink>
                    {/* </fieldset>
                    <fieldset className={styles.optionsGroup}> */}
                    <NavLink className={({ isActive }) => isActive ? styles.active_navlink : styles.navlink} to='/user-manual'>User Manual <ArrowRight size={15}/></NavLink> {/*User Manual*/}    
                    </fieldset>
                    
                    <fieldset className = {styles.optionsGroup} >
                        {/* <legend>Controls</legend> */}
                        <button className={styles.rootNavButton} onClick={async () => await flash([{type:'info', 'message': 'Power on eco mode to disable animations and save battery or compute. Functionality not implemented yet.'}])}>
                            <LeafIcon size = {20} color={'greenyellow'}/> {/*greenyellow will show active. give a notification when activated saying animations disabled.*/}
                        </button>
                        <button className={styles.rootNavButton}onClick={toggleTheme}>
                            {theme === 'light' ? <Sun size = {20} /> : <Moon size = {20} />}
                        </button>
                    </fieldset>
                    
                </nav>
            </div>
        }
    </>;
}