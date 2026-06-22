const display = document.getElementById('display');
const history = document.getElementById('history');
const themeToggle = document.getElementById('theme-toggle');

function appendValue(val) {
    if (display.value === 'Error') display.value = '';
    display.value += val;
}

function clearAll() {
    display.value = '';
    history.innerText = '';
}

function clearEntry() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        let result = eval(expression);
        
        if (!isFinite(result)) throw new Error();
        
        history.innerText = display.value + ' =';
        display.value = parseFloat(result.toFixed(8));
    } catch {
        display.value = 'Error';
    }
}

function scientific(func) {
    try {
        let val = parseFloat(display.value) || 0;
        let result;
        
        switch(func) {
            case 'sin': result = Math.sin(val * Math.PI / 180); break;
            case 'cos': result = Math.cos(val * Math.PI / 180); break;
            case 'tan': result = Math.tan(val * Math.PI / 180); break;
            case 'log': result = Math.log10(val); break;
            case 'sqrt': result = Math.sqrt(val); break;
            case 'pi': result = Math.PI; break;
            case 'fact': 
                result = 1;
                for(let i = 2; i <= val; i++) result *= i;
                break;
        }
        
        history.innerText = `${func}(${display.value}) =`;
        display.value = parseFloat(result.toFixed(8));
    } catch {
        display.value = 'Error';
    }
}

// Dark mode toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerText = newTheme === 'dark' ? '☀️' : '🌙';
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === 'Enter') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});