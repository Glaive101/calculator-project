let calculations = {
    firstValue: 0,
    secondValue: 0,
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

function operation(operator, firstValue, secondValue){
    
}