// The quiz array stores in each index: the question, an array of each choice, the index of the right answer
var questionnaire = [
    { 
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<scripting>", "<javscript>", "<js>", "<script>"],
        correctAnswer: 4
    },
    { 
        question: "What is the correct JavaScript syntax to write 'Hello World'?",
        answers: ["response.write('Hello World')", "'Hello World'", "document.write('Hello World')", "('Hello World')"],
        correctAnswer: 3
    },
    { 
        question: "Where is the correct place to insert a JavaScript?",
        answers: ["Both the <head> section and the <body> section are correct", "The <body> section", "The <head> section"],
        correctAnswer: 0
    },
    { 
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: ["<script src='xxx.js'>", "<script name='xxx.js'>", "<script href='xxx.js'>", "<script value='xxx.js'>"],
        correctAnswer: 0
    },
    {
        question: "An external JavaScript must contain the <script> tag",
        answers: ["False", "True"],
        correctAnswer: 0
    },
    {
        question: "The Web security issues are involved in",
        answers: ["Server", "CGI script", "Client", "All of the above"],
        correctAnswer: 3
    },
    {
        question: "The majority of a typical Web document will be found in:",
        answers: ["the head tag", "the title tag", "the body tag", "a comment tag"],
        correctAnswer: 3
    },
    
]


// temporary hold for user score
var score;
// The timer
var countdown = 100;

// Pointers to different parts of the site
var quizContainer = document.getElementById("main-container");
var time = document.getElementById("time");
var highScoresContainer = document.getElementById("highscore");

// Helper function: Save current user object to local storage
function updateLocalStorage(userArray) {
    localStorage.setItem("scores", JSON.stringify(userArray));
}

// Render landing page
function landingPage() {
    // Ensure quiz container is empty before rendering
    quizContainer.innerHTML = "";

    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "main-container");

    // Landing page container
    var div = document.createElement("div");
    div.setAttribute("id", "landing-page");

    // Heading 1
    var header1 = document.createElement("h1");
    header1.textContent = "Coding Assessment";
    div.appendChild(header1);

    // Heading 2
    var header2 = document.createElement("h2");
    header2.textContent = "A Practice Guide";
    div.appendChild(header2);

    // Heading 3
    var header3 = document.createElement("h3");
    header3.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    div.appendChild(header3);

    // Button to start quiz
    var quizBtn = document.createElement("button");
    quizBtn.setAttribute("id", "start-btn");
    quizBtn.textContent = "Start Quiz";
    // When the user clicks the "Start" button in the landing page, the quiz and the timer start
    quizBtn.addEventListener("click", startQuiz);
    div.appendChild(quizBtn);

    // Append landing page container to the site's main container
    quizContainer.append(div);

    // Populate array with local storage info if the array was empty
    // Check if localStorage and userArray is empty or not to determine what to render
    if (localStorage.getItem("scores") !== null && userArray.length === 0) {
        var localData = JSON.parse(localStorage.getItem("scores"));
        localData.forEach(user => {
            userArray.push({ userScore: user["userScore"], userInitials: user["userInitials"] });
        })
    }
}

// Helper function to retrieve data from local storage
function getScoresFromLocalStorage(quizContainer) {
    // Check if localStorage is empty or not to determine what to render
    if (localStorage.getItem("scores") !== null) {
        // Get user info from localStorage
        var arr = JSON.parse(localStorage.getItem("scores"));

        // Order from highest to lowest score by first saving each userScore in an array, sort the array in descending order, and get corresponding userInitials
        var scoreArr = arr.map(userObj => userObj.userScore);
        scoreArr.sort((a, b) => b - a);
        
        // Append localStorage results to the screen in descending order
        for (var i = 0; i < scoreArr.length; i++) {
            var j = 0;
            while (j < arr.length) {
                if (scoreArr[i] === arr[j].userScore) {
                    var result = document.createElement("p");
                    result.setAttribute("class", "score-text");
                    result.textContent = (i + 1) + ". " + arr[j].userInitials + "   -   " + arr[j].userScore;
                    quizContainer.appendChild(result);
                }
                j++;
            }
        } 
    } else {
        // If localStorage is empty, announce user they haven't played yet
        var result = document.createElement("p");
        result.setAttribute("class", "score-text");
        result.textContent = "No scores have been registered yet.";
        quizContainer.appendChild(result);
    }
}

// Render high scores page
