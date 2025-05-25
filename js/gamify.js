// Badge types with corresponding colors
const badgeTypes = {
  starter: { gradient: "from-indigo-500 to-purple-500", glow: "glow-indigo" },
  consistent: { gradient: "from-teal-500 to-emerald-500", glow: "glow-teal" },
  explorer: { gradient: "from-blue-500 to-cyan-500", glow: "glow" },
  master: { gradient: "from-purple-500 to-pink-500", glow: "glow-accent" },
  routine: { gradient: "from-amber-500 to-yellow-500", glow: "glow-amber" },
  streak: { gradient: "from-orange-500 to-red-500", glow: "glow-accent" },
  achievement: { gradient: "from-fuchsia-500 to-purple-500", glow: "glow" },
  dedication: {
    gradient: "from-violet-500 to-indigo-500",
    glow: "glow-indigo",
  },
  community: { gradient: "from-green-500 to-teal-500", glow: "glow-secondary" },
  legendary: { gradient: "from-rose-500 to-pink-500", glow: "glow-accent" },
};

// Mock data for badges with type assignments
const badges = [
  {
    id: 1,
    name: "Starter",
    description: "Completed your first session",
    unlocked: true,
    requirements: "Complete 1 meditation session",
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
    type: "starter",
    progress: 100,
  },
  {
    id: 2,
    name: "Consistent",
    description: "3 days in a row",
    unlocked: true,
    requirements: "Meditate for 3 consecutive days",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    type: "consistent",
    progress: 100,
  },
  {
    id: 3,
    name: "Explorer",
    description: "Tried all categories",
    unlocked: true,
    requirements: "Try at least 1 session from each category",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    type: "explorer",
    progress: 100,
  },
  {
    id: 4,
    name: "Zen Master",
    description: "30 minutes straight",
    unlocked: false,
    requirements: "Complete a 30-minute meditation session",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    type: "master",
    progress: 65,
  },
  {
    id: 5,
    name: "Early Bird",
    description: "Morning routine",
    unlocked: true,
    requirements: "Complete 5 morning sessions before 8 AM",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    type: "routine",
    progress: 100,
  },
  {
    id: 6,
    name: "Night Owl",
    description: "Evening routine",
    unlocked: true,
    requirements: "Complete 5 evening sessions after 8 PM",
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    type: "routine",
    progress: 100,
    customGradient: "from-red-500 to-pink-500", // Added custom gradient for Night Owl badge
  },
  {
    id: 7,
    name: "Streak",
    description: "7 day streak",
    unlocked: false,
    requirements: "Meditate for 7 consecutive days",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    type: "streak",
    progress: 42,
  },
  {
    id: 8,
    name: "Centurion",
    description: "100 sessions",
    unlocked: false,
    requirements: "Complete 100 meditation sessions",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    type: "achievement",
    progress: 28,
  },
  {
    id: 9,
    name: "Dedicated",
    description: "50 hours total",
    unlocked: false,
    requirements: "Reach 50 hours of total meditation time",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    type: "dedication",
    progress: 15,
  },
  {
    id: 10,
    name: "All-Rounder",
    description: "All categories mastered",
    unlocked: false,
    requirements: "Complete 10 sessions in each category",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    type: "achievement",
    progress: 5,
  },
  {
    id: 11,
    name: "Community",
    description: "Shared with friends",
    unlocked: false,
    requirements: "Invite 3 friends to join Mind Mentor",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    type: "community",
    progress: 33,
  },
  {
    id: 12,
    name: "Legend",
    description: "All badges unlocked",
    unlocked: false,
    requirements: "Earn all other badges in the collection",
    icon: "M12 15l8-8m0 0h-8m8 0v8m-8-8l-8-8m8 8H4m8 8v8",
    type: "legendary",
    progress: 41,
  },
];

