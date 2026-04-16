import { renderBrandWordmark } from "../utils/brandText";
import LeadForm from "../components/LeadForm";

function MerchantPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container split">
          <div data-reveal>
            <span className="eyebrow">Become a Merchant</span>
            <h1>{renderBrandWordmark("Partner with Woodello Distribution Network", "brand-wordmark-hero")}</h1>
            <p>
              Join a premium brand with technical support, marketing collateral, and high-performance products.
            </p>
          </div>
          <div className="tile" data-reveal>
            <h3>Merchant Benefits</h3>
            <ul className="list">
              <li>Territory-focused business opportunities</li>
              <li>High margin premium product range</li>
              <li>Retail display and shade card support</li>
              <li>Applicator onboarding and demo assistance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="merchant-form">
        <div className="container tile" data-reveal>
          <h2 className="section-title">Merchant Application Form</h2>
          <p className="section-subtitle">Share your business details. We will contact you within 48 hours.</p>
          <LeadForm
            formKind="merchant"
            submitLabel="Submit Application"
            successTitle="Application submitted successfully"
            successMessage="We have received your merchant application and will contact you within 48 hours."
            fields={[
              { name: "name", label: "Full Name", type: "text", required: true },
              { name: "company", label: "Company Name", type: "text", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "message", label: "Tell us about your market", type: "textarea", full: true, rows: 5 },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

export default MerchantPage;
