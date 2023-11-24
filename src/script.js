const generatorForm = document.querySelector("#generatorForm")

const btGenerator = document.querySelector("#btGenerator")
const characters = document.querySelector("#characters")
const charactersNumber = document.querySelector("#charactersNumber")
const result = document.querySelector("#result")
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector('#lowercase')
const numbers = document.querySelector('#numbers')
const special = document.querySelector('#special')

const verificatorForm = document.querySelector("#verificatorForm")
const divVerificator = document.querySelector("#divVerificator")
const inputVerificar = document.querySelector("#inputVerificar")
const fraca = document.querySelector("#verificationBad")
const ok = document.querySelector("#verificationOk")
const good = document.querySelector("#verificationGood")

function Esconder(){
    divVerificator.classList.toggle("hidden")
    generatorForm.classList.toggle("hidden")
}
generatorForm.addEventListener('submit', (event) => { 
    event.preventDefault()
})

generatorForm.addEventListener('keypress', (event) => {
    event.preventDefault()
    if(event.key === "Enter" ){
        Gerar()
    }
})

verificatorForm.addEventListener('submit', (event) => { 
    event.preventDefault()
})


const letrasMaiusculas = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const letrasMinusculas = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const numeros = Array.from({ length: 10 }, (_, i) => String(i));
const caracteresEspeciais = ['!', '@', '#', '$', '%', '&', '*', '/', '.', ';'];
const gerador = [ letrasMaiusculas, letrasMinusculas, numeros, caracteresEspeciais]

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
    setTimeout(() => document.querySelector("#copiar").classList.remove("hidden"), 1000)
    setTimeout(() => document.querySelector("#copiar").classList.add("hidden"), 3000)
    
    result.addEventListener('click', () => {
        if (password) {
            navigator.clipboard.writeText(password)
                .then(() => {
                    setTimeout(() => document.querySelector("#copiado").classList.remove("hidden"), 1000)
                    setTimeout(() => document.querySelector("#copiado").classList.add("hidden"), 3000)
                })
                .catch(err => {
                    
                });
        }
    });
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
function VerificarSenha() {
    let senha = inputVerificar.value
    let cont = 0
    let contUp = 0
    let contLower = 0
    let contNum = 0
    let contS = 0
    let cont8 = 0

    if(senha.length >= 8){
        if(cont8 == 0){
        cont8++
        document.querySelector("#list8").classList.add("text-zinc-600")
        document.querySelector("#list8").classList.add("line-through")
        }
    }else{
        document.querySelector("#list8").classList.remove("text-zinc-600")
        document.querySelector("#list8").classList.remove("line-through")
    }
    for (let i = 0; i < senha.length; i++) {
        if (letrasMaiusculas.includes(senha[i])) {
            if(contUp == 0){
                contUp++
                document.querySelector("#listU").classList.add("text-zinc-600")
                document.querySelector("#listU").classList.add("line-through")
            }
            continue
        }
        if (letrasMinusculas.includes(senha[i])) {
            if(contLower == 0 ){
                contLower++
                document.querySelector("#listL").classList.add("text-zinc-600")
                document.querySelector("#listL").classList.add("line-through")
            }
            continue
        }
        if (caracteresEspeciais.includes(senha[i])) {
            if(contS == 0 ){
                contS++
                document.querySelector("#listS").classList.add("text-zinc-600")
                document.querySelector("#listS").classList.add("line-through")
            }
            
            continue
        }
        if (numeros.includes(senha[i])) {
            if(contNum == 0 ){
                contNum++
                document.querySelector("#listN").classList.add("text-zinc-600")
                document.querySelector("#listN").classList.add("line-through")
            }
            
            continue
        }
    }
    cont += contUp + contS + contLower + contNum + cont8
    
    if(cont <= 2 && cont != 0){
        inputVerificar.classList.add("shadow-[0px_0px_20px_2px_rgba(171,27,27,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(240,149,40,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(46,230,73,0.75);]")

        fraca.classList.remove("hidden")
        ok.classList.add("hidden")
        good.classList.add("hidden")
    }else if(cont <= 4 && cont != 0){
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(171,27,27,0.75);]")
        inputVerificar.classList.add("shadow-[0px_0px_20px_2px_rgba(240,149,40,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(46,230,73,0.75);]")
        ok.classList.remove("hidden")
        fraca.classList.add("hidden")
        good.classList.add("hidden")
    }else if(cont != 0){
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(171,27,27,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(240,149,40,0.75);]")
        inputVerificar.classList.add("shadow-[0px_0px_20px_2px_rgba(46,230,73,0.75);]")
        good.classList.remove("hidden")
        fraca.classList.add("hidden")
        ok.classList.add("hidden")
    }
    
    if(cont == 0){
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(171,27,27,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(240,149,40,0.75);]")
        inputVerificar.classList.remove("shadow-[0px_0px_20px_2px_rgba(46,230,73,0.75);]")
        fraca.classList.add("hidden")
        ok.classList.add("hidden")
        good.classList.add("hidden")
    }

    if(contUp != 1){
        document.querySelector("#listU").classList.remove("text-zinc-600")
        document.querySelector("#listU").classList.remove("line-through")
    }
    if(contNum != 1){
        document.querySelector("#listN").classList.remove("text-zinc-600")
        document.querySelector("#listN").classList.remove("line-through")
    }
    if(contLower != 1){
        document.querySelector("#listL").classList.remove("text-zinc-600")
        document.querySelector("#listL").classList.remove("line-through")
    }
    if(contS != 1){
        document.querySelector("#listS").classList.remove("text-zinc-600")
        document.querySelector("#listS").classList.remove("line-through")
    }
   

}