var sideNavBar = document.getElementById("side-navbar");
var hamburger = document.getElementById("menu-toggle");
var home = document.getElementById("home");
var users = document.querySelector(".users");
var quizzes = document.querySelector(".quizzes");

hamburger.addEventListener("click", function(){
    if(sideNavBar.style.display === "none")
    {
        sideNavBar.style.display = "flex";
    }
    else
    {
        sideNavBar.style.display = "none";
    }
    hamburger.classList.toggle("spin");
})

function logout()
{
  window.location.href="../index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const profilePhoto = document.querySelector('.profile-photo');
    const popupContainer = document.getElementById('popup-container');
    const logoutBtn = document.getElementById('logout-button');
    
    // Hide the popup container initially using its class
    popupContainer.classList.add('hidden');
    
    profilePhoto.addEventListener('click', () => {
      popupContainer.classList.toggle('hidden');
    });
    
    logoutBtn.addEventListener('click', () => {
      popupContainer.classList.add('hidden');
      logout();
    });

    if(window.location.pathname === '/quizzes.html') 
    {
      displayAllQuestions();
    }
})


//Function to display all questions

// function loadQuestions() 
// {

//     let questions = localStorage.getItem("questions");
//     if (questions) 
//     {
//         return JSON.parse(questions);
//     }
// }

// function loadQuestions() {
//   let questions = localStorage.getItem("questions");
//   return questions ? JSON.parse(questions) : []; // Fix: Provide default empty array
// }

// function displayAllQuestions()
// {
//   var questions = loadQuestions();
//   const tableBody = document.getElementById("question-table-container");
//   if (questions.length === 0) {
//     tableBody.innerHTML = "<tr><td colspan='4'>No questions found</td></tr>";
// } else {
//     questions.forEach((q) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${q.id}</td>
//             <td>${q.question}</td>
//             tableBody.appendChild(row);`;
//                 });
//               }
// }

// Function to load questions from localStorage
function loadQuestions() {
  let questions = localStorage.getItem("questions");
  return questions ? JSON.parse(questions) : []; // Fix: Provide default empty array
}

// Function to display all questions in the table
function displayAllQuestions() {
  var questions = loadQuestions();
  const tableBody = document.getElementById("question-table-container");
  
  tableBody.innerHTML = ""; // Clear previous content to prevent duplication

  if (questions.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='3'>No questions found</td></tr>";
  } else {
    function escapeHTML(str) {
      return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
      questions.forEach((q, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${index + 1}</td>
              <td>${escapeHTML(q.question)}</td>
              <td>
                  <i class="fa-solid fa-eye" style="color: #7965d8;"></i>
                  <i class="fa-solid fa-pencil" style="color: #14C099;"></i>
                  <i class="fa-solid fa-trash" style="color:#FF3C28" onclick="deleteQuestion(${q.id})"></i>
              </td>
          `;
          tableBody.appendChild(row); // Fix: Append the row outside innerHTML
      });
  }
}

// Ensure the function runs when on quizzes.html
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("quizzes.html")) {
      displayAllQuestions();
      attachViewListeners();
  }
});


const createQuestionPopupCross = document.querySelector(".create-question-popup .cross"); // More specific selector
const viewQuestionPopupCross = document.querySelector(".view-question-popup .cross");   // More specific selector


var createQuestionPopup = document.querySelector(".create-question-popup");
createQuestionPopup.style.display = "none";

var viewQuestionPopup = document.querySelector(".view-question-popup");
viewQuestionPopup.style.display = "none";

document.getElementById('new-question').addEventListener("click", function(){
  createQuestionPopup.style.display= "block";
})
createQuestionPopupCross.addEventListener("click",function(){
  createQuestionPopup.style.display = "none";
})

viewQuestionPopupCross.addEventListener("click",function(){
  viewQuestionPopup.style.display = "none";
})




function checkRequiredFields() {
  var question = document.getElementById("question").value;
  var option1 = document.getElementById("option1").value;
  var option2 = document.getElementById("option2").value;
  var option3 = document.getElementById("option3").value;
  var option4 = document.getElementById("option4").value;

  if (question === "" || option1 === "" || option2 === "" || option3 === "" || option4 === "") {
      alert("Please Fill Required Fields");
      return false; // Stop execution if fields are empty
  }
  return true;
}




function addNewQuestion()
{
  var questions = loadQuestions();
  // checkRequiredFields();
  // console.log(question);

  if (!checkRequiredFields()) return;
  var question = document.getElementById("question").value;
  var option1 = document.getElementById("option1").value;
  var option2 = document.getElementById("option2").value;
  var option3 = document.getElementById("option3").value;
  var option4 = document.getElementById("option4").value;
  var correctAnswer = document.getElementById("correct-option").value;
  

  let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
  let newQuestion = {
    id: newId,
    question: question,
    options: [
      { id: 1, value: option1},
      { id: 2, value: option2 },
      { id: 3, value: option3 },
      { id: 4, value: option4 },
    ],
    answer:correctAnswer
  }
  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Question Inserted Successfully");
  var createQuestionPopup = document.querySelector(".create-question-popup");
  createQuestionPopup.style.display = "none";
  var question = document.getElementById("question").value="";
  var option1 = document.getElementById("option1").value="";
  var option2 = document.getElementById("option2").value="";
  var option3 = document.getElementById("option3").value="";
  var option4 = document.getElementById("option4").value="";
}


// Function to show the question popup
function showQuestionPopup(questionId) {
  let questions = JSON.parse(localStorage.getItem("questions")) || []; // Fetch questions
  let questionData = questions.find(q => q.id === questionId);

  if (questionData) {
      document.getElementById("popup-question").textContent = questionData.question;
      document.getElementById("popup-option1").innerHTML = questionData.options[0].value;
      document.getElementById("popup-option2").innerHTML = questionData.options[1].value;
      document.getElementById("popup-option3").innerHTML = questionData.options[2].value;
      document.getElementById("popup-option4").innerHTML = questionData.options[3].value;

      document.getElementById("popup-correct-option").innerHTML =
          questionData.options[questionData.answer - 1].value;

      document.querySelector(".view-question-popup").style.display = "block";
  }
}


// Attach event listeners to eye buttons
function attachViewListeners() 
{
  document.querySelectorAll(".fa-eye").forEach((eyeButton, index) => {
      eyeButton.addEventListener("click", function () {
          showQuestionPopup(index + 1);
      });
  });
}
