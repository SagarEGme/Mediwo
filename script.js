// --- Core System Data (Simulated for MVP) ---
let currentNotes = "";
const rewardSystem = {
    accept: 1, // Positive Reward
    modify: 0.2, // Partial Penalty/Reward (as the base was useful)
    reject: -0.5 // Negative Reward
};
let learningScore = 0; // Represents the system's accuracy/learning over time

// --- 1. Digital Queue / Doctor View Toggling ---
function toggleDoctorView() {
    const patientView = document.getElementById('patient-queue-view');
    const doctorView = document.getElementById('doctor-console-view');

    if (patientView.classList.contains('hidden')) {
        patientView.classList.remove('hidden');
        doctorView.classList.add('hidden');
    } else {
        patientView.classList.add('hidden');
        doctorView.classList.remove('hidden');
    }
}

// --- 2. Context-Aware Smart Autocomplete Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('clinical-input');
    const suggestions = document.querySelectorAll('.suggestion-tag');

    // Attach click handler to suggestions
    suggestions.forEach(tag => {
        tag.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            applySuggestion(suggestion);
            // Simulate positive feedback (Reinforcement Learning)
            updateLearningScore('accept');
        });
    });

    // Handle initial input to simulate context change
    inputField.addEventListener('input', simulateContextualSuggestions);
});

// Function to apply suggestion to the text area
function applySuggestion(text) {
    const inputField = document.getElementById('clinical-input');
    // Simple insertion (could be smarter, like only adding if not present)
    inputField.value += (inputField.value.trim() ? '\n' : '') + text + '. ';
    inputField.focus();
}

// SIMULATION: Suggestion changes based on input content
function simulateContextualSuggestions() {
    const inputField = document.getElementById('clinical-input');
    const suggestionsContainer = document.querySelector('.autocomplete-suggestions');
    const currentText = inputField.value.toLowerCase();
    
    // Clear old suggestions
    suggestionsContainer.innerHTML = '<p>Smart Suggestions:</p>';

    let newSuggestions = [];
    if (currentText.includes('headache')) {
        newSuggestions.push({ text: "Neurological exam normal", reward: 1 });
        newSuggestions.push({ text: "Differential Diagnosis: Migraine", reward: 1 });
    } else if (currentText.includes('fever')) {
        newSuggestions.push({ text: "Check for dehydration", reward: 1 });
        newSuggestions.push({ text: "Order CBC and Blood Culture", reward: 1 });
    } else {
        // Default suggestions
        newSuggestions.push({ text: "Vitals stable", reward: 0.5 });
        newSuggestions.push({ text: "Plan: Re-evaluate in 1 week", reward: 0.5 });
    }

    // Render new suggestions
    newSuggestions.forEach(s => {
        const tag = document.createElement('span');
        tag.className = 'suggestion-tag';
        tag.textContent = s.text;
        tag.setAttribute('data-suggestion', s.text);
        tag.addEventListener('click', () => {
            applySuggestion(s.text);
            updateLearningScore('accept');
        });
        suggestionsContainer.appendChild(tag);
    });
}

// --- 3. Reinforcement Learning from Doctor Feedback (Simulated) ---
function updateLearningScore(feedbackType) {
    const reward = rewardSystem[feedbackType] || 0;
    learningScore += reward;
    
    // Display updated learning status (simple alert for MVP)
    console.log(`System Feedback: ${feedbackType}. Reward: ${reward}. New Learning Score: ${learningScore.toFixed(2)}`);
}

// Function called when doctor finalizes notes
function saveNotes() {
    const inputField = document.getElementById('clinical-input');
    const finalNotes = inputField.value;

    if (finalNotes.trim() === "") {
        alert("Clinical notes cannot be empty.");
        return;
    }
    
    // In a real system, this is where we'd check if the final notes
    // significantly modified *any* suggested content. For the MVP, we assume 
    // the system learned and move on.

    alert(`Notes finalized and saved! \n\nSystem Learning Score updated to: ${learningScore.toFixed(2)}\n\n(Simulates RL loop: System learns from the structure of this document for Smart Templates and Autocomplete improvement.)`);
    
    // Clear input for next consultation
    inputField.value = "";
    toggleDoctorView(); // Go back to the queue (to select the next patient)
}