// Mock data for leaderboard
const leaderboardData = [
  { username: "MeditationMaster", tokens: 3250, rank: 1 },
  { username: "ZenGuru", tokens: 2875, rank: 2 },
  { username: "MindfulExplorer", tokens: 2650, rank: 3 },
  { username: "SerenitySeeker", tokens: 2400, rank: 4 },
  { username: "PeacefulWarrior", tokens: 2250, rank: 5 },
  { username: "CalmSoul", tokens: 2100, rank: 6 },
  { username: "TranquilMind", tokens: 1950, rank: 7 },
  { username: "You", tokens: 1250, rank: 8 },
  { username: "Beginner123", tokens: 950, rank: 9 },
  { username: "Newbie", tokens: 500, rank: 10 },
];

// DOM elements
const badgeGrid = document.getElementById("badge-grid");
const leaderboard = document.getElementById("leaderboard");
const modal = document.getElementById("badge-modal");
const closeModal = document.getElementById("close-modal");
const modalBadge = document.getElementById("modal-badge");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalRequirements = document.getElementById("modal-requirements");
const modalProgress = document.getElementById("modal-progress");
const sortAsc = document.getElementById("sort-asc");
const sortDesc = document.getElementById("sort-desc");

// Render badges with colorful styling
function renderBadges() {
  badgeGrid.innerHTML = "";
  badges.forEach((badge) => {
    const badgeType = badgeTypes[badge.type] || badgeTypes.starter;
    const badgeElement = document.createElement("div");

    // Use custom gradient for Night Owl badge if defined, otherwise use type gradient
    const gradientClass = badge.customGradient
      ? `bg-gradient-to-br ${badge.customGradient}`
      : badge.unlocked
      ? `bg-gradient-to-br ${badgeType.gradient}`
      : "bg-gradient-to-br from-gray-700 to-gray-800";

    badgeElement.className = `flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
      badge.unlocked ? `badge-unlocked hover:${badgeType.glow}` : "badge-locked"
    }`;

    badgeElement.innerHTML = `
          <div class="w-16 h-16 rounded-full ${gradientClass} flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 ${
              badge.unlocked ? "text-white" : "text-gray-500"
            }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
                badge.icon
              }" />
            </svg>
          </div>
          <p class="mt-2 text-sm font-medium ${
            badge.unlocked ? "text-white" : "text-gray-400"
          }">${badge.name}</p>
          ${
            !badge.unlocked
              ? `
            <div class="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div class="bg-gradient-to-r ${badgeType.gradient} h-1.5 rounded-full" style="width: ${badge.progress}%"></div>
            </div>
          `
              : ""
          }
        `;

    badgeElement.addEventListener("click", () => showBadgeDetails(badge));
    badgeGrid.appendChild(badgeElement);
  });
}

// Render leaderboard
function renderLeaderboard(data) {
  leaderboard.innerHTML = "";
  data.forEach((user) => {
    const isCurrentUser = user.username === "You";
    const leaderboardItem = document.createElement("div");

    // Special styling for top 3 ranks
    let rankClass = "";
    if (user.rank === 1) rankClass = "rank-1 border border-amber-400/30";
    else if (user.rank === 2) rankClass = "rank-2 border border-gray-400/30";
    else if (user.rank === 3) rankClass = "rank-3 border border-amber-700/30";

    leaderboardItem.className = `flex items-center justify-between p-4 rounded-lg ${
      isCurrentUser
        ? "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/50"
        : rankClass || "input-bg"
    }`;

    // Rank icon color
    let rankColor = "";
    if (user.rank === 1) rankColor = "text-amber-400";
    else if (user.rank === 2) rankColor = "text-gray-300";
    else if (user.rank === 3) rankColor = "text-amber-600";

    leaderboardItem.innerHTML = `
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 rounded-full flex items-center justify-center ${
              rankColor || "text-gray-400"
            } font-bold">
              ${
                user.rank === 1
                  ? "🥇"
                  : user.rank === 2
                  ? "🥈"
                  : user.rank === 3
                  ? "🥉"
                  : user.rank
              }
            </div>
            <p class="${isCurrentUser ? "font-bold text-primary-light" : ""}">${
      user.username
    }</p>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${
              user.rank === 1
                ? "text-amber-400"
                : user.rank === 2
                ? "text-gray-300"
                : user.rank === 3
                ? "text-amber-600"
                : "text-indigo-400"
            }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="${
              user.rank === 1
                ? "text-amber-400"
                : user.rank === 2
                ? "text-gray-300"
                : user.rank === 3
                ? "text-amber-600"
                : ""
            }">${user.tokens.toLocaleString()}</span>
          </div>
        `;
    leaderboard.appendChild(leaderboardItem);
  });
}

