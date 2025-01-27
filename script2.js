function loadUsers() 
{
    let users = localStorage.getItem("users");
    if (users) {
        return JSON.parse(users);
    }
    else {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


var nameErr = document.getElementById("nameErr");
var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        // alert("Invalid Email ID");
        emailErr.textContent = "Invalid Email ID";
        return false;
    }
    return true;
}
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
        // alert("Password Must Contains at least Uppercase, Lowercase, Number(0-9) and a special character");
        passwordErr.innerHTML = "Password Must Contains at least Uppercase, <br>Lowercase, Number(0-9) and a <br>special character";
        return false;
    }
    return true;
}
function signup() {
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;




    if (fullName === "" || email === "" || password === "") {
        // alert("Please Fill Required Fields");
        nameErr.textContent = "Name is required";
        passwordErr.textContent = "Password is required";
        emailErr.textContent = "Email is required";
        return;
    }
    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }
    var users = loadUsers();
    users.push({ fullName: fullName, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up Successfull");
    console.log(users);
    window.location.href = "index.html";


    // validateEmail(email)
    // validatePassword(password)


}

var email;
var setEmail;
function login() {
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Email and Password are required");
        return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        return;
    }
    else {
        var users = loadUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                // setEmail = email;
                // sessionStorage.setItem("currentUserEmail", email);
                users[i].isLoggedIn = true;
                saveUsers(users);
                alert("Login Successful");
                window.location.href = "home.html";


            }
        }
    }
}


function getLoggedInUser() {
    const users = loadUsers();
    return users.find(user => user.isLoggedIn);
}




function startQuiz() {
    window.location.href = "questions.html";
}



const defaultQuestions = [
    {
        id: 1,
        question: "What does the title tag define in an HTML document?",
        options: ["The main heading of the page", "The title of the document that appears in the browser tab", "The footer of the document", "The subtitle of the page"],
        answer: "The title of the document that appears in the browser tab"
    },
    {
        id: 2,
        question: "Which CSS property is used to change the background color of an element?",
        options: ["color", "background-color", "bg-color", "background"],
        answer: "background-color"
    },
    {
        id: 3,
        question: "What is the purpose of the alt attribute in an <img> tag?",
        options: [
            "To link the image to a website",
            "To add a title to the image",
            "To display alternative text if the image fails to load",
            "To set the image dimensions"
        ],
        answer: "To display alternative text if the image fails to load"
    },
    {
        id: 4,
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["'a'", "'link'", "'href'", "'hyperlink'"],
        answer: "'a'"
    },
    {
        id: 5,
        question: "Which CSS property is used to make the text italic?",
        options: [
            "text-style: italic;",
            "font-style: italic;",
            "font-weight: italic;",
            "text-decoration: italic;"
        ],
        answer: "font-style: italic;"
    },
    {
        id: 6,
        question: "Which JavaScript method is used to write content into an HTML element?",
        options: ["innerHTML()", "document.write()", "getElementById()", "document.innerHTML()"],
        answer: "document.write()"
    },
    {
        id: 7,
        question: "Which of the following is a semantic HTML tag?",
        options: ["div", "span", "section", "b"],
        answer: "section"
    },
    {
        id: 8,
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-weight", "text-style"],
        answer: "font-size"
    },
    {
        id: 9,
        question: "What does position: absolute; do in CSS?",
        options: [
            "Positions the element relative to its parent",
            "Positions the element at the top of the page",
            "Positions the element relative to the nearest positioned ancestor",
            "Makes the element float on top of all other elements"
        ],
        answer: "Positions the element relative to the nearest positioned ancestor"
    },
    {
        id: 10,
        question: "What is the correct CSS syntax to make all <p> elements bold?",
        options: [
            "'p {font-weight: bold;}'",
            "'p style='bold;''",
            "'p {text-weight: bold;}'",
            "'p {font-style: bold;}'"
        ],
        answer: "'p {font-weight: bold;}'"
    },
    {
        id: 11,
        question: "What is the correct way to declare a JavaScript function?",
        options: [
            "function myFunction()",
            "def myFunction()",
            "func myFunction()",
            "declare myFunction()"
        ],
        answer: "function myFunction()"
    },
    {
        id: 12,
        question: "What is the correct syntax to include an external JavaScript file in HTML?",
        options: [
            "'<script src='script.js'></script>'",
            "'<script href='script.js'></script>'",
            "'<js src='script.js'></js>'",
            "'<javascript src='script.js'></javascript>'"
        ],
        answer: "'<script src='script.js'></script>'"
    },
    {
        id: 13,
        question: "What is the output of console.log(typeof null); in JavaScript?",
        options: ['"null"', '"undefined"', '"object"', '"string"'],
        answer: '"object"'
    },
    {
        id: 14,
        question: "Which HTML tag is used to define an unordered list?",
        options: ["'ul'", "'ol'", "'li'", "'list'"],
        answer: "'ul'"
    },
    {
        id: 15,
        question: "What does the z-index property in CSS control?",
        options: [
            "The transparency of an element",
            "The stacking order of elements",
            "The zoom level of an element",
            "The size of the element"
        ],
        answer: "The stacking order of elements"
    },
    {
        id: 16,
        question: "Which of the following is NOT a valid CSS property?",
        options: ["color", "font-size", "align-content", "text-transform-upper"],
        answer: "text-transform-upper"
    },
    {
        id: 17,
        question: "Which attribute is used in HTML to uniquely identify an element?",
        options: ["class", "id", "name", "key"],
        answer: "id"
    },
    {
        id: 18,
        question: "How do you declare a JavaScript array?",
        options: [
            "var arr = 1, 2, 3",
            "var arr = [1, 2, 3]",
            "var arr = {1, 2, 3}",
            "var arr = (1, 2, 3)"
        ],
        answer: "var arr = [1, 2, 3]"
    },
    {
        id: 19,
        question: "What is the purpose of the meta tag in HTML?",
        options: [
            "To add meta information for search engines and browsers",
            "To link external files",
            "To create headings",
            "To define navigation menus"
        ],
        answer: "To add meta information for search engines and browsers"
    },
    {
        id: 20,
        question: "Which CSS property is used to add space inside an element’s border?",
        options: ["margin", "padding", "border-spacing", "spacing"],
        answer: "padding"
    }
];

