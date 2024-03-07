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
function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        // display new time on page
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong!';
        } else {
        feedbackEl.textContent = 'Correct!';
        }
        // flash right/wrong feedback on page for half a second
        feedbackEl.setAttribute('class', 'feedback');
        setTimeout(function() {
        feedbackEl.setAttribute('class', 'feedback hide');
        }, 1000);
        // move to next question
        currentQuestionIndex++;
        // check if we've run out of questions
        if (currentQuestionIndex === questions.length) {
        quizEnd();
        } else {
        getQuestion();
        }
    }
    function quizEnd() {
        // stop timer
        clearInterval(timerId);
        // show end screen
        const endScreenEl = document.getElementById('end-screen');
        endScreenEl.removeAttribute('class');
        // show final score
        const finalScoreEl = document.getElementById('final-score');
        finalScoreEl.textContent = time;
        // hide questions section
        questionsEl.setAttribute('class', 'hide');
    }
    function clockTick() {
        // update time
        time--;
        timerEl.textContent = time;
        // check if user ran out of time
        if (time <= 0) {
        quizEnd();
        }
    }
    function saveHighscore() {
        // get value of input box
        const initials = initialsEl.value.trim();
        // make sure value wasn't empty
        if (initials !== '') {
          // get saved scores from localstorage, or if not any, set to empty array
            const highscores =
                JSON.parse(window.localStorage.getItem('highscores')) || [];
            // format new score object for current user
            const newScore = {
                score: time,
                initials: initials
            };
            // save to localstorage
            highscores.push(newScore);
            window.localStorage.setItem('highscores', JSON.stringify(highscores));
            // redirect to next page
            window.location.href = 'highscores.html';
            }
        }
        function checkForEnter(event) {
            // "13" represents the enter key
            if (event.key === 'Enter') {
            saveHighscore();
            }
        }
     // user clicks button to submit initials
    submitBtn.onclick = saveHighscore;
    
     // user clicks button to start quiz
    startBtn.onclick = startQuiz;
    
    initialsEl.onkeyup = checkForEnter;
    