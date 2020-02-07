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
