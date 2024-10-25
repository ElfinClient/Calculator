const buttons = document.querySelectorAll('.keypad button');
const output = document.querySelector('.number-input');
const errorBox = document.querySelector('#error-box');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.dataset.number) {
            output.value += button.dataset.number;
        } else if (button.dataset.operation) {
            output.value += button.dataset.operation;
        } else if (button.dataset.decimal) {
            if(output.value.includes('.')){
                showError("You can't have two decimals")
            } else {
                output.value += button.dataset.decimal
            }
        } else if (button.dataset.allClear) {
            output.value = '';
        } else if (button.dataset.delete) {
            output.value = output.value.slice(0, -1);
        } else if (button.dataset.submission) {
            try {
                const expression = output.value.replace(/x/gi, '*').replace(/÷/gi, '/');
                output.value = math.evaluate(expression);
            } catch (error) {
                showError("Invalid expression");
            }
        }
    })
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault(); // Prevent any default action (like form submission)
        try {
            const expression = output.value.replace(/x/gi, '*').replace(/÷/gi, '/');
            output.value = math.evaluate(expression);
        } catch (error) {
            showError("Invalid expression");
        }
    } else if (event.key === 'Backspace') {
        output.value = output.value.slice(0, -1);
    } else if (event.key === 'Delete') {
        output.value = '';
    } else if (event.key === '.') {
        if(output.value.includes('.')){
            showError("You can't have two decimals")
        } else {
            output.value += event.key
        }
    }
});

function showError(message) {
    errorBox.innerHTML = message;
    setTimeout(() => {
        errorBox.innerHTML = "";
    }, 2500);
}