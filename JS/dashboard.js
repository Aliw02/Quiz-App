// Get The Elements
let removeBox = document.getElementById("remove-box");
let removeForm = document.querySelector(".box .remove-form");
let minusBtn = document.getElementById("minusBtn");
let removeBtn = document.getElementById("removeBtn");
let pRemove = document.getElementById("pRemove");
let addingBox = document.getElementById("adding-box");
let addingForm = document.querySelector(".box .adding-form");
let addingBtn = document.getElementById("addingBtn");
let plusBtn = document.getElementById("plusBtn");
let pAdd = document.getElementById("pAdd");
let arrowBtn = document.querySelectorAll(".background");

// Get The Inputs Values

let inputs = document.querySelectorAll("#adding-box input");
let titleInput = document.querySelector("#adding-box #title");
let answer1Input = document.querySelector("#adding-box #answer_1");
let answer2Input = document.querySelector("#adding-box #answer_2");
let answer3Input = document.querySelector("#adding-box #answer_3");
let answer4Input = document.querySelector("#adding-box #answer_4");
let rightAnswerInput = document.querySelector("#adding-box #true-answer");
let removeInput = document.getElementById("remove-input");


// Create Warning Span
let warnSpan = document.createElement("span");
warnSpan.id = "warn-span";
warnSpan.style.color = "#dc0a0a";


minusBtn.addEventListener("click", function () {

    displayRemoveForm();

});

plusBtn.onclick = () => {

    displayAddingForm();

};


function displayAddingForm() {

    addingForm.style.display = "block";
    addingBox.style.border = "1px solid #0075ff";
    removeBox.style.display = "none";
    plusBtn.style.display = "none";
    pAdd.style.display = "none";

};


function displayRemoveForm() {

    removeForm.style.display = "block";
    removeBox.style.border = "1px solid #dc0a0a";
    addingBox.style.display = "none";
    minusBtn.style.display = "none";
    pRemove.style.display = "none";

};

arrowBtn.forEach((element) => {

    element.addEventListener("click", () => {

        returnMenu();

    })
})

// Set Function To Return Menu
function returnMenu() {

    addingForm.style.display = "none";
    addingBox.style.border = "1px solid #b9b9b9";
    removeBox.style.display = "block";
    plusBtn.style.display = "block";
    pAdd.style.display = "block";

    removeForm.style.display = "none";
    removeBox.style.border = "1px solid #b9b9b9";
    addingBox.style.display = "block";
    minusBtn.style.display = "block";
    pRemove.style.display = "block";

}

// Event handler for the 'addingBtn' click event
addingBtn.onclick = () => {

    //Calls the 'addingData' function when the button is clicked
    addingData();
};

// Create a Function To Adding Data To JSON File
function addingData() {

    // Initialize a flag to check for empty input fields
    let emptyInputValue = false;

    // Iterate over each input field to check if any are empty
    for (const e of inputs) {
        if (e.value === "") {

            // If an empty value is found, set the flag to true 
            emptyInputValue = true;

            // Display a warning message
            warnSpan.innerText = "Value mustn't be empty";

            break;  // Exit the loop if an empty value is found
        }
    }

    // Proceed only if all input fields have values
    if (!emptyInputValue) {

        // Validate that the 'rightAnswerInput' matches one of the other answer inputs or starts with "all"
        if (rightAnswerInput.value === answer1Input.value
            || rightAnswerInput.value === answer2Input.value
            || rightAnswerInput.value === answer3Input.value
            || rightAnswerInput.value === answer4Input.value
            || rightAnswerInput.value.toLowerCase().startsWith("all")) {

            // Display a valid info message for the user
            warnSpan.innerText = "All information is valid. Submitting your data...";
            warnSpan.style.color = "#0075ff";

            setTimeout(() => {

                // Create a new FormData object to hold the input values
                let formData = new FormData();
                formData.append('title', `${titleInput.value} ?`);
                formData.append('answer_1', answer1Input.value);
                formData.append('answer_2', answer2Input.value);
                formData.append('answer_3', answer3Input.value);
                formData.append('answer_4', answer4Input.value);
                formData.append('right_answer', rightAnswerInput.value);

                // Send a POST request to the server with the form data
                fetch('http://127.0.0.1:5000/add_data', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {

                        // Check if the server response is not OK
                        if (!response.ok) {

                            // Display an error message if the request failed
                            warnSpan.innerText = "An error occurred while adding the question :(";

                        }

                        return response.json(); // Parse the JSON response

                    })

                    .then(data => {

                        //Check if the server sent a success message
                        if (data.message) {

                            // Display an error message if the request failed
                            warnSpan.innerText = data.message;

                            inputs.forEach((ele) => {

                                ele.value = '';  // Clear each input field

                            });

                        } else {

                            // Display the error message from the server
                            warnSpan.innerText = data.error;
                            warnSpan.style.color = "#dc0a0a";

                        }

                    })
                    .catch(error => {

                        warnSpan.innerText = `There is an error with server: ${error} :(`;

                    });

            }, 5000); // The delay in milliseconds
        }

        else {

            // Display an error message if the 'rightAnswerInput' does not match any answer inputs
            warnSpan.innerText = "Right Answer value must equal one of the else inputs fields values :(";

            rightAnswerInput.value = "";

        }
    }

    // Append the warning message span to the button's parent node
    addingBtn.parentNode.appendChild(warnSpan);
}

removeBtn.onclick = function () {

    deleteData();

}

// Create Function To Delete Questions 
function deleteData() {
    if (removeInput.value !== "") {
        let dataToDelete = {
            "title": `${removeInput.value} ?`
        };

        // Display a message to indicate the process has started
        warnSpan.innerText = "Preparing to delete the question...";
        warnSpan.style.color = "#0075ff"; // Information Color

        removeBtn.parentNode.appendChild(warnSpan);

        // Wait for 5 seconds before sending the data
        setTimeout(() => {

            fetch('http://127.0.0.1:5000/delete_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToDelete)

            })
                .then(response => {
                    if (!response.ok) {

                        throw new Error('Network response was not ok');

                    }
                    return response.json();

                })

                .then(data => {
                    if (data.message) {

                        warnSpan.innerText = 'The Question Deleted Successfully';

                    } else {

                        warnSpan.innerText = data.error;
                        warnSpan.style.color = "#dc0a0a"; // Error Color

                    }
                    removeInput.value = "";
                })
                .catch(error => {

                    //Handle any errors that occur during the fetch operation
                    warnSpan.innerText = `There was a problem with the fetch operation: ${error}`;
                    warnSpan.style.color = "#dc0a0a"; // Error Color

                });

        }, 5000); // The delay in milliseconds

    } else {

        // Display an error message if the 'rightAnswerInput' does not match any answer inputs
        warnSpan.innerText = "You mustn't leave any input blank :(";

    }
    //Append the warning message span to the button's parent node
    removeBtn.parentNode.appendChild(warnSpan);
}
