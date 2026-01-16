const calculatorDisplayElement = document.querySelector('#display');

const inputOperator = ['+', '−', '×', '÷'];

const idToValue = {
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

let calculations = {

    firstValue:  '',
    secondValue: '',
    operator:    '',
    accumulator:  0,
    accumulatorPrintStorage: 0,

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
        if(this.secondValue === '0' && this.operator === "÷"){
            return;
        }

        this.accumulator = calculations.calculation[this.operator]();
        this.accumulatorPrintStorage = this.accumulator; 

        if(this.accumulator%1 !== 0){
            this.firstValue = String(this.accumulator.toFixed(2));
        } else {
            this.firstValue = String(this.accumulator.toFixed(0));
        }
        this.operator = '';
        this.secondValue = '';
    },
    clearAll: function () {
        this.firstValue = '';
        this.secondValue = '';
        this.operator = '';
        calculations.accumulator = 0;  
        operatorSelected = false;
    }
}

let mathDisplay = {
    first: `${calculations.firstValue}`,
    firstOperator: `${calculations.firstValue} ${calculations.operator}`,
    firstOperatorSecond: `${calculations.firstValue} ${calculations.operator} ${calculations.secondValue}`,
    equal: `${calculations.accumulator}`,
    clear: ''
}

function handleDelete() {
    if(calculations.operator !== '' && calculations.secondValue === ''){
        calculations.operator = '';
        return;
    }

    if(calculations.firstValue !== '' && calculations.secondValue === '' && calculations.operator === ''){
        calculations.firstValue = calculations.firstValue.slice(0, -1);
    } else {
        calculations.secondValue = calculations.secondValue.slice(0, -1);
    }
}

function handleDecimal() {
    if(calculations.operator === '' && calculations.secondValue === ''){
        if(calculations.firstValue.includes(".")) return;
        calculations.firstValue += '.';
    } else {
        if(calculations.secondValue.includes(".")) return;
        calculations.secondValue += '.';
    }
}

function handleInteger(value) {
    if(calculations.operator === '' && calculations.secondValue === ''){
        calculations.firstValue += value;
    } else if(calculations.operator === '') {
        return;
    } else {
        calculations.secondValue += value;
    }
}

function handleOperator(value) {
    if(calculations.firstValue !== '' 
        && calculations.secondValue !== '' 
        && calculations.operator !== '')
            calculations.operation();

    if(calculations.firstValue !== ''){
        calculations.operator = value;
    }
}

function handleEqual(){
    if(calculations.operator !== '' 
        || calculations.firstValue !== '' 
        || calculations.secondValue !== '') 
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
            calculations.clearAll();
            break;
        case 'C':
            calculations.clearAll();
            break;
        default:
            console.log("Nothing");
    }
}

function whatToDisplay(buttonID) {
    if(buttonID === 'C')
        return '';
    if(calculations.secondValue === '0' && calculations.operator === '÷'){
        calculations.clearAll();
        return 'Hmmm';
    }
    if(calculations.firstValue !== '' && calculations.secondValue === '' && calculations.operator === '')
        return `${calculations.firstValue}`;
    if(calculations.firstValue !== '' && calculations.secondValue === '' && calculations.operator !== '')
        return `${calculations.firstValue} ${calculations.operator}`;
    if(calculations.firstValue !== '' && calculations.secondValue !== '' && calculations.operator !== '')
        return `${calculations.firstValue} ${calculations.operator} ${calculations.secondValue}`;
    if(calculations.firstValue === '' && calculations.secondValue === '' 
        && calculations.operator === '' && buttonID === '=')
            return `${calculations.accumulatorPrintStorage}`;
}

Object.keys(idToValue).forEach((id) => {
    let currentButton = document.querySelector(`#${id}`);
    currentButton.addEventListener("click", () => {
        handleButtonPressEvent(idToValue[currentButton.getAttribute("id")]);
        calculatorDisplayElement.textContent = whatToDisplay(idToValue[currentButton.getAttribute("id")]);
    });
});