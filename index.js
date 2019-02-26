const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const resultsContainer = document.getElementById("results");
let currentSlide = 0;

const questions = [
    {
        question: "What's the capitol of California?",
        options: {
            a: "San Fransisco",
            b: "Los Angeles",
            c: "Sacramento"
        },
        answer: "c"
    },

    {
        question: "Who was the second U.S. President?",
        options: {
            a: "Abraham Lincoln",
            b: "John Adams",
            c: "Thomas Jefferson"
        },
        answer: "b"
    },

    {
        question: "What is Taylor Swift's real name?",
        options: {
            a: "Regina Phalange",
            b: "Taylor Smith",
            c: "Linda Swift",
            d: "Taylor Swift"
        },
        answer: "d"
    }
]

/**
 * Displays the Previous, Next, and Submit buttons based on the slide number
 * 
 * @param {number} currentSlide - The current slide number
 */
function showButtons(currentSlide){
    if (currentSlide == 0)
    {
        previousButton.style.display = 'none';
        submitButton.style.display = 'none';
    }
    else if (currentSlide == slides.length - 1)
    {
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else
    {
        previousButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

/** Displays a new question slide to the user
 * 
 * @param {number} newSlide - The number of the slide to be displayed
 */
function showSlide(newSlide){
    slides[currentSlide].classList.remove('active-slide');
    slides[newSlide].classList.add('active-slide');
    currentSlide = newSlide;
    showButtons(currentSlide);
}

/* Displays the next question slide to the user. */
function showNextSlide(){
    showSlide(currentSlide + 1);
}

/* Displays the previous question slide to the user.*/
function showPrevSlide(){
    showSlide(currentSlide - 1);
}


/**
 * Builds the HTML for each question and it's multiple choice answers
 *
 * The HTML puts the radio input inside .answers, and puts .questions and .answers inside .slide
 * 
 * @param {Object} questionELement 			- A dictionary of a question and it's answer options
 * @param {string} questionElement.question - The text of the question
 * @param {Object} questionElement.options 	- A dictionary of letters and their answer option
 * 
 * @return {string} The HTML to build the question slide
 */
function buildQuestion(questionElement, index){
    const answers = [];
    for (option in questionElement.options)
    {
        const optionText = questionElement.options[option];
        answers.push(
            `<label>
                <input type='radio' name='question${index}' value='${option}'>${optionText}<br>
            </label>`
        )
    }
    return `<div class='slide'>
                <div class='question'>${questionElement.question}</div>
                <div class = 'answers'>${answers.join('')}</div>
            </div>`
}

/* Builds the whole quiz: every question and their answer options. */
function buildQuiz(){
    const output = [];
    questions.forEach((questionElement, index) => {
        output.push(buildQuestion(questionElement, index));
    });
    quizContainer.innerHTML = output.join('');
}

/**
 * Finds the answer option that user selected.
 *
 * @return 	The letter value of the answer element that is selected, or if no answer is selected,
 * 			the value of an empty Object is returned
 */
function findSelectedAnswer(index, answerContainer){
    answerSelector = `input[name=question${index}]:checked`;
    return (answerContainer.querySelector(answerSelector) || {}).value;
}

/**
 * Evaluations whether a user's answer to a question is correct.
 *
 * @param {Object} questionELement 			- A dictionary of a question and it's answer options
 * @param {string} questionElement.question - The text of the question
 * @param {string} userAnswer				- The letter of the user's answer to a question
 *
 * @return {Boolean} Returns true if the question's correct answer matches the user's answer.
 */

function answerIsCorrect(questionElement, userAnswer){
    return questionElement.answer == userAnswer;
}


/**
 * Displays the user's results as the number correct out of total number of questions.
 *
 * For questions the user got correct, the answers will display in green.
 * For questions teh user got wrong, the answers will display in red. 
 */
function showResults(){
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    questions.forEach((questionElement, index) => {
        const userAnswer = findSelectedAnswer(index, answerContainers[index]);
        if (answerIsCorrect(questionElement, userAnswer))
        {
            numCorrect++;
            answerContainers[index].style.color = 'green';
        }
        else
            answerContainers[index].style.color = 'red';

    });
    resultsContainer.innerHTML = `${numCorrect} correct out of ${questions.length}`;
}

buildQuiz();

const slides = document.querySelectorAll(".slide");


showSlide(0);

submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);