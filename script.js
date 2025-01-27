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
    var checkbox = document.getElementById("terms");

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
    if (!checkbox.checked) {
        alert("You must accept the terms and conditions to sign up.");
        return;
    }    
    var users = loadUsers();
    users.push({ fullName: fullName, email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up Successfull");
    console.log(users);
    window.location.href = "index.html";

}
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
        let userFound = false;
        for (var i = 0; i < users.length; i++) 
        {
            if (users[i].email === email && users[i].password === password) 
            {
                // users[i].isLoggedIn = true;
                var loggedInUser = {
                    email : users[i].email,
                    fullName : users[i].fullName,
                }
                // saveUsers(users);
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
                alert("Login Successful");
                window.location.href = "home.html";
                userFound = true;
                break;
            }
            
        }
        if (!userFound) 
        { 
            alert("Invalid Email or Password");
        }
    }
} 

function logout()
{
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function getLoggedInUser() 
{
    const loggedInUserString = localStorage.getItem("loggedInUser");
    if (loggedInUserString) 
    {
        try 
        {
            return JSON.parse(loggedInUserString);
        } 
        catch (error) 
        {
            console.error("Error parsing loggedIn user from localStorage:", error);
            return null; // Or handle the error as needed
        }
    }
    return null;
}
function startQuiz() 
{
    window.location.href = "questions.html";
}




const defaultQuestions = [
    {
        id: 1,
        question: "What does the <title> tag define in an HTML document?",
        options: [
            { id: 1, value: "The main heading of the page" },
            { id: 2, value: "The title of the document that appears in the browser tab" },
            { id: 3, value: "The footer of the document" },
            { id: 4, value: "The subtitle of the page" }
        ],
        answer: 2
    },
    {
        id: 2,
        question: "Which CSS property is used to change the background color of an element?",
        options: [
            { id: 1, value: "color" },
            { id: 2, value: "background-color" },
            { id: 3, value: "bg-color" },
            { id: 4, value: "background" }
        ],
        answer: 2
    },
    {
        id: 3,
        question: "What is the purpose of the alt attribute in an <img> tag?",
        options: [
            { id: 1, value: "To link the image to a website" },
            { id: 2, value: "To add a title to the image" },
            { id: 3, value: "To display alternative text if the image fails to load" },
            { id: 4, value: "To set the image dimensions" }
        ],
        answer: 3
    },
    {
        id: 4,
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            { id: 1, value: "<a>" },
            { id: 2, value: "<link>" },
            { id: 3, value: "<href>" },
            { id: 4, value: "<hyperlink>" }
        ],
        answer: 1
    },
    {
        id: 5,
        question: "Which CSS property is used to make the text italic?",
        options: [
            { id: 1, value: "text-style: italic;" },
            { id: 2, value: "font-style: italic;" },
            { id: 3, value: "font-weight: italic;" },
            { id: 4, value: "text-decoration: italic;" }
        ],
        answer: 2
    },
    {
        id: 6,
        question: "Which JavaScript method is used to write content into an HTML element?",
        options: [
            { id: 1, value: "innerHTML()" },
            { id: 2, value: "document.write()" },
            { id: 3, value: "getElementById()" },
            { id: 4, value: "document.innerHTML()" }
        ],
        answer: 2
    },
    {
        id: 7,
        question: "Which of the following is a semantic HTML tag?",
        options: [
            { id: 1, value: "<div>" },
            { id: 2, value: "<span>" },
            { id: 3, value: "<section>" },
            { id: 4, value: "<b>" }
        ],
        answer: 3
    },
    {
        id: 8,
        question: "Which CSS property controls the text size?",
        options: [
            { id: 1, value: "font-size" },
            { id: 2, value: "text-size" },
            { id: 3, value: "font-weight" },
            { id: 4, value: "text-style" }
        ],
        answer: 1
    },
    {
        id: 9,
        question: "What does position: absolute; do in CSS?",
        options: [
            { id: 1, value: "Positions the element relative to its parent" },
            { id: 2, value: "Positions the element at the top of the page" },
            { id: 3, value: "Positions the element relative to the nearest positioned ancestor" },
            { id: 4, value: "Makes the element float on top of all other elements" }
        ],
        answer: 3
    },
    {
        id: 10,
        question: "What is the correct CSS syntax to make all <p> elements bold?",
        options: [
            { id: 1, value: "p {font-weight: bold;}" },
            { id: 2, value: "<p style='bold;'>" },
            { id: 3, value: "p {text-weight: bold;}" },
            { id: 4, value: "p {font-style: bold;}" }
        ],
        answer: 1
    },
    {
        id: 11,
        question: "What is the correct way to declare a JavaScript function?",
        options: [
            { id: 1, value: "function myFunction()" },
            { id: 2, value: "def myFunction()" },
            { id: 3, value: "func myFunction()" },
            { id: 4, value: "declare myFunction()" }
        ],
        answer: 1
    },
    {
        id: 12,
        question: "What is the correct syntax to include an external JavaScript file in HTML?",
        options: [
            { id: 1, value: "<script src='script.js'></script>" },
            { id: 2, value: "<script href='script.js'></script>" },
            { id: 3, value: "<js src='script.js'></js>" },
            { id: 4, value: "<javascript src='script.js'></javascript>" }
        ],
        answer: 1
    },
    {
        id: 13,
        question: "What is the output of console.log(typeof null); in JavaScript?",
        options: [
            { id: 1, value: "null" },
            { id: 2, value: "undefined" },
            { id: 3, value: "object" },
            { id: 4, value: "string" }
        ],
        answer: 3
    },
    {
        id: 14,
        question: "Which HTML tag is used to define an unordered list?",
        options: [
            { id: 1, value: "<ul>" },
            { id: 2, value: "<ol>" },
            { id: 3, value: "<li>" },
            { id: 4, value: "<list>" }
        ],
        answer: 1
    },
    {
        id: 15,
        question: "What does the z-index property in CSS control?",
        options: [
            { id: 1, value: "The transparency of an element" },
            { id: 2, value: "The stacking order of elements" },
            { id: 3, value: "The zoom level of an element" },
            { id: 4, value: "The size of the element" }
        ],
        answer: 2
    },
    {
        id: 16,
        question: "Which of the following is NOT a valid CSS property?",
        options: [
            { id: 1, value: "color" },
            { id: 2, value: "font-size" },
            { id: 3, value: "align-content" },
            { id: 4, value: "text-transform-upper" }
        ],
        answer: 4
    },
    {
        id: 17,
        question: "Which attribute is used in HTML to uniquely identify an element?",
        options: [
            { id: 1, value: "class" },
            { id: 2, value: "id" },
            { id: 3, value: "name" },
            { id: 4, value: "key" }
        ],
        answer: 2
    },
    {
        id: 18,
        question: "How do you declare a JavaScript array?",
        options: [
            { id: 1, value: "var arr = 1, 2, 3" },
            { id: 2, value: "var arr = [1, 2, 3]" },
            { id: 3, value: "var arr = {1, 2, 3}" },
            { id: 4, value: "var arr = (1, 2, 3)" }
        ],
        answer: 2
    },
    {
        id: 19,
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            { id: 1, value: "To add meta information for search engines and browsers" },
            { id: 2, value: "To link external files" },
            { id: 3, value: "To create headings" },
            { id: 4, value: "To define navigation menus" }
        ],
        answer: 1
    },
    {
        id: 20,
        question: "Which CSS property is used to add space inside an element’s border?",
        options: [
            { id: 1, value: "margin" },
            { id: 2, value: "padding" },
            { id: 3, value: "border-spacing" },
            { id: 4, value: "spacing" }
        ],
        answer: 2
    }
];
//Function to store default questions in LocalStorage
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

