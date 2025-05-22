document.addEventListener("DOMContentLoaded", function () {
  // Screen elements
  const dashboardScreen = document.getElementById("dashboardScreen");
  const selectPodScreen = document.getElementById("selectPodScreen");
  const selectOpponentScreen = document.getElementById("selectOpponentScreen");
  const battleViewScreen = document.getElementById("battleViewScreen");

  // Navigation buttons
  const newBattleBtn = document.getElementById("newBattleBtn");
  const backToDashboard = document.getElementById("backToDashboard");
  const backToSelectPod = document.getElementById("backToSelectPod");
  const backToSelectOpponent = document.getElementById("backToSelectOpponent");

  // Pod selection elements
  const selectPodButtons = document.querySelectorAll(".select-pod-btn");
  const selectedPodName = document.getElementById("selectedPodName");
  const selectOpponentButtons = document.querySelectorAll(
    ".select-opponent-btn"
  );

  // Battle view elements
  const battlePodA = document.getElementById("battlePodA");
  const battlePodB = document.getElementById("battlePodB");
  const voteA = document.getElementById("voteA");
  const voteB = document.getElementById("voteB");
  const aiDecide = document.getElementById("aiDecide");
  const votingResults = document.getElementById("votingResults");
  const voteBarA = document.getElementById("voteBarA");
  const voteBarB = document.getElementById("voteBarB");
  const voteCountA = document.getElementById("voteCountA");
  const voteCountB = document.getElementById("voteCountB");
  const aiVerdict = document.getElementById("aiVerdict");
  const winnerText = document.getElementById("winnerText");
  const verdictText = document.getElementById("verdictText");
  const winnerBadge = document.getElementById("winnerBadge");
  const podAName = document.getElementById("podAName");
  const podBName = document.getElementById("podBName");

  // View battle buttons
  const viewBattleButtons = document.querySelectorAll(".view-battle-btn");

  // Current battle state
  let currentPod = "";
  let currentOpponent = "";
  let votesA = 0;
  let votesB = 0;
  let totalVotes = 0;

  // Navigation functions
  function showScreen(screen) {
    dashboardScreen.classList.add("hidden");
    selectPodScreen.classList.add("hidden");
    selectOpponentScreen.classList.add("hidden");
    battleViewScreen.classList.add("hidden");

    screen.classList.remove("hidden");
  }

  // Event listeners for navigation
  newBattleBtn.addEventListener("click", () => {
    showScreen(selectPodScreen);
  });

  backToDashboard.addEventListener("click", () => {
    showScreen(dashboardScreen);
  });

  backToSelectPod.addEventListener("click", () => {
    showScreen(selectPodScreen);
  });

  backToSelectOpponent.addEventListener("click", () => {
    showScreen(selectOpponentScreen);
  });

  // Pod selection
  selectPodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentPod = button.getAttribute("data-pod");
      selectedPodName.textContent = currentPod;
      showScreen(selectOpponentScreen);
    });
  });

  // Opponent selection
  selectOpponentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentOpponent = button.getAttribute("data-opponent");
      battlePodA.textContent = currentPod;
      battlePodB.textContent = currentOpponent;
      podAName.textContent = currentPod;
      podBName.textContent = currentOpponent;
      showScreen(battleViewScreen);
      resetBattle();
    });
  });

  // View existing battle
  viewBattleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Set up a sample battle
      currentPod = "Digital Nomadism";
      currentOpponent = "Stable Careers";
      battlePodA.textContent = currentPod;
      battlePodB.textContent = currentOpponent;
      podAName.textContent = currentPod;
      podBName.textContent = currentOpponent;

      // Set some initial votes
      votesA = 24;
      votesB = 13;
      totalVotes = votesA + votesB;

      // Show results immediately for existing battle
      showScreen(battleViewScreen);
      showResults();
    });
  });

  // Voting functions
  function resetBattle() {
    votesA = 0;
    votesB = 0;
    totalVotes = 0;
    votingResults.classList.add("hidden");
    aiVerdict.classList.add("hidden");
  }

  function showResults() {
    const percentageA = Math.round((votesA / totalVotes) * 100) || 0;
    const percentageB = Math.round((votesB / totalVotes) * 100) || 0;

    voteBarA.style.width = `${percentageA}%`;
    voteBarB.style.width = `${percentageB}%`;
    voteCountA.textContent = `${votesA} vote${
      votesA !== 1 ? "s" : ""
    } (${percentageA}%)`;
    voteCountB.textContent = `${votesB} vote${
      votesB !== 1 ? "s" : ""
    } (${percentageB}%)`;

    votingResults.classList.remove("hidden");
  }

  function showAIVerdict() {
    // Determine winner
    let winner, loser, verdict;
    if (votesA > votesB) {
      winner = currentPod;
      loser = currentOpponent;
      winnerBadge.className =
        "px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold flex items-center";
      verdict = `"While ${loser.toLowerCase()} offers security, the ${winner.toLowerCase()} lifestyle represents the future of work with its flexibility, global perspective, and alignment with technological advancements. The ability to work from anywhere fosters creativity and personal growth in ways traditional office environments often cannot match."`;
    } else if (votesB > votesA) {
      winner = currentOpponent;
      loser = currentPod;
      winnerBadge.className =
        "px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold flex items-center";
      verdict = `"While ${loser.toLowerCase()} offers flexibility, the ${winner.toLowerCase()} provides stability, career progression, and community connections that are essential for long-term professional success and personal well-being. The structure and resources available in traditional career paths enable sustained growth and impact."`;
    } else {
      winner = "It's a tie!";
      winnerBadge.className =
        "px-4 py-2 rounded-full bg-gradient-to-r from-gray-500 to-blue-600 text-white font-bold flex items-center";
      verdict = `"Both ${currentPod.toLowerCase()} and ${currentOpponent.toLowerCase()} have compelling arguments. The choice ultimately depends on individual circumstances, personality, and life stage. There's no one-size-fits-all answer to this complex debate about modern work and lifestyle choices."`;
    }

    winnerText.textContent = winner;
    verdictText.textContent = verdict;
    aiVerdict.classList.remove("hidden");
  }

  // Vote event listeners
  voteA.addEventListener("click", () => {
    votesA++;
    totalVotes++;
    showResults();
    voteA.disabled = true;
    voteB.disabled = true;
    aiDecide.disabled = true;

    // Add pulse animation to show voting impact
    voteBarA.classList.add("pulse");
    setTimeout(() => voteBarA.classList.remove("pulse"), 1500);
  });

  voteB.addEventListener("click", () => {
    votesB++;
    totalVotes++;
    showResults();
    voteA.disabled = true;
    voteB.disabled = true;
    aiDecide.disabled = true;

    // Add pulse animation to show voting impact
    voteBarB.classList.add("pulse");
    setTimeout(() => voteBarB.classList.remove("pulse"), 1500);
  });

  aiDecide.addEventListener("click", () => {
    // AI randomly decides but slightly favors the pod with more votes if any
    const randomFactor = Math.random();
    let aiChoice;

    if (totalVotes > 0) {
      const percentageA = votesA / totalVotes;
      if (randomFactor < percentageA + 0.1) {
        aiChoice = "A";
      } else {
        aiChoice = "B";
      }
    } else {
      aiChoice = randomFactor < 0.55 ? "A" : "B";
    }

    if (aiChoice === "A") {
      votesA += 3; // AI vote counts as 3 votes
      totalVotes += 3;
    } else {
      votesB += 3; // AI vote counts as 3 votes
      totalVotes += 3;
    }

    showResults();
    showAIVerdict();
    voteA.disabled = true;
    voteB.disabled = true;
    aiDecide.disabled = true;

    // Add pulse animation to both bars for AI decision
    voteBarA.classList.add("pulse");
    voteBarB.classList.add("pulse");
    setTimeout(() => {
      voteBarA.classList.remove("pulse");
      voteBarB.classList.remove("pulse");
    }, 1500);
  });
});
