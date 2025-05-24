// DOM Elements
const wheel = document.getElementById("wheel");

// const spinBtn = document.getElementById("spinBtn");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");
const remixBtn = document.getElementById("remixBtn");
const saveBtn = document.getElementById("saveBtn");
const historyBtn = document.getElementById("historyBtn");
const historyModal = document.getElementById("historyModal");
const closeHistory = document.getElementById("closeHistory");
const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const cloudSyncBtn = document.getElementById("cloudSyncBtn");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const segmentCount = document.getElementById("segmentCount");
const segmentCountValue = document.getElementById("segmentCountValue");
const spinDuration = document.getElementById("spinDuration");
const spinDurationValue = document.getElementById("spinDurationValue");
const customizeBtn = document.getElementById("customizeBtn");
const customizeModal = document.getElementById("customizeModal");
const closeCustomize = document.getElementById("closeCustomize");
const cancelCustomize = document.getElementById("cancelCustomize");
const saveCustomPrompt = document.getElementById("saveCustomPrompt");
const promptText = document.getElementById("promptText");
const adjectiveSelect = document.getElementById("adjectiveSelect");
const formatSelect = document.getElementById("formatSelect");
const audienceSelect = document.getElementById("audienceSelect");
const toneSelect = document.getElementById("toneSelect");
const promptTypeBtns = document.querySelectorAll(".prompt-type-btn");
const themeChips = document.querySelectorAll(".theme-chip");

// DOM Elements
const wheelCanvas = document.getElementById("wheelCanvas");
const ctx = wheelCanvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

// State
let currentPromptType = "creative";
let currentTheme = "random";
let spinHistory = JSON.parse(localStorage.getItem("spinHistory")) || [];
let savedPrompts = JSON.parse(localStorage.getItem("savedPrompts")) || [];
let isSpinning = false;
let segments = 8;
let duration = 3;

// Colors
const colors = [
  "#8b5cf6",
  "#a78bfa",
  "#10b981",
  "#0ea5e9",
  "#ec4899",
  "#f43f5e",
  "#f4b74d",
  "#e3f846cc",
];

// Prompt database
const promptDatabase = {
  creative: [
    "Imagine a world where [unusual concept] is the norm. Describe it.",
    "Create a character who [unique trait]. What's their story?",
    "Write a poem about [abstract idea] from the perspective of [unusual narrator].",
    "Design a product that solves [common problem] in a completely new way.",
    "Combine [two unrelated things] to create something innovative.",
  ],
  analytical: [
    "Analyze the impact of [trend/technology] on [industry/society].",
    "Compare and contrast [two concepts] in terms of [specific metric].",
    "What are the underlying factors contributing to [current event]?",
    "Create a framework for evaluating [complex topic].",
    "Break down [complex process] into its fundamental components.",
  ],
  storytelling: [
    "Tell a story about [character] who discovers [life-changing secret].",
    "Write a scene where [ordinary situation] takes an unexpected turn.",
    "Describe a day in the life of [unusual profession] during [historical period].",
    "Create dialogue between [two unlikely characters] meeting for the first time.",
    "Narrate a journey where the protagonist must overcome [unique challenge].",
  ],
  provocative: [
    "Why is [common belief] actually harmful/dangerous?",
    "What if [established system] was completely abolished?",
    "Debate: [controversial statement] - defend or refute.",
    "How might [taboo subject] actually benefit society?",
    "Challenge the assumption that [widely accepted idea].",
  ],
};

// Adjectives for remixing
const adjectives = {
  innovative: ["groundbreaking", "cutting-edge", "revolutionary"],
  "thought-provoking": ["philosophical", "introspective", "stimulating"],
  unconventional: ["unorthodox", "radical", "avant-garde"],
  detailed: ["meticulous", "comprehensive", "thorough"],
  concise: ["succinct", "pithy", "compact"],
};

