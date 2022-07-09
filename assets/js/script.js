var button = document.querySelector(".button-element")
var mainContainer = document.getElementById("container")
var questionsContainer = document.querySelector(".questions-container")
var timerEl = document.querySelector("#time-left")
var timer;
var sec = 60;
var isCorrect = true

var question1 = document.querySelector(".question");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");
var userAnswer = document.getElementById("user-answer")
var scoreContainer = document.getElementById("score-container")

var currentQuestion = 0
var numberCorrectQuestions = 0 

//object that contains the 5 questions, answer choices, and correct answer
var myQuiz = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {a: "<scripting>", isCorrect: false}, 
            {b: "<javscript>", isCorrect: false}, 
            {c: "<js>", isCorrect: false}, 
            {d: "<script>", isCorrect: true}
        ]
    },
    {
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        answers: [
            {a: "response.write('Hello World')", isCorrect: false}, 
            {b: "'Hello World'>", isCorrect: false}, 
            {c: "document.write('Hello World')", isCorrect: false}, 
            {d: "('Hello World')", isCorrect: true}
        ]
    },
    {
        question: "The majority of a typical Web document will be found in:",
        answers: [
            {a: "the head tag", isCorrect: false}, 
            {b: "the title tag", isCorrect: false}, 
            {c: "the body tag", isCorrect: false}, 
            {d: "a comment tag", isCorrect: true}
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            {a: "Both the <head> section and the <body> section are correct", isCorrect: true}, 
            {b: "The <body> section", isCorrect: false}, 
            {c: "The <head> section", isCorrect: false},
            {d: "None of the above", isCorrect: false} 
        ]
    },
    {
        question: "The Web security issues are involved in",
        answers: [
            {a: "Server", isCorrect: false}, 
            {b: "CGI script", isCorrect: false}, 
            {c: "Client", isCorrect: false}, 
            {d: "All of the above", isCorrect: true}
        ]
    }
];


//this function creates the timer that counts down from 60 and stops at 0
function timerStart () {
    timer = setInterval(function name() {
        timerEl.innerText = sec;
        sec --;
    if (sec < 0) {
        score()
        }
    }, 1000);
    
}

//when the start button is clicked, the paragraph and button disappear, the timer starts, and the first question appears
button.addEventListener("click", function startButton() {
   mainContainer.setAttribute("style", "display: none");
   questionsContainer.setAttribute("style", "display: flex");
    timerStart();
    questionInput();
})

option1.addEventListener("click", next)
option2.addEventListener("click", next)
option3.addEventListener("click", next)
option4.addEventListener("click", next)


//this function moves through the questions, if the answer is incorrect it will display a message that is incorrect, and if the answer is correct, it will display a message that is correct
function next() {
    var answer = this.getAttribute("id") 
    if (answer === "option1" && myQuiz[currentQuestion].answers[0].isCorrect === false) {
        userAnswer.textContent = "That answer is incorrect.";
        sec-=10
    }else if (answer === "option2" && myQuiz[currentQuestion].answers[1].isCorrect === false) {
        userAnswer.textContent = "That answer is incorrect.";
        sec-=10
    } else if (answer === "option3" && myQuiz[currentQuestion].answers[2].isCorrect === false) {
        userAnswer.textContent = "That answer is incorrect.";
        sec-=10
    } else if (answer === "option4" && myQuiz[currentQuestion].answers[3].isCorrect === false) {
        userAnswer.textContent = "That answer is incorrect.";
        sec-=10
    } else {
        numberCorrectQuestions++;
        userAnswer.textContent = "That answer is correct.";
    }
    if(currentQuestion < myQuiz.length-1) {
        currentQuestion++;
        questionInput();
    } else {
        score()
    }
}

//this function displays the text content displayed in the myQuiz array depending on the current question
function questionInput() {
    question1.textContent = myQuiz[currentQuestion].question;
    option1.textContent = myQuiz[currentQuestion].answers[0].a;
    option2.textContent = myQuiz[currentQuestion].answers[1].b;
    option3.textContent = myQuiz[currentQuestion].answers[2].c;
    option4.textContent = myQuiz[currentQuestion].answers[3].d;
}

//this function clears the time so it stops at 0 instead of going into the negatives; it also makes the questions container disapper and displays the score
function score() {
    clearInterval(timer);
    timerEl.innerText = sec;
    questionsContainer.setAttribute("style", "display: none");
    scoreContainer.setAttribute("style", "display: flex");
    document.getElementById("score-number").textContent = "Score: " + (numberCorrectQuestions + sec);
}

var submit = document.getElementById("submit-button")

// this is listening for the submit button to be clicked; when clicked, it shows the user's previous scores
submit.addEventListener("click", function() {
    var userName = document.getElementById("user-name").value;
    var previousScore = JSON.parse(localStorage.getItem("Javascript-Quiz")) || []
    previousScore.push({user: userName, score: (numberCorrectQuestions + sec)}) 
    localStorage.setItem("Javascript-Quiz", JSON.stringify(previousScore));
})