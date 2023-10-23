const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_-+=[]{}|;:,.<>?";

//initial initialisation we can apply 
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
//setting strength color to gray

//set pass length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength; //my own setup
    //h.w.
}

//setting strength color
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


//generating random integer
function getRndInt(min, max) {
    let rndNum = Math.floor(((Math.random()) * (max - min)) + min);
    return rndNum;
}

console.log(getRndInt(1, 21));


//functions to get random things for all four checkboxes
//1. generating random number(it will be between 1-9)
function generateRandomNumber() {
    return getRndInt(0, 10);
}

console.log(generateRandomNumber());

//2. generating lowercse using ASCI values
function generateLowerCase() {
    return String.fromCharCode(getRndInt(97, 123));
}

//3. generating uppercase using ASCI values
function generateUpperCase() {
    return String.fromCharCode(getRndInt(65, 91));
}

//4. genearting symbols
function generateSymbol() {
    //let rnNum = Math.floor(Math.random() * symbols.length);
    //or
    let rnNum = getRndInt(0, symbols.length);
    return symbols.charAt(rnNum);

}
console.log(generateSymbol());