// Initialize the wheel
function initWheel() {
  ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(wheelCanvas.width, wheelCanvas.height) / 2;
  const segmentAngle = (2 * Math.PI) / segments;

  // Draw segments
  for (let i = 0; i < segments; i++) {
    const startAngle = i * segmentAngle;
    const endAngle = (i + 1) * segmentAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // Add text
    const textAngle = startAngle + segmentAngle / 2;
    const textRadius = radius * 0.7;
    const textX = centerX + textRadius * Math.cos(textAngle);
    const textY = centerY + textRadius * Math.sin(textAngle);

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(textAngle + Math.PI / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Arial";
    ctx.fillText(`Idea ${i + 1}`, 0, 0);
    ctx.restore();
  }

  // Draw center
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

// Spin the wheel
function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  spinBtn.innerHTML =
    '<i class="fas fa-sync-alt fa-spin text-purple-500 text-xl"></i>';

  // Reset rotation before spinning
  wheelCanvas.style.transition = "none";
  wheelCanvas.style.transform = "rotate(0deg)";

  // Force reflow to apply reset
  void wheelCanvas.offsetWidth;

  // Set up spinning animation
  wheelCanvas.style.transition = `transform ${duration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`;

  const selectedSegment = Math.floor(Math.random() * segments);
  const segmentAngle = (2 * Math.PI) / segments;
  const spins = 5;

  // Calculate final rotation (5 full spins + offset to selected segment)
  const rotation =
    spins * 2 * Math.PI +
    (2 * Math.PI - (selectedSegment * segmentAngle + segmentAngle / 2));

  // Apply rotation
  wheelCanvas.style.transform = `rotate(${-rotation}rad)`;

  setTimeout(() => {
    isSpinning = false;
    spinBtn.innerHTML = '<i class="fas fa-play text-purple-500 text-xl"></i>';
    const prompts = promptDatabase[currentPromptType];

    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    let themedPrompt = applyTheme(randomPrompt, currentTheme);

    // Get the actual stopped position
    const stoppedSegment = Math.floor(
      (rotation % (2 * Math.PI)) / segmentAngle
    );

    // Show result
    resultText.textContent = themedPrompt;
    resultContainer.classList.remove("hidden");
    remixBtn.classList.remove("hidden");
    saveBtn.classList.remove("hidden");
    // Optional: Highlight the selected segment
    addToHistory(themedPrompt);
  }, duration * 1000);
}

// Apply theme to prompt
function applyTheme(prompt, theme) {
  switch (theme) {
    case "funny":
      return prompt.replace(/\[(.*?)\]/g, (match, p1) => {
        const funnyOptions = {
          "unusual concept": [
            "cats ruling the world",
            "toothbrushes with AI",
            "underwater cities for squirrels",
          ],
          "unique trait": [
            "can talk to furniture",
            "is allergic to money",
            "has a pet rock collection",
          ],
          "abstract idea": [
            "the smell of color blue",
            "the sound of silence",
            "the taste of laughter",
          ],
          "common problem": [
            "forgetting where you put your keys",
            "socks disappearing in the dryer",
            "slow internet",
          ],
        };
        return funnyOptions[p1]
          ? funnyOptions[p1][
              Math.floor(Math.random() * funnyOptions[p1].length)
            ]
          : p1;
      });
    case "techy":
      return prompt.replace(/\[(.*?)\]/g, (match, p1) => {
        const techyOptions = {
          "unusual concept": [
            "quantum computing",
            "neural interfaces",
            "decentralized autonomous organizations",
          ],
          "unique trait": [
            "has a brain-computer interface",
            "can code in their sleep",
            "thinks in binary",
          ],
          "abstract idea": [
            "the singularity",
            "blockchain governance",
            "artificial general intelligence",
          ],
          "common problem": [
            "data privacy",
            "algorithmic bias",
            "scalability issues",
          ],
        };
        return techyOptions[p1]
          ? techyOptions[p1][
              Math.floor(Math.random() * techyOptions[p1].length)
            ]
          : p1;
      });
    case "deep":
      return prompt.replace(/\[(.*?)\]/g, (match, p1) => {
        const deepOptions = {
          "unusual concept": [
            "the meaning of existence",
            "collective consciousness",
            "the nature of time",
          ],
          "unique trait": [
            "remembers past lives",
            "sees the future in dreams",
            "feels the emotions of others",
          ],
          "abstract idea": [
            "the illusion of self",
            "the paradox of choice",
            "the interconnectedness of all things",
          ],
          "common problem": [
            "existential dread",
            "the human condition",
            "the search for purpose",
          ],
        };
        return deepOptions[p1]
          ? deepOptions[p1][Math.floor(Math.random() * deepOptions[p1].length)]
          : p1;
      });
    default:
      return prompt;
  }
}

// Apply audience and tone to prompt
function applyAudienceAndTone(prompt, audience, tone) {
  let modifiedPrompt = prompt;

  // Apply audience
  switch (audience) {
    case "technical":
      modifiedPrompt = "For a technical audience: " + modifiedPrompt;
      break;
    case "children":
      modifiedPrompt = "Explain to a child: " + modifiedPrompt.toLowerCase();
      break;
    case "business":
      modifiedPrompt = "In a business context: " + modifiedPrompt;
      break;
    case "academic":
      modifiedPrompt = "With academic rigor: " + modifiedPrompt;
      break;
  }

  // Apply tone
  switch (tone) {
    case "friendly":
      modifiedPrompt = modifiedPrompt.replace(
        /\.$/,
        " in a friendly, approachable way."
      );
      break;
    case "professional":
      modifiedPrompt = modifiedPrompt.replace(
        /\.$/,
        " in a professional manner."
      );
      break;
    case "humorous":
      modifiedPrompt = modifiedPrompt.replace(/\.$/, " with a humorous twist.");
      break;
    case "serious":
      modifiedPrompt = modifiedPrompt.replace(
        /\.$/,
        " with serious consideration."
      );
      break;
  }

  return modifiedPrompt;
}

// Remix the current prompt
function remixPrompt() {
  if (!resultText.textContent) return;

  // Get current prompt base (without modifications)
  const prompts = promptDatabase[currentPromptType];
  const basePrompt = prompts.find((p) =>
    resultText.textContent.includes(p.split("[")[0])
  );

  if (basePrompt) {
    // Apply new theme
    let remixedPrompt = applyTheme(basePrompt, currentTheme);

    // Apply current audience and tone
    remixedPrompt = applyAudienceAndTone(
      remixedPrompt,
      audienceSelect.value,
      toneSelect.value
    );

    // Update display
    resultText.textContent = remixedPrompt;

    // Add to history
    addToHistory(remixedPrompt);
  }
}

// Add prompt to history
function addToHistory(prompt) {
  spinHistory.unshift({
    prompt: prompt,
    type: currentPromptType,
    theme: currentTheme,
    timestamp: new Date().toISOString(),
  });

  // Keep only last 10 items
  if (spinHistory.length > 10) {
    spinHistory = spinHistory.slice(0, 10);
  }

  // Save to localStorage
  localStorage.setItem("spinHistory", JSON.stringify(spinHistory));

  // Update history display
  updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
  historyList.innerHTML = "";

  spinHistory.forEach((item, index) => {
    const historyItem = document.createElement("div");
    historyItem.className =
      "history-item bg-input p-3 rounded-lg cursor-pointer";
    historyItem.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <p class="text-sm font-semibold">${item.prompt}</p>
                            <div class="flex items-center mt-1 text-xs text-gray-400">
                                <span class="bg-${getColorForType(
                                  item.type
                                )} px-2 py-1 rounded-full mr-2">${
      item.type
    }</span>
                                <span class="bg-${getColorForTheme(
                                  item.theme
                                )} px-2 py-1 rounded-full">${item.theme}</span>
                            </div>
                        </div>
                        <button class="copy-history-btn text-gray-400 hover:text-light ml-2" data-prompt="${escapeHtml(
                          item.prompt
                        )}">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                `;

    historyList.appendChild(historyItem);
  });

  // Add event listeners to copy buttons
  document.querySelectorAll(".copy-history-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const prompt = btn.getAttribute("data-prompt");
      navigator.clipboard.writeText(prompt);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Copied to clipboard!",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
      });
    });
  });

  // Add event listeners to history items
  document.querySelectorAll(".history-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      resultText.textContent = spinHistory[index].prompt;
      resultContainer.classList.remove("hidden");
      remixBtn.classList.remove("hidden");
      saveBtn.classList.remove("hidden");
      historyModal.classList.add("hidden");
    });
  });
}

