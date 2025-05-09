const profileInput = document.getElementById("profileInput");
const profilePreview = document.getElementById("profilePreview");
const profileError = document.getElementById("profileError");
const signupForm = document.getElementById("signupForm");

// Click on profile picture to trigger file input
profilePreview.addEventListener("click", () => {
  profileInput.click();
});

// Handle file selection
profileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    // Validate file
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      showProfileError("Please select a valid image (JPEG, PNG)");
      return;
    }

    if (file.size > maxSize) {
      showProfileError("Image must be less than 2MB");
      return;
    }

    // Clear any errors
    hideProfileError();

    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      profilePreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Here you would typically send the form data to your server
  // Including the profile picture if one was selected
  console.log("Form submitted");

  // For demo purposes, just show an alert
  alert("Account created successfully!");
});

function showProfileError(message) {
  profileError.textContent = message;
  profileError.classList.add("active");
  profileInput.value = ""; // Clear the invalid file
}

function hideProfileError() {
  profileError.textContent = "";
  profileError.classList.remove("active");
}
