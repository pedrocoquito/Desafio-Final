const buttons = document.getElementsByClassName('button')

for (let button of buttons) {
    button.addEventListener("click", function () {
        let id = button.getAttribute('id')
        let content = document.querySelector(`.${id}`)

        if (button.textContent == "Esconder") {
            button.textContent = "Mostrar"
            content.classList.add('hide')
        } else {
            button.textContent = "Esconder"
            content.classList.toggle('hide')
        }

    })
}

function addIngredient() {
    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
        true
    );

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);


function addPreparation() {
    const preparation = document.querySelector("#preparation");
    const fieldContainer = document.querySelectorAll(".preparation");

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(
        true
    );

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    preparation.appendChild(newField);
}

document
    .querySelector(".add-preparation")
    .addEventListener("click", addPreparation);