// Show badge details in modal
function showBadgeDetails(badge) {
  const badgeType = badgeTypes[badge.type] || badgeTypes.starter;

  // Use custom gradient for Night Owl badge if defined, otherwise use type gradient
  const gradientClass = badge.customGradient
    ? `bg-gradient-to-br ${badge.customGradient}`
    : badge.unlocked
    ? `bg-gradient-to-br ${badgeType.gradient}`
    : "bg-gradient-to-br from-gray-700 to-gray-800";

  modalBadge.innerHTML = `
        <div class="w-full h-full rounded-full ${gradientClass} flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 ${
            badge.unlocked ? "text-white" : "text-gray-400"
          }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
              badge.icon
            }" />
          </svg>
        </div>
      `;

  modalTitle.textContent = badge.name;
  modalTitle.className = `text-xl font-bold mb-2 ${
    badge.unlocked
      ? `text-transparent bg-clip-text bg-gradient-to-r ${
          badge.customGradient || badgeType.gradient
        }`
      : "text-gray-300"
  }`;

  modalDescription.textContent = badge.description;
  modalDescription.className = `text-center mb-4 ${
    badge.unlocked ? "text-primary-light" : "text-gray-400"
  }`;

  modalRequirements.innerHTML = `
        <p class="text-sm font-medium mb-1 ${
          badge.unlocked ? "text-teal-300" : "text-gray-300"
        }">Requirements:</p>
        <p class="text-sm ${
          badge.unlocked ? "text-gray-200" : "text-gray-400"
        }">${badge.requirements}</p>
        ${
          badge.unlocked
            ? '<p class="mt-2 text-sm text-green-400 font-medium">✓ You have earned this badge!</p>'
            : `<p class="mt-2 text-sm text-yellow-400 font-medium">Keep going to unlock this badge!</p>
             <div class="mt-3">
               <div class="flex justify-between text-xs text-gray-400 mb-1">
                 <span>Progress</span>
                 <span>${badge.progress}%</span>
               </div>
               <div class="w-full bg-gray-700 rounded-full h-2">
                 <div class="bg-gradient-to-r ${badgeType.gradient} h-2 rounded-full" style="width: ${badge.progress}%"></div>
               </div>
             </div>`
        }
      `;

  // Show modal with animation
  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.classList.add("opacity-100", "pointer-events-auto");
  setTimeout(() => {
    modal.querySelector(".z-10").classList.remove("scale-95");
    modal.querySelector(".z-10").classList.add("scale-100");
  }, 10);
}

// Close modal
function closeBadgeModal() {
  modal.querySelector(".z-10").classList.remove("scale-100");
  modal.querySelector(".z-10").classList.add("scale-95");
  setTimeout(() => {
    modal.classList.remove("opacity-100", "pointer-events-auto");
    modal.classList.add("opacity-0", "pointer-events-none");
  }, 200);
}

// Sort leaderboard
sortAsc.addEventListener("click", () => {
  const sorted = [...leaderboardData].sort((a, b) => a.tokens - b.tokens);
  renderLeaderboard(sorted);
  sortAsc.classList.add("bg-secondary", "text-white");
  sortDesc.classList.remove("bg-accent", "text-white");
});

sortDesc.addEventListener("click", () => {
  const sorted = [...leaderboardData].sort((a, b) => b.tokens - a.tokens);
  renderLeaderboard(sorted);
  sortDesc.classList.add("bg-accent", "text-white");
  sortAsc.classList.remove("bg-secondary", "text-white");
});

// Event listeners
closeModal.addEventListener("click", closeBadgeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeBadgeModal();
});

// Initial render
renderBadges();
renderLeaderboard(leaderboardData);
