// Define an array of quiz questions, each with a text, a list of answer options, and a correct answer.
const questions = [
    {
        question: "Who was the youngest king in the Bible?",
        answers: [
            { text: "David", correct: false },
            { text: "Solomon", correct: false },
            { text: "josiah", correct: true },
            { text: "Ezekiah", correct: false },
        ]
    },
    // ... (more questions follow the same structure)
];

// Get references to DOM elements where we’ll display questions, answers, and the next button.
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initialize the index of the current question and the score.
let currentQuestionIndex = 0;
let score = 0;

// Start the quiz by resetting values and showing the first question.
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); // Show the first question
}

// Display the current question and answer options
function showQuestion() {
    resetState(); // Clear any old answers or styles
    let currentQuestion = questions[currentQuestionIndex]; // Get current question object
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Loop through each answer for the question
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Create a button for each answer
        button.innerHTML = answer.text; // Set button text
        button.classList.add("btn"); // Add class for styling
        answerButtons.appendChild(button); // Add button to the answer area

        // Store correct answer info as data attribute
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // Add event listener to handle answer click
        button.addEventListener("click", selectAnswer);
    });
}

// Remove old answers and hide next button before showing a new question
function resetState() {
    nextButton.style.display = "none"; // Hide the next button initially
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); // Remove all previous answer buttons
    }
}

// Function to handle when an answer is clicked
function selectAnswer(e) {
    const selectedBtn = e.target; // Get the clicked button
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the clicked answer is correct

    // Add visual feedback by applying correct/incorrect classes
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increase score if correct
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Show correct answer by highlighting it
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons after selection
    });

    nextButton.style.display = "block"; // Show the next button after answering
}

// Show the final score when the quiz ends
function showScore() {
    resetState(); // Clear old answers
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Display score
    nextButton.innerHTML = "Play Again"; // Change next button to restart
    nextButton.style.display = "block";
}

// Handle click on the "Next" button
function handleNextButton() {
    currentQuestionIndex++; // Go to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // If more questions, show next
    } else {
        showScore(); // Else, show final score
    }
}

// When next button is clicked
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // Go to next question
    } else {
        startQuiz(); // Restart the quiz
    }
});

// Start the quiz when the page loads
startQuiz();
