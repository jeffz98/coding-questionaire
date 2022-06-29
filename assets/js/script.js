
// temporary hold for user score
var score;
// The timer
var countdown = 100;

// Pointers to different parts of the site
var quizContainer = document.getElementById("main-container");
var time = document.getElementById("time");
var highScoresContainer = document.getElementById("highscore");

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


function updateLocalStorage(userArray) {
    localStorage.setItem("scores", JSON.stringify(userArray));
}


function landingPage() {
    
    quizContainer.innerHTML = "";

    
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
function renderHighScores() {
    // Ensure quiz container is empty before rendering
    quizContainer.innerHTML = "";
    // Show link to view high scores board after user is done taking the quiz
    highScoresContainer.style.visibility = "visible";
    // Reset countdown
    countdown = 75;

    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "highscore-pg");

    var title = document.createElement("h1");
    title.textContent = "High Scores";
    quizContainer.appendChild(title);

    // Get user information from local storage
    getScoresFromLocalStorage(quizContainer);

    // Container for the next three buttons
    var div = document.createElement("div");
    div.setAttribute("class", "btn-container");
    quizContainer.appendChild(div);

    // Button that allows user to retake the quiz
    var backBtn = document.createElement("button");
    backBtn.setAttribute("class", "highscore-btn");
    backBtn.textContent = "Take quiz";
    div.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
        // Reset countdown
        countdown = 75;
        startQuiz();
    });

    // Button that allows user to clear scores board
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class", "highscore-btn");
    clearScoresBtn.textContent = "Clear high scores";
    div.appendChild(clearScoresBtn);

    clearScoresBtn.addEventListener("click" , () => {
        localStorage.clear();
        userArray = [];
        renderHighScores();
    })
 
    // Button that takes user to landing page
    var mainBtn = document.createElement("button");
    mainBtn.setAttribute("class", "highscore-btn");
    mainBtn.textContent = "Go back to landing page";
    div.appendChild(mainBtn);

    // Taking user back to the landing page
    mainBtn.addEventListener("click", landingPage);
}

// When the highScoresContainer link is clicked, take them to the high scores board
highScoresContainer.addEventListener("click", renderHighScores);




// Function to update user's score and timer
function checkAnswer(questionObj, answer) {
    if (questionObj.correctAnswer === questionObj.answers.indexOf(answer)) {
        score++;
    } else {
        countdown -= 10;
    }
}

// Function that displays each question
// The 'i' variable determines the question displayed
var i = 0;
// The 'endQuiz' variable indicates all questions have been answered and the timer must stop
var endQuiz = false;
function displayQuiz(i) {
    // Exit and stop timer if we are past the last question
    if (i === 7) {
        endQuiz = true;
        return;
    }
    // Empty main container
    quizContainer.innerHTML = "";
    // Change the id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "quiz-screen");
    // Hide link to view high scores board when user is taking the quiz
    highScoresContainer.style.visibility = "hidden";

    // Displays question
    var quizQuestion = document.createElement("h1");
    quizQuestion.setAttribute("class", "title");
    quizQuestion.textContent = questionnaire[i].question;
    quizContainer.appendChild(quizQuestion);

    // Container used to place answer choices vertically
    var div = document.createElement("div");
    div.setAttribute("class", "choice-container")
    quizContainer.appendChild(div);

    // Displays answer choices
    questionnaire[i].answers.forEach(answer => {
        var answerBtn = document.createElement("button");
        answerBtn.setAttribute("class", "choice-btn")
        answerBtn.textContent = answer;
        div.appendChild(answerBtn);

        // When an answer is clicked, the question changes
        answerBtn.addEventListener("click", () => {
            // Update user's score and timer depending on answer selection
            checkAnswer(questionnaire[i], answer);
            i++;
            displayQuiz(i);
        })
    })
}

// Function that runs when the user clicks the "Start" button in the landing page
function startQuiz() {
    displayQuiz(i);

    // Set score to 0 every time the quiz is taken
    score = 0;

    // In here, the timer begins
    var quizTimer = setInterval(function () {
        countdown--;
        time.innerHTML = "Time: " + countdown;

        // If the user finishes quiz or runs out of time, take them to the post quiz screen
        if (endQuiz || countdown <= 0) {
            clearInterval(quizTimer);
            postQuiz();
        }
    }, 1000)
}


// Once the user ends the quiz, display their score and ask for their initials for the scoreboard
function postQuiz() {
    quizContainer.innerHTML = "";
    time.innerHTML = "Time: 0";

    // Change id of quizContainer to state the styling for this screen
    quizContainer.setAttribute("id", "post-quiz");
    
    // Container to style label and input for initials
    var div = document.createElement("div");
    div.setAttribute("class", "initials-container");

    var finalMessage = document.createElement("h1");
    finalMessage.textContent = "Nice work!";

    var scoreMessage = document.createElement("h2");
    scoreMessage.textContent = "Your final score is " + score + " out of 7.";

    var nameLabel = document.createElement("label");
    nameLabel.textContent = "Your initials: ";
    nameLabel.setAttribute("for", "initials")

    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "initials");

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "input-submit");
    submitBtn.textContent = "Submit";

    // Append everything to the page
    quizContainer.appendChild(finalMessage);
    quizContainer.appendChild(scoreMessage);
    quizContainer.appendChild(div);
    div.appendChild(nameLabel);
    div.appendChild(nameInput);
    quizContainer.appendChild(submitBtn);

    // When button is pressed, save user's info and take them to the high scores board
    submitBtn.addEventListener("click", () => {
        if (nameInput.value == "") {
            alert("Please write your initials");
        } else {
            userArray.push({ userScore: score, userInitials: nameInput.value });
            updateLocalStorage(userArray);
            renderHighScores();
        }
    })
}
// Clear userArray and load landing page
// to store the current user's initials and score
var userArray = [];
landingPage();