var btn = document.querySelector(".button-element")
var mainCont = document.getElementById("container")
var questionsContainer = document.querySelector(".questions-cont")
var timerEl = document.querySelector("#time-left")
var timer;
var time = 75;
var isCorrect = true

var question1 = document.querySelector(".question");
var c1 = document.querySelector("#choice1");
var c2 = document.querySelector("#choice2");
var c3 = document.querySelector("#choice3");
var c4 = document.querySelector("#choice4");
var userAnswer = document.getElementById("user-choice")
var scoreContainer = document.getElementById("score-cont")

var currentQuestion = 0
var numberCorrectQuestions = 0 

//key-value pair that stores question, and correct answer
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
            {b: "<Hello World>", isCorrect: false}, 
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


//creates a timer starting from 75
function timerStart () {
    timer = setInterval(function name() {
        timerEl.innerText = time;
        time--;
    if (time < 0) {
        score()
        }
    }, 1000);
    
}

//when start button is clicked, display the first question
btn.addEventListener("click", function startButton() {
   mainCont.setAttribute("style", "display: none");
   questionsContainer.setAttribute("style", "display: flex");
    timerStart();
    questionInput();
})

document.getElementById('openButton').addEventListener("click", openHighScores);
document.getElementById('closeScore').addEventListener("click", closeHighScores);

c1.addEventListener("click", cont)
c2.addEventListener("click", cont)
c3.addEventListener("click", cont)
c4.addEventListener("click", cont)


//goes through all questions, displays a message saying correct or incorrect to the user
function cont() {
    var answer = this.getAttribute("id") 
    
    if (answer === "choice1" && myQuiz[currentQuestion].answers[0].isCorrect === false) {
        userAnswer.textContent = "Incorrect!";
        time-=10;
    } else if (answer === "choice2" && myQuiz[currentQuestion].answers[1].isCorrect === false) {
        userAnswer.textContent = "Incorrect!";
        time-=10;
    } else if (answer === "choice3" && myQuiz[currentQuestion].answers[2].isCorrect === false) {
        userAnswer.textContent = "Incorrect!";
        time-=10;
    } else if (answer === "choice4" && myQuiz[currentQuestion].answers[3].isCorrect === false) {
        userAnswer.textContent = "Incorrect!";
        time-=10;
    } else {
        numberCorrectQuestions++;
        userAnswer.textContent = "Correct!";
    }
    if(currentQuestion < myQuiz.length-1) {
        currentQuestion++;
        questionInput();
    } else {
        score()
    }
}

//displays the current question for the user
function questionInput() {
    question1.textContent = myQuiz[currentQuestion].question;
    c1.textContent = myQuiz[currentQuestion].answers[0].a;
    c2.textContent = myQuiz[currentQuestion].answers[1].b;
    c3.textContent = myQuiz[currentQuestion].answers[2].c;
    c4.textContent = myQuiz[currentQuestion].answers[3].d;
}

//clears the time and displays the score
function score() {
    clearInterval(timer);
    timerEl.innerText = time;
    questionsContainer.setAttribute("style", "display: none");
    scoreContainer.setAttribute("style", "display: flex");
    var score = numberCorrectQuestions + time;
    document.getElementById("score-number").textContent = "Score: " + (score);
    
}

var submit = document.getElementById("submit-button")

// listens for submit button to display highscores 
submit.addEventListener("click", function() {
    var userName = document.getElementById("user-name").value;
    var previousScore = JSON.parse(localStorage.getItem("Javascript-Quiz")) || []
    previousScore.push({user: userName, score: (numberCorrectQuestions + time)}) 
    localStorage.setItem("Javascript-Quiz", JSON.stringify(previousScore));
})

function openHighScores(){
    document.getElementById('highScores').style.width = "20vw";
}

function closeHighScores(){
    document.getElementById('highScores').style.width = '0vw';
}