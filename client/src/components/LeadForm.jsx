import { useMemo, useState } from "react";
import { api } from "../services/api";

function LeadForm({
  formKind,
  fields,
  submitLabel,
  successTitle,
  successMessage,
  submitClassName = "btn btn-primary",
}) {
  const initialValues = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, field.defaultValue || ""])),
    [fields]
  );
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);

  const submitAction = formKind === "merchant" ? api.submitMerchantLead : api.submitContact;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await submitAction(values);
      setValues(initialValues);
      setPopup({
        tone: "success",
        title: successTitle,
        message: successMessage,
      });
    } catch (error) {
      const isActivationRequired = error.name === "ActivationRequiredError";

      setPopup({
        tone: isActivationRequired ? "info" : "error",
        title: isActivationRequired ? "Email activation required" : "Submission failed",
        message: isActivationRequired
          ? "FormSubmit needs a one-time activation for this recipient email. Open the activation email sent to this inbox, click the activation link once, and submissions will start working normally."
          : error.message || "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="form-grid" onSubmit={handleSubmit}>
        {fields.map((field) => {
          const fieldId = `${formKind}-${field.name}`;
          const wrapperClassName = field.full ? "field full" : "field";

          return (
            <div className={wrapperClassName} key={field.name}>
              <label htmlFor={fieldId}>{field.label}</label>
              {field.type === "select" ? (
                <select id={fieldId} name={field.name} value={values[field.name]} onChange={handleChange} required={field.required}>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={fieldId}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  rows={field.rows || 5}
                />
              ) : (
                <input
                  id={fieldId}
                  name={field.name}
                  type={field.type || "text"}
                  value={values[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          );
        })}

        <div className="field full">
          <button className={submitClassName} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </div>
      </form>

      {popup ? (
        <div className="form-popup-backdrop" role="presentation" onClick={() => setPopup(null)}>
          <div
            className={`form-popup form-popup-${popup.tone}`}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`${formKind}-popup-title`}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id={`${formKind}-popup-title`}>{popup.title}</h3>
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

export default LeadForm;
