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
            <span><b>{certification.title}</b></span> <br/>
        <span>ID: {certification.id}</span>
        </div>
        <fieldset className={styles.card_actions}>
        <Link to={`/issuer/certification/${certification.id}`} className={styles.link_button}>Edit</Link>
        <Link to={`/issuer/issue/${certification.id}`} className={styles.link_button}>Issue</Link>
        </fieldset>
    </div>;
}

export default function Certifications({loaderData}){
    return (<>
        <h1>Certifications</h1>
        <div className={styles.card_list}>
            {loaderData.data.map((certification) => <CertificationCard certification={certification} />)}
        </div>
        <Link to="/issuer/certification/0" className={styles.floating_button}><Plus/></Link>
    </>);
}