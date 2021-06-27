// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz state variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hides start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hides questions section
  questionsEl.removeAttribute("class");

  // starts timer
  timerId = setInterval(clockTick, 1000);

  // shows starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // gets current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // updates title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clears out any old question choices
  choicesEl.innerHTML = "";

  // loops over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // creates new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attaches click event listener to each choice
    choiceNode.onclick = questionClick;

    // displays on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // checks if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // displays new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "blue";
    feedbackEl.style.fontSize = "400%";
  }

  // flashes right or wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stops timer
  clearInterval(timerId);

  // shows end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // shows final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hides questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // updates time
  time--;
  timerEl.textContent = time;

  // checks if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // gets value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // gets saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // formats new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // saves to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirects to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submist initials
submitBtn.onclick = saveHighscore;

// starts quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;