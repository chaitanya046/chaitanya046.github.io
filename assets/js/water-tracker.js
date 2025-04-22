document.addEventListener("DOMContentLoaded", () => {
    const waterAmountInput = document.getElementById("waterAmount");
    const addWaterButton = document.getElementById("addWater");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const historyList = document.getElementById("historyList");

    const dailyGoal = 2000; // Daily goal in ml
    let currentIntake = 0;

    // Load saved data
    const savedIntake = localStorage.getItem("currentIntake");
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    if (savedIntake) {
        currentIntake = parseInt(savedIntake, 10);
        updateProgress();
    }
    savedHistory.forEach((entry) => addHistoryItem(entry));

    // Add water intake
    addWaterButton.addEventListener("click", () => {
        const amount = parseInt(waterAmountInput.value, 10);
        if (!isNaN(amount) && amount > 0) {
            currentIntake += amount;
            updateProgress();
            addHistoryItem(`${amount} ml`);
            saveData();
            waterAmountInput.value = "";
        }
    });

    function updateProgress() {
        const progressPercentage = (currentIntake / dailyGoal) * 100;
        progressFill.style.width = `${Math.min(progressPercentage, 100)}%`;
        progressText.textContent = `${currentIntake} / ${dailyGoal} ml`;
    }

    function addHistoryItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        historyList.appendChild(li);
    }

    function saveData() {
        localStorage.setItem("currentIntake", currentIntake);
        const history = Array.from(historyList.children).map((li) => li.textContent);
        localStorage.setItem("history", JSON.stringify(history));
    }
});
