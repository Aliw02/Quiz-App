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


minusBtn.addEventListener("click", function () {
    displayRemoveForm();
});

plusBtn.onclick = () => {
    displayAddingForm();
};


addingBtn.onclick = () => {
    addingData();
}

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

// Create a Function To Adding Data To JSON File
function addingData() {
    inputs.forEach((e) => {
        if (e.value === "") {
            warnSpan.innerText = "You must adding value in every inputs fields :(";
            warnSpan.style.color = "#dc0a0a";
            addingBtn.parentNode.appendChild(warnSpan);
        }
    })

    if (rightAnswerInput.value === answer1Input.value || rightAnswerInput.value === answer2Input.value || rightAnswerInput.value === answer3Input.value || rightAnswerInput.value === answer4Input.value) {

        let formData = new FormData();
        formData.append('title', `${titleInput.value} ?`);
        formData.append('answer_1', answer1Input.value);
        formData.append('answer_2', answer2Input.value);
        formData.append('answer_3', answer3Input.value);
        formData.append('answer_4', answer4Input.value);
        formData.append('right_answer', rightAnswerInput.value);

        fetch('http://127.0.0.1:5000/add_data', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    warnSpan.innerText = "An error occurred while adding the question :(";
                    warnSpan.style.color = "#dc0a0a";
                    addingBtn.parentNode.appendChild(warnSpan);
                }
                return response.json();
            })
            .then(data => {

                warnSpan.innerText = "Well Done, The Question Has Been Added Successfully !! :)";
                warnSpan.style.color = "#0075ff";
                addingBtn.parentNode.appendChild(warnSpan);
                inputs.forEach((ele) => {
                    ele.value = '';
                });

                setInterval(() => {
                    return data
                }, 5000)

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
        warnSpan.innerText = "An error occurred while adding the question :(";
        warnSpan.style.color = "#dc0a0a";
        addingBtn.parentNode.appendChild(warnSpan);

        inputs.forEach((ele) => {
            ele.value = '';
        });
    }
}

removeBtn.onclick = function () {
    deleteData()
}

// Create Function To Delete Questions 
function deleteData() {
    // جمع البيانات المطلوب حذفها (يمكنك تعديلها حسب احتياجك)
    let dataToDelete = {
        "title": `${removeInput.value} ?`
    };

    // إرسال طلب POST إلى نقطة النهاية /delete_data في التطبيق Flask
    fetch('http://127.0.0.1:5000/delete_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToDelete)
    })
        .then(response => {
            if (!response.ok) {

                warnSpan.innerText = 'Network response was not ok';
                warnSpan.style.color = "#dc0a0a";
                removeBtn.parentNode.appendChild(warnSpan);

            }
            return response.json();
        })
        .then(data => {

            warnSpan.innerText = 'The Question Deleted Successfully';
            warnSpan.style.color = "#dc0a0a";
            removeBtn.parentNode.appendChild(warnSpan);

            setInterval(() => {
                return data
            }, 5000)

        })
        .catch(error => {

            warnSpan.innerText = `There was a problem with the fetch operation: ${error}`;
            warnSpan.style.color = "#dc0a0a";
            removeBtn.parentNode.appendChild(warnSpan);
        });
};