function loadQuestions() 
{

    let questions = localStorage.getItem("questions");
    if (questions) 
    {
        return JSON.parse(questions);
    }
    else 
    {
        localStorage.setItem("questions", JSON.stringify(defaultQuestions));
        return defaultQuestions;
    }
}

function getRandomQuestions() 
{
    const questions = loadQuestions();
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const randomQuestions = shuffled.slice(0, 10).map(question => ({
        ...question,
        userAnswer: null 
    }));
    return randomQuestions;
}



// const randomQuestions = getRandomQuestions();
// localStorage.setItem("quizQuestions",JSON.stringify(randomQuestions));


const randomQuestions = getRandomQuestions();
const loggedInUserEmail = getLoggedInUser()?.email || "guest";

const quizData = {
    email: loggedInUserEmail,
    questions: randomQuestions,
    // score: 0 
};

localStorage.setItem("quizQuestions", JSON.stringify(quizData));

let i = 0;
let userAnswers = {};


function updateProgressBar() {
    var progressBar = document.querySelector(".progress-bar");
    const quizData = JSON.parse(localStorage.getItem("quizQuestions"));
    const progress = ((i + 1) / quizData.questions.length) * 100;
    progressBar.style.width = progress + "%";
}



function renderQuestion() {
    const quizData = JSON.parse(localStorage.getItem("quizQuestions"));
    const question = quizData.questions[i];
    // const questionContainer = document.querySelector(".questions-container");
    const questionNumber = document.querySelector(".question-number");
    const questionHeading = document.querySelector(".question");
    const optionsContainer = document.querySelector(".options");
    if(i==8)
        {
            questionNumber.textContent = `Last 2 Questions Left` ;
        }
        else if(i==9)
        {
            questionNumber.textContent = `Hey this is the Last Question` ;
        }
    else
    {
        questionNumber.textContent = `Question ${i + 1} of ${quizData.questions.length}`;
    }
    questionHeading.textContent = `${i+1}. ${question.question}`;
    optionsContainer.innerHTML = "";
  
    if (userAnswers[i] !== undefined) {
        const radioButtons = optionsContainer.querySelectorAll("input[type='radio']");
        radioButtons.forEach(radioButton => {
          if (radioButton.value === userAnswers[i]) {
            radioButton.checked = true;
          }
        });
      }
    


    question.options.forEach((option, index) => {
      const radioInput = document.createElement("input");
      const label = document.createElement("label");
  
      radioInput.type = "radio";
      radioInput.name = "question" + i;
      radioInput.value = option[index];
      radioInput.id = `option${index}`;

      label.textContent = `${index + 1}. ${option}`;
      label.setAttribute("for", `option${index}`);
  
      // Only set checked property if user has explicitly selected an answer

      
  
      optionsContainer.appendChild(radioInput);
      optionsContainer.appendChild(label);
  

      if (userAnswers[i] === option) {
        radioInput.checked = true;
    }

      radioInput.addEventListener("change", () => {
        // userAnswers[i] = option; // Save the answer
        question.userAnswer = option;
        quizData.questions[i] = question;
        console.log("Updated quizData:", quizData);
        localStorage.setItem("quizQuestions", JSON.stringify(quizData));
        
    });

  
    updateProgressBar();
    var previousBtn = document.getElementById("previous");
    previousBtn.style.visibility = i > 0 ? "visible" : "hidden";
    nextBtn.textContent = i === questions.length - 1 ? "Submit Quiz" : "Submit & Continue->";

}




// function renderQuestion() {
//     const quizData = JSON.parse(localStorage.getItem("quizQuestions"));
//     const question = quizData.questions[i];
//     const questionContainer = document.querySelector(".questions-container");
//     const questionNumber = document.querySelector(".question-number");
//     const questionHeading = document.querySelector(".question");
//     const optionsContainer = document.querySelector(".options");

//     if (!question) {
//         console.error("No question found at index:", i);
//         return;
//     }

//     // Update question number and text
//     questionNumber.textContent = `Question ${i + 1} of ${quizData.questions.length}`;
//     questionHeading.textContent = question.question;

//     // Clear old options
//     optionsContainer.innerHTML = "";

//     // Render options
//     question.options.forEach((option, index) => {
//         const radioInput = document.createElement("input");
//         const label = document.createElement("label");

//         radioInput.type = "radio";
//         radioInput.name = "question" + i;
//         radioInput.value = option;
//         radioInput.id = `option${index}`;

//         label.textContent = `${index + 1}. ${option}`;
//         label.setAttribute("for", `option${index}`);

//         if (question.userAnswer === option) {
//             radioInput.checked = true; // Pre-select the user's answer
//         }

//         radioInput.addEventListener("change", () => {
//             // Save user answer
//             question.userAnswer = option;
//             quizData.questions[i] = question;
//             localStorage.setItem("quizQuestions", JSON.stringify(quizData));
//         });

//         optionsContainer.appendChild(radioInput);
//         optionsContainer.appendChild(label);
//     });

//     updateProgressBar();
// }

/*const next = document.getElementById("next");
const previous = document.getElementById("previous");*/

// function nextQuestion() {

//     const questions = JSON.parse(localStorage.getItem("quizQuestions"));


//     if (i === questions.length - 1) {
//         // Calculate score
//         let score = questions.reduce((acc, question) => {
//             return acc + (question.userAnswer === question.answer ? 1 : 0);
//         }, 0);

//         // questions.forEach((question, index) => {
//         //     if (userAnswers[index] === question.answer) {
//         //         score += 100;
//         //     }
//         // });

//         // // Save score to the current user
//         // const users = loadUsers();
//         // const currentUserEmail = getCurrentUserEmail();
//         // for (let user of users) 
//         // {
//         //     if (user.email === currentUserEmail) 
//         //     {
//         //         user.score = score;
//         //         break;
//         //     }
//         // }
//         // localStorage.setItem("users", JSON.stringify(users));

//         // alert(`Quiz Complete! Your score: ${score}`);
//         // window.location.href = "leaderboard.html";


//         quizData.score = score;
//         localStorage.setItem("quizQuestions", JSON.stringify(quizData));

//         alert(`Quiz Complete! Your score: ${score}`);
//         window.location.href = "leaderboard.html";

//     }
//     else {
//         i++;
//         renderQuestion();
//     }
// }

// function nextQuestion() {
//     const quizData = JSON.parse(localStorage.getItem("quizQuestions")); // Access quizData
//     const questions = quizData.questions; // Access the questions array
    
//     // Save user's answer to the current question
//     const currentQuestion = questions[i];
//     const userAnswer = document.querySelector('input[name="answer"]:checked').value; // Example if using radio buttons
//     currentQuestion.userAnswer = userAnswer; // Store user's answer
    
//     // Update quizData with the new answers
//     quizData.questions = questions; 
//     localStorage.setItem("quizQuestions", JSON.stringify(quizData)); // Save to localStorage

//     // Move to next question or complete the quiz
//     if (i === questions.length - 1) {
//         calculateScore(quizData); // Calculate score once all questions are answered
//     } else {
//         i++; // Move to the next question
//         renderQuestion(); // Render next question
//     }
// }






function nextQuestion() {
    const quizData = JSON.parse(localStorage.getItem("quizQuestions"));
    const questions = quizData.questions;
  
    if (i < questions.length - 1) {
      i++;
      console.log("Incremented i:", i);
      renderQuestion();
    } else {
      calculateScore(quizData);
    }
  }

  function calculateScore(quizData) {
    const questions = quizData.questions;
    let score = 0;
  
    questions.forEach((question) => {
      if (question.userAnswer === question.answer) {
        score += 100;
      }
    });
  
    // quizData.score = score;
    // const users = loadUsers();
    // const currentUserEmail = getLoggedInUser()?.email;
    // const userIndex = users.findIndex((user) => user.email === currentUserEmail);
  
    // if (userIndex !== -1) {
    //   users[userIndex].score = score;
    // }
  
    // localStorage.setItem("users", JSON.stringify(users));
    // localStorage.setItem("quizQuestions", JSON.stringify(quizData));
  
    // alert(`Quiz Complete! Your score: ${score}`);
    // window.location.href = "leaderboard.html";



    quizData.score = score; // Update the score in the quizData object
  localStorage.setItem("quizQuestions", JSON.stringify(quizData)); // Save the updated quizData object

  const users = loadUsers();
  const currentUserEmail = getLoggedInUser()?.email;
  const userIndex = users.findIndex((user) => user.email === currentUserEmail);

  if (userIndex !== -1) {
    users[userIndex].score = score;
  }

  localStorage.setItem("users", JSON.stringify(users));

  alert(`Quiz Complete! Your score: ${score}`);
  window.location.href = "leaderboard.html";
  }



function previousQuestion() {
    if (i > 0) {
        i--;
        renderQuestion();
    }
}


function getCurrentUserRank() {
    var users = loadUsers();
    // var currentUserRank = document.querySelector(".current-user-rank");
    var currentUserName = document.querySelector(".current-user-name");
    var currentUserScore = document.querySelector(".current-user-score");
    const currentUserEmail = getCurrentUserEmail();
    for (let user of users) {
        if (user.email === currentUserEmail) {
            currentUserName = user.name;
            currentUserScore = user.score;
        }
    }

}


// const questions = JSON.parse(localStorage.getItem("quizQuestions"))
// if(i<questions.length -1)
// {
//     i++;
//     renderQuestion();
// }
// else
// {
//     let score = 0;
//     questions.forEach((question, index) => {
//         if (userAnswers[index] === question.answer) {
//             score=score+10;
//         }
//     });
//     alert("Completed");
//     console.log("Score: "+score);



// var users = loadUsers();
// const userIndex = users.findIndex(users => users.email === setEmail);
// if (userIndex !== -1) {
//     // Check if the user already has a score stored
//     if (users[userIndex].score === undefined) {
//         users[userIndex].score = score; // Store the score
//     } else {
//         users[userIndex].score += score; // Update the score (optional: cumulative)
//     }
// }

// var users = loadUsers();
// for(var i=0; i<users.length; i++)
// {
//     if(users[i].email === getCurrentUserEmail())
//     {   
//         users[i].score = score;
//     }
// }

// localStorage.setItem("users", JSON.stringify(users));
// window.location.href="leaderboard.html";

// }
// }

// function previousQuestion()
// {
//     if(i>0)
//     {
//         // document.getElementById("previous").style.visibility="visible";
//         i--;
//         renderQuestion();
//     }
// }




document.addEventListener("DOMContentLoaded", () => {
    renderQuestion();
    // getCurrentUserRank();
});

