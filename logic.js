const allNumbers = Array.from(document.querySelectorAll('[data-number]'));
const allOperationSigns = Array.from(document.querySelectorAll('[data-ops]'));
const pointForFloat = document.querySelector('[data-float]');
const deletePrevious = document.querySelector('[data-del]');
const clearAllData = document.querySelector('[data-clear]');
const display = document.getElementById('display');

const startData = {
  displayValue: '0',
  firstNum: null,
  operator: null,
  isNext: false
}

function updateScreen() {
  display.value = startData.displayValue
  display.innerHTML = startData.displayValue
}

function addDigit(digit) {
  const { displayValue, isNext } = startData
  if(isNext) {
    startData.displayValue = digit
    startData.isNext = false
  } else {
    startData.displayValue = displayValue !== '0' ? displayValue + digit : digit 
  }
}

function addDecimal(decimalPoint) {
  if (startData.isNext === true) {
  	startData.displayValue = '0.'
    startData.isNext = false
    return
  }

  if (!startData.displayValue.includes(decimalPoint)) {
    startData.displayValue += decimalPoint;
  }
}

function useOperator(opSign) {
  const { displayValue, firstNum, operator } = startData;
  const inputValue = parseFloat(displayValue);
  if (operator && startData.isNext)  {
    startData.operator = opSign
    return;
  }
  if (firstNum === null && !isNaN(inputValue)) {
    startData.firstNum = inputValue;
  } else if (operator) {
    const result = operate(firstNum, inputValue, operator);
    startData.displayValue = `${parseFloat(result.toFixed(9))}`;
    startData.firstNum = result;
  }
  startData.isNext = true;
  startData.operator = opSign;
}

function operate(a,b, op) {
  switch(op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '÷':
      if (b === 0) {
        alert('No way Jose! How do you want to divide something existent by 0?!')
        return a
      } else {
        return a / b
      }
    default:
      b
  }
}

function deleteLast() {
    if (startData.displayValue.length > 1) {
      startData.displayValue = startData.displayValue.slice(0, -1);
    } else {
      startData.displayValue = '0';
    }
}

function allClear() {
  startData.displayValue = '0'
  startData.firstNum = null
  startData.operator = null
  startData.isNext = false
}

function btnClick() {
  allNumbers.forEach(num => {
    num.addEventListener('click', () => {
      addDigit(num.value)
      updateScreen()
    })
  })
  allOperationSigns.forEach(opSign => {
    opSign.addEventListener('click', () => {
      useOperator(opSign.value)
      updateScreen()
    })
  })
  clearAllData.addEventListener('click', () => {
    allClear()
    updateScreen()
  })
  pointForFloat.addEventListener('click', () => {
    addDecimal(pointForFloat.value)
    updateScreen()
  })
  deletePrevious.addEventListener('click', () => {
    deleteLast(deletePrevious.value)
    updateScreen()
  })
}

btnClick()

document.addEventListener('keydown', (ev) => {
  switch(ev.key) {
    case '0':
    case '1':
    case '2': 
    case '3':
    case '4':
    case '5': 
    case '6':
    case '7':
    case '8': 
    case '9':
      addDigit(ev.key)
      updateScreen()
      break
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      useOperator(ev.key)
      updateScreen()
      break
    case 'C':
      clearAllData()
      break
    case '.':
      pointForFloat(ev.key)
      updateScreen()
      break
    case 'Enter':
      ev.preventDefault()
      useOperator('=')
      break
    case 'Backspace':
      deleteLast()
      updateScreen()
      break
  }
})
