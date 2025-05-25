// Main navigation links
const exploreLink = document.querySelector('.nav-link[href="#"]');
const brainstormLink = document.querySelector('.nav-link[href="/brainstorm.html"]');
const battlesLink = document.querySelector('.nav-link[href="/battles.html"]');
const aboutLink = document.querySelector('.nav-link[href="/about.html"]');
const contactLink = document.querySelector('.nav-link[href="/contact.html"]');

// Auth buttons
const signInBtn = document.querySelector('.btn-hover[href*="request=signin"]');
const signUpBtn = document.querySelector('.btn-hover[href*="request=signup"]');
const guestBtn = document.querySelector('.guest-btn-container');

// Notification center
const notificationCenter = document.querySelector('.notif-center');
const notificationBell = document.querySelector('.notif-center .relative');
const notificationCount = document.querySelector('.notif-center .absolute');

// Create pod button
const createPodBtn = document.querySelector('.btn-hover[href="/new-pod"]');

// Profile dropdown elements
const profileDropdown = document.querySelector('.profile-dropdown');
const avatarBtn = document.querySelector('.avatar-btn');
const avatarImg = document.querySelector('.avatar-img');
const dropdownContent = document.querySelector('.dropdown-content');
const headerAvatar = document.querySelector('.header-avatar');
const userName = document.querySelector('.user-name');
const userEmail = document.querySelector('.user-email');

// Dropdown menu items
const dashboardItem = document.querySelector('.dropdown-item:nth-child(1)');
const thoughtPodsItem = document.querySelector('.dropdown-item:nth-child(2)');
const insightsItem = document.querySelector('.dropdown-item:nth-child(3)');
const settingsItem = document.querySelector('.dropdown-item:nth-child(4)');
const logoutItem = document.querySelector('.dropdown-item:nth-child(5)');


// Auth modes
const AUTH_MODES = {
  SIGNED_OUT: 'signed_out',
  GUEST: 'guest',
  SIGNED_IN: 'signed_in'
};

// Initialize auth mode from localStorage or default to signed out
let authMode = localStorage.getItem('authMode') || AUTH_MODES.SIGNED_OUT;

// DOM elements
const authElements = {
  signedOut: [signInBtn, signUpBtn],
  guest: [guestBtn, createPodBtn],
  signedIn: [
    notificationCenter,
    createPodBtn,
    profileDropdown,
    // Add more signed-in specific elements as needed
  ],
  alwaysVisible: [
    exploreLink,
    brainstormLink,
    battlesLink,
    aboutLink,
    contactLink
  ]
};

// Function to update UI based on auth mode
function updateUI() {
  // Hide all auth-specific elements first
  Object.values(authElements).forEach(group => {
    if (Array.isArray(group)) {
      group.forEach(el => el && (el.style.display = 'none'));
    }
  });

  // Show elements based on current auth mode
  authElements.alwaysVisible.forEach(el => el && (el.style.display = ''));
  
  if (authMode === AUTH_MODES.SIGNED_OUT) {
    authElements.signedOut.forEach(el => el && (el.style.display = ''));
  } else if (authMode === AUTH_MODES.GUEST) {
    authElements.guest.forEach(el => el && (el.style.display = ''));
  } else if (authMode === AUTH_MODES.SIGNED_IN) {
    authElements.signedIn.forEach(el => el && (el.style.display = ''));
  }

  // Special case for notification count (only show if signed in)
  if (notificationCount) {
    notificationCount.style.display = authMode === AUTH_MODES.SIGNED_IN ? '' : 'none';
  }
}

// Auth mode switcher functions
function setSignedOut() {
  authMode = AUTH_MODES.SIGNED_OUT;
  localStorage.setItem('authMode', authMode);
  updateUI();
}

function setGuestMode() {
  authMode = AUTH_MODES.GUEST;
  localStorage.setItem('authMode', authMode);
  updateUI();
}

function setSignedIn() {
  authMode = AUTH_MODES.SIGNED_IN;
  localStorage.setItem('authMode', authMode);
  updateUI();
}

// Event listeners for auth buttons
if (signInBtn) signInBtn.addEventListener('click', setSignedIn);
if (signUpBtn) signUpBtn.addEventListener('click', setSignedIn);
if (guestBtn) guestBtn.addEventListener('click', setGuestMode);
if (logoutItem) logoutItem.addEventListener('click', setSignedOut);

