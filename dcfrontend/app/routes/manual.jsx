import RootNavigation from "../components/root_navigation";
import styles from "./styles/manual.module.css";
import erdiagram from "../assets/dcertificate_logical_architecture.webp";
import DcertificateLogo from "../components/logo";

export default function Manual() {
    return <>
        <DcertificateLogo size={120} />
        <h1>User Manual</h1>

        <div className={styles.articleLayout}>
            <nav className={styles.toc} id="toc">
                <b>Table of Contents</b>
                <ol>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#architecture">Logical Architecture</a></li>
                    <li><a href="#functionality">Functionality</a></li>
                    <li><a href="#example">Example</a></li>
                </ol>
            </nav>

            <article className={styles.manual}>
                <section>
                    <h1 id="introduction">Introduction</h1>

                    <p>
                        Dcertificate is a simple to use,
                        web-first Software as a Service
                        platform for digital certificates.
                        It brings all the involved parties
                        (recipient, issuer and approvers)
                        on the same platform.
                    </p>

                    <p>
                        This system is designed for
                        individuals and organizations
                        that want to issue certificates
                        to other individuals or organisations
                        and manage them digitally over the internet.
                    </p>

                </section>

                <section>
                    <h1 id="architecture">Architecture</h1>
                    <p>
                        This section describes
                        logical architecture of the application
                        for users or simply "how it works".
                    </p>

                    <p>
                        Users are divided into 3 types -
                        <ol>
                            <li>Recipients: The receivers of certificates.</li>
                            <li>Issuers: The issuer and controller of certificates.</li>
                            <li>Approvers: Approvers of certificates.</li>
                        </ol>

                        There are two types of entities
                        that these users own or control -
                        <ol>
                            <li>
                                Certificates -
                                A certificate is an instance of a certification
                                for a particular recipient
                                at a particular timestamp.
                                They are owned by recipients,
                                issued and controlled by issuers.
                            </li>
                            <li>
                                Certifications -
                                A certification is a blueprint for a class of certificates.
                                They are owned and controlled by issuers.
                                An approver approves a certification
                                to approve the related certificates.
                            </li>
                        </ol>
                    </p>

                    <figure className={styles.erdiagram}>
                        <img src={erdiagram} />
                        <figcaption>Entity Relationship Diagram</figcaption>
                    </figure>

                    <p>
                        This is a multi-tenant system
                        with decentralized authority.
                        It means that multiple issuers,
                        recipients and approvers co-exist
                        within the same system.
                        Every user only manages thier property
                        or objective without affecting others.
                        A recipient only sees the certificates issued to it.
                        An issuer only manages its certifications
                        and certificates issued via them.
                        An approver only approves the certifications it wants to.
                    </p>
                </section>

                <section>
                    <h1 id="functionality">Functionality</h1>
                    <p>
                        If you have used a computer program before,
                        the application is very intutive to use
                        once you understand the core functionality.
                        So only the core functionality is explained
                        to save your time from excessive reading.
                        The functionality is split into
                        two types of accounts -
                        recipient accounts & issuer accounts.
                    </p>

                    <h2>Recipient Accounts</h2>
                    <p>
                        These accounts are for recipients.
                        One person needs only one account.
                        All issuers can issue certificate
                        to same account.
                    </p>

                    <p>
                        During registration of a recipient account,
                        the user assigns a unique username
                        and system assigns a unique recipient-id.

                        This recipient-id is used by the system
                        for all internal identification purposes.
                        This id needs to be shared with
                        issuers to get certificates issued from them.
                    </p>

                    <h2>Issuer Accounts</h2>
                    <p>
                        These accounts are for
                        issuers and approvers.
                        Similar to recipient accounts,
                        during registration of issuer account,
                        the user gives a unique username
                        and the system assigns it a unique issuer-id.
                        This id is used for all internal identification.
                    </p>

                    <p>
                        These accounts provide following functionality
                        for issuers -
                        <ol>
                            <li>Create and modify certifications.</li>
                            <li>Issue certificates based on those certifications.</li>
                            <li>Revoke a previously issued certificate.</li>
                        </ol>
                        Approvers get functionality to approve and revoke approvals
                        for certifications based on certification id.
                        Note that while approving certifications of its own account,
                        the user gets the message "approval already exists"
                        because an issuer's own certifications are considered
                        self-approved and this can't be changed.
                    </p>
                </section>

                <section>
                    <h1 id="example">Example</h1>
                    <p>
                        Consider two recipients - Akriti & Selena.
                        Both of them create recipient accounts.
                        Akriti : username - akriti, recipient-id - r1.
                        Selena : username - selena01, recipient-id - r2.
                    </p>

                    <p>
                        ABC Institute provides a course "ABC CS-Fundamentals"
                        and wants to issue certificates.
                        The national computer science society (NCSS) approves this course.
                        NCSS also has its own certification program
                        called "Programming Fundamentals".
                        Both of them create issuer accounts on Dcertificate.
                        ABC Institute creates a certification called "ABC CS-Fundamentals"
                        and gets certification id c01.
                        NCSS approves this certification using the id c01.
                        NCSS also creates its own certification "Programming Fundamentals"
                        and get the certification id c02.
                    </p>

                    <p>
                        Akriti and Selena both complete the course "ABC CS-Fundamentals".
                        So, ABC Institute issues the certification c01
                        to their recipient ids r1 and r2.
                        But Akriti also completes the "Programming Fundamentals" course.
                        So, NCSS issues the certification c02 to the recipient id
                        of Akriti i.e. r1.
                        Note Akriti has 2 certificates in one account
                        from two different issuers.
                    </p>

                    <p>
                        When a certificate is issued,
                        the timestamp is recorded on it.
                        So certificates from same certification
                        can be issued more than once to same person.
                        Lets say the validity of "ABC CS Fundamentals"
                        was set to 1 year from the date of issue of certificate
                        (this functionality is available in dcertificate).
                        If Selena completes this course again after 10 months,
                        ABC Institute can again issue the certificate
                        using certification c01 at that time to Selena's ID.
                    </p>

                    <p>
                        After sometime, NCSS starts a new certification program
                        called "Programming Advanced".
                        So it creates another certification for it
                        in its already existing issuer account.
                        This way one issuer account can have multipe certifications.
                    </p>

                    <p>
                        It is worth mentioning that
                        ABC Institute can approve one or more
                        NCSS's certifications too,
                        if it finds a reason to do so.
                        NCSS won't be affected by these approvals.
                        Approvals are intended mainly for approver's use.
                    </p>
                </section>
            </article>
        </div>
        {/*Following line sends to the top of page. Meant mainly for showing TOC*/}
        <a href="#toc" className={styles.tocFinder}>TOC</a>
        <RootNavigation />
    </>;
}