import { redirect } from "react-router";
import { backend_request } from "../../lib/backend";
import styles from "./styles/commons.module.css";

export async function clientAction({request}) {

    const response_json = await backend_request('/auth/recipient/logout', {
        method: 'DELETE',
        credentials: 'include'
    });

    if(response_json.success)
        return redirect("/recipient/login");
    
}

export default function AccountPage(){
    return <div className={styles.scrollable_content_div}>
        <h1>Manage Account</h1>
        <p>Page for future extension.</p>
    </div>;
}