//Function to get Random 10 questions
function getRandomQuestions()
{
    const questions = loadQuestions();
    const shuffled = questions.sort(function(){
        return 0.5 - Math.random();
    })
    return shuffled.slice(0,10);
}



document.addEventListener("DOMContentLoaded", () => {
    if(window.location.pathname === '/questions.html') 
    {
        renderQuestion();
    }
    if(window.location.pathname === '/leaderboard.html')
    {
        rankDisplay();
    }

    // const profilePhoto = document.querySelector('.profile-photo');
    // const popupContainer = document.getElementById('popup-container');
    // const logoutBtn = document.getElementById('logout-btn');
    
    // profilePhoto.addEventListener('click', () => {
    //     popupContainer.style.display = 'flex';
    // });
    // profilePhoto.addEventListener('click',()=>{
    //     if (popupContainer.style.display === 'flex') {
    //         popupContainer.style.display = 'none';
    //       }
    // })

    // logoutBtn.addEventListener('click', () => {
    // popupContainer.style.display = 'none';
    // // Logout functionality goes here
    // logout();
    // })

    const profilePhoto = document.querySelector('.profile-photo');
    const popupContainer = document.getElementById('popup-container');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Hide the popup container initially using its class
    popupContainer.classList.add('hidden');
    
    profilePhoto.addEventListener('click', () => {
      popupContainer.classList.toggle('hidden');
    });
    
    logoutBtn.addEventListener('click', () => {
      popupContainer.classList.add('hidden');
      logout();
    });

    
});

