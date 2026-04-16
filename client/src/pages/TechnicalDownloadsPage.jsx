import { useState } from "react";
import QrSection from "../components/QrSection";
import { downloadProducts } from "../data/content";
import { api } from "../services/api";
import { renderBrandWordmark } from "../utils/brandText";

const datasheetLeadStorageKey = "woodello_datasheet_lead";
const initialLeadValues = {
  name: "",
  email: "",
  phone: "",
  user_type: "End Consumer",
};

function getSavedDatasheetLead() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(datasheetLeadStorageKey);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function TechnicalDownloadsPage() {
  const savedLead = getSavedDatasheetLead();
  const [activeRequest, setActiveRequest] = useState(null);
  const [leadValues, setLeadValues] = useState(savedLead || initialLeadValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  function closeRequestModal() {
    setActiveRequest(null);
    setLeadValues(initialLeadValues);
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setLeadValues((current) => ({ ...current, [name]: value }));
  }

  function triggerDatasheetAccess(request) {
    if (!request) return;

    if (request.action === "view") {
      window.open(request.file.href, "_blank", "noopener,noreferrer");
      return;
    }

    const link = document.createElement("a");
    link.href = request.file.href;
    link.download = request.file.filename;
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function handleRequestStart(file, action) {
    const existingLead = getSavedDatasheetLead();

    if (existingLead) {
      triggerDatasheetAccess({ file, action });
      return;
    }

    setLeadValues(savedLead || initialLeadValues);
    setActiveRequest({ file, action });
  }

  async function handleLeadSubmit(event) {
    event.preventDefault();

    if (!activeRequest) return;

    setIsSubmitting(true);

    try {
      await api.submitDatasheetLead({
        ...leadValues,
        datasheet_name: activeRequest.file.name,
        datasheet_action: activeRequest.action,
        datasheet_file: activeRequest.file.filename,
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(datasheetLeadStorageKey, JSON.stringify(leadValues));
      }

      triggerDatasheetAccess(activeRequest);
      setActiveRequest(null);
      setPopup({
        tone: "success",
        title: "Request submitted successfully",
        message:
          activeRequest.action === "view"
            ? "Your details have been submitted. The datasheet is opening now."
            : "Your details have been submitted. The datasheet download is starting now.",
      });
    } catch (error) {
      const isActivationRequired = error.name === "ActivationRequiredError";
      setPopup({
        tone: isActivationRequired ? "info" : "error",
        title: isActivationRequired ? "Email activation required" : "Submission failed",
        message: isActivationRequired
          ? "FormSubmit needs a one-time activation for this recipient email. Open the activation email sent to this inbox, click the activation link once, and datasheet requests will start working normally."
          : error.message || "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <main className="downloads-page">
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Technical Downloads</span>
            <h1>Documents for Specification and Safe Application</h1>
            <p className="section-subtitle">Download TDS, and process guides for each product system.</p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ display: "grid", gap: "1rem" }}>
            {downloadProducts.map((file) => {
              return (
                <article className="download-card" key={file.name} data-reveal>
                  <div>
                    <h3>{renderBrandWordmark(file.name, "brand-wordmark-heading")}</h3>
                    <p className="small">Coverage, ratios, application window, and safety handling.</p>
                  </div>
                  <div className="download-actions">
                    <button className="btn btn-secondary" type="button" onClick={() => handleRequestStart(file, "view")}>
                      View Datasheet
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={() => handleRequestStart(file, "download")}>
                      Download Datasheet
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <QrSection subtitle="Video walkthroughs for PU, Melamine, NC, and Stain systems." />
      </main>

      {activeRequest ? (
        <div className="form-popup-backdrop" role="presentation" onClick={closeRequestModal}>
          <div
            className="form-popup datasheet-request-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="datasheet-request-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="datasheet-request-tag">Datasheet Access</p>
            <h3 id="datasheet-request-title">
              {activeRequest.action === "view" ? "View datasheet" : "Download datasheet"}
            </h3>
            <p>
              Fill in your details to continue with{" "}
              <strong>{renderBrandWordmark(activeRequest.file.name, "brand-wordmark-heading")}</strong>.
            </p>

            <form className="form-grid" onSubmit={handleLeadSubmit}>
              <div className="field">
                <label htmlFor="datasheet-name">Name</label>
                <input
                  id="datasheet-name"
                  name="name"
                  type="text"
                  value={leadValues.name}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="datasheet-email">Email</label>
                <input
                  id="datasheet-email"
                  name="email"
                  type="email"
                  value={leadValues.email}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="datasheet-phone">Phone Number</label>
                <input
                  id="datasheet-phone"
                  name="phone"
                  type="tel"
                  value={leadValues.phone}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="datasheet-user-type">Who You Are</label>
                <select
                  id="datasheet-user-type"
                  name="user_type"
                  value={leadValues.user_type}
                  onChange={handleFieldChange}
                  required
                >
                  <option value="End Consumer">End Consumer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Seller">Seller</option>
                </select>
              </div>

              <div className="field full datasheet-request-actions">
                <button className="btn btn-secondary" type="button" onClick={closeRequestModal} disabled={isSubmitting}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit and Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {popup ? (
        <div className="form-popup-backdrop" role="presentation" onClick={() => setPopup(null)}>
          <div
            className={`form-popup form-popup-${popup.tone}`}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="datasheet-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="datasheet-popup-title">{popup.title}</h3>
            <p>{popup.message}</p>
            <button className="btn btn-primary" type="button" onClick={() => setPopup(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default TechnicalDownloadsPage;
