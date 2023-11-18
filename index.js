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
const modalBox = document.querySelector(".modal");

//initial initialisation we can apply 
let password = "";
let passwordLength = 10;
let checkCount = 1;
uppercaseCheck.checked = true;
handleSlider();
setIndicator("#ccc");


//setting strength color to gray

//set pass length
console.log(allCheckBox[1].checked);
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength; //my own setup textcontent instead of innertext
    //h.w.

    //figure out later
    // inputSlider.addEventListener('input', (e) => {
    //     lengthDisplay.textContent = inputSlider.value;
    // })

    const min = inputSlider.min;
    const max = inputSlider.max;
    //inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";

    //password formula regenerated
    inputSlider.style.backgroundSize = (passwordLength * 100 / max) + "% 100%";
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

//setting color according to password strength
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;


    if (hasUpper && hasLower && hasNum && password.length >= 8) {
        setIndicator("#0f0");
    }
    else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#f7ef02");
    }
    else if (hasLower || hasUpper || hasNum || hasSys) {
        setIndicator("#d10404");
    }
    else {
        setIndicator("#ccc");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add('active');

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

//event listeners

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

//event listener for copy

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked) {
            checkCount++;
        }
    })
    console.log(checkCount);

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange);
})


//shuffling password using fisher yates method
function shufflePassword(array) {
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => str += el);
    return str;
}

//generate btn
const overlay = document.querySelector(".overlay");

function closeModal() {
    modalBox.classList.remove("active");
    overlay.classList.remove("active");
}

function errorModal() {

}
generateBtn.addEventListener('click', () => {
    //none checkboxes selected
    if (checkCount <= 0) {
        password = "";
        passwordDisplay.value = password;
        setIndicator("#ccc");
        console.log("no result");
        modalBox.classList.add("active");
        overlay.classList.add("active");


        // overlay.classList.add("overlayactive");
        //alert("Please select options to include in your password");
        return;
    }
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //getting new pass

    //remove old pass
    password = "";

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }
    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }
    // if (numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }
    // if (symbolsCheck.checked) {
    //     password += generateSymbol();
    // }
    // console.log(password);

    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    //compulsary addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    //remaining addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log(password);
    console.log(password.split(""));

    //shuffling the password
    password = shufflePassword(password.split(""));
    //or
    //password = shufflePassword(Array.from(password));[]

    //show in input
    passwordDisplay.value = password;
    calcStrength();

})




