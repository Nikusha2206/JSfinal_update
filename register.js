document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const successMessage = document.getElementById("successMessage");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const cookieModal = document.getElementById("cookieModal");
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");
  const agreeCookieTerms = document.getElementById("agreeCookieTerms");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "👁️" : "🔒";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    resetErrors();

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsAccepted = validateTerms();

    if (
      isFullNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isTermsAccepted
    ) {
      cookieModal.style.display = "flex";
    }
  });

  agreeBtn.addEventListener("click", function () {
    if (!agreeCookieTerms.checked) {
      alert("Please agree to the cookie terms to continue.");
      return;
    }

    cookieModal.style.display = "none";

    successMessage.style.display = "block";
    form.reset();

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  });

  disagreeBtn.addEventListener("click", function () {
    cookieModal.style.display = "none";
    alert(
      "You must agree to our cookie policy to create an account. Please review our policies and try again."
    );
  });

  document
    .getElementById("fullName")
    .addEventListener("blur", validateFullName);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document.getElementById("phone").addEventListener("blur", validatePhone);
  document
    .getElementById("password")
    .addEventListener("blur", validatePassword);
  document
    .getElementById("confirmPassword")
    .addEventListener("blur", validateConfirmPassword);
  document
    .getElementById("agreeTerms")
    .addEventListener("change", validateTerms);

  function validateFullName() {
    const fullName = document.getElementById("fullName");
    const fullNameValue = fullName.value.trim();

    if (fullNameValue === "") {
      setError(fullName.parentElement, "Please enter your full name");
      return false;
    }

    if (fullNameValue.split(" ").length < 2) {
      setError(fullName.parentElement, "Please enter your first and last name");
      return false;
    }

    setSuccess(fullName.parentElement);
    return true;
  }

  function validateEmail() {
    const email = document.getElementById("email");
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      setError(email.parentElement, "Please enter your email address");
      return false;
    }

    if (!emailRegex.test(emailValue)) {
      setError(email.parentElement, "Please enter a valid email address");
      return false;
    }

    setSuccess(email.parentElement);
    return true;
  }

  function validatePhone() {
    const phone = document.getElementById("phone");
    const phoneValue = phone.value.trim();
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    if (phoneValue === "") {
      setError(phone.parentElement, "Please enter your phone number");
      return false;
    }

    const cleanedPhone = phoneValue.replace(/[^\d+]/g, "");

    if (!phoneRegex.test(cleanedPhone) || cleanedPhone.length < 10) {
      setError(phone.parentElement, "Please enter a valid phone number");
      return false;
    }

    setSuccess(phone.parentElement);
    return true;
  }

  function validatePassword() {
    const password = document.getElementById("password");
    const passwordValue = password.value;

    if (passwordValue === "") {
      setError(password.parentElement, "Please create a password");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(passwordValue)) {
      setError(
        password.parentElement,
        "Password must be at least 8 characters with uppercase, lowercase, and number"
      );
      return false;
    }

    setSuccess(password.parentElement);
    return true;
  }

  function validateConfirmPassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (confirmPasswordValue === "") {
      setError(confirmPassword.parentElement, "Please confirm your password");
      return false;
    }

    if (passwordValue !== confirmPasswordValue) {
      setError(confirmPassword.parentElement, "Passwords do not match");
      return false;
    }

    setSuccess(confirmPassword.parentElement);
    return true;
  }

  function validateTerms() {
    const termsCheckbox = document.getElementById("agreeTerms");
    const termsError = document.getElementById("termsError");

    if (!termsCheckbox.checked) {
      termsError.style.display = "block";
      return false;
    }

    termsError.style.display = "none";
    return true;
  }

  function setError(formGroup, message) {
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
    formGroup.querySelector(".error-message").textContent = message;
  }

  function setSuccess(formGroup) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
  }

  function resetErrors() {
    const formGroups = document.querySelectorAll(".form-group");
    formGroups.forEach((group) => {
      group.classList.remove("error");
      group.classList.remove("success");
    });

    document.getElementById("termsError").style.display = "none";
  }
});


