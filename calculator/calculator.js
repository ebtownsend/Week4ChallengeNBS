const calc = {
    displayVal: '0',
    first: null,
    waiting: false,
    operator: null
};

function inputDigit(digit) {
    const displayVal = calc.displayVal;
    if(calc.waiting == true) {
        calc.displayVal = digit;
        calc.waiting = false;
    } else {
        if (calc.displayVal = displayVal === '0') {
            calc.displayVal = digit;
        } else {
            calc.displayVal = displayVal + digit;
        }
    }
}

function inputDecimal(dec) {
    if(calc.waiting) {
        calc.displayVal = '0.';
        calc.waiting = false;
        return;
    }

    for(let i = calc.displayVal.length - 1; i < calc.displayVal.length; i++) {
        if(!(calc.displayVal[i] == '.')) {
            calc.displayVal += dec;
        }
    }
}

function operatorHandler(next) {
    const first = calc.first;
    const displayVal = calc.displayVal;
    const operator = calc.operator;

    const input = parseFloat(displayVal);

    if(operator && calc.waiting) {
        calc.operator = next;
        return;
    }
    
    if(first == null && !isNaN(input)) {
        calc.first = input;
    } else if (operator) {
        const result = calculate(first, input, operator);
        calc.displayVal = parseFloat(result.toFixed(7));
        calc.first = result;
    }

    calc.waiting = true;
    calc.operator = next;
}

function calculate(first, second, operator) {
    if(operator == '+') {
        return first + second;
    } else if (operator == '-') {
        return first - second;
    } else if(operator == '/') {
        return first / second;
    } else if (operator == '*') {
        return first * second;
    }
    return second;
}

function clear() {
    calc.displayVal = '0';
    calc.first = null;
    calc.waiting = false;
    calc.operator = null;
}

function updateScreen() {
    const screen = document.getElementById("screen");
    screen.value = calc.displayVal;
}

updateScreen();

const keys = document.getElementById("keys");
keys.addEventListener('click', (event) => {
    const target = event.target;

    if(!target.matches('button')){
        return;
    }

    if(target.classList.contains('operator')) {
        operatorHandler(target.value);
        updateScreen();
        return;
    }

    if(target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateScreen();
        return;
    }

    if(target.classList.contains('clear')){
        clear();
        updateScreen();
        return;
    }

    inputDigit(target.value);
    updateScreen();
});