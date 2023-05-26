

// --> Variables
let cardElegida = null
let categoriaElegida = null
let cantTickes = null
let precios = [2000, 1000, 500]


// --> Manejo del DOM
const cards = document.getElementsByClassName("card-hueso")
const totalTag = document.getElementById('total')
const form = document.forms.formulario
const btnBorrar = document.getElementById('btnBorrar')

// --> Funciones
const cardSelected = (e) => {
    cardElegida = e.currentTarget.id
    categoriaElegida = cardElegida
    form.categorias.value = cardElegida
}

const categorySelected = (e) => {
    categoriaElegida = e.target.value
    cardElegida = categoriaElegida
}

const precioTotal = () => {
    let total = 0
    if(cardElegida !== null){
        total = cantTickes * precios[cardElegida]
    } else if (categoriaElegida !== null) {
        total = cantTickes * precios[categoriaElegida]
    }
    totalTag.innerHTML = `El total a pagar es de: $ ${total}`
}

const ticketSelected = (e) => {
    cantTickes = e.target.value

    if(cantTickes < 0 || isNaN(cantTickes)){
        e.target.value = 0
        cantTickes = null
        return
    }

    precioTotal()
}

const reset = (e) => {
    e.preventDefault()

    form.nombre.value = ""
    form.apellido.value = ""
    form.email.value = ""
    form.tickets.value = 0
    form.categorias.value = "none"

    totalTag.innerHTML = ''
}

for (let card of cards){
    card.addEventListener('click', cardSelected)
    form.categorias.addEventListener('change', categorySelected)

    form.tickets.addEventListener('change', ticketSelected)
    form.tickets.addEventListener('keyup', ticketSelected)

    btnBorrar.addEventListener('click', reset)
}



