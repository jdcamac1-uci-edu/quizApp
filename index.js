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

function showSlide(newSlide){
    slides[currentSlide].classList.remove('active-slide');
    slides[newSlide].classList.add('active-slide');
    currentSlide = newSlide;
    showButtons(currentSlide);
}

function showNextSlide(){
    showSlide(currentSlide + 1);
}

function showPrevSlide(){
    showSlide(currentSlide - 1);
}

function buildQuestion(questionElement, index){
    //take the question element and add return the html to build it - questions and answers
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

function buildQuiz(){
    const output = [];
    questions.forEach((questionElement, index) => {
        output.push(buildQuestion(questionElement, index));
    });
    quizContainer.innerHTML = output.join('');
}

function findSelectedAnswer(index, answerContainer){
    answerSelector = `input[name=question${index}]:checked`;
    return (answerContainer.querySelector(answerSelector) || {}).value;
}

function answerIsCorrect(questionElement, userAnswer){
    return questionElement.answer == userAnswer;
}

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