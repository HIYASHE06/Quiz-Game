let time = 60;
let currentQuestionIndex = 0;
let timerId;

const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');
const initialsEl = document.getElementById('initials');
const feedbackEl = document.getElementById('feedback');

function startQuiz() {
    // hide start screen
    document.getElementById('start-screen').classList.add('hide');
    // start timer
    timerId = setInterval(clockTick, 1000);
    // show questions section
    questionsEl.classList.remove('hide');
    getQuestion();
}