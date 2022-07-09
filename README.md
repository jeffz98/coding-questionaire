# Password Generator

## Deployment link

https://jeffz98.github.io/coding-questionaire/

## GIF demo

![GIF demo of the application](./Assets/images/CQdemo.gif)

## Screenshots
![Screenshot of the application's landing page](./Assets/images/CQ.png)

### User Information
- [LinkedIn](https://www.linkedin.com/in/jeffrey-zhang-52315522a/)
- [Portfolio](https://jeffz98.github.io/Twilights_Portfolio/)

## Description
This application is a timed coding quiz that features multiple-choice answers. It will evaluate the user's knowledge of simple Javascript and give a bonus score based on the time remaining. However, beware that getting a question wrong will decrement the time by 10 seconds for each wrong answer! The user can enter their initials to save their score at the end of the quiz.

## Code Snippets

```
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
        numberCorrectAnswers++;
        userAnswer.textContent = "Correct!";
    }
    if(currentQuestion < myQuiz.length-1) {
        currentQuestion++;
        questionInput();
    } else {
        score()
    }
}
```

In the above code snippet, the function retrieves the choice selected by the user for every question and checks to see if it is true or false. It will decrement the time by 10 seconds if incorrect, otherwise it adds 1 to the number of correct answers. If there are more questions to be asked, continue to ask them, otherwise, display the score!


## Technologies Used

HTML, CSS, JavaScript, and Git

## Credits
- [W3 Schools](https://www.w3schools.com/)

## License

MIT License