let allNumbers = Array.from(document.querySelectorAll('[data-number]'));
let allOperationSigns = Array.from(document.querySelectorAll('[data-ops]'));
let equalSign = document.querySelector('[data-eql]').value;
let pointForFloat = document.querySelector('[data-float]').value;
let deletePrevious = document.querySelector('[data-del]').value;
let clearAll = document.querySelector('[data-clear]').value;
let displayRes = document.getElementById('display').innerText;

function operate(a, b, op) {
  let res;
  switch(op) {
    case '+':
      res = a+b;
      break;
    case '-':
      res = a-b;
      break;
    case '*':
      res = a*b;
      break;
    case '/':
      res = a/b;
      break;
    default:
      break;
  }
  return res.toString();
};
