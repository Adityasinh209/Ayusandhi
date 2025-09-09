import { Layout } from "@/components/site/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <section className="container py-10 md:py-12 prose prose-slate max-w-3xl dark:prose-invert">
        <h1>About</h1>
        <p>
          This project bridges <strong>NAMASTE</strong> codes with <strong>ICD‑11 TM2</strong> and modern biomedicine to enable dual coding workflows for Ayush systems.
        </p>
        <p>
          It provides a fast, FHIR‑compliant terminology service and a clean UI so clinicians and developers can search, map, and integrate terminology with confidence.
        </p>
        <h2>Compliance</h2>
        <ul>
          <li>FHIR R4 Terminology Services</li>
          <li>India EHR Standards</li>
          <li>ABHA OAuth2.0 (authorization ready)</li>
        </ul>
      </section>
    </Layout>
  );
}
