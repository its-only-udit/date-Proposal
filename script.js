// State Management
let selectedFood = "Sushi";

// Navigate between steps
function goToStep(stepNumber) {
  const s0 = document.getElementById("step-0");
  const s1 = document.getElementById("step-1");
  const s2 = document.getElementById("step-2");
  const s3 = document.getElementById("step-3");

  if (s0) s0.classList.add("hidden");
  if (s1) s1.classList.add("hidden");
  if (s2) s2.classList.add("hidden");
  if (s3) s3.classList.add("hidden");

  const targetStep = document.getElementById(`step-${stepNumber}`);
  if (targetStep) {
    targetStep.classList.remove("hidden");
  }

  // Trigger blooming confetti burst when user clicks "Yes" (Step 0 -> Step 1)
  if (stepNumber === 1 && typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  }
}

// "Nope" Button Evade Logic
function evadeNoButton() {
  const noBtn = document.getElementById("no-btn");
  if (!noBtn) return;

  noBtn.style.position = "fixed";

  const padding = 20;
  const btnWidth = noBtn.offsetWidth || 80;
  const btnHeight = noBtn.offsetHeight || 40;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
}

// Food Selection Handler
function selectFood(element, foodName) {
  const cards = document.querySelectorAll(".food-card");
  cards.forEach((card) => card.classList.remove("selected"));

  element.classList.add("selected");
  selectedFood = foodName;
}

// Process Final Details & Trigger Confetti
function finishDate() {
  const dateInput = document.getElementById("input-date").value;
  const timeInput = document.getElementById("input-time").value;
  const planInput = document.getElementById("input-plan").value;

  if (dateInput) {
    const dateObj = new Date(dateInput + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    document.getElementById("final-date").textContent = formattedDate;
  }

  document.getElementById("final-time").textContent = timeInput;
  document.getElementById("final-plan").textContent = planInput;
  document.getElementById("final-food").textContent = selectedFood;

  goToStep(3);

  // Confetti on final screen step
  if (typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}