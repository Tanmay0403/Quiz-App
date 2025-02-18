var sideNavBar = document.getElementById("side-navbar");
var hamburger = document.getElementById("menu-toggle");
var home = document.getElementById("home");
var users = document.querySelector(".users");
var quizzes = document.querySelector(".quizzes");

hamburger.addEventListener("click", function () {
  if (sideNavBar.style.display === "none") {
    sideNavBar.style.display = "flex";
  }
  else {
    sideNavBar.style.display = "none";
  }
  hamburger.classList.toggle("spin");
})

function logout() {
  window.location.href = "../index.html";
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

  if (window.location.pathname === '/quizzes.html') {
    displayAllQuestions();
  }

})




// Function to load questions from localStorage
function loadQuestions() {
  let questions = localStorage.getItem("questions");
  return questions ? JSON.parse(questions) : []; // Fix: Provide default empty array
}

function loadQuizData() {
  let quizData = localStorage.getItem("quizData");
  return quizData ? JSON.parse(quizData) : [];
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
              <td>${index+1}</td>
              <td>${escapeHTML(q.question)}</td>
              <td>
                  <i class="fa-solid fa-eye" style="color: #7965d8;" onclick="showQuestionPopup(${q.id})"></i>
                  <i class="fa-solid fa-pencil" style="color: #14C099;" onclick="showEditQuestionPopup(${q.id})"></i>
                  <i class="fa-solid fa-trash" style="color:#FF3C28" onclick="showDeleteQuestionPopup(${q.id})"></i>
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
    // attachEditListners();
  }
  if (window.location.pathname.endsWith("users.html")) {
    viewUsers();
  }
  if (window.location.pathname.indexOf('/usertest.html') !== -1) {
    displayUserTests();
  }
  if (window.location.pathname.indexOf('/viewtest.html') !== -1) {
    displayTestDetails();
  }
});


const createQuestionPopupCross = document.querySelector(".create-question-popup .cross"); // More specific selector
const viewQuestionPopupCross = document.querySelector(".view-question-popup .cross");   // More specific selector
const editQuestionPopupCross = document.querySelector(".edit-question-popup .cross");

var createQuestionPopup = document.querySelector(".create-question-popup");


var viewQuestionPopup = document.querySelector(".view-question-popup");

var editQuestionPopup = document.querySelector(".edit-question-popup");


document.getElementById('new-question').addEventListener("click", function () {
  createQuestionPopup.style.display = "block";
})
createQuestionPopupCross.addEventListener("click", function () {
  createQuestionPopup.style.display = "none";
})

viewQuestionPopupCross.addEventListener("click", function () {
  viewQuestionPopup.style.display = "none";
})

editQuestionPopupCross.addEventListener("click", function () {
  editQuestionPopup.style.display = "none";
})

var deletePopup = document.querySelector(".delete-popup");
deletePopup.style.display = "none";




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




