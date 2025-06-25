const questions = [
    {
        question:"Who was the youngest king in the Bible?",
        answers:[
            {text:"David", correct:false},
            {text:"Solomon", correct:false},
            {text:"josiah", correct:true},
            {text:"Ezekiah", correct:false},
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

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next ";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

});
nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score } out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})

startQuiz();