// Helper function to get color for prompt type
function getColorForType(type) {
  switch (type) {
    case "creative":
      return "primary";
    case "analytical":
      return "secondary";
    case "storytelling":
      return "accent";
    case "provocative":
      return "red-600";
    default:
      return "gray-600";
  }
}

// Helper function to get color for theme
function getColorForTheme(theme) {
  switch (theme) {
    case "funny":
      return "yellow-600";
    case "techy":
      return "primary";
    case "deep":
      return "secondary";
    case "random":
      return "accent";
    default:
      return "gray-600";
  }
}

// Save prompt to "pods"
function savePrompt() {
  if (!resultText.textContent) return;

  const prompt = {
    text: resultText.textContent,
    type: currentPromptType,
    theme: currentTheme,
    createdAt: new Date().toISOString(),
  };

  savedPrompts.unshift(prompt);
  localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));

  Swal.fire({
    title: "Prompt Saved!",
    text: "Your prompt has been added to your Pods.",
    icon: "success",
    confirmButtonText: "OK",
  });
}

// Escape HTML for safe display
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Event Listeners
spinBtn.addEventListener("click", spinWheel);
remixBtn.addEventListener("click", remixPrompt);
saveBtn.addEventListener("click", savePrompt);

historyBtn.addEventListener("click", () => {
  updateHistoryDisplay();
  historyModal.classList.remove("hidden");
});