function addNewQuestion() {
  var questions = loadQuestions();
  // checkRequiredFields();
  // console.log(question);

  if (!checkRequiredFields()) return;
  var question = document.getElementById("question").value;
  var option1 = document.getElementById("option1").value;
  var option2 = document.getElementById("option2").value;
  var option3 = document.getElementById("option3").value;
  var option4 = document.getElementById("option4").value;
  var correctAnswer = parseInt(document.getElementById("correct-option").value);


  let newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
  let newQuestion = {
    id: newId,
    question: question,
    options: [
      { id: 1, value: option1 },
      { id: 2, value: option2 },
      { id: 3, value: option3 },
      { id: 4, value: option4 },
    ],
    answer: correctAnswer
  }
  questions.push(newQuestion);
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Question Inserted Successfully");
  var createQuestionPopup = document.querySelector(".create-question-popup");
  createQuestionPopup.style.display = "none";
  var question = document.getElementById("question").value = "";
  var option1 = document.getElementById("option1").value = "";
  var option2 = document.getElementById("option2").value = "";
  var option3 = document.getElementById("option3").value = "";
  var option4 = document.getElementById("option4").value = "";
  location.reload();
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

var editingQuestionId = null;


function showEditQuestionPopup(questionId) {
  let questions = JSON.parse(localStorage.getItem("questions")) || []; // Fetch questions
  let questionData = questions.find(q => q.id === questionId);

  editingQuestionId = questionId;
  if (questionData) {
    document.getElementById("edit-question").value = questionData.question;
    document.getElementById("edit-option1").value = questionData.options[0].value;
    document.getElementById("edit-option2").value = questionData.options[1].value;
    document.getElementById("edit-option3").value = questionData.options[2].value;
    document.getElementById("edit-option4").value = questionData.options[3].value;

    const correctAnswerIndex = parseInt(questionData.answer) - 1;
    const selectElement = document.getElementById("edit-correct-option");


    selectElement.innerHTML = "";
    questionData.options.forEach((option, index) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.id; // Set the value to option.id
      optionElement.text = option.value; // Set the displayed text to option.value
      selectElement.appendChild(optionElement);
    });

    selectElement.selectedIndex = correctAnswerIndex;
    // document.getElementById("edit-correct-option") =
    //     questionData.options[questionData.answer - 1].value;

    document.querySelector(".edit-question-popup").style.display = "block";

  }
}

function editQuestion() {
  var questions = loadQuestions();
  var question = document.getElementById("edit-question").value;
  var option1 = document.getElementById("edit-option1").value;
  var option2 = document.getElementById("edit-option2").value;
  var option3 = document.getElementById("edit-option3").value;
  var option4 = document.getElementById("edit-option4").value;
  var correctAnswer = parseInt(document.getElementById("edit-correct-option").value);
  var questionIndex = questions.findIndex(q => q.id === editingQuestionId);
  questions[questionIndex] = {
    id: editingQuestionId,
    question: question,
    options: [
      { id: 1, value: option1 },
      { id: 2, value: option2 },
      { id: 3, value: option3 },
      { id: 4, value: option4 },
    ],
    answer: correctAnswer
  }
  localStorage.setItem("questions", JSON.stringify(questions));
  alert("Question updated successfully!");
  document.querySelector(".edit-question-popup").style.display = "none";
  location.reload();

}





var deletePopup = document.querySelector(".delete-popup");
deletePopup.style.display = "none";

function showDeleteQuestionPopup(questionId) {
  deletePopup.style.display = "flex";
  deletePopup.dataset.questionId = questionId; // Store questionId in data attribute
}

function cancelDeletion() {
  deletePopup.style.display = "none";
}

function deleteQuestion() {
  var questions = loadQuestions();
  const questionId = parseInt(deletePopup.dataset.questionId);

  if (isNaN(questionId)) {
    console.error("Invalid questionId:", deletePopup.dataset.questionId);
    alert("Error deleting question. Please try again.");
    return;
  }

  // *** The Correct Way to Find and Delete ***
  let questionIndex = questions.findIndex(q => q.id === questionId); // Use q.id for comparison

  if (questionIndex !== -1) {
    questions.splice(questionIndex, 1);
    localStorage.setItem("questions", JSON.stringify(questions));
    alert("Question deleted successfully!");
    deletePopup.style.display = "none";
    displayAllQuestions(); // Refresh the question list
  } else {
    console.error("Question not found for ID:", questionId);
    alert("Error: Question not found.");
  }
}

