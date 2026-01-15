let displayValue = '';
let calculatorDisplayElement = document.querySelector('#display');

const idToValue ={
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'plus': '+',
    'minus': '-',
    'multiply': 'x',
    'devide': '/',
    'equal': '=',
    'decimal': '.',
    'clear': 'C',
    'back': 'B'
}

let buttonIDArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 
                     'plus', 'minus', 'multiply', 'devide', 'decimal', 'clear', 'equal', 'back'];

let calculations = {
    firstValue: [],
    secondValue: [],
    operator: '+',
    accumulator: 0,
    add: function() {
        return this.firstValue + this.secondValue;
    },
    subtract: function() {
        return this.firstValue - this.secondValue;
    },
    multiply: function () {
        return this.firstValue * this.secondValue;
    },
    devide: function () {
        return this.firstValue / this.secondValue;
    },
    operation: function () {
        switch(this.operator){
            case '+':
                return calculations.add();
                break;
            case '-':
                return calculations.subtract();
                break;
            case '*':
                return calculations.multiply();
                break;
            case '/':
                return calculations.devide();
                break;
            default:
                console.error("No operation was executed!");
                return;
        }
    }
}

// buttonIDArray.forEach((id, index) => {
//     let currentButton = document.querySelector(`#${id}`);

//     switch(id){
//         case 'zero':
//             currentButton.addEventListener("click", () => {
//                 console.log(`Number passed: ${0}`);
//                 return 0;
//             });
//         case 'one':
//             currentButton.addEventListener("click", () => {
//                 console.log(`Number passed: ${1}`);
//                 return 1;
//             });
//         case 'two':
//             currentButton.addEventListener("click", () => {
//                 console.log(`Number passed: ${2}`);
//                 return 2;
//             });
//         case 'three':
//             currentButton.addEventListener("click", () => {
//                 console.log(`Number passed: ${3}`);
//                 return 3;
//             });
//         case 'four':
//             currentButton.addEventListener("click", () => {
//                 console.log(`Number passed: ${4}`);
//                 return 4;
//             });
//     }
// });

function handleButtonPressEvent(inputValue){
    let operatorSelected = false;

    //Handle if value entered is integer
    if(Number.isInteger(inputValue)){
        calculations['firstValue'].push(inputValue);
        displayValue = calculations.firstValue.join('');
        calculatorDisplayElement.textContent = `${displayValue}`;
    } else {
        switch(inputValue){
            case '+':
                calculations.operator = inputValue;
                console.log(calculations.operator);
        }
    }
}

buttonIDArray.forEach((id) => {
    let currentButton = document.querySelector(`#${id}`);
    currentButton.addEventListener("click", () => {
        let value = handleButtonPressEvent(idToValue[currentButton.getAttribute("id")]);
        //console.log(value);
    });
});















/*******************************************************************/
/*First attempt at dynamically assigning eventlisteners to buttons */
/*******************************************************************/

// let buttonIDArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

// buttonIDArray.forEach((id, index) => {
//     let currentButton = document.querySelector(`#${id}`);
//     currentButton.addEventListener("click", () => {
//         console.log(`Number passed: ${counter}`);
    
//     });
// });