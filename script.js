let calculator = new Calculator();

function Calculator() {
  // Math operands
  this.firstNumber;
  this.secondNumber;
  this.operator;

  // Display
  this.display = '0';

  // Operator Function
  this.setOperator = function(newOperator) {
    if (this.operator === '=') {
      this.firstNumber = parseFloat(this.display);
      this.operator = newOperator;
      this.display = '';
    } else {
      this.firstNumber = parseFloat(this.display);
      this.operator = newOperator;
      this.updateDisplay();
      this.display = '';
    }
  };

  // Perform the operation
  this.operate = function() {
    switch (this.operator) {
      case '+':
        return this.firstNumber + this.secondNumber;
      case '-':
        return this.firstNumber - this.secondNumber;
      case '*':
        return this.firstNumber * this.secondNumber;
      case '/':
        return this.secondNumber !== 0 ? this.firstNumber / this.secondNumber : undefined;
      default:
        return undefined;
    }
  };

  // Calculate function
  this.calculateResult = function() {
    if (this.operator && this.firstNumber !== undefined && this.display !== '') {
      this.secondNumber = parseFloat(this.display);
      const result = this.operate(); // Calling the renamed function
      this.display = result.toString();
      this.firstNumber = result;
      this.secondNumber = undefined;
      this.operator = '=';
      this.updateDisplay();
    }
  };

  // Clear function
  this.clear = function() {
    this.firstNumber = undefined;
    this.secondNumber = undefined;
    this.operator = undefined;
    this.display = '0';
    this.updateDisplay();
  };


  // Delete function
  this.delete = function() {
    this.display = this.display.slice(0, -1);
    if (this.display === '') {
      this.display = '0';
    }
    this.updateDisplay();
  };


  // Update Display function
  this.updateDisplay = function() {
    document.getElementById('screen').textContent = this.display;
  };  
}

document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    let number = button.getAttribute('data-number');

    if (calculator.display === '0' || calculator.operator === '=') {
      calculator.display = number;
    } else {
      calculator.display += number;
    }
    calculator.updateDisplay();
  });
});

document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    let operator = button.getAttribute('data-operator');
    calculator.setOperator(operator);
  });
});

document.getElementById('equalsBtn').addEventListener('click', () => {
  calculator.calculateResult();
});


document.getElementById('resetBtn').addEventListener('click', () => {
  calculator.clear();
});

document.getElementById('deleteBtn').addEventListener('click', () => {
  calculator.delete();
});

document.getElementById('pointBtn').addEventListener('click', () => {
  if (!calculator.display.includes('.')) {
    calculator.display += '.';
    calculator.updateDisplay();
  }
});