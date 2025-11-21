// Complex number class for handling complex roots
class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    toString() {
        if (Math.abs(this.imag) < 1e-10) {
            return this.real.toFixed(4);
        }

        const realPart = Math.abs(this.real) < 1e-10 ? '' : this.real.toFixed(4);
        const imagPart = Math.abs(this.imag).toFixed(4);

        if (Math.abs(this.real) < 1e-10) {
            return `${imagPart}i`;
        }

        const sign = this.imag >= 0 ? '+' : '-';
        return `${realPart} ${sign} ${imagPart}i`;
    }

    static sqrt(value) {
        if (value >= 0) {
            return new Complex(Math.sqrt(value), 0);
        }
        return new Complex(0, Math.sqrt(-value));
    }
}

// Po-Shen Loh Method Implementation
function solveQuadratic(a, b, c) {
    const steps = [];
    const originalEquation = `${a}x² + ${b}x + ${c} = 0`;

    steps.push({
        text: 'Ecuación original:',
        formula: originalEquation
    });

    // Step 1: Normalize if a ≠ 1
    if (Math.abs(a - 1) > 1e-10) {
        steps.push({
            text: `Como a = ${a} ≠ 1, dividimos toda la ecuación entre ${a}:`,
            formula: `x² + ${(b / a).toFixed(4)}x + ${(c / a).toFixed(4)} = 0`
        });
        b = b / a;
        c = c / a;
        a = 1;
    } else {
        steps.push({
            text: 'Como a = 1, podemos trabajar directamente con la ecuación.',
            formula: `x² + ${b}x + ${c} = 0`
        });
    }

    // Step 2: Calculate the average of roots (-b/2)
    const average = -b / 2;
    steps.push({
        text: 'Según las fórmulas de Vieta, las dos raíces suman -b. Por lo tanto, su promedio es:',
        formula: `Promedio = -b/2 = ${average.toFixed(4)}`
    });

    // Step 3: Express roots as average ± u
    steps.push({
        text: 'Podemos expresar las raíces como:',
        formula: `x₁ = ${average.toFixed(4)} + u  y  x₂ = ${average.toFixed(4)} - u`
    });

    // Step 4: Calculate u using the product constraint
    const bHalf = b / 2;
    const discriminant = (bHalf * bHalf) - c;

    steps.push({
        text: 'Usando la segunda fórmula de Vieta (r₁ × r₂ = c):',
        formula: `(${average.toFixed(4)} + u)(${average.toFixed(4)} - u) = ${c.toFixed(4)}`
    });

    steps.push({
        text: 'Simplificando:',
        formula: `${(bHalf * bHalf).toFixed(4)} - u² = ${c.toFixed(4)}`
    });

    steps.push({
        text: 'Despejando u²:',
        formula: `u² = ${(bHalf * bHalf).toFixed(4)} - ${c.toFixed(4)} = ${discriminant.toFixed(4)}`
    });

    // Step 5: Calculate u and the roots
    let root1, root2;

    if (discriminant >= 0) {
        const u = Math.sqrt(discriminant);
        steps.push({
            text: 'Como u² ≥ 0, tenemos raíces reales:',
            formula: `u = ±${u.toFixed(4)}`
        });

        root1 = new Complex(average + u, 0);
        root2 = new Complex(average - u, 0);

        steps.push({
            text: 'Por lo tanto, las raíces son:',
            formula: `x₁ = ${average.toFixed(4)} + ${u.toFixed(4)} = ${root1.toString()}\nx₂ = ${average.toFixed(4)} - ${u.toFixed(4)} = ${root2.toString()}`
        });
    } else {
        const u = Math.sqrt(-discriminant);
        steps.push({
            text: 'Como u² < 0, tenemos raíces complejas:',
            formula: `u = ±${u.toFixed(4)}i`
        });

        root1 = new Complex(average, u);
        root2 = new Complex(average, -u);

        steps.push({
            text: 'Por lo tanto, las raíces complejas son:',
            formula: `x₁ = ${root1.toString()}\nx₂ = ${root2.toString()}`
        });
    }

    return {
        roots: [root1, root2],
        steps: steps,
        discriminant: discriminant
    };
}

