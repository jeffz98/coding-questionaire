# Password Generator

## Deployment link

https://jeffz98.github.io/coding-questionaire/

## GIF demo

![GIF demo of the application](./Assets/images/demo.gif)

## Screenshots
![Screenshot of the application's landing page](./Assets/images/PassGenSS.png)

### User Information
- [LinkedIn](https://www.linkedin.com/in/jeffrey-zhang-52315522a/)
- [Portfolio](https://jeffz98.github.io/Twilights_Portfolio/)

## Description
This application generates a password of certian length with the inclusion of special characters, numerics, lowercase characters and uppercase characters.

When the user opens the application, they need to click the generate password button. They will then be prompted for how long they want the password, along with what sort of characters they would like included. The password must be chosen within 8-128 characters and include at least one of the character type options. After selecting the required criteria, the password will be generated.

## Code Snippets

```
// stores user's choices for character types to be used in password
function getCharChoices() {
  var hasSpecChars = false, hasNumChars = false, hasLowerChars = false, hasUpperChars = false;
  alert("Please choose at least one character type.");
  hasSpecChars = confirm("Click OK to confirm including special characters.");
  hasNumChars = confirm("Click OK to confirm including numeric characters.");
  hasLowerChars = confirm("Click OK to confirm including lowercase characters.");
  hasUpperChars = confirm("Click OK to confirm including uppercase characters.");

// returns key-value pairs
  return {
    specChars: hasSpecChars,
    numChars: hasNumChars,
    lowerChars: hasLowerChars,
    upperChars: hasUpperChars
  }

  // generates a password based on user selected type, the order is not random here 
  // and is over the length required in some cases
  for (var i = 0; i < passLen/charTypeCount; i++) {
    if (charChoices.specChars) {
      rand = Math.floor(Math.random() * specialChars.length);
      tempPwd += specialChars.substring(rand, rand + 1);
    }
    if (charChoices.numChars) {
      rand = Math.floor(Math.random() * nums.length);
      tempPwd += nums.substring(rand, rand + 1);
    }
    if (charChoices.lowerChars) {
      rand = Math.floor(Math.random() * lowerCharacters.length);
      tempPwd += lowerCharacters.substring(rand, rand + 1);
    }
    if (charChoices.upperChars) {
      rand = Math.floor(Math.random() * upperCharacters.length);
      tempPwd += upperCharacters.substring(rand, rand + 1);
    }
  }

  // generates a new password
  var newPwd = shuffle(tempPwd, passLen);
  return newPwd;
}

// uses Fisher-Yates shuffling algorithm and returns a password of correct length
function shuffle(array, len) {
  var r = array.length, temp, index;
  // while there remains elemnts to be shuffled
  while (r) {
    // randomly pick a remaining element
    index = Math.floor(Math.random() * r--);
    // swap with current element
    temp = array[r];
    array[r] = array[index];
    array[index] = temp;
  }
  // removes extra letters from password
  array = array.substring(0, len);

  return array;
}
```

In the above code snippet, I'm asking for the user's responses and validating their input within a certain criteria. The first function asks users to select the character type they would like included. The second function creates a temporary password that will have randomly generated characters based off user preference. The third function is the implementation of the Fisher-Yates algorithm that randomizes the password and adjusts the length accordingly.


## Technologies Used

HTML, CSS, JavaScript, and Git