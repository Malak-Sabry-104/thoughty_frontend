// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
let carouselInterval;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Handle wrap-around
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Show current slide
  slides[currentSlide].classList.add("active");
  updateIndicators();
}

function updateIndicators() {
  const indicators = document.querySelectorAll(".flex.space-x-2 span");
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.remove("bg-gray-600");
      indicator.classList.add("bg-[var(--primary)]");
    } else {
      indicator.classList.remove("bg-[var(--primary)]");
      indicator.classList.add("bg-gray-600");
    }
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startCarousel() {
  carouselInterval = setInterval(nextSlide, 5000);
}

function resetCarouselTimer() {
  clearInterval(carouselInterval);
  startCarousel();
}

// Filter functionality
function toggleFilterDropdown() {
  const dropdown = document.getElementById("filter-dropdown");
  dropdown.classList.toggle("active");
}

function applyFilters() {
  const showCategory = document.getElementById("filter-category").checked;
  const showTone = document.getElementById("filter-tone").checked;
  const showFavorites = document.getElementById("filter-favorites").checked;
  const showNew = document.getElementById("filter-new").checked;

  const insights = document.querySelectorAll(".insight-card");

  insights.forEach((insight) => {
    const isCategory = insight.dataset.category;
    const isTone = insight.dataset.tone;
    const isFavorite = insight.dataset.favorite === "true";
    const isNew = insight.dataset.new === "true";

    let shouldShow = true;

    if (!showCategory && isCategory && !isTone) shouldShow = false;
    if (!showTone && isTone && !isCategory) shouldShow = false;
    if (!showFavorites && isFavorite) shouldShow = false;
    if (!showNew && isNew) shouldShow = false;

    if (shouldShow) {
      insight.style.display = "block";
      setTimeout(() => {
        insight.style.opacity = "1";
      }, 10);
    } else {
      insight.style.opacity = "0";
      setTimeout(() => {
        insight.style.display = "none";
      }, 300);
    }
  });

  // Close dropdown after applying filters
  document.getElementById("filter-dropdown").classList.remove("active");
}

// Generate random insights
function generateRandomInsight() {
  const categories = ["Creativity", "Technology", "Society", "Emotions"];
  const tones = ["Optimistic", "Philosophical", "Analytical", "Critical"];
  const titles = [
    "New Perspective",
    "Hidden Pattern",
    "Creative Boost",
    "Mindful Approach",
    "Tech Insight",
    "Social Observation",
  ];
  const contents = [
    "Try looking at this problem from a completely different angle. What changes?",
    "You've been focusing on this pattern recently. What deeper meaning might it have?",
    "When feeling stuck, try changing your environment. How does it affect your thinking?",
    "Notice how your emotional state influences your ideas today. Any correlations?",
    "This technology trend you've been following might have unexpected applications.",
    "The social behavior you observed could be part of a larger cultural shift.",
  ];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const randomTone = tones[Math.floor(Math.random() * tones.length)];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomContent = contents[Math.floor(Math.random() * contents.length)];

  const insightCard = document.createElement("div");
  insightCard.className = "insight-card p-4 opacity-0";
  insightCard.dataset.category = randomCategory.toLowerCase();
  insightCard.dataset.tone = randomTone.toLowerCase();
  insightCard.dataset.favorite = "false";
  insightCard.dataset.new = "true";

  const isTone = Math.random() > 0.5;

  insightCard.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <span class="${
                      isTone ? "tone-tag" : "category-tag"
                    } px-3 py-1 rounded-full text-xs font-medium">
                        ${isTone ? randomTone : randomCategory}
                    </span>
                    <button class="favorite-btn" data-id="${Date.now()}">
                        <i class="far fa-star"></i>
                    </button>
                </div>
                <h4 class="font-medium mb-2">${randomTitle}</h4>
                <p class="text-sm text-gray-300">${randomContent}</p>
                <div class="mt-3 flex justify-end space-x-2">
                    <button class="text-xs px-2 py-1 rounded bg-[var(--input-bg)] dismiss-btn">Dismiss</button>
                    <button class="text-xs px-2 py-1 rounded bg-[var(--primary)] save-btn">Save</button>
                </div>
            `;

  document.getElementById("insights-container").prepend(insightCard);

  setTimeout(() => {
    insightCard.style.opacity = "1";
  }, 10);

  // Add event listeners to new buttons
  insightCard
    .querySelector(".favorite-btn")
    .addEventListener("click", toggleFavorite);
  insightCard
    .querySelector(".dismiss-btn")
    .addEventListener("click", dismissInsight);
  insightCard.querySelector(".save-btn").addEventListener("click", saveInsight);
}

// Toggle favorite status
function toggleFavorite() {
  this.classList.toggle("active");
  const icon = this.querySelector("i");
  icon.classList.toggle("far");
  icon.classList.toggle("fas");

  const insightCard = this.closest(".insight-card");
  insightCard.dataset.favorite = this.classList.contains("active")
    ? "true"
    : "false";

  // In a real app, you would save this to a database
  const itemId = this.getAttribute("data-id");
  console.log(`Toggled favorite for item ${itemId}`);
}

// Dismiss insight
function dismissInsight() {
  const card = this.closest(".insight-card");
  card.style.opacity = "0";
  setTimeout(() => {
    card.style.display = "none";
  }, 300);
  console.log("Insight dismissed");
}

// Save insight
function saveInsight() {
  const card = this.closest(".insight-card");
  card.style.opacity = "0";
  setTimeout(() => {
    card.style.display = "none";
  }, 300);
  console.log("Insight saved");

  // Show a confirmation (in a real app, you might show a toast notification)
  alert("Insight saved to your collection!");
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Initialize carousel
  showSlide(0);
  startCarousel();

  // Carousel controls
  document.getElementById("next-tip").addEventListener("click", function () {
    nextSlide();
    resetCarouselTimer();
  });

  document.getElementById("prev-tip").addEventListener("click", function () {
    prevSlide();
    resetCarouselTimer();
  });

  // Filter functionality
  document
    .getElementById("filter-btn")
    .addEventListener("click", toggleFilterDropdown);
  document
    .getElementById("apply-filters")
    .addEventListener("click", applyFilters);

  // Close filter dropdown when clicking outside
  document.addEventListener("click", function (event) {
    const filterBtn = document.getElementById("filter-btn");
    const filterDropdown = document.getElementById("filter-dropdown");

    if (
      !filterBtn.contains(event.target) &&
      !filterDropdown.contains(event.target)
    ) {
      filterDropdown.classList.remove("active");
    }
  });

  // Favorite buttons
  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", toggleFavorite);
  });

  // Dismiss/Save buttons
  document.querySelectorAll(".dismiss-btn").forEach((btn) => {
    btn.addEventListener("click", dismissInsight);
  });

  document.querySelectorAll(".save-btn").forEach((btn) => {
    btn.addEventListener("click", saveInsight);
  });

  // Floating action button for new insights
  document
    .getElementById("new-insight-btn")
    .addEventListener("click", function () {
      // Add pulse animation when clicked
      this.classList.add("animate-pulse");
      setTimeout(() => {
        this.classList.remove("animate-pulse");
      }, 1000);

      // Generate a new random insight
      generateRandomInsight();
    });

  // Simulate loading of insights (in a real app, this would be API calls)
  setTimeout(() => {
    const loadingElements = document.querySelectorAll(".insight-card");
    loadingElements.forEach((el) => {
      el.style.opacity = "1";
    });
  }, 300);
});
