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