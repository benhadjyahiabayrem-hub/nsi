// 1. Scalable Question Data Repository (Add as many questions here as you want!)
const quizData = [
    {
        question: "Que signifie HTML ?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language"
        ],
        correct: 0 // Index of the correct option
    },
    {
        question: "Quel langage gère la mise en forme et l'aspect visuel adaptatif ?",
        options: [
            "JavaScript",
            "Python",
            "CSS"
        ],
        correct: 2
    },
    {
        question: "Quel protocole chiffre et sécurise les flux de données web ?",
        options: [
            "HTTP",
            "HTTPS",
            "FTP"
        ],
        correct: 1
    },
    {
        question: "En architecture Web, quel composant exécute nativement le JavaScript ?",
        options: [
            "Le serveur web",
            "Le navigateur client",
            "La base de données"
        ],
        correct: 1
    }
];

// DOM Element Selectors
const quizContainer = document.getElementById('quiz-container');
const actionBtn = document.getElementById('action-btn');
const resultDashboard = document.getElementById('result-dashboard');
const displayScore = document.getElementById('display-score');
const displayTotal = document.getElementById('display-total');
const feedbackMessage = document.getElementById('feedback-message');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');

// 2. Engine Function: Generate and Render Quiz inside DOM
function buildQuiz() {
    quizContainer.innerHTML = ''; // Wipe clean
    
    quizData.forEach((item, questionIndex) => {
        const card = document.createElement('div');
        card.classList.add('quiz-card');
        card.setAttribute('id', `question-box-${questionIndex}`);

        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `${questionIndex + 1}. ${item.question}`;
        card.appendChild(questionTitle);

        const optionsWrapper = document.createElement('div');
        optionsWrapper.classList.add('options-wrapper');

        item.options.forEach((option, optionIndex) => {
            const label = document.createElement('label');
            label.classList.add('option-label');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question-${questionIndex}`;
            radio.value = optionIndex;
            
            // Real-time Event tracking for progress update
            radio.addEventListener('change', updateProgressBar);

            label.appendChild(radio);
            label.appendChild(document.createTextNode(` ${option}`));
            optionsWrapper.appendChild(label);
        });

        card.appendChild(optionsWrapper);
        quizContainer.appendChild(card);
    });
    
    updateProgressBar();
}

// 3. Engine Function: Live Tracking Progress Bar calculations
function updateProgressBar() {
    const totalQuestions = quizData.length;
    let answeredCount = 0;

    for (let i = 0; i < totalQuestions; i++) {
        const checkedOption = document.querySelector(`input[name="question-${i}"]:checked`);
        if (checkedOption) answeredCount++;
    }

    const calculationPercentage = (answeredCount / totalQuestions) * 100;
    progressBar.style.width = `${calculationPercentage}%`;
}

// 4. Engine Function: Validation and Visual State Modification
function evaluateQuizAnswers() {
    const totalQuestions = quizData.length;
    let computedScore = 0;
    let validationError = false;

    // Pre-evaluation check: Ensure all inputs are answered
    for (let i = 0; i < totalQuestions; i++) {
        const selected = document.querySelector(`input[name="question-${i}"]:checked`);
        if (!selected) {
            validationError = true;
            break;
        }
    }

    if (validationError) {
        alert("Action requise : Veuillez répondre à toutes les questions avant de soumettre.");
        return;
    }

    // Process correctness states visually
    quizData.forEach((item, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
        const userChoice = parseInt(selectedOption.value);
        const cardElement = document.getElementById(`question-box-${questionIndex}`);
        
        // Disable inputs post-submission to preserve final choices
        const inputs = cardElement.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);

        if (userChoice === item.correct) {
            computedScore++;
            cardElement.classList.add('correct-state');
        } else {
            cardElement.classList.add('incorrect-state');
        }
    });

    // Hide control action button and deploy rich outcome analysis dashboard
    actionBtn.style.display = 'none';
    displayScore.innerText = computedScore;
    displayTotal.innerText = ` / ${totalQuestions}`;

    // Conditional evaluation algorithms
    if (computedScore === totalQuestions) {
        feedbackMessage.innerHTML = "<span class='success-text'>Performance Parfaite ! Félicitations ! Votre logique informatique est irréprochable.</span>";
    } else if (computedScore >= totalQuestions / 2) {
        feedbackMessage.innerHTML = "<span class='warning-text'>Objectif validé. Bonnes connaissances globales, mais des détails structurels restent à consolider.</span>";
    } else {
        feedbackMessage.innerHTML = "<span class='danger-text'>Niveau insuffisant. Une révision globale de l'architecture réseau et sémantique web est requise.</span>";
    }

    resultDashboard.classList.remove('hidden-element');
    resultDashboard.scrollIntoView({ behavior: 'smooth' });
}

// 5. Engine Function: Dynamic UI Hard Reset Loop
function resetWholeQuiz() {
    resultDashboard.classList.add('hidden-element');
    actionBtn.style.display = 'inline-block';
    buildQuiz();
}

// Event Binding Declarations
actionBtn.addEventListener('click', evaluateQuizAnswers);
restartBtn.addEventListener('click', resetWholeQuiz);

// Initialization lifecycle hook trigger
document.addEventListener('DOMContentLoaded', buildQuiz);