// DOM Elements
const form = document.getElementById('quadratic-form');
const coeffA = document.getElementById('coeff-a');
const coeffB = document.getElementById('coeff-b');
const coeffC = document.getElementById('coeff-c');
const displayA = document.getElementById('display-a');
const displayB = document.getElementById('display-b');
const displayC = document.getElementById('display-c');
const resultsSection = document.getElementById('results-section');
const rootsDisplay = document.getElementById('roots-display');
const stepsDisplay = document.getElementById('steps-display');

// Update equation display when inputs change
function updateEquationDisplay() {
    const a = coeffA.value || 'a';
    const b = coeffB.value || 'b';
    const c = coeffC.value || 'c';

    displayA.textContent = a;
    displayB.textContent = b;
    displayC.textContent = c;
}

coeffA.addEventListener('input', updateEquationDisplay);
coeffB.addEventListener('input', updateEquationDisplay);
coeffC.addEventListener('input', updateEquationDisplay);

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const a = parseFloat(coeffA.value);
    const b = parseFloat(coeffB.value);
    const c = parseFloat(coeffC.value);

    // Validate coefficients
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert('Por favor ingresa valores numéricos válidos');
        return;
    }

    if (Math.abs(a) < 1e-10) {
        alert('El coeficiente "a" no puede ser 0 (no sería una ecuación cuadrática)');
        return;
    }

    // Solve the equation
    const result = solveQuadratic(a, b, c);

    // Display results
    displayRoots(result.roots, result.discriminant);
    displaySteps(result.steps);

    // Show results section with animation
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Display roots
function displayRoots(roots, discriminant) {
    rootsDisplay.innerHTML = '';

    roots.forEach((root, index) => {
        const rootItem = document.createElement('div');
        rootItem.className = 'root-item';
        rootItem.style.animationDelay = `${index * 0.1}s`;

        const label = document.createElement('div');
        label.className = 'root-label';
        label.textContent = `Raíz ${index + 1}:`;

        const value = document.createElement('div');
        value.className = 'root-value';
        value.textContent = `x${index + 1} = ${root.toString()}`;

        rootItem.appendChild(label);
        rootItem.appendChild(value);
        rootsDisplay.appendChild(rootItem);
    });

    // Add type indicator
    const typeIndicator = document.createElement('div');
    typeIndicator.style.cssText = 'margin-top: 1rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 0.75rem; text-align: center; color: var(--text-secondary);';

    if (Math.abs(discriminant) < 1e-10) {
        typeIndicator.innerHTML = '<strong>Raíz doble</strong> (las dos raíces son iguales)';
    } else if (discriminant > 0) {
        typeIndicator.innerHTML = '<strong>Raíces reales distintas</strong>';
    } else {
        typeIndicator.innerHTML = '<strong>Raíces complejas conjugadas</strong>';
    }

    rootsDisplay.appendChild(typeIndicator);
}

// Display step-by-step solution
function displaySteps(steps) {
    stepsDisplay.innerHTML = '';

    steps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';
        stepItem.style.animationDelay = `${index * 0.1}s`;

        const stepNumber = document.createElement('span');
        stepNumber.className = 'step-number';
        stepNumber.textContent = index + 1;

        const stepText = document.createElement('span');
        stepText.className = 'step-text';
        stepText.textContent = step.text;

        stepItem.appendChild(stepNumber);
        stepItem.appendChild(stepText);

        if (step.formula) {
            const formula = document.createElement('div');
            formula.className = 'step-formula';
            formula.textContent = step.formula;
            stepItem.appendChild(formula);
        }

        stepsDisplay.appendChild(stepItem);
    });
}

// Initialize with default values
updateEquationDisplay();
