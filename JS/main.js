// Select Elements
let quizArea = document.querySelector(".quiz-area");
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let results = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");


// Set Options
let currentIndex = 0;
let rightAnswer = 0;
let countdownInterval;

function getQuestions() {

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {

            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            // Create Bullets + Set Questions Count
            createBullets(qCount);

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);

            // Starting The Countdown 
            countdown(5, qCount)

            // Click On Submit
            submitButton.onclick = () => {

                // Get Right Answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;


                // Increase Index 
                currentIndex++;

                // Check The Answer
                checkAnswer(theRightAnswer, qCount);

                // Remove Previous Question
                quizArea.innerHTML = "";
                answersArea.innerHTML = "";

                // Add Question Data
                addQuestionData(questionsObject[currentIndex], qCount);

                // Handle Bullets Class
                handleBullets();

                // Starting The Countdown 
                clearInterval(countdownInterval);
                countdown(5, qCount)

                // Show Results
                showResults(qCount);

            };

        }

    };

    myRequest.open("GET", "questions.json", true);
    myRequest.send();
}

getQuestions();

function createBullets(num) {

    countSpan.innerHTML = num;

    // Create Spans
    for (let i = 0; i < num; i++) {

        // Create Span
        let theBullet = document.createElement("span");

        // Check if it first one
        if (i === 0) {

            theBullet.className = "on";

        }

        // Append Bullets To Main Bullets Container
        bulletsSpanContainer.appendChild(theBullet);

    }

}

function addQuestionData(obj, count) {

    if (currentIndex < count) {

        // Create H2 Questions Title
        let questionTitle = document.createElement("h2");

        // Create Question Text
        let questionText = document.createTextNode(obj.title);

        // Append Text To H2
        questionTitle.appendChild(questionText);

        // Append The H2 To Quiz Area
        quizArea.appendChild(questionTitle);

        // Create The Answers 
        for (let i = 1; i <= 4; i++) {

            // Create Main Answer Div
            let mainDiv = document.createElement("div");

            // Add Class To Main Div
            mainDiv.className = "answer";

            // Create Radio Input
            let radioInput = document.createElement("input");

            // Add Type + Name + Id + Data-Attribute
            radioInput.name = "question";
            radioInput.type = "radio";
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // Make First Option Selected
            if (radioInput.id === "answer_1") {
                radioInput.checked = true;
            }

            // Create Label
            let theLabel = document.createElement("label");

            // Add For Attribute
            theLabel.htmlFor = `answer_${i}`;

            // Create Text Label 
            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // Add The Text To The Label
            theLabel.appendChild(theLabelText);

            // Add Input + Label To Main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // Append All Divs To Answers Area
            answersArea.appendChild(mainDiv);

        }

    }

}

function checkAnswer(rAnswer, count) {

    let answers = document.getElementsByName("question");
    let theChosenAnswer;

    for (let i = 0; i < answers.length; i++) {

        if (answers[i].checked) {

            theChosenAnswer = answers[i].dataset.answer;

        }

    }
    if (rAnswer === theChosenAnswer) {

        rightAnswer++;

    }

}

function handleBullets() {

    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {

        if (currentIndex === index) {

            span.className = "on";

        }

    })

}

function showResults(count) {
    let theResult;

    if (currentIndex === count) {

        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();

        if (rightAnswer > (count / 2) && rightAnswer < count) {

            theResult = `<span class="good">Good</span>, ${rightAnswer} From ${count} Is Good`;

        } else if (rightAnswer === count) {

            theResult = `<span class="perfect">Perfect</span>, All Answers Are Good`;

        } else {

            theResult = `<span class="bad">Bad</span>, ${rightAnswer} From ${count} `;

        }

        results.innerHTML = theResult;
        results.style.padding = "10px";
        results.style.backgroundColor = "white";
        results.style.marginTop = "10px";
    }

}


function countdown(duration, count) {

    if (currentIndex < count) {

        let minutes, seconds;
        countdownInterval = setInterval(function () {

            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);


            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = `${minutes}: ${seconds}`;

            if (--duration < 0) {

                clearInterval(countdownInterval);
                submitButton.click();

            }

        }, 1000);

    }

}