//Function to display questions on Question Page
var i = 0;
var userAnswers = {}
var questions;

function renderQuestion()
{
    // var questions = getRandomQuestions();
    if (!questions) 
    { 
        questions = getRandomQuestions();
    }

    // console.log(questions)

    const questionContainer = document.querySelector(".questions-container");
    const questionNumber = document.querySelector(".question-number");
    const questionHeading = document.querySelector(".question");
    const optionsContainer = document.querySelector(".options");
    const nextBtn = document.getElementById("next");

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
        questionNumber.textContent = `Question ${i+1} of ${questions.length}`
    }
    questionHeading.textContent = `${i+1}. ${questions[i].question}`;
    // console.log(questions[i].question);
    optionsContainer.innerHTML = "";
    questions[i].options.forEach((option, j)=>{
        const radioInput = document.createElement("input");
        const label = document.createElement("label");
        radioInput.type = "radio";
        radioInput.name = "question"+i;
        radioInput.value = option.id;
        radioInput.id="option"+j;
        label.textContent = `${j+1}. ${option.value}`;
        label.setAttribute("for", radioInput.id);
        optionsContainer.appendChild(radioInput);
        optionsContainer.appendChild(label);
        // if (questions.userAnswer === option) {
        //     radioInput.checked = true;
        //   }
        const prevAnswer = userAnswers[`question${i}`];
        if (prevAnswer === option.id) {
        radioInput.checked = true;
        }
        
    })

    var previousBtn = document.getElementById("previous");
    if(i==0)
    {
        previousBtn.style.visibility="hidden";
    }
    else
    {
        previousBtn.style.visibility="visible";
    }

    updateProgressBar();

}

function updateProgressBar()
{
    var progressBar = document.querySelector(".progress-bar");
    if(!questions)
    {
        questions = getRandomQuestions();
    }
    // const currentQuestion = questions[i];
    const progress = ((i+1)/questions.length)*100;
    progressBar.style.width = progress+"%";
}


//Next Question Functionality
/*function nextQuestion() {
    
    if (!questions) 
    {
        questions = getRandomQuestions();
    }

    const currentQuestion = questions[i];
    const options = document.getElementsByName(`question${i}`);
    let userAnswer = null;

    // Get the user's selected answer
    for (const option of options) 
    {
        if (option.checked) 
        {
            userAnswer = parseInt(option.value);
            break;
        }
    }


    // Store the user's answer
    userAnswers[`question${i}`] = userAnswer;

    // Check if the answer is correct and update the score
    if (userAnswer === currentQuestion.answer) 
    {
        if (!currentQuestion.isScored) 
        {
            currentQuestion.isScored = true; 

            if (!userAnswers.score) 
            {
                userAnswers.score = 0; 
            }
            userAnswers.score += 100; 
        }
    }

    // Check if it's the last question
    if (i === questions.length - 1) 
    {
        
        alert("Quiz completed! Your score is: " + userAnswers.score);
        window.location.href = "leaderboard.html"; // Redirect to leaderboard
    } else {
        i++; // Move to the next question
        renderQuestion(); // Render the next question
    }
}*/

// ... (Existing code)

