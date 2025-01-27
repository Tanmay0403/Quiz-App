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

function saveUsers(users) 
{
    localStorage.setItem("users", JSON.stringify(users));
}


var nameErr = document.getElementById("nameErr");
var emailErr = document.getElementById("emailErr");
var passwordErr = document.getElementById("passwordErr");

function validateEmail(email) 
{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) 
    {
        // alert("Invalid Email ID");
        emailErr.textContent = "Invalid Email ID";
        return false;
    }
    return true;
}
function validatePassword(password) 
{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
        // alert("Password Must Contains at least Uppercase, Lowercase, Number(0-9) and a special character");
        passwordErr.innerHTML = "Password Must Contains at least Uppercase, <br>Lowercase, Number(0-9) and a <br>special character";
        return false;
    }
    return true;
}
function signup() 
{
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;

    if (fullName === "" || email === "" || password === "") 
    {
        // alert("Please Fill Required Fields");
        nameErr.textContent = "Name is required";
        passwordErr.textContent = "Password is required";
        emailErr.textContent = "Email is required";
        return;
    }
    if (!validateEmail(email) || !validatePassword(password)) 
    {
        return;
    }
    var users = loadUsers();
    users.push({ fullName: fullName, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up Successfull");
    console.log(users);
    window.location.href = "index.html";

}

var email;
var setEmail;
function login() 
{
    var email = document.getElementById("emailId").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") 
    {
        alert("Email and Password are required");
        return;
    }

    if (!validateEmail(email) || !validatePassword(password)) 
    {
        return;
    }
    else 
    {
        var users = loadUsers();
        for (var i = 0; i < users.length; i++) 
        {
            if (users[i].email === email && users[i].password === password) 
            {
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


function getLoggedInUser() 
{
    const users = loadUsers();
    return users.find(user => user.isLoggedIn);
}
// function logout()
// {
//     const users = loadUsers();
//     const loggedInUser = getLoggedInUser();
//     // if (loggedInUser) 
//     // {
//     //     loggedInUser.isLoggedIn = false;
//     //     saveUsers(users);
//     // }

//     if (loggedInUser) {
//         // Find the user in the list and update their logged-in status
//         const userIndex = users.findIndex(user => user.email === loggedInUser.email);

//         if (userIndex !== -1) {
//             users[userIndex].isLoggedIn = false; // Set the user's `isLoggedIn` property to false
//             saveUsers(users); // Save the updated user data back to localStorage
//             alert("Logout successfully");
//             window.location.href="index.html";
//         }
//     }
// }

function startQuiz() 
{
    window.location.href = "questions.html";
}

// const profilePhoto = document.querySelector('.profile-photo');
// const popupContainer = document.getElementById('popup-container');
// const logoutBtn = document.getElementById('logout-btn');
// profilePhoto.addEventListener('click', () => {
//     popupContainer.style.display = 'flex';
//   });
  
//   logoutBtn.addEventListener('click', () => {
    
//     popupContainer.style.display = 'none';
//     // Logout functionality goes here
//     logout();
//   });



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
        options: ["a", "link", "href", "hyperlink"],
        answer: "a"
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
        options: ["null", "undefined", "object", "string"],
        answer: "object"
    },
    {
        id: 14,
        question: "Which HTML tag is used to define an unordered list?",
        options: ["ul", "ol", "li", "list"],
        answer: "ul"
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
    const shuffled = questions.sort(function(){
        return 0.5 - Math.random();
    })
    return shuffled.slice(0,10);
}
// const randomQuestions = getRandomQuestions();
// const loggedInUserEmail = getLoggedInUser()?.email
// const quizData = {
//     email: loggedInUserEmail,
//     questions: randomQuestions,
//     score: 0
// }

function loadQuizData() 
{
    let quizData = localStorage.getItem("quizData");
    if (quizData) {
        return JSON.parse(quizData);
    }
    else {
        return [];
    }
}





document.addEventListener("DOMContentLoaded", () => {
    if(window.location.pathname === '/questions.html') {
      var quizData = loadQuizData();
      var loggedInUserEmail = getLoggedInUser()?.email;
      var randomQuestions = getRandomQuestions();

      quizData.push(
        {
            email: loggedInUserEmail, questions: {randomQuestions},
            score:0
      })
      localStorage.setItem("quizData", JSON.stringify(quizData));
      renderQuestion();   
    }
  });





// document.addEventListener("DOMContentLoaded", () => {
//   if(window.location.pathname === '/questions.html') {
//     const quizData = loadQuizData();
//     if (!quizData) {
//       const randomQuestions = getRandomQuestions();
//       const loggedInUserEmail = getLoggedInUser()?.email;
//       const newQuizData = {
//         email: loggedInUserEmail,
//         questions: randomQuestions,
//         score: 0
//       };
//       localStorage.setItem("quizData", JSON.stringify(newQuizData));
//       renderQuestion();
//     } else {
//       renderQuestion();
//     }
//   }
// });

// function loadQuizData() {
//   const quizData = localStorage.getItem("quizData");
//   if (quizData) {
//     return JSON.parse(quizData);
//   } else {
//     return null;
//   }
// }


// localStorage.setItem("quizData",JSON.stringify(quizData));
let i=0;
let userAnswers = {};

function updateProgressBar() 
{
    var progressBar = document.querySelector(".progress-bar");
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    const progress = ((i + 1) / quizData.questions.length) * 100;
    progressBar.style.width = progress + "%";
}



function renderQuestion() {
  const quizData = JSON.parse(localStorage.getItem("quizData"));
  const question = quizData.questions[i];
  const questionContainer = document.querySelector(".questions-container");
  const questionNumber = document.querySelector(".question-number");
  const questionHeading = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const nextBtn = document.getElementById("next"); // Uncommented this line

  if(i==8) {
    questionNumber.textContent = `Last 2 Questions Left` ;
  } else if(i==9) {
    questionNumber.textContent = `Hey this is the Last Question` ;
  } else{
    questionNumber.textContent = `Question ${i+1} of ${quizData.questions.length} ` ;
  }
  questionHeading.textContent = `${i+1}. ${question.question}`;
  console.log(question.question)
  optionsContainer.innerHTML = "";
  question.options.forEach((option, j) => {
    const radioInput = document.createElement("input");
    const label = document.createElement("label");
    radioInput.type = "radio";
    radioInput.name = "question"+i;
    radioInput.value=question.options[j];
    radioInput.id = "option" + j;
    label.textContent = `${j+1}. ${question.options[j]}`;
    label.setAttribute("for", radioInput.id);
    optionsContainer.appendChild(radioInput);
    optionsContainer.appendChild(label);
    if (question.userAnswer === option) {
        radioInput.checked = true;
      }
    radioInput.addEventListener("change", () => {
        question.userAnswer = option;

        const quizData = JSON.parse(localStorage.getItem("quizData"));
        quizData.questions[i].userAnswer = question.userAnswer; // Update userAnswer
        localStorage.setItem("quizData", JSON.stringify(quizData)); // Save updated quizData
    
      });
  });
  updateProgressBar();

  var previousBtn = document.getElementById("previous");
  if(i==0)
  {
    previousBtn.style.visibility="hidden";
  }
  else{
    previousBtn.style.visibility="visible";
  }
  

}


function nextQuestion() {
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    const currentQuestion = quizData.questions[i];

    // Ensure userAnswer is stored
    const userAnswer = currentQuestion.userAnswer;
    if (!userAnswer) {
        alert("Please select an answer before proceeding.");
        return; 
    }

    if (!currentQuestion.isScored && userAnswer === currentQuestion.answer) {
        quizData.score += 100;
        currentQuestion.isScored = true; // Mark the question as scored
    }


    localStorage.setItem("quizData", JSON.stringify(quizData));

    // Update the logged-in user's data in the users array
    // const users = loadUsers();
    // const loggedInUser = getLoggedInUser();
    // if (loggedInUser) {
    //     loggedInUser.quizData = quizData; // Store quizData in the logged-in user's object
    //     const userIndex = users.findIndex((user) => user.email === loggedInUser.email);
    //     if (userIndex !== -1) {
    //         users[userIndex] = loggedInUser;
    //         saveUsers(users); // Save updated users array back to localStorage
    //     }
    // }

    // Check if it's the last question
    if (i === quizData.questions.length - 1) {
        localStorage.setItem("quizData", JSON.stringify(quizData));
        alert("Quiz completed! Your score is: " + quizData.score);
        window.location.href = "leaderboard.html"; // Redirect to leaderboard
    } else {
        i++; // Move to the next question
        renderQuestion();
    }
}



function previousQuestion() {
    if (i > 0) {
        i--;
        renderQuestion();
    }
}

function sortAndRankQuizData() {
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    if (quizData) {
        // Sort the quiz data by score in descending order
        quizData.sort((a, b) => b.score - a.score);

        // Assign ranks based on the sorted order
        quizData.forEach((data, index) => {
            data.rank = index + 1; // Rank starts at 1
        });

        // Save the updated quiz data back to localStorage
        localStorage.setItem("quizData", JSON.stringify(quizData));
        return quizData;
    }
    return [];
}






// document.addEventListener("DOMContentLoaded", () => {
//     if (window.location.pathname === '/leaderboard.html') {
//         const sortedAndRankedQuizData = sortAndRankQuizData();
//         const rankHeading = document.getElementById("rank-heading");

//     }
//     });




function rankDisplay() {
    sortAndRank();
    var quizData = getQuizData();
    var existingQuizIndex;

    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        existingQuizIndex = quizData.findIndex(data => data.email === loggedInUser.email);
    }

    if (existingQuizIndex === -1 || !quizData[existingQuizIndex]) {
        console.error("Logged-in user not found in quiz data.");
        return; // Exit if user data is not found
    }

    var currentUserRank = quizData[existingQuizIndex].rank;
    var rankHeading = document.getElementById("rank-heading");
    rankHeading.textContent = `Wow You Ranked ${currentUserRank}`;

    // Top 3 Rankers
    if (quizData.length >= 3) { // Check if there are at least 3 users
        document.getElementById("first").textContent = quizData[0].score;
        document.getElementById("second").textContent = quizData[1].score;
        document.getElementById("third").textContent = quizData[2].score;
    }

    var currentUserDiv = document.querySelector(".current-users");
    currentUserDiv.style.display = "none";

    // Get the existing other-users container from the HTML
    var otherUsersContainer = document.querySelector(".user-scores"); // Select the parent container
    otherUsersContainer.innerHTML = ""; // Clear previous content

    if (currentUserRank > 3) {
        currentUserDiv.style.display = "flex";
        document.querySelector(".current-user-rank").textContent = `#${currentUserRank}`;
        document.querySelector(".current-user-name").textContent = quizData[existingQuizIndex].fullName;
        document.querySelector(".current-user-score").textContent = quizData[existingQuizIndex].score;

        // Create the other-users container if it doesn't exist. This is the crucial fix!
        // const otherUsersDiv = document.createElement("div");
        // otherUsersDiv.classList.add("other-users");
        // otherUsersContainer.appendChild(otherUsersDiv); // Append to the parent container

        let count = 0;
        for (let i = 0; i < quizData.length && count < 2 ; i++) {
            if (quizData[i].rank !== currentUserRank && quizData[i].rank > 3) {

                
                const otherUserDiv = document.createElement("div");
                otherUserDiv.classList.add("other-user");

                const userRankDiv = document.createElement("div");
                userRankDiv.classList.add("other-user-rank");
                userRankDiv.textContent = `#${quizData[i].rank}`;

                const userNameDiv = document.createElement("div");
                userNameDiv.classList.add("other-user-name");
                userNameDiv.textContent = quizData[i].fullName;

                const userScoreDiv = document.createElement("div");
                userScoreDiv.classList.add("other-user-score");
                userScoreDiv.textContent = quizData[i].score;

                otherUserDiv.appendChild(userRankDiv);
                otherUserDiv.appendChild(userNameDiv);
                otherUserDiv.appendChild(userScoreDiv); // Append score to the user div
                otherUsersDiv.appendChild(otherUserDiv); // Append user to the container

                count++;
            }
        }
    } else {
        // const otherUsersDiv = document.createElement("div");
        // otherUsersDiv.classList.add("other-users");
        // otherUsersContainer.appendChild(otherUsersDiv);

        let count = 0;
        for (let i = 0; i < quizData.length && count < 3; i++) {
            
            if (quizData[i].rank !== currentUserRank && quizData[i].rank > 3) {
                const otherUsersDiv = document.createElement("div");
                otherUsersDiv.classList.add("other-users");

                const otherUserDiv = document.createElement("div");
                otherUserDiv.classList.add("other-user");

                const userRankDiv = document.createElement("div");
                userRankDiv.classList.add("other-user-rank");
                userRankDiv.textContent = `#${quizData[i].rank}`;

                const userNameDiv = document.createElement("div");
                userNameDiv.classList.add("other-user-name");
                userNameDiv.textContent = quizData[i].fullName;

                const userScoreDiv = document.createElement("div");
                userScoreDiv.classList.add("other-user-score");
                userScoreDiv.textContent = quizData[i].score;

                otherUserDiv.appendChild(userRankDiv);
                otherUserDiv.appendChild(userNameDiv);
                // otherUserDiv.appendChild(userScoreDiv);
                otherUsersDiv.appendChild(otherUserDiv);
                otherUsersDiv.appendChild(userScoreDiv);

                count++;
            }
        }
    }
}