import {backend_request} from "../../lib/backend";
import {Link} from "react-router";
import { PencilIcon, Plus } from "lucide-react";
import styles from "./styles/commons.module.css";

export async function clientLoader({params}){
    const response_json = await backend_request(
        "/issuer/certifications-list", {
            method: "GET",
            credentials: "include"
        }
    );

    if(response_json.success)
        return response_json;
    else
        return {success: false, data: []};
}

function CertificationCard({certification}){
    return <div className={styles.card}>
        <div className={styles.card_content}>
            <h1>{certification.title}</h1>
        <p>ID: {certification.id}</p>
        </div>
        <fieldset className={styles.card_actions}>
        <Link to={`/issuer/certification/${certification.id}`} className={styles.card_action_button}>Edit</Link>
        <Link to={`/issuer/issue/${certification.id}`} className={styles.card_action_button}>Issue</Link>
        </fieldset>
    </div>;
}

export default function Certifications({loaderData}){
    return (<div className={styles.static_content_div}>
        <Link to="/issuer/certification/0" className={styles.floating_button}><Plus/></Link>
        <div className={styles.scrollable_content_div}>
            <h1>Certifications</h1>
            
            <div className={styles.card_list}>
                {loaderData.data.map((certification) => <CertificationCard certification={certification} />)}
            </div>
            <div style={{height:'100px', backgroundColor:'transparent', color:'rgba(200,200,200,0.5)'}}>Spacing for floating button.</div>
        </div>
    </div>);
}