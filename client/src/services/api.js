const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api");
const FORM_RECIPIENT = import.meta.env.VITE_FORM_RECIPIENT || "kuldeep@marudharchemicals.com";
const FORM_TARGET = import.meta.env.VITE_FORMSUBMIT_TARGET || FORM_RECIPIENT;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function submitLeadForm({ subject, payload, formType }) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });

  formData.append("form_type", formType);
  formData.append("submitted_at", new Date().toISOString());
  formData.append("_subject", subject);
  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("_honey", "");

  if (typeof window !== "undefined") {
    formData.append("_url", window.location.href);
  }

  if (payload.email) {
    formData.append("_replyto", payload.email);
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FORM_TARGET)}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  const result = await response.json().catch(() => null);
  const message = result?.message || `Form submission failed: ${response.status}`;

  if (!response.ok || !(result?.success === "true" || result?.success === true)) {
    const error = new Error(message);

    if (/activation/i.test(message)) {
      error.name = "ActivationRequiredError";
    }

    throw error;
  }

  return result;
}

export const api = {
  getProducts: () => request("/products"),
  getProductBySlug: (slug) => request(`/products/${slug}`),
  submitContact: (payload) =>
    submitLeadForm({
      subject: "New Woodello Talk to Expert inquiry",
      payload,
      formType: "contact",
    }),
  submitMerchantLead: (payload) =>
    submitLeadForm({
      subject: "New Woodello Merchant Application",
      payload,
      formType: "merchant_application",
    }),
  submitDatasheetLead: (payload) =>
    submitLeadForm({
      subject: `New Woodello Datasheet Request - ${payload.datasheet_name || "Unknown Datasheet"}`,
      payload,
      formType: "datasheet_request",
    }),
};
