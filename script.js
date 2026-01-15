let displayValue = '';
let calculatorDisplayElement = document.querySelector('#display');
let operatorSelected = false;

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
    operator: '',
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

function handleButtonPressEvent(inputValue){
    if(Number.isInteger(inputValue)){
        if(!operatorSelected){
            calculations['firstValue'].push(inputValue);
            console.log(calculations.firstValue);
        } else {
            calculations['secondValue'].push(inputValue);
        }
        
    } else {
        operatorSelected = true;
        switch(inputValue){
            case '+':
                calculations.operator = inputValue;
        }
    }
}

buttonIDArray.forEach((id) => {
    let currentButton = document.querySelector(`#${id}`);
    currentButton.addEventListener("click", () => {
        handleButtonPressEvent(idToValue[currentButton.getAttribute("id")]);

        //Display the value that was just entered
        console.log(`${calculations.firstValue.join('')} ${calculations.operator} ${calculations.secondValue.join('')}`)
        calculatorDisplayElement.textContent = 
        `${calculations.firstValue.join('')} ${calculations.operator} ${calculations.secondValue.join('')}`;
    });
});