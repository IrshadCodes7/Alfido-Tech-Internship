// ============================================
// CALCULATOR OPERATIONS
// ============================================

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Error";
    }
    return num1 / num2;
}

function operate(num1, num2, operator) {
    let result;
    switch (operator) {
        case "plus":
            result = add(num1, num2);
            break;
        case "minus":
            result = subtract(num1, num2);
            break;
        case "mul":
            result = multiply(num1, num2);
            break;
        case "div":
            result = divide(num1, num2);
            break;
        default:
            result = num1;
    }
    return result;
}

// ============================================
// DISPLAY MAPPING & SYMBOLS
// ============================================

const wordMap = {
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    plus: "+",
    minus: "−",
    mul: "×",
    div: "÷",
    decimal: "."
};

const operatorSymbols = {
    plus: "+",
    minus: "−",
    mul: "×",
    div: "÷"
};

// ============================================
// DOM ELEMENTS
// ============================================

const majorDisp = document.querySelector(".currInput");
const minorDisp = document.querySelector(".fullInput");

function majorDisplay(content) {
    majorDisp.textContent = content;
    // Add animation class
    majorDisp.style.animation = 'none';
    setTimeout(() => {
        majorDisp.style.animation = 'fadeIn 0.3s ease';
    }, 10);
}

function minorDisplay(content) {
    minorDisp.textContent = content;
}

// ============================================
// CALCULATOR STATE
// ============================================

let currentValue = "";
let previousValue = "";
let operator = "";
let shouldResetDisplay = false;

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatNumber(num) {
    if (num === "Error") return num;

    // Handle very large or very small numbers
    const numValue = parseFloat(num);
    if (Math.abs(numValue) > 999999999 || (Math.abs(numValue) < 0.000001 && numValue !== 0)) {
        return numValue.toExponential(6);
    }

    // Round to avoid floating point errors
    const rounded = Math.round(numValue * 100000000) / 100000000;
    return rounded.toString();
}

function updateDisplay() {
    const displayValue = currentValue || "0";
    majorDisplay(displayValue);

    // Build expression for minor display
    let expression = "";
    if (previousValue) {
        expression = previousValue;
        if (operator) {
            expression += " " + operatorSymbols[operator];
            if (currentValue && !shouldResetDisplay) {
                expression += " " + currentValue;
            }
        }
    }
    minorDisplay(expression);
}

function clearCalculator() {
    currentValue = "";
    previousValue = "";
    operator = "";
    shouldResetDisplay = false;
    updateDisplay();
}

function handleNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple leading zeros
        if (currentValue === "0" && num === "0") return;
        if (currentValue === "0" && num !== ".") {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function handleDecimal() {
    if (shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
    } else if (!currentValue.includes(".")) {
        currentValue = currentValue || "0";
        currentValue += ".";
    }
    updateDisplay();
}

function handleOperator(op) {
    if (currentValue === "" && previousValue === "") return;

    if (previousValue !== "" && currentValue !== "" && operator !== "") {
        // Chain operations
        const result = operate(parseFloat(previousValue), parseFloat(currentValue), operator);
        if (result === "Error") {
            majorDisplay("Divide by 0");
            setTimeout(clearCalculator, 1500);
            return;
        }
        previousValue = formatNumber(result);
        currentValue = "";
    } else if (currentValue !== "") {
        previousValue = currentValue;
        currentValue = "";
    }

    operator = op;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleEquals() {
    if (previousValue === "" || currentValue === "" || operator === "") return;

    const result = operate(parseFloat(previousValue), parseFloat(currentValue), operator);

    if (result === "Error") {
        majorDisplay("Divide by 0");
        setTimeout(clearCalculator, 1500);
        return;
    }

    const formattedResult = formatNumber(result);

    // Show the complete equation in minor display
    minorDisplay(`${previousValue} ${operatorSymbols[operator]} ${currentValue} =`);

    currentValue = formattedResult;
    previousValue = "";
    operator = "";
    shouldResetDisplay = true;

    majorDisplay(formattedResult);
}

// ============================================
// EVENT HANDLING
// ============================================

function addButtonAnimation(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 200);
}

function eventHandler(event) {
    const target = event.target;

    // Check if clicked element is a button
    if (!target.classList.contains('num') && !target.classList.contains('oprator')) {
        return;
    }

    // Add visual feedback
    addButtonAnimation(target);

    const classes = target.classList;
    const key = classes[0];
    const keyType = classes[1];

    console.log(`Button pressed: ${key} (${keyType})`);

    if (keyType === "num") {
        if (key === "decimal") {
            handleDecimal();
        } else {
            const num = wordMap[key];
            handleNumber(num);
        }
    } else if (keyType === "oprator") {
        if (key === "clear") {
            clearCalculator();
        } else if (key === "equal") {
            handleEquals();
        } else {
            handleOperator(key);
        }
    }
}

// ============================================
// KEYBOARD SUPPORT
// ============================================

function handleKeyboard(event) {
    const key = event.key;

    // Prevent default for calculator keys
    if (/[0-9+\-*/=.]|Enter|Escape|Backspace/.test(key)) {
        event.preventDefault();
    }

    // Number keys
    if (/[0-9]/.test(key)) {
        const numMap = {
            '0': 'zero', '1': 'one', '2': 'two', '3': 'three', '4': 'four',
            '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine'
        };
        const button = document.querySelector(`.${numMap[key]}`);
        if (button) addButtonAnimation(button);
        handleNumber(key);
    }

    // Decimal point
    if (key === ".") {
        const button = document.querySelector('.decimal');
        if (button) addButtonAnimation(button);
        handleDecimal();
    }

    // Operators
    if (key === "+") {
        const button = document.querySelector('.plus');
        if (button) addButtonAnimation(button);
        handleOperator("plus");
    }
    if (key === "-") {
        const button = document.querySelector('.minus');
        if (button) addButtonAnimation(button);
        handleOperator("minus");
    }
    if (key === "*") {
        const button = document.querySelector('.mul');
        if (button) addButtonAnimation(button);
        handleOperator("mul");
    }
    if (key === "/") {
        const button = document.querySelector('.div');
        if (button) addButtonAnimation(button);
        handleOperator("div");
    }

    // Equals
    if (key === "=" || key === "Enter") {
        const button = document.querySelector('.equal');
        if (button) addButtonAnimation(button);
        handleEquals();
    }

    // Clear
    if (key === "Escape" || key === "c" || key === "C") {
        const button = document.querySelector('.clear');
        if (button) addButtonAnimation(button);
        clearCalculator();
    }

    // Backspace
    if (key === "Backspace") {
        if (currentValue.length > 0) {
            currentValue = currentValue.slice(0, -1);
            updateDisplay();
        }
    }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener("click", eventHandler);
document.addEventListener("keydown", handleKeyboard);

// Initialize display
updateDisplay();