function nextQuestion() {
    if (!questions) {
        questions = getRandomQuestions();
    }

    const currentQuestion = questions[i];
    const options = document.getElementsByName(`question${i}`);
    let userAnswer = null;

    for (const option of options) {
        if (option.checked) {
            userAnswer = parseInt(option.value);
            break;
        }
    }

    userAnswers[`question${i}`] = userAnswer;

    if (userAnswer === currentQuestion.answer) {
        if (!currentQuestion.isScored) {
            currentQuestion.isScored = true;
            if (!userAnswers.score) {
                userAnswers.score = 0;
            }
            userAnswers.score += 100;
        }
    }

    if (i === questions.length - 1) {
        const loggedInUser = getLoggedInUser();
        if (loggedInUser) {
            // Get existing quiz data or initialize an empty array
            let quizData = JSON.parse(localStorage.getItem("quizData")) || [];

            // Find if the user has already taken the quiz
            const existingQuizIndex = quizData.findIndex(data => data.email === loggedInUser.email);

            const quizResult = {
                email: loggedInUser.email,
                fullName: loggedInUser.fullName,
                questions: questions.map(q => ({id: q.id, question: q.question})), // Store only relevant question info
                userAnswers: userAnswers,
                score: userAnswers.score || 0, // Ensure score is always defined
                // date: new Date().toLocaleDateString()
            };

            if (existingQuizIndex !== -1) {
                // Update existing quiz data
                quizData[existingQuizIndex] = quizResult;
            } else {
                // Add new quiz data
                quizData.push(quizResult);
            }

            localStorage.setItem("quizData", JSON.stringify(quizData));
            alert("Quiz completed! Your score is: " + (userAnswers.score || 0));
            window.location.href = "leaderboard.html";
        } else {
            alert("No user logged in. Cannot save quiz data."); // Handle the case where no user is logged in
            window.location.href = "index.html";
        }
    } else {
        i++;
        renderQuestion();
    }
}
//Function to get quizdata from localstorage
function getQuizData()
{
    let quizData = JSON.parse(localStorage.getItem("quizData")) || [];
    return quizData;
}


//Function for Previous Question
function previousQuestion() 
{
    if (i > 0) 
    {
        i--;
        renderQuestion();
    }
}


function sortAndRank() 
{
    // Sort by score descending
    var quizData = getQuizData();
    quizData.sort((a, b) => b.score - a.score);
  
    // Add rank. Use "dense" ranking to handle ties.
    let rank = 1;
    let previousScore = null;
    // let rankedQuizData = quizData.map((item, index) => {
    //     if (previousScore !== item.score) 
    //     {
    //         rank = index + 1;
    //     }
    //     previousScore = item.score
    //     return { ...item, rank: rank };
    // });

    let rankedQuizData = quizData.map((item, index) => {
        return { ...item, rank: index + 1 }; // Rank is the position in the sorted list
    });
  
    localStorage.setItem("quizData", JSON.stringify(rankedQuizData));
    // return rankedQuizData;
}



