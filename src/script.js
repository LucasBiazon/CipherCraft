const verificatorForm = document.querySelector("#verificatorForm")
const generatorForm = document.querySelector("#generatorForm")

function Esconder(){
    verificatorForm.classList.toggle("hidden")
    generatorForm.classList.toggle("hidden")
}

const btGenerator = document.querySelector("#btGenerator")
const characters = document.querySelector("#characters")
const charactersNumber = document.querySelector("#charactersNumber")
const result = document.querySelector("#result")

const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector('#lowercase')
const numbers = document.querySelector('#numbers')
const special = document.querySelector('#special')

const letrasMaiusculas = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const letrasMinusculas = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const numeros = Array.from({ length: 10 }, (_, i) => String(i));
const caracteresEspeciais = ['!', '@', '#', '$', '%', '&', '*', '/', '.', ';'];
const gerador = [ letrasMaiusculas, letrasMinusculas, numeros, caracteresEspeciais]

generatorForm.addEventListener('submit', (event) => { 
    event.preventDefault()
})

generatorForm.addEventListener('keypress', (event) => {
    event.preventDefault()
    if(event.key === "Enter" ){
        Gerar()
    }
})

btGenerator.addEventListener('click', () => Gerar())
characters.addEventListener("input", () => {
    charactersNumber.innerHTML = parseInt(characters.value)
})

function Gerar(){

    const tamanho = parseInt(characters.value)
    let password = ""
    const checkboxes = [uppercase, lowercase, numbers, special];
    
    if (!checkboxes.some(checkbox => checkbox.checked)) {
        result.innerHTML = "Selecione pelo menos uma opção de caractere.";
        return; 
    }

    for(let index = 0; index < tamanho; index++ ){
        let positionGerador = Math.floor(Math.random() * 4)
        do{
            if(!VerificarCheckbox(positionGerador)){
                positionGerador = Math.floor(Math.random() * 4)
            }
        }while(!VerificarCheckbox(positionGerador))

        let character = Math.floor(Math.random() * gerador[positionGerador].length)
        let selectedCharacter = gerador[positionGerador][character];
        password += selectedCharacter
    }
    result.innerHTML = password
}

function VerificarCheckbox(positionGerador){
    switch(positionGerador){
        case 0:
            if(!uppercase.checked){
                return false
            }
            break
        case 1:
            if(!lowercase.checked){
                return false
            }
            break
        case 2:
            if(!numbers.checked){
                return false
            }
            break
        case 3:
            if(!special.checked){
                return false
            }
            break
    }
    return true
}