// Initialize UI
updateUI();

// Optional: Simulate user data in localStorage when signed in
if (authMode === AUTH_MODES.SIGNED_IN && !localStorage.getItem('userData')) {
  localStorage.setItem('userData', JSON.stringify({
    name: "Alexandra Chen",
    email: "alex44@gmail.com",
    avatar: "./assests/imgs/avatar-user-vector.jpg"
  }));
}

// Optional: Load user data if signed in
if (authMode === AUTH_MODES.SIGNED_IN) {
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData && userName && userEmail && avatarImg && headerAvatar) {
    userName.textContent = userData.name;
    userEmail.textContent = userData.email;
    avatarImg.src = userData.avatar;
    headerAvatar.src = userData.avatar;
  }
}


  document.addEventListener('DOMContentLoaded', function () {
      // DOM Elements
      const bellIcon = document.querySelector('.notification-bell');
      const badge = document.querySelector('.notification-badge');
      const dropdown = document.querySelector('.notification-dropdown');
      const notificationList = document.querySelector('.notification-list');
      const clearButton = document.querySelector('.notification-clear');

      // Notification data
      let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      let unseenCount = parseInt(localStorage.getItem('unseenCount')) || 0;

      // Initialize the UI
      updateBadge();
      renderNotifications();

      // Toggle dropdown on bell click
      bellIcon.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');

        // Mark all notifications as seen when dropdown is opened
        if (dropdown.classList.contains('show')) {
          markAllAsSeen();
        }
      });

      // Clear all notifications
      clearButton.addEventListener('click', function () {
        notifications = [];
        unseenCount = 0;
        saveToLocalStorage();
        renderNotifications();
        updateBadge();
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function () {
        dropdown.classList.remove('show');
      });

      // Prevent dropdown from closing when clicking inside
      dropdown.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      // Function to add a new notification (for demonstration)
      function addNotification(type, message) {
        const newNotification = {
          id: Date.now(),
          type: type,
          message: message,
          timestamp: new Date(),
          isRead: false
        };

        notifications.unshift(newNotification);
        unseenCount++;
        saveToLocalStorage();
        renderNotifications();
        updateBadge();
      }

      // Function to render notifications
      function renderNotifications() {
        if (notifications.length === 0) {
          notificationList.innerHTML = '<div class="notification-empty">No notifications yet</div>';
          return;
        }

        notificationList.innerHTML = notifications.map(notification => `
                    <div class="notification-item ${notification.isRead ? 'read' : 'unread'}" data-id="${notification.id}">
                        <div><strong>${notification.type}</strong></div>
                        <div>${notification.message}</div>
                        <div class="notification-time">${formatTime(notification.timestamp)}</div>
                    </div>
                `).join('');

        // Add click handler to mark individual notifications as read
        document.querySelectorAll('.notification-item').forEach(item => {
          item.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            markAsRead(id);
          });
        });
      }

      // Function to mark a notification as read
      function markAsRead(id) {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          unseenCount--;
          saveToLocalStorage();
          renderNotifications();
          updateBadge();
        }
      }

      // Function to mark all notifications as seen
      function markAllAsSeen() {
        if (unseenCount > 0) {
          notifications.forEach(notification => {
            notification.isRead = true;
          });
          unseenCount = 0;
          saveToLocalStorage();
          renderNotifications();
          updateBadge();
        }
      }

      // Function to update the badge
      function updateBadge() {
        if (unseenCount > 0) {
          badge.style.display = 'flex';
          badge.textContent = unseenCount > 9 ? '9+' : unseenCount;
        } else {
          badge.style.display = 'none';
        }
      }

      // Function to save data to localStorage
      function saveToLocalStorage() {
        localStorage.setItem('notifications', JSON.stringify(notifications));
        localStorage.setItem('unseenCount', unseenCount.toString());
      }

      // Helper function to format time
      function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
          ' · ' + date.toLocaleDateString();
      }

      // Demo: Add some sample notifications after a delay
      setTimeout(() => {
        addNotification('New Comment', 'John Doe commented on your post');
      }, 1000);

      setTimeout(() => {
        addNotification('Badge Earned', 'You earned the "Contributor" badge');
      }, 2000);

      setTimeout(() => {
        addNotification('System Update', 'New features available in your dashboard');
      }, 3000);

      // You can call addNotification() whenever you get a real notification
    });