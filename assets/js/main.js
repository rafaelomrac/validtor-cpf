function CPFvalidator (cpf) {
    Object.defineProperty(this, "cpfString",{

        enumerable: true,

        get: function(){
            return cpf.replace(/\D+/g, "");
        },
    });
}

CPFvalidator.prototype.valid = function(){

    const lengthCPF = 11;

    if(typeof this.cpfString === "undefined") return false;

    if(this.cpfString.length !== lengthCPF) return false;

    if(this.IsSequence()) return false;

    const parcialCPF = this.cpfString.slice(0, -2);
    const digitOne = this.calculateDigits(parcialCPF);
    const digitTwo = this.calculateDigits(parcialCPF + digitOne);

    const newCPF = parcialCPF + digitOne + digitTwo;


    return newCPF === this.cpfString;
}

CPFvalidator.prototype.calculateDigits = function(cpfDigits){
    const lengthCPF = 11;

    const cpf = Array.from(cpfDigits);

    let regressiveCounter = cpf.length + 1;

    let partialCPF = cpf.reduce((ac, value) => {
        regressiveCounter * value;

        ac += (regressiveCounter * Number(value));
        regressiveCounter --;

        return ac;

    }, 0);

    const digit = lengthCPF - (partialCPF % lengthCPF);

    return digit > 9 ? "0" : String(digit);

}

CPFvalidator.prototype.IsSequence = function(){
    const sequnce = this.cpfString[0].repeat(this.cpfString.length);

    return sequnce === this.cpfString;
}

const IsValidFiels = () => document.querySelector("#cpf-input").reportValidity();

const verify = event => {
    const value = document.querySelector("#cpf-input").value;
    const cpf = new CPFvalidator(value.toString());

    event.preventDefault();

    if(cpf.valid() && IsValidFiels()){
        
        responseValid();   

    }

    if(!cpf.valid() && IsValidFiels()){
        
        responseInvalid();   

    }

    clearField();
}

const responseValid = () => {

    const responseHTML = document.querySelector(".response");
    const li = document.createElement("li");

    li.innerHTML = `<span>cpf válido</span>`;
    responseHTML.appendChild(li);

    setTimeout(() => {
        responseHTML.removeChild(li);
    }, 5000);


}

const responseInvalid = () => {

    const responseHTML = document.querySelector(".response");
    const li = document.createElement("li");

    li.innerHTML = `<span>cpf inválido</span>`;
    responseHTML.appendChild(li);

    setTimeout(() => {
        responseHTML.removeChild(li);
    }, 5000);


}

const clearField = () => {
   document.querySelector("#cpf-input").value = "";
   
}

document.getElementById("button").addEventListener("click", verify);