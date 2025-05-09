  // Mobile menu toggle
      document
        .getElementById("mobile-menu-button")
        .addEventListener("click", function () {
          const menu = document.getElementById("mobile-menu");
          menu.classList.toggle("hidden");
        });

      // Close mobile menu when clicking a link
      document.querySelectorAll("#mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          document.getElementById("mobile-menu").classList.add("hidden");
        });
      });

      // Scroll reveal animation
      function checkVisibility() {
        const elements = document.querySelectorAll(".fade-in");

        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;

          if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add("visible");
          }
        });
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        });
      });

      // Initialize effects
      window.addEventListener("scroll", checkVisibility);
      window.addEventListener("load", checkVisibility);