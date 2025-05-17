const toggleBtn = document.getElementById("toggleBtn");
const formCard = document.getElementById("formCard");

toggleBtn.addEventListener("click", () => {
  formCard.classList.toggle("flipped");
  toggleBtn.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form-face.front");
  const signupForm = document.querySelector(".form-face.back");

  try {
    let reqParamValue = window.location.href.split('?')[1];
    if (reqParamValue == 'request=signup') {
      formCard.classList.toggle("flipped");
      toggleBtn.classList.toggle("active");
    }
  } catch (error) {
    
  }

  function clearErrors(form) {
    form.querySelectorAll(".error-message").forEach(el => el.remove());
    form.querySelectorAll("input").forEach(input => input.classList.remove("input-error"));

  }

  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.classList.add("input-error");

    input.insertAdjacentElement("afterend", error);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  loginForm.addEventListener("submit", function (e) {
    clearErrors(loginForm);
    let valid = true;

    const email = loginForm.querySelector("#email");
    const username = loginForm.querySelector("#username");
    const password = loginForm.querySelector("#password");

    if (!validateEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (username.value.trim() === "") {
      showError(username, "Username is required.");
      valid = false;
    }

    if (password.value.length < 8) {
      showError(password, "Password must be at least 8 characters.");
      valid = false;
    }

    if (!valid) e.preventDefault();
  });

  signupForm.addEventListener("submit", function (e) {
    clearErrors(signupForm);
    let valid = true;

    const email = signupForm.querySelector("#email2");
    const username = signupForm.querySelector("#username2");
    const password = signupForm.querySelector("#password2");
    const confirmPassword = signupForm.querySelector("#confirmPassword");
    const check = signupForm.querySelector("#check");
    
    if (!validateEmail(email.value)) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (username.value.trim() === "") {
      showError(username, "Username is required.");
      valid = false;
    }

    if (password.value.length < 8) {
      showError(password, "Password must be at least 8 characters.");
      valid = false;
    }

    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match.");
      valid = false;
    }

    if (!check.checked) {
      showError(check.parentElement, "You must agree to the terms.");
      valid = false;
    }

    e.preventDefault()
    if (!valid) {
    } else {
      window.location.href = "/onboarding.html";
    }
  });
});