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

function getQuestion() {
    // get current question object from array
    const currentQuestion = questions[currentQuestionIndex];
    // update title with current question
    document.getElementById('question-title').textContent = currentQuestion.title;
    // clear out any old question choices
    choicesEl.innerHTML = '';
    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
    const choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);
    choiceNode.textContent = i + 1 + '. ' + choice;
      // attach click event listener to each choice
    choiceNode.onclick = questionClick;
      // display on the page
    choicesEl.appendChild(choiceNode);
    });
}