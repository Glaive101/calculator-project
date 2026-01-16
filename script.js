let displayValue = '';
const calculatorDisplayElement = document.querySelector('#display');
let operatorSelected = false;

const inputOperator = ['+', '−', '×', '÷'];

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
    firstValue: '',
    secondValue: '',
    operator: '',
    accumulator: 0,
    add: function() {
        return Number.parseFloat(this.firstValue) + Number.parseFloat(this.secondValue);
    },
    subtract: function() {
        return Number.parseFloat(this.firstValue) - Number.parseFloat(this.secondValue);
    },
    multiply: function () {
        return Number.parseFloat(this.firstValue) * Number.parseFloat(this.secondValue);
    },
    devide: function () {
        return Number.parseFloat(this.firstValue) / Number.parseFloat(this.secondValue);
    },
    calculation: {
        '+': () => calculations.add(),
        '−': () => calculations.subtract(),
        '×': () => calculations.multiply(),
        '÷': () => calculations.devide()
    },
    operation: function () {
        this.accumulator = calculations.calculation[this.operator]();

        if(this.accumulator%1 !== 0){
            this.firstValue = String(this.accumulator.toFixed(2));
        } else {
            this.firstValue = String(this.accumulator.toFixed(0));
        }
        this.operator = '';
        this.secondValue = '';
    },
    clearAll: function () {
        calculations.firstValue = '';
        calculations.secondValue = '';
        calculations.operator = '';
        calculations.accumulator = 0;  
        operatorSelected = false; 
    }
}

function handleDelete() {
    if(!operatorSelected){
        calculations.firstValue = calculations.firstValue.slice(0, -1);
    } else {
        calculations.secondValue = calculations.secondValue.slice(0, -1);
    }
}

function handleDecimal() {
    if(!operatorSelected){
        if(calculations.firstValue.includes(".")) return;
        calculations.firstValue += '.';
    } else {
        if(calculations.secondValue.includes(".")) return;
        calculations.secondValue += '.';
    }
}

function handleInteger(value) {
    if(!operatorSelected){
        calculations.firstValue += value;
        return;
    } else {
        calculations.secondValue += value;
        return;
    }
}

function handleOperator(value) {
    if (operatorSelected === true){
        calculations.operation();
    } 
    operatorSelected = true;            
    calculations.operator = value;
}

function handleEqual(){
    if(calculations.secondValue === '0' && calculations.operator === "÷"){
        console.log("We got here!");
        displayValue = 'Hmmmm';
        return;
    }
    calculations.operation();
}

function handleButtonPressEvent(inputValue){
    if(inputValue === 'B') return handleDelete();
    if(inputValue === '.') return handleDecimal();
    if(Number.isInteger(inputValue)) return handleInteger(inputValue);
    if (inputOperator.includes(inputValue)) return handleOperator(inputValue);

    switch(inputValue){
        case '=':
            handleEqual();
            break;
        case 'C':
            calculations.clearAll();
            break;
        default:
            console.log("Nothing");
    }
}

buttonIDArray.forEach((id) => {
    let currentButton = document.querySelector(`#${id}`);
    currentButton.addEventListener("click", () => {
        handleButtonPressEvent(idToValue[currentButton.getAttribute("id")]);

        //Display the value that was just entered
        if(calculations.secondValue === '0' && calculations.operator === "÷"){
            calculatorDisplayElement.textContent = displayValue;
        } else {
            calculatorDisplayElement.textContent = 
        `${calculations.firstValue} ${calculations.operator} ${calculations.secondValue}`;
        }
    });
});