// view and add your approvals

import { backend_request } from "../../lib/backend";
import { Form, useActionData } from "react-router";
import styles from "./styles/commons.module.css";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export async function clientLoader({ params }) {
    const response_json = await backend_request(
        'issuer/approval/list', {
        method: 'GET',
        credentials: 'include'
    }
    );

    if (response_json.success)
        return response_json
}

export async function clientAction({ request }) {
    const form_data = await request.formData();
    const form_object = Object.fromEntries(form_data);
    const request_json = JSON.stringify(form_object);

    if (form_object.delete) {
        // delete approval form submitted
        // note: if delete contains value "" then this will be false.
        //       from next time, recommended to use form_data.has('delete').
        // or better, name the submit button/input as "action".
        // then here check the value of action like -
        // if form_object.action === 'delete' or form_object.action === 'approve'.
        
        // if(!window.confirm("Are you sure to delete this approval?")) return;

        const response_json = await backend_request(
            'issuer/approval/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: request_json,
            credentials: 'include'
        }
        );
    }

    if (form_object.fetch) {
        // fetch certification form submitted
        const response_json = await backend_request(
            `issuer/approval/certification/${form_object.certification_id}`, {
            method: 'GET',
            credentials: 'include'
        }
        );

        if (response_json.success)
            response_json.action = 'fetch';
        return response_json;
    }

    if (form_object.approve) {
        // approve certification form submitted
        const response_json = await backend_request(
            'issuer/approval/add', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: request_json,
            credentials: 'include'
        }
        );

        if (response_json.success) {
            response_json.action = 'approve';
            return response_json;
        }
    }

}

function ApprovalCard({ approval }) {
    return <div className={styles.card}>
        <div className={styles.card_content}>
            <h1>{approval.certification_title}</h1>
            <p>{approval.issuer_display_name}</p>
        </div>
        <Form method="POST" className={styles.card_actions} onSubmit={(e) => {if(!window.confirm('Remove approval?')) e.preventDefault()}}>
            <input type="hidden" name="certification_id" value={approval.certification_id} />
            {/* <input type="submit" name="delete" value="Delete" /> */}
            <button className={styles.delete_button} type="submit" name="delete" value="delete">Delete</button>
        </Form>
    </div>;
}

export default function Approvals({ loaderData }) {
    const [certification, setCertification] = useState(null);
    const action_data = useActionData();

    useEffect(() => {
        if (action_data?.action === 'fetch')
            setCertification(action_data.data);
        else if (action_data?.action === 'approve')
            setCertification(null);
    }, [action_data]);

    return <div className={styles.scrollable_content_div}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Add Approval</h1>
            {(certification === null) ?
                <Form method="POST" className={styles.simple_form}>
                    <label for="certification_id">Enter Certification ID</label>
                    <input name="certification_id" type="text" required="true" />
                    <input name="fetch" type="submit" value="Fetch Details" />
                </Form> :
                <div className={styles.card}>
                    <div className={styles.card_content}><h1>{certification.title}</h1> <p>by {certification.issuer_display_name}</p></div>
                    <div className={styles.card_actions}>
                        <Form method='POST'>
                            <input name='certification_id' type='hidden' value={certification.id} />
                            <input name='approve' type="submit" value="Approve" className={styles.card_action_button} />
                        </Form>
                        <button onClick={() => setCertification(null)} className={styles.card_action_button}>Cancel</button>
                    </div>
                </div>
            }
        </div>

        <h1>Approvals</h1>
        <p>Note: Your own certifications are naturally considered approved by you. They are not listed below.</p>
        <div className={styles.card_list}>
            {(loaderData?.data.length === 0) ?
                <p>No Approvals</p> :
                loaderData.data.map((approval) => <ApprovalCard approval={approval} />)
            }
        </div>

    </div>;
}