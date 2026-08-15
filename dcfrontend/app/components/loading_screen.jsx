import styles from "./styles/loading_screen.module.css";
import DcertificateLogo from "./logo.jsx";

export default function LoadingScreen(){
    return <div className={styles.loading_screen}>
        <div><DcertificateLogo size={120} animation='loading' /></div>
    </div>;
}