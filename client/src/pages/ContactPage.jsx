import { renderBrandWordmark } from "../utils/brandText";
import LeadForm from "../components/LeadForm";

function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>{renderBrandWordmark("Speak with Woodello Technical and Sales Teams", "brand-wordmark-hero")}</h1>
          <p className="section-subtitle">For product recommendations, merchant inquiries, and project support.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="tile" data-reveal>
            <h3>Contact Details</h3>
            <p>
              <strong>Email:</strong> <a href="mailto:info@woodello.in">info@woodello.in</a>
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+919119104829">+91 91191 04829</a>
            </p>
            <p>
              <strong>Business Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM
            </p>
            <p>
              <strong>Office:</strong> Jodhpur (Rajasthan), India
            </p>
          </article>

          <article className="tile" data-reveal>
            <h3>Send a Message</h3>
            <LeadForm
              formKind="contact"
              submitLabel="Submit Inquiry"
              successTitle="Message sent successfully"
              successMessage="We have received your inquiry and will get back to you soon."
              fields={[
                { name: "name", label: "Name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                {
                  name: "topic",
                  label: "Topic",
                  type: "select",
                  required: true,
                  defaultValue: "Product Recommendation",
                  options: ["Product Recommendation", "Technical Support", "Merchant Inquiry", "Bulk Order"],
                },
                { name: "message", label: "Message", type: "textarea", full: true, rows: 5 },
              ]}
            />
          </article>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
