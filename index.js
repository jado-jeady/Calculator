function add (a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function power(val, mult) {
	let pow = val;
	for (i = 1; i < mult; i++) {
		pow *= val;
	}
	return pow;
}

function operate(numOne, numTwo, operator) {
    switch (operator) {
        case "+":
            return Math.round(add(numOne, numTwo));
        case "-":
            return Math.round(subtract(numOne, numTwo));
        case "*":
            return Math.round(multiply(numOne, numTwo));
        case "÷":
            return Math.round(divide(numOne, numTwo));
        default:
            return Math.round(power(numOne, numTwo));
    }
}

//Stores variables used for operations.
let newNum = 0;
let oldNum = 0;
let operator = '';

//Stores display components.
const dispLastText = document.querySelector('.display-last');
const dispCurrentText = document.querySelector('.display-current');

//Updates both the lower, and upper display segment.
function update() {
    if (oldNum == 0) {
        dispLastText.textContent = ``;
        dispCurrentText.textContent = `${newNum}`;
    } else {
        dispLastText.textContent = `${oldNum} ${operator}`;
        dispCurrentText.textContent = `${newNum}`;
    }
}

let clear = document.querySelector('.clear');
clear.addEventListener('click', clearDisplay);

//Clears the display
function clearDisplay() {
    newNum = 0;
    oldNum = 0;
    operator = '';
    update();
}

const nums = document.querySelectorAll('.num');
nums.forEach(btn => btn.addEventListener('click', function() { addNum(btn.textContent) }));


function addNum(val) {
    let tempNum;
    if (newNum == 0) {
        tempNum = val;
    } else {
        tempNum = dispCurrentText.textContent + val;
    }
    newNum = parseInt(tempNum);
    update();
}

const operators = document.querySelectorAll('.operator');
operators.forEach(btn => btn.addEventListener('click', function() { useOperator(btn.textContent) }));

function useOperator(op) {
    if (oldNum == 0) {
        oldNum = newNum;
        newNum = 0;
    } else {
        oldNum = operate(oldNum, newNum, operator);
        newNum = 0;
    }
    
    if (op == 'y^') {
        operator = '^';
    } else {
        operator = op;
    }

    update();
}

const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', undo);

function undo() {
    if (dispCurrentText.textContent.length <= 1 && oldNum < 1) {
        clearDisplay();
    } else if (dispCurrentText.textContent.length <= 1) {
        dispCurrentText.textContent = '0';
        newNum = parseInt(dispCurrentText.textContent);
    } else {
        dispCurrentText.textContent = dispCurrentText.textContent.slice(0, -1);
        newNum = parseInt(dispCurrentText.textContent);
        update();
    }
}

const evaluate = document.querySelector('.equals');
evaluate.addEventListener('click', eval);

function eval() {
    if (oldNum != 0) {
        newNum = operate(oldNum, newNum, operator);
        oldNum = 0;
        operator = '';
    }
    update();
}