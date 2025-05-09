const toggleBtn = document.getElementById("toggleBtn");
const formCard = document.getElementById("formCard");

toggleBtn.addEventListener("click", () => {
  formCard.classList.toggle("flipped");
  toggleBtn.classList.toggle("active");
});
