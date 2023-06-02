

// --> Variables
let cardElegida = null
let categoriaElegida = null
let cantTickes = null
let precios = [2000, 1000, 500]


// --> Manejo del DOM
const cards = document.getElementsByClassName("card-hueso")
const arrayCards = document.querySelectorAll('.card-donacion')
console.log(arrayCards)
const totalTag = document.getElementById('total')

const form = document.forms.formulario

const btnBorrar = document.getElementById('btnBorrar')
const btnEnviar = document.getElementById('btnEnviar')

// --> Funciones

function setColor(card) {
    arrayCards[card].classList.add('set-color')
}


const cardSelected = (e) => {
    cardElegida = e.currentTarget.id
    categoriaElegida = cardElegida
    form.categorias.value = cardElegida
    setColor(cardElegida)
}

const categorySelected = (e) => {
    categoriaElegida = e.target.value
    cardElegida = categoriaElegida
    setColor(categoriaElegida)
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

const enviar = (e) => {
    e.preventDefault()

    const {nombre, apellido, email, tickets, categorias} = form
    
    const verificado = {
        nombre: nombre.value !== "",
        apellido: apellido.value !== "",
        email: email.value.includes('@'),
        tickes: tickets.value > 0,
        categoria: categorias.value !== 'none'
    }

    const values = Object.values(verificado)
    const submitAccepted = values.every(value => value)
    submitAccepted ? location.href="./enviado.html" : alert("Faltan completar campos")
}

for (let card of cards){
    card.addEventListener('click', cardSelected)

    form.addEventListener('submit', enviar)
    form.categorias.addEventListener('change', categorySelected)
    form.tickets.addEventListener('change', ticketSelected)
    form.tickets.addEventListener('keyup', ticketSelected)

    btnBorrar.addEventListener('click', reset)
}