closeHistory.addEventListener("click", () => {
  historyModal.classList.add("hidden");
});

clearHistory.addEventListener("click", () => {
  spinHistory = [];
  localStorage.setItem("spinHistory", JSON.stringify(spinHistory));
  updateHistoryDisplay();
});

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("hidden");
});

closeSettings.addEventListener("click", () => {
  settingsModal.classList.add("hidden");
});

cloudSyncBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Cloud Sync",
    text: "This feature would connect to Firebase/Supabase in a production app.",
    icon: "info",
    confirmButtonText: "OK",
  });
});

exportBtn.addEventListener("click", () => {
  const data = {
    history: spinHistory,
    savedPrompts: savedPrompts,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt-wheel-data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (data.history) {
          spinHistory = data.history;
          localStorage.setItem("spinHistory", JSON.stringify(spinHistory));
        }

        if (data.savedPrompts) {
          savedPrompts = data.savedPrompts;
          localStorage.setItem("savedPrompts", JSON.stringify(savedPrompts));
        }

        Swal.fire({
          title: "Import Successful!",
          text: "Your data has been imported.",
          icon: "success",
          confirmButtonText: "OK",
        });

        updateHistoryDisplay();
      } catch (err) {
        Swal.fire({
          title: "Import Failed",
          text: "The file could not be processed.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    reader.readAsText(file);
  };

  input.click();
});

segmentCount.addEventListener("input", () => {
  segments = parseInt(segmentCount.value);
  segmentCountValue.textContent = segments;

  initWheel();
});

spinDuration.addEventListener("input", () => {
  duration = parseInt(spinDuration.value);
  spinDurationValue.textContent = duration;
});

customizeBtn.addEventListener("click", () => {
  if (!resultText.textContent) {
    Swal.fire({
      title: "No Prompt",
      text: "Please spin the wheel first to get a prompt to customize.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  promptText.value = resultText.textContent;
  customizeModal.classList.remove("hidden");
});

closeCustomize.addEventListener("click", () => {
  customizeModal.classList.add("hidden");
});

cancelCustomize.addEventListener("click", () => {
  customizeModal.classList.add("hidden");
});

saveCustomPrompt.addEventListener("click", () => {
  let customizedPrompt = promptText.value;

  // Apply adjective if selected
  if (adjectiveSelect.value) {
    const adjOptions = adjectives[adjectiveSelect.value];
    const randomAdj = adjOptions[Math.floor(Math.random() * adjOptions.length)];
    customizedPrompt = `${randomAdj} ${customizedPrompt.toLowerCase()}`;
  }

  // Apply format if changed
  if (formatSelect.value !== "question") {
    switch (formatSelect.value) {
      case "statement":
        customizedPrompt = customizedPrompt.replace(/\?$/, ".");
        break;
      case "list":
        customizedPrompt = `List 5 aspects of: ${customizedPrompt.replace(
          /\?$/,
          ""
        )}`;
        break;
      case "scenario":
        customizedPrompt = `Imagine a scenario where ${customizedPrompt
          .toLowerCase()
          .replace(/\?$/, "")}. Describe it in detail.`;
        break;
    }
  }

  // Update result
  resultText.textContent = customizedPrompt;
  customizeModal.classList.add("hidden");

  // Add to history
  addToHistory(customizedPrompt);
});

// Prompt type buttons
promptTypeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPromptType = btn.getAttribute("data-type");

    // Update active state
    promptTypeBtns.forEach((b) => b.classList.remove("ring-2", "ring-white"));
    btn.classList.add("ring-2", "ring-white");
  });
});
// Theme chips
themeChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    currentTheme = chip.getAttribute("data-theme");

    // Update active state
    themeChips.forEach((c) =>
      c.classList.remove("active", "ring-2", "ring-white")
    );
    chip.classList.add("active", "ring-2", "ring-white");
  });
});

// Initialize
initWheel();

// Set first prompt type and theme as active
if (promptTypeBtns.length > 0) {
  promptTypeBtns[0].classList.add("ring-2", "ring-white");
}

if (themeChips.length > 0) {
  themeChips[themeChips.length - 1].classList.add(
    "active",
    "ring-2",
    "ring-white"
  );
}

// Optional: Highlight the selected segment
function highlightSegment(segmentIndex) {
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(wheelCanvas.width, wheelCanvas.height) / 2;
  const segmentAngle = (2 * Math.PI) / segments;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(
    centerX,
    centerY,
    radius,
    segmentIndex * segmentAngle,
    (segmentIndex + 1) * segmentAngle
  );
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fill();
  ctx.restore();
}

// Event Listeners
spinBtn.addEventListener("click", spinWheel);

initWheel();
