class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  size() {
    return this.count;
  }

  push(item) {
    this.items.push(item);
    this.count = this.count + 1;
  }

  pop() {
    if(this.count > 0) {
      this.count = this.count - 1;
    }

    return this.items.pop();
  }

  peek() {
    return this.items.slice(-1)[0];
  }
}

class Queue{
  constructor(){
    //initialize the items in queue
    this._items = []
  }

  enqueue(item){
    //adds to the end of the queue;
    this._items.push(item);
  }

  dequeue(){
    //pull out the first item from the queue
    var returnElement = this._items[0];
    this._items.splice(0,1);
    return returnElement;
  }

  peek(){
    //peek at the first item from the queue
    return this._items[0]
  }

  size(){
    //get the length of queue
    return this._items.length
  }

  isEmpty(){
    //find whether the queue is empty or no
    return this._items.length===0
  }
}

var controlVariable = true;

class simplifier {
  constructor() {
    class solutionSteps {
      constructor() {
        this.steps = [];
        this.i = 0;
      }
      assignQuestion(input){
        this.expression = input;
        this.steps.push(input);
      }
      clearSteps(){
        this.steps = [];
        this.i = 0;
      }
      print(){
        for(var j = 0; j < this.steps.length ; j++){
          console.log(this.steps[j]);
        }
      }
      push(input)
      {
        this.steps[this.i] = input;
        this.i++;
      }
    }
    this.steps = new solutionSteps();
    class processor_class{
      constructor() {
        this.resultArray_power_float = [];
        this.resultArray_power_string = [];
        this.resultArray_coefficient = [];
      }

      clear_ResultArrs(){
        this.resultArray_power_float = [];
        this.resultArray_power_string = [];
        this.resultArray_coefficient = [];
      }

      process(operand1, operand2, operator){
        /*
        */

        if(operand1[1] == "A"){
          operand1 = operand1[0];
          for (var i = 0; i < operand1.length; i++) {
            if(operand1[i][1] == "S"){
              operand1[i+1][0] = this.makeCalculation(operand1[i+1][0], operand1[i][0]+"1", "*");
              operand1.splice(i,1);
            }
          }
        }
        else {
          var temp1 = operand1[0];
          var temp2 = operand1[1];
          operand1 = [];
          operand1[0] = [2];
          operand1[0][0] = temp1;
          operand1[0][1] = temp2;
        }

        if(operand2[1] == "A"){
          operand2 = operand2[0];
          for (var i = 0; i < operand2.length; i++) {
            if(operand2[i][1] == "S"){
              operand2[i+1][0] = this.makeCalculation(operand2[i+1][0], operand2[i][0]+"1", "*");
              operand2.splice(i,1);
            }
          }
        }
        else {
          var temp1 = operand2[0];
          var temp2 = operand2[1];
          operand2 = [];
          operand2[0] = [2];
          operand2[0][0] = temp1;
          operand2[0][1] = temp2;
        }

        var result;
        if(operator == "*"){result = this.multiply(operand1, operand2);}
        else if(operator == "/"){result = this.divide(operand1, operand2);}

        return result;
      }

      directInsert(operand, operator){

        if(operand[1] == "A"){
          operand = operand[0];
          for (var i = 0; i < operand.length; i++) {
            if(operand[i][1] == "S"){
              operand[i+1][0] = this.makeCalculation(operand[i+1][0], operand[i][0]+"1", "*");
              operand.splice(i,1);
            }
          }
        }
        else {
          var temp1 = operand[0];
          var temp2 = operand[1];
          operand = [];
          operand[0] = [2];
          operand[0][0] = temp1;
          operand[0][1] = temp2;
        }

        for (var i = 0; i < operand.length; i++) {
          operand[i][0] = this.makeCalculation(operand[i][0], operator+"1", "*");
        }

        if(operator == "+" || operator == "-"){this.add_subtract(operand);}
      }

      insert(operand, resultArray_coefficient, resultArray_power_float, resultArray_power_string){
        operand = operand.split(",");
        var powerString = operand[1];
        //conditional/ternary operator usage --> var userType = userIsYoungerThan18 ? "Minor" : "Adult";
        // simplifying fraction for powerFloat if it is written in fraction syntax --> ex: 4$3;
        var powerFloat = (powerString.indexOf("$") < 0) ? parseFloat(powerString) : parseFloat(powerString.substring(0,powerString.indexOf("$"))) / parseFloat(powerString.substring(powerString.indexOf("$") + 1,powerString.length));
        //arr.splice(index, 0, item); // inserting into the array
        var index = this.insertAt(powerFloat, resultArray_power_float);

        if(resultArray_power_float[index] == powerFloat){
          // already registered so add the coefficient
          resultArray_coefficient[index] = this.makeCalculation(resultArray_coefficient[index], operand[0], "+");
          if(resultArray_coefficient[index] == "0"){
            resultArray_coefficient.splice(index, 1);
            resultArray_power_string.splice(index, 1);
            resultArray_power_float.splice(index, 1);
          }
        }
        else {
          //register the value to the arrays
          resultArray_power_float.splice(index, 0, powerFloat);
          resultArray_power_string.splice(index, 0, powerString);
          resultArray_coefficient.splice(index, 0, operand[0]);
        }
        return [resultArray_coefficient, resultArray_power_float, resultArray_power_string];
      }

      multiply(operand1, operand2){
        var resultArray_power_float = [];
        var resultArray_power_string = [];
        var resultArray_coefficient = [];
        var resultArray;
        var step = "(";
        for (var i = 0; i < operand1.length; i++) {
          for (var j = 0; j < operand2.length; j++) {
            var temp = this.insert(this.makeCalculation(operand1[i][0],operand2[j][0],"*") + "," + this.makeCalculation(operand1[i][1],operand2[j][1],"+"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power =  this.makeCalculation(operand1[i][1],operand2[j][1],"+");
            var coefficient = this.makeCalculation(operand1[i][0],operand2[j][0],"*");
            if (power == "0") {
              step += coefficient;
            }
            else if (power == "1" || power == "+1") {
              step += coefficient + "x";
            }
            else{
              step += coefficient + "x^[" + power + "]";
            }
            step += " + ";
            resultArray_coefficient = temp[0];
            resultArray_power_float = temp[1];
            resultArray_power_string = temp[2];
          }
        }
        step = step.substring(0, step.length - 3);
        step += ")";
        resultArray = [resultArray_coefficient.length];
        for (var i = 0; i < resultArray_coefficient.length; i++) {
          resultArray[i] = [];
          resultArray[i][0] = resultArray_coefficient[i];
          resultArray[i][1] = resultArray_power_string[i];
        }
        var temp = resultArray;
        resultArray = [2];

        var tempArr = [resultArray_coefficient.length];
        for (var i = 0; i < resultArray_coefficient.length; i++) {
          tempArr[i] = [];
          tempArr[i][0] = resultArray_coefficient[i];
          tempArr[i][1] = resultArray_power_string[i];
        }
        resultArray = [2];
        resultArray[0] = tempArr;
        resultArray[1] = "A";

        return [resultArray,("multiply : " + step)];
      }

      divide(operand1, operand2){
        if(operand2.length > 1){
          controlVariable = false;
        }
        else {
          var resultArray_power_float = [];
          var resultArray_power_string = [];
          var resultArray_coefficient = [];
          var resultArray;
          var step = "(";

          for (var i = 0; i < operand1.length; i++) {
            var temp = this.insert(this.makeCalculation(operand1[i][0],operand2[0][0],"/") + "," + this.makeCalculation(operand1[i][1],operand2[0][1],"-"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power =  this.makeCalculation(operand1[i][1],operand2[0][1],"-");
            var coefficient = this.makeCalculation(operand1[i][0],operand2[0][0],"/");
            if (power == "0") {
              step += coefficient;
            }
            else if (power == "1" || power == "+1") {
              step += coefficient + "x";
            }
            else{
              step += coefficient + "x^[" + power + "]";
            }
            step += " + ";
            resultArray_coefficient = temp[0];
            resultArray_power_float = temp[1];
            resultArray_power_string = temp[2];
          }
          step = step.substring(0, step.length - 3);
          step += ")";
          var tempArr = [resultArray_coefficient.length];
          for (var i = 0; i < resultArray_coefficient.length; i++) {
            tempArr[i] = [];
            tempArr[i][0] = resultArray_coefficient[i];
            tempArr[i][1] = resultArray_power_string[i];
          }
          resultArray = [2];
          resultArray[0] = tempArr;
          resultArray[1] = "A";

          return [resultArray,("divide : " + step)];
        }
      }

      add_subtract(operand){
        for (var i = 0; i < operand.length; i++) {
          var temp = this.insert(operand[i][0] + "," + operand[i][1], this.resultArray_coefficient, this.resultArray_power_float, this.resultArray_power_string);
          this.resultArray_coefficient = temp[0];
          this.resultArray_power_float = temp[1];
          this.resultArray_power_string = temp[2];
        }
      }

      resultString(){
        var resultString = "(";
        if(this.resultArray_coefficient.length == 0){return "(0)";}
        for (var i = 0; i < this.resultArray_coefficient.length; i++) {
          if (this.resultArray_power_float[i] == 0) {
            resultString += this.resultArray_coefficient[i];
          }
          else if (this.resultArray_power_float[i] == 1) {
            resultString += this.resultArray_coefficient[i] + "x";
          }
          else{
            resultString += this.resultArray_coefficient[i] + "x^[" + this.resultArray_power_string[i] + "]";
          }
          resultString += " + ";
        }
        resultString = resultString.substring(0,resultString.length - 3);
        resultString += ")";

        return resultString;
      }

      makeCalculation(operand1, operand2, operator){
          /*
            ex operand = 5$4 ,56,
          */
          var numerator1;
          var numerator2;
          var denominator1;
          var denominator2;

          if (operand1.indexOf("$") == -1) {
            numerator1 = parseInt(operand1);
            denominator1 = 1;
          }
          else {
            numerator1 = parseInt(operand1.substring(0,operand1.indexOf('$')));
            denominator1 = parseInt(operand1.substring(operand1.indexOf('$')+1,operand1.length));
          }

          if (operand2.indexOf("$") == -1) {
            numerator2 = parseInt(operand2);
            denominator2 = 1;
          }
          else {
            numerator2 = parseInt(operand2.substring(0,operand2.indexOf('$')));
            denominator2 = parseInt(operand2.substring(operand2.indexOf('$')+1,operand2.length));
          }
          // -------------------  operations ------------------ //
          var result;

          if(operator == "+"){
            numerator1 = numerator1 * denominator2;
            numerator2 = numerator2 * denominator1;
            numerator1 = numerator1 + numerator2;
            denominator1 = denominator1 * denominator2;
            var d = this.gcd(numerator1,denominator1);
            numerator1 = numerator1 / d;
            denominator1 = denominator1 / d;
          }
          else if(operator == "-"){
            numerator1 = numerator1 * denominator2;
            numerator2 = numerator2 * denominator1;
            numerator1 = numerator1 - numerator2;
            denominator1 = denominator1 * denominator2;
            var d = this.gcd(numerator1,denominator1);
            numerator1 = numerator1 / d;
            denominator1 = denominator1 / d;
          }
          else if(operator == "*"){
            numerator1 = numerator1 * numerator2;
            denominator1 = denominator1 * denominator2;
            var d = this.gcd(numerator1,denominator1);
            numerator1 = numerator1 / d;
            denominator1 = denominator1 / d;
          }
          else if(operator == "/"){
            var temp = numerator2;
            numerator2 = denominator2;
            denominator2= temp;

            numerator1 = numerator1 * numerator2;
            denominator1 = denominator1 * denominator2;
            var d = this.gcd(numerator1,denominator1);
            numerator1 = numerator1 / d;
            denominator1 = denominator1 / d;
          }

          if (denominator1 < 0) {
            denominator1 = -denominator1;
            numerator1 = -numerator1;
          }

          if (denominator1 == 1) {
            result = numerator1.toString();
          }
          else if(denominator1 == 0){
            controlVariable = false;
            result = "0";
          }
          else {
            result = numerator1.toString() + "$" + denominator1.toString();
          }

          return result;
        }

      isNumeric(character){
        if (character.indexOf("$") != -1) {
          var c1 = character.substring(0,character.indexOf("$"));
          var c2 = character.substring(character.indexOf("$")+1,character.length);
          if(!isNaN(parseFloat(c1)) && isFinite(c1) && !isNaN(parseFloat(c2)) && isFinite(c2)){
            return true;
          }
          else {
            return false;
          }
        }
        return !isNaN(parseFloat(character)) && isFinite(character);
      }

      isOperator(character){
        var check = false;
        if(character == '+' || character == '*' ||
           character == '-' || character == '/' ){
          check = true;
        }
        return check;
      }

      gcd(x, y){
        /* finds the greatest common factor of given two integers*/
        if ((typeof x !== 'number') || (typeof y !== 'number'))
          return false;
        x = Math.abs(x);
        y = Math.abs(y);
        while(y){
          var t = y;
          y = x % y;
          x = t;
        }
        return x;
      }

      insertAt(value, array) {
        var low = 0,
        high = array.length;

        while (low < high) {
          var mid = low + high >>> 1;
          if (array[mid] < value) low = mid + 1;
          else high = mid;
        }
        return low;
      }
    }
    this.processor = new processor_class();

  }

  constructArr(arr){
    var resultString = "(";
    for (var i = 0; i < arr.length; i++) {
      if(i%2 == 1 && arr[i][1] != "S"){
        resultString += " + ";
      }
      if(this.processor.isNumeric(arr[i][1]) == true){
        if (arr[i][1] == "0") {
          resultString += arr[i][0];
        }
        else if (arr[i][1] == "1" || arr[i][1] == "+1") {
          resultString += arr[i][0] + "x";
        }
        else{
          resultString += arr[i][0] + "x^[" + arr[i][1] + "]";
        }
      }
      else if (arr[i][1] == "S") {
        resultString += " " + arr[i][0] + " ";
      }
      else if(arr[i][1] == "A"){
        resultString += this.constructArr(arr[i][0]);
      }
    }
    resultString += ")";
    return resultString;
  }

  simplification(expression){
    var index = 0;
    var stack = new Stack();// index of parenthesis holder stack;
    this.steps.push(expression);
    expression = "("+ expression +")";
    while(true){
      if (expression.charAt(index) == "(") {
        stack.push(index);
      }
      else if(expression.charAt(index) == ")") {
        var expression_bit = (expression.substring(stack.pop(),index+1));
        var arr = this.getArr(expression_bit, 1);
        //sending a bit of expression to simplify ex(3 + (2 + 4))
        // before the whole expression is evaluated, 2 + 4 inside the brackets will be evaluated
        if(typeof arr == "undefined"){controlVariable = false;}
        this.steps.push("simplifying = " + this.constructArr(arr));
        var operand_Stack = new Stack();
        var operator_Stack = new Stack();
        var operand2;
        var operand1;
        var operator;
        var tempExpression = this.constructArr(arr);
        for (var i = 0; i < arr.length; i++) {
          if(i%2 == 0){ // even so --> operand
            operand_Stack.push(arr[i]);
            if((operator_Stack.size() != 0) && (operator_Stack.peek() == "*" || operator_Stack.peek() == "/")){
              operand2 = operand_Stack.pop();
              operand1 = operand_Stack.pop();
              operator = operator_Stack.pop();
              var res = this.processor.process(operand1, operand2, operator);
              operand_Stack.push(res[0]);
              this.steps.push("for : " +  this.constructArr([operand1]).substring(1,this.constructArr([operand1]).length-1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length-1));
              this.steps.push(res[1]);
              this.steps.push(this.constructArr([operand1]).substring(1,this.constructArr([operand1]).length-1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length-1) + " = " + this.constructArr([operand_Stack.peek()]).substring(1, this.constructArr([operand_Stack.peek()]).length -1));
              tempExpression = tempExpression.replace(this.constructArr([operand1]).substring(1,this.constructArr([operand1]).length-1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length-1), this.constructArr([operand_Stack.peek()]).substring(1, this.constructArr([operand_Stack.peek()]).length-1));
              this.steps.push("update = " + tempExpression);
            }
          }
          else if(i%2 == 1){ // even so --> operator
            operator_Stack.push(arr[i][0]);
          }
        }

        //--**--
        var tempQueue = new Queue();
        var temp = operator_Stack.size();
        for (var i = 0; i < temp ; i++) {
          tempQueue.enqueue(operator_Stack.pop());
        }
        for (var i = 0; i < temp; i++) {
          operator_Stack.push(tempQueue.dequeue());
        }
        for (var i = 0; i < temp + 1; i++) {
          tempQueue.enqueue(operand_Stack.pop());
        }
        for (var i = 0; i < temp + 1; i++) {
          operand_Stack.push(tempQueue.dequeue());
        }

        for (var i = 0; i < temp + 1; i++) {
          if(i == 0){
            this.processor.directInsert(operand_Stack.pop(), "+");
          }
          else {
            this.processor.directInsert(operand_Stack.pop(), operator_Stack.pop());
          }
        }
        index = index + this.processor.resultString().length - expression_bit.length;
        this.steps.push("= " + (this.processor.resultString().substring(1, this.processor.resultString().length - 1)));
        expression = expression.replace(expression_bit, this.processor.resultString());
        this.steps.push('update expression = ' + expression);
        this.processor.clear_ResultArrs();
      }
      else if (index >= expression.length) {
        expression = expression.substring(1,expression.length-1);
        //this.steps.print();
        //this.steps.clearSteps();
        //expression = expression.replaceAll('$', '/');
        return expression;
      }
      index++;
    }
  }

  simultaneous(a, b, c, d, e, f){
    var checkarr = [a,b,c,d,e,f];
    this.steps.push("Simultaneous Equations : ");
    this.steps.push(a + "x +" + b + "y = " + c);
    this.steps.push(d + "x +" + e + "y = " + f);
    this.steps.push("Ax + By = C");
    this.steps.push("Dx + Ey = F");
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying A:");
    a = this.simplification(a);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying B:");
    b = this.simplification(b);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying C:");
    c = this.simplification(c);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying D:");
    d = this.simplification(d);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying E:");
    e = this.simplification(e);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("-------------------------------------");

    this.steps.push("simplifying F:");
    f = this.simplification(f);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("-------------------------------------");


    // treat the inputs as decimal number which is string.
    // cramer's rule;
    this.steps.push("to find value of x and y:");
    this.steps.push("Ax + By = C \nDx + Ey = F");
    this.steps.push("determinant = (A*E) - (B*D)");
    var determinant = this.simplification("(" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + ")"); //a*d - b*c;
    this.steps.push("determinant = " + determinant);

    this.steps.push("-------------------------------------");

    var x = "";
    var y = "";
    if(determinant != '0'){
       this.steps.push("for x:");
       this.steps.push("x = (e*d - b*f)/determinant");
       x =  this.simplification("((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant); //(e*d - b*f)/determinant;
       this.steps.push("x = " + x);

       this.steps.push("-------------------------------------");

       this.steps.push("for y:");
       this.steps.push("y = (a*f - e*c)/determinant");
       y = this.simplification("((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant);//(a*f - e*c)/determinant;
       this.steps.push("y = " + y);

       if(x == "0" || y == "0" || x.charAt(x.indexOf("/")+1) == '0' || y.charAt(y.indexOf("/")+1) == '0')
       {x = "error";y="error";}
    }
    else{
        x = "error";// making sure that validation will return false so that the function will be called with different imputs.
        y = "error";
        //"Cramer equations system: determinant is zero."
        //"there are either no solutions or many solutions exist."
    }
    //this.steps.print();
    return [x,y,checkarr];
  }

  getArr(expression, i){
  // starts with i = 1;
    var arr = [];
    var arrCount = 0;

    for (; i < expression.length; i++) {
      if (this.processor.isNumeric(expression.charAt(i)) == true) {
        arr[arrCount] = [];
        arr[arrCount][0] = "";
        i--;
        while (true) { // getting the coefficient
          i++;
          if (this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$") {
            arr[arrCount][0] += expression.charAt(i);
          }
          else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
            if(expression.charAt(i+1) == "^" && expression.charAt(i+2) == "["){
             i+=2;
             if(expression.charAt(i+1) == '+' || expression.charAt(i+1) == '-'){
               arr[arrCount][1] = expression.charAt(i + 1);
               i++;
             }
             else {
               arr[arrCount][1] = "+";
             }
             while (true) {
               i++;
               if(this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$"){
                 arr[arrCount][1] += expression.charAt(i);
               }
               else if (expression.charAt(i) == ']') {
                 break;
               }
               else {
                controlVariable = false;
                break;
               }
             }
           }
           else {
             arr[arrCount][1] = "+1";
             break;
           }
          }
          else {
            if (arr[arrCount][1] == null) {
              arr[arrCount][1] = "0";
            }
            i--;
            break;
          }
        }
        arrCount ++;
      }
      else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
        arr[arrCount] = [];
        arr[arrCount][0] = "1";
        if(expression.charAt(i+1) == "^" && expression.charAt(i+2) == "["){
         i+=2;
         if(expression.charAt(i+1) == '+' || expression.charAt(i+1) == '-'){
           arr[arrCount][1] = expression.charAt(i + 1);
           i++;
         }
         else {
           arr[arrCount][1] = "+";
         }
         while (true) {
           i++;
           if(this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$"){
             arr[arrCount][1] += expression.charAt(i);
           }
           else if (expression.charAt(i) == ']') {
             break;
           }
           else {
            controlVariable = false;
            break;
           }
         }
       }
       else {
         arr[arrCount][1] = "+1";
       }
       arrCount ++;
      }
      else if (expression.charAt(i) == '(') {
        arr[arrCount] = [];
        arr[arrCount][1] = "A";// symbolyzing array;
        arr[arrCount][0] = this.getArr(expression, i+1);
        //dont forget to increment i;
        while(expression.charAt(i) != ')'){i++;}
        arrCount ++;
      }
      else if (this.processor.isOperator(expression.charAt(i)) == true) {
        arr[arrCount] = [];
        arr[arrCount][1] = "S";
        arr[arrCount][0] = expression.charAt(i);
        arrCount++;
      }
      else if (expression.charAt(i) == ')') {
        /*
        this part of the program translates array to a workable format
        this might be: 1 - -1 -> 1 + 1 so translates two negative sign to one positive
        at the same time it check if the operators and operands are at the position in the array that they should
        if not, it corrects it,
        if the syntax is wrong or a problem it cant handle, makes sure that program will know that the output
        will be wrong.
        */
        i = 0;
        while (true) {
          if(typeof arr[i] == 'undefined'){
            break;
          }

          if(i%2 == 0 && arr[i][1] == 'S'){
             if(arr[i][0] == "+" || arr[i][0] == "-"){
               if(arr[i+1][0] == "+" || arr[i+1][0] == "-"){
                 if (arr[i+1][0] == arr[i][0]) {
                   arr[i+1][0] = "+";
                   arr.splice(i,1);
                   i--;
                 }
                 else {
                   arr[i+1][0] = "-";
                   arr.splice(i,1);
                   i--;
                 }
               }
               else if (arr[i+1][1] == 'A') {

                 arr[i][0] = arr[i][0] + "1";
                 arr[i][1] = "0";
                 arr.insert(i+1,"");
                 arr[i+1] = [];
                 arr[i+1][0] = "*";
                 arr[i+1][1] = "S";
                 i+=2;
                 //[23,*,A,5]
               }
               else if (this.processor.isNumeric(arr[i+1][0]) == true) {
                 arr[i+1][0] = this.processor.makeCalculation(arr[i+1][0], arr[i][0]+"1", "*");
                 arr.splice(i,1);
                 i--;
               }
               else {
                 controlVariable = false;
               }
            }
            else {
              controlVariable = false;
            }
          }
          i++;
        }

        if(arr[arr.length - 1][1] == "S"){
          controlVariable = false;
        }
        return arr;
      }
    }
  }
}

class questionGenerator {
  constructor() {
    this.parser = new simplifier();
  }

  generateQuestion(level){
    var answer = "";
    var question = "";

    while (true) {
      if (level == 13) {
        var a = this.selectTeplate(13);
        var b = this.selectTeplate(13);
        var c = this.selectTeplate(13);
        var d = this.selectTeplate(13);
        var e = this.selectTeplate(13);
        var f = this.selectTeplate(13);
        var arr = this.parser.simultaneous(a, b, c, d, e, f);

        if (controlVariable == false) {
          controlVariable = true;
        }
        else if(arr[0].length < 7 && arr[1].length < 7 && (arr[0] != 'error' || arr[1] != 'error')){
          question = arr[2][0] + "," + arr[2][1] + "," + arr[2][2] + "," + arr[2][3] + "," + arr[2][4] + "," + arr[2][5];
          answer = arr[0] + "," + arr[1];
          break;
        }
      }
      else {
        question = this.selectTeplate(level);
        answer = this.parser.simplification(question);
        if (controlVariable == false) {
          controlVariable = true;
        }
        else {
          break;
        }
      }
    }
    return [question, answer];
  }

  selectTeplate(level){
    var expression;

    switch (level) {
      case 9:
        var rand = Math.floor(Math.random() * 21);
        switch (rand) {

          case 0:
            expression = "-N - -N";
          break;

          case 1:
            expression = "-N + -N";
          break;

          case 2:
            expression = "-N * N";
          break;

          case 3:
            expression = "N / -N";
          break;

          case 4:
            expression = "N + N / N";
          break;

          case 5:
            expression = "N / N";
          break;

          case 6:
            expression = "Nx^[-1] * Nx^[-2]";
          break;

          case 7:
            expression = "Nx^[-1] / Nx^[-2]";
          break;

          case 8:
            expression = "Nx^[2] / Nx^[-2]";
          break;

          case 9:
            expression = "Nx^[2] * N";
          break;

          case 10:
            expression = "Nx / Nx";
          break;

          case 11:
            expression = "Nx^[P] / Nx^[P]";
          break;

          case 12:
            expression = "N / N / N";
          break;

          case 13:
            expression = "N / N S N / N";
          break;

          case 14:
            expression = "Nx / N S N / N";
          break;

          case 15:
            expression = "Nx / N S N / Nx";
          break;

          case 16:
            expression = "Nx * (Nx S N)";
          break;

          case 17:
            expression = "Nx * (Nx S Nx^[2])";
          break;

          case 18:
            expression = "Nx * (Nx^[2] + Nx - N)";
          break;

          case 19:
            expression = "(Nx^[2] - Nx + N) / N";
          break;

          case 20:
            expression = "(Nx^[2] - Nx - N) / -N";
          break;
        }
      break;

      case 10:
      var rand = Math.floor(Math.random() * 11);
      switch (rand) {

        case 0:
          expression = "Nx S N S Nx S N";
        break;

        case 1:
          expression = "Nx S N S Nx^[2] S N";
        break;

        case 2:
          expression = "(Nx S N) * (Nx - N)";
        break;

        case 3:
          expression = "(Nx S Nx) / (N - N)";
        break;

        case 4:
          expression = "(N S Nx) / (Nx - Nx)";
        break;

        case 5:
          expression = "(N + Nx) * (Nx - N)";
        break;

        case 6:
          expression = "N - (N + Nx) * (Nx - N)";
        break;

        case 7:
          expression = "Nx - (N + Nx) * (Nx - N)";
        break;

        case 8:
          expression = "Nx - (N + Nx) * -(Nx - N)";
        break;

        case 9:
          expression = "Nx + -(N + Nx) * (Nx - N)";
        break;

        case 10:
          expression = "Nx + - (N + Nx) * (Nx - N) / N";
        break;
      }
      break;

      case 11:
      var rand = Math.floor(Math.random() * 11);
        switch (rand) {
          case 0:
            expression = "(Nx S N) * (N S Nx) / (N S N S N)";
          break;

          case 1:
            expression = "(Nx S Nx) S (N S N) S -(N S Nx S N)";
          break;

          case 2:
            expression = "-(Nx S Nx) S (N S N) S -(N S Nx S N)";
          break;

          case 3:
            expression = "Nx + -(Nx S Nx S N) S (Nx^[2] S N) S -(N S Nx S N) - N";
          break;

          case 4:
            expression = "N - -(Nx S Nx S N) S (N S Nx^[2]) S -(N S Nx S N) / Nx";
          break;

          case 5:
            expression = "N / -(Nx S Nx S N) S (N S Nx^[2]) / -(Nx S Nx) * Nx";
          break;

          case 6:
            expression = "((Nx S N) S (N S Nx^[2])) S N";
          break;

          case 7:
            expression = "N S ((Nx S Nx^[2]) S (N S Nx))";
          break;

          case 8:
            expression = "(Nx S N) S ((Nx S Nx^[2]) S (N S Nx))";
          break;

          case 9:
            expression = "(Nx S N) S ((Nx^[2] / Nx) S (N S Nx))";
          break;

          case 10:
            expression = "((Nx^[2] / Nx) S (N S Nx)) S (Nx S N)";
          break;

          default:

        }
      break;

      case 12:
      var rand = Math.floor(Math.random() * 4);
        switch (rand) {

          case 0:
            expression = "(N S (C) S (C)) S ((C) S (C)) S C"
          break;

          case 1:
            expression = "((C) S N S (C)) S C S ((C) S (C))"
          break;

          case 2:
            expression = "C S ((C) S N) S ((C) S (C) S (C))"
          break;

          case 3:
            expression = "C S ((C) S (C)) S ((C) S (C)) S N"
          break;
        }
      break;

      case 13:
      var rand = Math.floor(Math.random() * 7);
        switch (rand) {
          case 0:
            expression = "(N S N S -N)";
          break;

          case 1:
            expression = "((N S N S N) S  (N / P))";
          break;

          case 2:
            expression = "(N S N)";
          break;

          case 3:
            expression = "((N / P) S (N S -N S N))";
          break;

          case 4:
            expression = "((N S N) S -(-N S N))";
          break;

          case 5:
            expression = "((N S N S (N S N)) S (N / P))";
          break;

          case 6:
            expression = "((N S N) S -((N S N) / -P S N)))";
          break;
        }
      break;
    }

    for(var i = 0 ; i < expression.length ; i++){

      if(expression.charAt(i) == 'C'){
        expression = expression.slice(0, i) + this.getCoefficient() + expression.slice(i+1 , expression.length);
      }
      else if(expression.charAt(i) == 'S'){
        expression = expression.slice(0, i) + this.getSign() + expression.slice(i+1 , expression.length);
      }
      else if (expression.charAt(i) == 'P') {
        var r = Math.floor(Math.random() * 1); //0 or 1, 50% chance
        if(r == 0){
          expression = expression.slice(0, i) + (Math.floor(Math.random() * 2) + 2) + expression.slice(i+1 , expression.length);
        }
        else if(r == 1){
          expression = expression.slice(0, i) + (-(Math.floor(Math.random() * 2)) - 2) + expression.slice(i+1 , expression.length);
        }
      }
      else if(expression.charAt(i) == 'N'){
        if(level > 10){
          var isInt = Math.floor(Math.random() * 10);
          if (isInt < 3) //30 percent change of having a numberator and denominator, not being a whole number
          {
            var temp1 = Math.floor(Math.random() * 10)+1;
            var temp2 = Math.floor(Math.random() * 5)+1;
            var ss =  temp1.toString() + '/' + temp2.toString();
          }
          else //70 percent change of being an whole number
          {
            var temp = Math.floor(Math.random() * 20)+1;
            var ss = temp.toString();
          }
          expression = expression.slice(0, i) + ss + expression.slice(i+1, expression.length);
        }
        else {
          expression = expression.slice(0, i) + (Math.floor(Math.random() * 15)+1) + expression.slice(i+1, expression.length);
        }
      }
    }

    return expression;
  }

  getSign(){
    var sign = "";
    var choice = Math.floor(Math.random() * 3); // 0 - 2 inclusive
    switch (choice) {
    case 0:
      sign = "+";
      break;
    case 1:
      sign = "-";
      break;
    case 2:
      sign = "*";
      break;
    }
    return sign;
  }

  getCoefficient(){
    var coefficient = "";
    var choice = Math.floor(Math.random() * 16); // 0 - 15 inclusive

    switch (choice) {
    case 0:
      coefficient = "Nx - Nx";
      break;
    case 1:
      coefficient = "Nx + N";
      break;
    case 2:
      coefficient= "Nx - N";
      break;
    case 3:
      coefficient = "Nx * N";
      break;
    case 4:
      coefficient = "Nx + Nx - N";
      break;
    case 5:
      coefficient = "Nx - -N + Nx";
      break;
    case 6:
      coefficient = "N - -Nx * Nx";
      break;
    case 7:
      coefficient = "Nx + Nx + N";
      break;
    case 8:
      coefficient = "Nx^[P] - Nx";
      break;
    case 9:
      coefficient = "N S Nx / Nx";
      break;
    case 10:
      coefficient = "Nx / N S N";
      break;
    case 11:
      coefficient = "N / N S N S Nx";
      break;
    case 12:
      coefficient = "Nx^[P] S -N S Nx^[P] / -Nx";
      break;
    case 13:
        coefficient = "Nx S Nx^[P] S -N S Nx^[P] / -Nx";
      break;

    case 14:
        coefficient = "Nx^[P] S Nx - -N S Nx / -Nx^[P]";
      break;

    case 15:
        coefficient = "-Nx S -Nx S N S Nx^[P] / -Nx^[P] S N";
      break;
    }

    for(var i = 0 ; i < coefficient.length ; i++){
      if(coefficient.charAt(i) == 'N'){
        var isInt = Math.floor(Math.random() * 10);
        if (isInt < 2) //20 percent change of having a numberator and denominator, not being a whole number
        {
          var temp1 = Math.floor(Math.random() * 10)+1;
          var temp2 = Math.floor(Math.random() * 5)+1;
          var ss =  temp1.toString() + '/' + temp2.toString();
        }
        else //70 percent change of being an whole number
        {
          var temp = Math.floor(Math.random() * 15)+1;
          var ss = temp.toString();
        }
        coefficient = coefficient.slice(0, i) + ss + coefficient.slice(i+1, coefficient.length);
      }
      else if (coefficient.charAt(i) == 'S') {
        coefficient = coefficient.slice(0, i) + this.getSign() + coefficient.slice(i+1 , coefficient.length);
      }
      else if (coefficient.charAt(i) == 'P') {
        var r = Math.floor(Math.random() * 1);//0 or 1, 50% chance
        if(r == 0){
          coefficient = coefficient.slice(0, i) + (Math.floor(Math.random() * 2) + 2) + coefficient.slice(i+1 , coefficient.length);
        }
        else if(r == 1){
          coefficient = coefficient.slice(0, i) + (-(Math.floor(Math.random() * 2)) - 2) + coefficient.slice(i+1 , coefficient.length);
        }
      }
    }

    return coefficient;
  }
}

function send(){

  var level = document.forms["sendtoDB"]["level"].value;
  var amount = document.forms["sendtoDB"]["amount"].value;
  level = parseInt(level);
  amount = parseInt(amount);

  var generator = new questionGenerator();
  for(var i = 0 ; i < amount ; i++){
    var arr = generator.generateQuestion(level);
    var tempLevel = level;
    if (tempLevel == 13) {
      tempLevel--;
    }

    $.ajax({
       type        : "POST", //GET or POST or PUT or DELETE verb
       url         : "send_question/sendQuestion-db.php", // Location of the service
       data        : {"question":arr[0],"answer":arr[1],"level":tempLevel}, //Data sent to server
       success: function(){

       },
    //for multiple data data: { code: code, userid: userid }
    });
  }
  alert("Success");
}

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

Array.prototype.insert = function (index, item) {
    this.splice( index, 0, item );
};
