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

let inputs = document.querySelectorAll("#adding-box input");




minusBtn.addEventListener("click", function () {
    displayRemoveForm();
});

plusBtn.onclick = () => {
    displayAddingForm();
};


addingBtn.onclick = () => {
    addingData();
    inputs.forEach((e) => {
        console.log(e.value);
        e.value = "";
    })
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
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let data = JSON.parse(this.responseText);
        }
    }
    myRequest.open("GET", "questions.json", true);
    myRequest.send();
}
