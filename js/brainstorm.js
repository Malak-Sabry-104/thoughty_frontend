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
