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
    },{
        question:"What is the first book of the New Testament?",
        answers:[
            {text:"Genesis", correct:false},
            {text:"Mark", correct:false},
            {text:"Luke", correct:false},
            {text:"Matthew", correct:true},
        ]
    },
    {
        question:" What did Jesus use to feed 5,000 people?",
        answers:[
            {text:" Fish and grapes", correct:false},
            {text:" Bread and wine", correct:false},
            {text:" 5 loaves and 2 fish", correct:true},
            {text:" 7 loaves and 3 fish", correct:false},
        ]
    },
    {
        question:"Who betrayed Jesus with a kiss?",
        answers:[
            {text:"Peter", correct:false},
            {text:"Judas", correct:true},
            {text:"Thomas", correct:false},
            {text:"James", correct:false},
        ]
    },{
        question:"What does the armor of God help Christians do?",
        answers:[
            {text:"Look strong", correct:false},
            {text:"Defeat physical enemies", correct:false},
            {text:"Stand against evil and temptation", correct:true},
            {text:"Build a church", correct:false},
        ]
    },{
        question:"Which disciple walked on water with Jesus?",
        answers:[
            {text:"John", correct:false},
            {text:"Matthew", correct:false},
            {text:"Peter", correct:true},
            {text:"Thomas", correct:false},
        ]
    },{
        question:"Who was thrown into a lion’s den for praying to God?",
        answers:[
            {text:"Joseph", correct:false},
            {text:"Daniel", correct:true},
            {text:"Moses", correct:false},
            {text:"Elijah", correct:false},
        ]
    },{
        question:"How many days did God take to create the world (including the day of rest)?",
        answers:[
            {text:"5", correct:false},
            {text:"6", correct:false},
            {text:"7", correct:true},
            {text:"10", correct:false},
        ]
    },{
        question:"Who was swallowed by a big fish when he tried to run from God?",
        answers:[
            {text:"Moses", correct:false},
            {text:"Jonah", correct:true},
            {text:"Noah", correct:false},
            {text:"Paul", correct:false},
        ]
    },{
        question:"What is the greatest commandment according to Jesus?",
        answers:[
            {text:"Do not stea", correct:false},
            {text:" Love your neighbor", correct:false},
            {text:"Love the Lord your God with all your heart", correct:true},
            {text:"Keep the Sabbath", correct:false},
        ]
    }
];
    // ... (more questions follow the same structure)


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
