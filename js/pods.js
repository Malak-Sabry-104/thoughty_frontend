// Modal functionality (replaces Bootstrap modals)
function setupModals() {
  // Pod Detail Modal
  const podDetailModal = document.getElementById('podDetailModal');
  const podDetailModalClose = document.getElementById('podDetailModalClose');
  const podDetailModalOverlay = document.getElementById('podDetailModalOverlay');
  
  // New Pod Modal
  const newPodModal = document.getElementById('newPodModal');
  const newPodBtn = document.getElementById('newPodBtn');
  const newPodModalClose = document.getElementById('newPodModalClose');
  const cancelNewPod = document.getElementById('cancelNewPod');
  const newPodModalOverlay = document.getElementById('newPodModalOverlay');

  // Open pod detail modal when clicking on pod cards
  const podCards = document.querySelectorAll('.pod-card');
  podCards.forEach((card) => {
    card.addEventListener('click', function () {
      podDetailModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  // Close pod detail modal
  if (podDetailModalClose) {
    podDetailModalClose.addEventListener('click', function() {
      podDetailModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  if (podDetailModalOverlay) {
    podDetailModalOverlay.addEventListener('click', function() {
      podDetailModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // New Pod Modal
  if (newPodBtn) {
    newPodBtn.addEventListener('click', function() {
      newPodModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  }

  // Close new pod modal
  if (newPodModalClose) {
    newPodModalClose.addEventListener('click', function() {
      newPodModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  if (cancelNewPod) {
    cancelNewPod.addEventListener('click', function() {
      newPodModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  if (newPodModalOverlay) {
    newPodModalOverlay.addEventListener('click', function() {
      newPodModal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Check for URL parameter to open new pod modal
  if (window.location.href.match('new_pod_popup=true')) {
    if (newPodModal) {
      newPodModal.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }
  }
}

// Initialize modals on DOM load
document.addEventListener('DOMContentLoaded', setupModals);

// Enhanced emoji reaction functionality
document.querySelectorAll(".emoji-reaction").forEach((emoji) => {
  // Initialize with stored reaction state if available
  const podId = emoji.closest('[data-pod-id]')?.dataset.podId;
  const emojiChar = emoji.textContent.trim();
  
  if (podId) {
    const storageKey = `pod-${podId}-${emojiChar}`;
    if (localStorage.getItem(storageKey)) {
      emoji.classList.add("text-primary", "reacted", "opacity-100");
      emoji.classList.remove("opacity-70");
    }
  }

  // Click handler
  emoji.addEventListener("click", function() {
    const podId = this.closest('[data-pod-id]')?.dataset.podId;
    const emojiChar = this.textContent.trim();
    
    // Toggle visual state
    this.classList.toggle("reacted");
    this.classList.toggle("text-primary");
    this.classList.toggle("opacity-100");
    this.classList.toggle("opacity-70");
    
    // Add animation
    this.classList.add("animate-bounce");
    setTimeout(() => {
      this.classList.remove("animate-bounce");
    }, 500);
    
    // Persist state
    if (podId) {
      const storageKey = `pod-${podId}-${emojiChar}`;
      if (this.classList.contains("reacted")) {
        localStorage.setItem(storageKey, "true");
      } else {
        localStorage.removeItem(storageKey);
      }
    }
    
    // Update counter if exists
    const counter = this.nextElementSibling;
    if (counter && counter.classList.contains("reaction-count")) {
      const currentCount = parseInt(counter.textContent) || 0;
      counter.textContent = this.classList.contains("reacted") 
        ? currentCount + 1 
        : Math.max(0, currentCount - 1);
    }
  });
});
