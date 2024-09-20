const questions = [
    {
        question: "What is the Capital Of Ghana",
        answers: [
            {text: "Accra", correct: true},
            {text: "Obuasi", correct: false},
            {text: "accra", correct: false},
            {text: "Bolgatanaga", correct: false},
        ]
    },
    {
        question: "What is the Smallest continent in the World",
        answers: [
            {text: "Asia", correct: false},
            {text: "Antarctica", correct: true},  // Fix typo in "Antarctica"
            {text: "Africa", correct: false},
            {text: "Arctic", correct: false},  // Fix typo in "Arctic"
        ]
    },
    {
        question: "What is the Capital Of France",
        answers: [
            {text: "Paris", correct: true},  // Fix correct answer to "Paris"
            {text: "Berlin", correct: false},  // Fix typo in "Berlin"
            {text: "Copenhagen", correct: false},  // Fix typo in "Copenhagen"
            {text: "Brussels", correct: false},  // Use "Brussels" as another wrong answer
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);  // Add event listener here
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    /* ==================DISPLAY CORRECT ANSWER & PREVENT USER OPTION====== */
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {  // Fix dataset check
            button.classList.add('correct');
        }
        button.disabled = true;  // Disable all buttons after selection
    });

    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = 'Your score is ' + score + ' out of ' + questions.length + '. Thank you!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";  // Fix display style
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