function viewUsers() {
  var quizData = loadQuizData();
  const tableBody = document.getElementById("user-table-container");

  tableBody.innerHTML = "";

  if (quizData.length === 0) {
    tableBody.innerHTML = "<tr><td colspan = 6> No User Had Given Test</td></tr>";
  }
  else {
    quizData.forEach((q, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${index + 1}</td>
      <td>${q.fullName}</td>
      <td>${q.email}</td>
      <td>${q.noOfTests}</td>
      <td>${q.latestScore}</td>
      <td><a href = "usertest.html?userIndex=${index}">View Test</a></td>
      `;

      tableBody.appendChild(row);
    })
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}





function displayUserTests() {
  const userIndexString = getQueryParam("userIndex");

  if (userIndexString === null) {
    document.getElementById("test-details-container").innerHTML = "<p>Invalid User</p>";
    return;
  }

  const userIndex = parseInt(userIndexString, 10); // Convert to integer, radix 10 is crucial

  if (isNaN(userIndex)) { // Check if parsing was successful
    document.getElementById("test-details-container").innerHTML = "<p>Invalid User Index</p>";
    return;
  }

  const quizData = loadQuizData(); // Load data only once

  var userName = document.getElementById("user-name");
  userName.textContent = `${quizData[userIndex].fullName} | ${quizData[userIndex].email}`

  if (!quizData || quizData.length === 0 || userIndex < 0 || userIndex >= quizData.length) { // Check for valid data and index
    document.getElementById("test-details-container").innerHTML = "<p>No user data found or invalid user index.</p>";
    return;
  }

  const user = quizData[userIndex]; // Get the user object
  const userTests = user?.tests || [];  // Use optional chaining and provide a default empty array

  const tableBody = document.getElementById("user-test-table-container");
  tableBody.innerHTML = ""; // Clear existing content

  if (userTests.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='5'>No tests available for this user.</td></tr>";
    return;
  }

  userTests.forEach((t, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${t.date}</td>
          <td>${t.score}</td>
          <td class="total-question">${t.totalNoOfCorrectAnswers}</td>
          <td><a href="viewtest.html?userIndex=${userIndex}&testIndex=${index}">View Test</a></td>
      `;
    tableBody.appendChild(row);
  });
}





function displayTestDetails() {
  const userIndex = parseInt(getQueryParam("userIndex"), 10);
  const testIndex = parseInt(getQueryParam("testIndex"), 10);

  if (isNaN(userIndex) || isNaN(testIndex)) {
      document.getElementById("right-section").innerHTML = "<p>Invalid test details.</p>";
      return;
  }

  const quizData = loadQuizData();
  if (!quizData[userIndex] || !quizData[userIndex].tests[testIndex]) {
      document.getElementById("right-section").innerHTML = "<p>Test not found.</p>";
      return;
  }

  const user = quizData[userIndex];
  const test = user.tests[testIndex];

  function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  document.getElementById("user-name").textContent = `${user.fullName} | ${user.email}`;

  const testContainer = document.querySelector(".test-container");
  if (!testContainer) {
      console.error("Error: .test-container not found in DOM");
      return;
  }

  testContainer.innerHTML = `
      <div class="test-details">
          <div class="test-index">Test ${testIndex + 1}</div>
          <div class="test-score">Score: ${test.score}</div>
          <div class="test-date">Test Date: ${test.date}</div>
      </div>
      <hr>
  `;

  test.questionsAnswered.forEach((q, index) => {
      const questionCard = document.createElement("div");
      questionCard.classList.add("question-card");

      // Convert options object to an array
      const optionsArray = Object.values(q.options);

      // Ensure correctAnswer is handled properly
      const correctAnswer = q.correctAnswer; // Assuming it's the index (1, 2, 3, or 4)

      let optionHTML = optionsArray.map((option, i) => {
          let bgColor = "";
          const optionIndex = i + 1; // Calculate the option index (1, 2, 3, 4)

          if (optionIndex == q.selectedAnswer) {
              bgColor = (optionIndex == correctAnswer) ? "background-color: #E8F8F4;" : "background-color: #FFE2DF;";
          } else if (optionIndex == correctAnswer) {
              bgColor = "background-color: #F0EEFF;";
          }

          return `<div class="option${optionIndex}" style="${bgColor}"><b>Option ${optionIndex}: </b>${option}</div>`;
      }).join("");

      questionCard.innerHTML = `
          <div class="question"><b>Question ${index + 1}: </b>${escapeHTML(q.question)}</div>
          ${optionHTML}
      `;

      testContainer.appendChild(questionCard);
  });

  console.log("Test details displayed successfully!");
}

