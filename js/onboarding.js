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

function showProfileError(message) {
  profileError.textContent = message;
  profileError.classList.add("active");
  profileInput.value = ""; // Clear the invalid file
}

function hideProfileError() {
  profileError.textContent = "";
  profileError.classList.remove("active");
}

const selected = document.querySelector(".select-selected");
const items = document.querySelector(".select-items");

selected.addEventListener("click", () => {
  items.style.display = items.style.display === "block" ? "none" : "block";
});

document.querySelectorAll(".select-items div").forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerHTML = `${option.textContent} <span class="select-arrow">▼</span>`;
    items.style.display = "none";
  });
});

// Optional: click outside to close dropdown
window.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-select")) {
    items.style.display = "none";
  }
});

document.querySelector("#save").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/";
  })