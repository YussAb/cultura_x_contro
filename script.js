const newsletterForm = document.querySelector(".newsletter-form");

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

function setFeedback(type, message) {
  const feedback = newsletterForm?.querySelector(".form-feedback");
  if (!feedback) {
    return;
  }

  feedback.textContent = message;
  feedback.className = "form-feedback";
  if (type) {
    feedback.classList.add(type);
  }
}

async function handleNewsletterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = form.querySelector('input[type="email"]');
  const submitButton = form.querySelector('button[type="submit"]');

  if (!emailInput) {
    return;
  }

  const email = emailInput.value.trim().toLowerCase();
  emailInput.value = email;

  if (!emailInput.checkValidity()) {
    setFeedback("is-error", "Please enter a valid email.");
    emailInput.reportValidity();
    return;
  }

  const payload = new FormData(form);
  setFeedback(null, "");

  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(payload)
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    form.reset();
    setFeedback("is-success", "Thank you. I will keep you updated soon.");
  } catch (error) {
    setFeedback("is-error", "Something went wrong. Please try again soon.");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
}

newsletterForm?.addEventListener("submit", handleNewsletterSubmit);
