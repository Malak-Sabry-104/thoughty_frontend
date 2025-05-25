document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const resetButton = document.getElementById("resetForm");
  const submitBtn = document.getElementById("submitBtn");
  const submitText = document.getElementById("submitText");
  const submitIcon = document.getElementById("submitIcon");
  const submitStatus = document.getElementById("submitStatus");
  const randomEmoji = document.getElementById("randomEmoji");

  // Emoji randomizer
  const emojis = ["😊", "🤔", "👋", "💡", "📩", "📧", "📞", "💬", "✨", "🚀"];
  randomEmoji.addEventListener("mouseover", () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    randomEmoji.textContent = emojis[randomIndex];
  });

  // Initialize floating labels for select element
  const subjectSelect = document.getElementById("subject");
  const subjectLabel = document.querySelector('label[for="subject"]');

  subjectSelect.addEventListener("change", function () {
    if (this.value) {
      subjectLabel.classList.add("transform", "-translate-y-6", "scale-75");
      subjectLabel.style.color = "var(--primary-light)";
    } else {
      subjectLabel.classList.remove("transform", "-translate-y-6", "scale-75");
      subjectLabel.style.color = "";
    }
  });

  // Enhanced submit button interactions
  submitBtn.addEventListener("mouseenter", function () {
    if (!submitBtn.classList.contains("btn-loading")) {
      submitBtn.style.transform = "translateY(-2px)";
      submitBtn.style.boxShadow = "0 10px 20px -10px var(--accent)";
    }
  });

  submitBtn.addEventListener("mouseleave", function () {
    if (!submitBtn.classList.contains("btn-loading")) {
      submitBtn.style.transform = "";
      submitBtn.style.boxShadow = "";
    }
  });

  // Ripple effect for submit button
  submitBtn.addEventListener("click", function (e) {
    // Create ripple element
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");

    // Position the ripple
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });

  // Form submission with enhanced button feedback
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    const isValid = validateForm();

    if (!isValid) {
      // Show error state
      submitBtn.classList.add("submit-error");
      submitStatus.textContent = "Please fill all required fields";
      submitStatus.classList.remove("hidden");
      submitStatus.classList.remove("text-[var(--secondary)]");
      submitStatus.classList.add("text-[var(--accent)]");

      // Remove error state after animation
      setTimeout(() => {
        submitBtn.classList.remove("submit-error");
      }, 500);

      return;
    }

    // Button loading state
    submitBtn.classList.add("btn-loading");
    submitText.textContent = "Sending...";
    submitIcon.className = "fas fa-spinner fa-spin";
    submitStatus.textContent = "Processing your message";
    submitStatus.classList.remove("hidden");
    submitStatus.classList.remove("text-[var(--accent)]");
    submitStatus.classList.add("text-[var(--primary-light)]");

    // Simulate form submission (2-3 seconds)
    const submitTime = 2000 + Math.random() * 1000;

    setTimeout(() => {
      // Create confetti
      createConfetti();

      // Show success state
      submitBtn.classList.remove("btn-loading");
      submitBtn.classList.add("submit-success");
      submitText.textContent = "Sent!";
      submitIcon.className = "fas fa-check checkmark";
      submitStatus.textContent = "Message delivered successfully";
      submitStatus.classList.remove("text-[var(--primary-light)]");
      submitStatus.classList.add("text-[var(--secondary)]");

      // Show success message
      setTimeout(() => {
        contactForm.reset();
        contactForm.classList.add("hidden");
        successMessage.classList.remove("hidden");

        // Reset button state
        setTimeout(() => {
          submitBtn.classList.remove("submit-success");
          submitText.textContent = "Send Message";
          submitIcon.className = "fas fa-paper-plane animate-pulse-slow";
          submitStatus.classList.add("hidden");
        }, 500);
      }, 1000);

      // Reset floating labels
      document.querySelectorAll(".input-field").forEach((input) => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (input.value === "") {
          label.classList.remove("transform", "-translate-y-6", "scale-75");
          label.style.color = "";
        }
      });

      // Reset select label
      subjectLabel.classList.remove("transform", "-translate-y-6", "scale-75");
      subjectLabel.style.color = "";
    }, submitTime);
  });

  // Reset form
  resetButton.addEventListener("click", function () {
    contactForm.reset();
    successMessage.classList.add("hidden");
    contactForm.classList.remove("hidden");
  });

  // Form validation
  function validateForm() {
    let isValid = true;

    // Check required fields
    const requiredFields = ["name", "email", "subject", "message"];
    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        isValid = false;
        // Highlight error
        field.style.borderColor = "var(--accent)";
        setTimeout(() => {
          field.style.borderColor = "";
        }, 2000);
      }
    });

    // Check checkbox
    if (!document.getElementById("consent").checked) {
      isValid = false;
      const consentLabel = document.querySelector('label[for="consent"]');
      consentLabel.style.color = "var(--accent)";
      setTimeout(() => {
        consentLabel.style.color = "";
      }, 2000);
    }

    return isValid;
  }

  // Confetti effect
  function createConfetti() {
    const colors = ["#8b5cf6", "#a78bfa", "#10b981", "#ec4899", "#f8fafc"];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      // Random properties
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const posX = Math.random() * window.innerWidth;
      const delay = Math.random() * 3;
      const duration = Math.random() * 3 + 2;

      // Apply styles
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.left = `${posX}px`;
      confetti.style.top = "-10px";
      confetti.style.opacity = "1";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;

      // Add to body
      document.body.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }

    // Add fall animation
    const style = document.createElement("style");
    style.innerHTML = `
                    @keyframes fall {
                        to {
                            transform: translateY(${
                              window.innerHeight + 100
                            }px) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
    document.head.appendChild(style);
  }
});

// Simple animation for team cards on scroll
document.addEventListener("DOMContentLoaded", function () {
  const teamCards = document.querySelectorAll(".team-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  teamCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Gradient text animation
  const gradientTexts = document.querySelectorAll(".gradient-text");
  gradientTexts.forEach((text) => {
    text.addEventListener("mouseenter", () => {
      text.style.background = `linear-gradient(90deg, ${getComputedStyle(
        document.documentElement
      ).getPropertyValue("--accent")}, ${getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary")})`;
      text.style.webkitBackgroundClip = "text";
      text.style.backgroundClip = "text";
    });
    text.addEventListener("mouseleave", () => {
      text.style.background = `linear-gradient(90deg, ${getComputedStyle(
        document.documentElement
      ).getPropertyValue("--primary")}, ${getComputedStyle(
        document.documentElement
      ).getPropertyValue("--accent")})`;
      text.style.webkitBackgroundClip = "text";
      text.style.backgroundClip = "text";
    });
  });
});
