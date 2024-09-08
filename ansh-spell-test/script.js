let timer = document.getElementsByClassName("timer-div")[0];
let streak = document.querySelector(".streak-div");
let displayContainer = document.getElementById("display-container");
let userResult = document.getElementById("user-result");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let quizContainer = document.getElementById("quiz-container");
let questionCount;
let scoreCount = 0;
let count = 0;
let countdown;

let quizArray = [];
let correctWords = ["pleasant", "suddenly", "harsh", "children", "attacked", "because", "feather", "disappeared", "tickle", "happily", "important", "mischief", "finish", "treasure", "library", "through", "together", "turnip", "surprise", "trotted", "carefully", "hopped", "wonder", "cabbage", "returned", "trudged", "exclaimed", "pawed", "greedy", "magic", "lanes", "finishes", "scared", "swimming", "giraffe", "please", "squawked", "moment", "barked", "straight"];

let incorrectWords = ["pleasent", "suddanly", "harssh", "childdren", "atacked", "becuase", "feather", "disapeared", "tickel", "hapily", "importent", "misschief", "fenish", "treazure", "libbrary", "throu", "toogether", "turneep", "suprise", "troted", "carefuly", "hoped", "wondar", "cabage", "retarned", "truged", "exclamed", "pawd", "gredy", "magik", "lans", "finishess", "scarred", "swiming", "girafe", "pleasee", "skuawked", "momant", "barkked", "stright"];

//Random value from array
const generateRandomValue = (array) =>
    array[Math.floor(Math.random() * array.length)];

displayNext = () => {
    questionCount += 1;
    quizCreator();
};

const timerDisplay = () => {
    countdown = setInterval(() => {
        timer.innerHTML = "time:  " + count + "s";
        count++;
    }, 1000);
}

const questionGenerator = () => {
    let randomValue = Math.random() >= 0.5 ? 1 : 0;
    // if 1 then find a random correct word or else random incorrect word

    let arrayChoice = randomValue ? correctWords : incorrectWords;
    let valueChoice = generateRandomValue(arrayChoice);
    if (quizArray.includes(valueChoice)) {
        questionGenerator();
    } else {
        quizArray.push(valueChoice);
    }
};
function quizCreator() {
    questionGenerator();
    quizContainer.innerHTML = ``;
    let div = document.createElement("div");
    div.classList.add("container-mid");


    //question

    let question_div = document.createElement("p");
    question_div.classList.add("question");
    question_div.innerHTML = quizArray[questionCount];
    div.appendChild(question_div);

    //options
    div.innerHTML += `<div class ="button-container">
            <button class="option-div" onClick="checker(true,this)">
            yes</button>
            <button class="option-div" onClick="checker(false,this)">
            no</button>
            </div>`;
    quizContainer.appendChild(div)
}
function checker(userOption, currentElement) {
    let questionContainer = document.querySelector(".container-mid");
    let options = questionContainer.querySelectorAll(".option-div");
    let question = questionContainer.querySelector(".question").innerText;
    if (userOption) {
        //user says  the word is  correct so  check in correct array.
        if (correctWords.includes(question)) {
            currentElement.classList.add("correct");
            scoreCount++;
            streak.innerText = `streak: ${scoreCount}`;
            setTimeout(displayNext, 2000);
        } else {
            currentElement.classList.add("inCorrect");
            options[1].classList.add("correct");
            setTimeout(displayResults, 2000);
        }
    } else {
        //user says the word  is incorrect then check in incorrect array
        if (incorrectWords.includes(question)) {
            currentElement.classList.add("correct");
            scoreCount++;
            streak.innerText = `Streak: ${scoreCount}`;
            setTimeout(displayNext, 2000);
        } else {
            currentElement.classList.add("incorrect");
            options[0].classList.add("correct");
            setTimeout(displayResults, 2000);
        }
    }
    //Disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
const displayResults = () => {
    quizArray.pop();
    displayContainer.classList.add("hide");
    startScreen.classList.remove("hide");
    startButton.innerText = "Restart";

    //user result
    userResult.innerHTML = `<P> your streak: ${scoreCount}</p><p>Time Taken: ${count} s</p>`;

    count = 0;
    clearInterval(count);
};

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    streak.innerText = "Streak: 0";
    clearInterval(countdown);
    count = 0;
    timerDisplay();
    quizCreator();
}
// when user clicks  on the  start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    quizArray = [];
    initial();
});

window.onload = () => {
    startButton.innerText = "Start";
    userResult.innerText = "";
};