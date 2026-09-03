const display = document.getElementById('display');

// Append string literals (numbers/constants) directly to the layout text stream
function appendNumber(val) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = val === 'Math.PI' ? 'π' : val;
    } else {
        display.value += val === 'Math.PI' ? 'π' : val;
    }
}

// Append operational operators while checking display validation state
function appendOperator(op) {
    if (display.value === 'Error') display.value = '';
    display.value += op;
}

// Clear the full input buffer window instantly
function clearDisplay() {
    display.value = '0';
}

// Drop single end character to correct typographical errors
function backspace() {
    if (display.value === 'Error' || display.value.length <= 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Instantly evaluates active scientific single-operand operations
function calculateSci(func) {
    try {
        let currentVal = display.value;
        
        // Map display constants to absolute JS engine terms before computing
        currentVal = currentVal.replace(/π/g, 'Math.PI');
        let numericValue = eval(currentVal);

        if (isNaN(numericValue)) throw new Error();

        let result;
        switch (func) {
            case 'sin':
                result = Math.sin(numericValue); // Expects values evaluated in radians
                break;
            case 'cos':
                result = Math.cos(numericValue);
                break;
            case 'tan':
                result = Math.tan(numericValue);
                break;
            case 'sqrt':
                if (numericValue < 0) throw new Error();
                result = Math.sqrt(numericValue);
                break;
            case 'log':
                if (numericValue <= 0) throw new Error();
                result = Math.log10(numericValue);
                break;
            case 'ln':
                if (numericValue <= 0) throw new Error();
                result = Math.log(numericValue);
                break;
            default:
                return;
        }
        
        // Prevent extremely long float strings from breaking layout boundaries
        display.value = Number(result.toFixed(8)).toString();
    } catch (err) {
        display.value = 'Error';
    }
}

// Evaluates the full mathematical equation string parsed into the display window
function calculateResult() {
    try {
        let expression = display.value;

        // Substitute raw visible characters for operational evaluation tags
        expression = expression.replace(/&times;/g, '*').replace(/&divide;/g, '/');
        expression = expression.replace(/π/g, 'Math.PI');

        let output = eval(expression);
        
        if (output === undefined || isNaN(output)) {
            display.value = 'Error';
        } else {
            display.value = Number(output.toFixed(8)).toString();
        }
    } catch (err) {
        display.value = 'Error';
    }
}
