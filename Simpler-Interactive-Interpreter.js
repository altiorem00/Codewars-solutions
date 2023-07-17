class Interpreter {
  operators = {
    '%': 2,
    '*': 2,
    '/': 2,
    '^': 2,
    '+': 1,
    '-': 1,
  };

  constructor() {
    this.vars = {};
  }

  input(expression) {
    const postfix = this.toPostfix(expression);
    const stack = [];

    for (let i = 0; i < postfix.length; i++) {
      let operator = postfix[i];
      
      if (operator == +operator) {
        stack.push(+operator);
      } else if (operator in this.operators) {
        let operandLeft = this.eval(stack.pop()),
          operandRight = this.eval(stack.pop());
        
        switch (operator) {
          case '+':
            stack.push(operandLeft + operandRight);
            break;
          case '*':
            stack.push(operandLeft * operandRight);
            break;
          case '/':
            stack.push(operandRight / operandLeft);
            break;
          case '-':
            stack.push((operandRight || 0) - operandLeft);
            break;
          case '%':
            stack.push(operandRight % operandLeft);
            break;
        }
      } else if (operator === '=') {
        const value = stack.pop(),
          name = stack.pop();
        
        this.vars[name] = value;
        stack.push(value);
      } else {
        stack.push(operator);
      }
    }
    
    const result = stack.pop();
    
    return result ? this.eval(result) : '';
  }

  eval(value) {
    if (/^[a-z]/i.test(value)) {
      if (!(value in this.vars)) {
        throw new Error(value + ' is not defined');
      }
      return this.vars[value];
    } else return value;
  }

  toPostfix(expression) {
    const stack = [];
    const post = [];

    expression = expression
      .replace(/\s+/g, '')
      .replace(/--/g, '+')
      .replace(/\+-/g, '-')
      .replace(/(\*|\/)-([0-9.]+)/g, '$1(0-$2)')
      .replace(/(\*|\/)-\((.+?)\)/g, '$1(0-($2))')
      .replace(/\(-/g, '(0-');

    for (let i = 0; i < expression.length; i++) {
      let operator = '' + expression[i];
      let operand = null;

      if (operator in this.operators) {
        while (
          stack.length > 0 &&
          this.operators[operator] <=
            this.operators[stack[stack.length - 1]]
        ) {
          post.push(stack.pop());
        }
        stack.push(operator);
      } else if (operator === '(') {
        stack.push(operator);
      } else if (operator === ')') {
        while ((operand = stack.pop()) !== '(') post.push(operand);
      } else if (operator === ' ') {
      } else if (operator === '=') {
        stack.push('=');
      } else if (/[0-9]/.test(operator)) {
        while (
          i < expression.length - 1 &&
          /^[0-9.]$/.test(expression[i + 1])
        ) {
          operator += expression[++i];
        }
        post.push(+operator);
      } else if (/[a-z]/i.test(operator)) {
        while (
          i < expression.length - 1 &&
          /[a-z]/i.test(expression[i + 1])
        ) {
          operator += expression[++i];
        }
        post.push(operator);
      }
    }

    return post.concat(stack.reverse());
  }
}
