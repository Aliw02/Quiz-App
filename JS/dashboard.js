let removeBox = document.getElementById("remove-box");
let removeForm = document.querySelector(".box .remove-form");
let minusBtn = document.getElementById("minusBtn");
let pRemove = document.getElementById("pRemove");
let addingBox = document.getElementById("adding-box");
let addingForm = document.querySelector(".box .adding-form");
let plusBtn = document.getElementById("plusBtn");
let pAdd = document.getElementById("pAdd");


minusBtn.addEventListener("click", function () {
    displayRemoveForm();
});

plusBtn.onclick = () => {
    displayAddingForm();
};


function displayAddingForm() {
    addingForm.style.display = "block";
    removeBox.style.display = "none";
    plusBtn.style.display = "none";
    pAdd.style.display = "none";
};


function displayRemoveForm() {
    removeForm.style.display = "block";
    addingBox.style.display = "none";
    minusBtn.style.display = "none";
    pRemove.style.display = "none";

};
