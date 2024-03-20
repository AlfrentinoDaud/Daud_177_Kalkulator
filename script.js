document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.value');
    const numberButtons = document.querySelectorAll('.num[data-number]');
    const operatorButtons = document.querySelectorAll('.num[data-operator]');
    const clearButton = document.querySelector('.clear');
    const equalButton = document.querySelector('.equal');

    let firstOperand = '';
    let currentOperation = null;
    let shouldResetScreen = false;

    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.textContent));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => setOperation(button.textContent));
    });

    clearButton.addEventListener('click', clear);
    equalButton.addEventListener('click', evaluate);

    function appendNumber(number) {
        if (currentOperation === '=')
            clear();
        if (shouldResetScreen || display.value === '0')
            resetScreen();
        display.value += number;
    }

    function resetScreen() {
        display.value = '';
        shouldResetScreen = false;
    }

    function clear() {
        display.value = '0';
        firstOperand = '';
        currentOperation = null;
    }

    function setOperation(operator) {
        if (currentOperation !== null)
            evaluate();
        firstOperand = display.value;
        currentOperation = operator;
        shouldResetScreen = true;
    }

    function evaluate() {
        if (currentOperation === null || shouldResetScreen)
            return;
        let result = operate(currentOperation, parseFloat(firstOperand), parseFloat(display.value));
        if (result === null || isNaN(result)) {
            display.value = 'Error';
        } else {
            display.value = roundResult(result);
        }
        currentOperation = '=';
    }

    function roundResult(number) {
        return Math.round(number * 100) / 100;
    }

    function operate(operator, a, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0)
                    return null;
                else
                    return a / b;
            default:
                return null;
        }
    }
});