function rankDisplay()
{
    sortAndRank();
    var quizData = getQuizData();
    var existingQuizIndex;
    
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) 
    {
        // Get existing quiz data or initialize an empty array
        // let quizData = JSON.parse(localStorage.getItem("quizData")) || [];

        // Find if the user has already taken the quiz
        existingQuizIndex = quizData.findIndex(data => data.email === loggedInUser.email);
        // console.log(existingQuizIndex);
    }
    var currentUserRank = quizData[existingQuizIndex].rank;
    // console.log(currentUserRank);
    var rankHeading = document.getElementById("rank-heading");
    rankHeading.textContent = `Wow You Ranked ${quizData[existingQuizIndex].rank}`;
    document.getElementById("rank").textContent = `Your Score is: ${quizData[existingQuizIndex].score}`

    //1st Ranker
    var firstRankerScore = quizData[0].score;
    var first = document.getElementById("first");
    var firstName = document.getElementById("firstName");
    first.textContent = firstRankerScore;
    firstName.textContent = quizData[0].fullName;
    

    //2nd Ranker
    var secondRankerScore = quizData[1].score;
    var second = document.getElementById("second");
    var secondName = document.getElementById("secondName");
    second.textContent = secondRankerScore;
    secondName.textContent = quizData[1].fullName;

    //3rd Ranker
    var thirdRankerScore = quizData[2].score;
    var third = document.getElementById("third");
    var thirdName = document.getElementById("thirdName");
    third.textContent = thirdRankerScore;
    thirdName.textContent = quizData[2].fullName;

    var currentUserDiv = document.querySelector(".current-users");
   

    currentUserDiv.style.display = "none";
    

    if(currentUserRank > 3)
    {
        var currentUserDiv = document.querySelector(".current-users");
        currentUserDiv.style.display="flex";
        var currentUserRankDiv = document.querySelector(".current-user-rank");
        var currentUserNameDiv = document.querySelector(".current-user-name");
        var currentUserScoreDiv = document.querySelector(".current-user-score");

        currentUserRankDiv.textContent = `#${currentUserRank}`;
        currentUserNameDiv.textContent = `${quizData[existingQuizIndex].fullName}`;
        currentUserScoreDiv.textContent = `${quizData[existingQuizIndex].score}`;

        const otherUsersContainer = document.querySelector(".other-users-container");

        if (!otherUsersContainer) {
            console.error("Error: .other-users-container not found in the DOM.");
            return; // Important: Exit the function if the container isn't found
        }
        for(var i=3; i<5 && i < quizData.length; i++)
        {
            if(quizData[i].email === quizData[existingQuizIndex].email)
            {
                i=i+1;
            }

            //Creating div other-users
            var otherUserDivContainer = document.createElement("div");
            otherUserDivContainer.classList.add("other-users");

            //creating div other-user
            var otherUser = document.createElement("div");
            otherUser.classList.add("other-user");

            //Creating div other-user-rank
            var otherUserRank = document.createElement("div");
            otherUserRank.classList.add("other-user-rank");

            //Creating div for other-user-name
            var otherUserName = document.createElement("div");
            otherUserName.classList.add("other-user-name");


            //Creating div for other-user-score
            var otherUserScore = document.createElement("div");
            otherUserScore.classList.add("other-user-score");


            otherUserRank.textContent = `#${quizData[i].rank}`;
            otherUserName.textContent = `${quizData[i].fullName}`;

            console.log(quizData[i].rank);
            console.log(quizData[i].fullName);

            otherUser.appendChild(otherUserRank);
            otherUser.appendChild(otherUserName);

            otherUserScore.textContent = `${quizData[i].score}`;

            otherUserDivContainer.appendChild(otherUser);
            otherUserDivContainer.appendChild(otherUserScore);

            otherUserDivContainer.appendChild(otherUser);
            otherUserDivContainer.appendChild(otherUserScore);

            otherUsersContainer.appendChild(otherUserDivContainer);

        }

    }

    else
    {
        const otherUsersContainer = document.querySelector(".other-users-container");

        if (!otherUsersContainer) {
            console.error("Error: .other-users-container not found in the DOM.");
            return; // Important: Exit the function if the container isn't found
        }
        for(var i=3; i<6 && i < quizData.length; i++)
        {
            //Creating div other-users
            var otherUserDivContainer = document.createElement("div");
            otherUserDivContainer.classList.add("other-users");

            //creating div other-user
            var otherUser = document.createElement("div");
            otherUser.classList.add("other-user");

            //Creating div other-user-rank
            var otherUserRank = document.createElement("div");
            otherUserRank.classList.add("other-user-rank");

            //Creating div for other-user-name
            var otherUserName = document.createElement("div");
            otherUserName.classList.add("other-user-name");


            //Creating div for other-user-score
            var otherUserScore = document.createElement("div");
            otherUserScore.classList.add("other-user-score");


            otherUserRank.textContent = `#${quizData[i].rank}`;
            otherUserName.textContent = `${quizData[i].fullName}`;

            console.log(quizData[i].rank);
            console.log(quizData[i].fullName);

            otherUser.appendChild(otherUserRank);
            otherUser.appendChild(otherUserName);

            otherUserScore.textContent = `${quizData[i].score}`;

            otherUserDivContainer.appendChild(otherUser);
            otherUserDivContainer.appendChild(otherUserScore);

            otherUserDivContainer.appendChild(otherUser);
            otherUserDivContainer.appendChild(otherUserScore);

            otherUsersContainer.appendChild(otherUserDivContainer);

        }
    }
    
}



