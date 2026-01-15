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
    'minus': '−',
    'multiply': '×',
    'devide': '÷',
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
        return Number.parseInt(this.firstValue.join('')) + Number.parseInt(this.secondValue.join(''));
    },
    subtract: function() {
        return Number.parseInt(this.firstValue.join('')) - Number.parseInt(this.secondValue.join(''));
    },
    multiply: function () {
        return Number.parseInt(this.firstValue.join('')) * Number.parseInt(this.secondValue.join(''));
    },
    devide: function () {
        return Number.parseInt(this.firstValue.join('')) / Number.parseInt(this.secondValue.join(''));
    },
    operation: function () {
        switch(this.operator){
            case '+':
                return calculations.add();
                break;
            case '−':
                return calculations.subtract();
                break;
            case '×':
                return calculations.multiply();
                break;
            case '÷':
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
        } else {
            calculations['secondValue'].push(inputValue);
        }
        
    } else {
        operatorSelected = true;
        switch(inputValue){
            case '+':
                calculations.operator = inputValue;
                break;
            case '−':
                calculations.operator = inputValue;
                break;
            case '×':
                calculations.operator = inputValue;
                break;
            case '÷':
                calculations.operator = inputValue;
                break;
            case '=':
                calculations.accumulator = calculations.operation();
                console.log(calculations.accumulator);
                calculations.firstValue = String(calculations.accumulator)
                                          .split('').map(digit => Number.parseInt(digit));
                calculations.secondValue = [];
                break;
            default:
                console.log("Nothing");
        }
    }
}

buttonIDArray.forEach((id) => {
    let currentButton = document.querySelector(`#${id}`);
    currentButton.addEventListener("click", () => {
        handleButtonPressEvent(idToValue[currentButton.getAttribute("id")]);

        //Display the value that was just entered
        calculatorDisplayElement.textContent = 
        `${calculations.firstValue.join('')} ${calculations.operator} ${calculations.secondValue.join('')}`;
    });
});