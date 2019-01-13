var game;
var dailyQuestions;

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
    if (this.count > 0) {
      this.count = this.count - 1;
    }

    return this.items.pop();
  }

  peek() {
    return this.items.slice(-1)[0];
  }
}

class Queue {
  constructor() {
    //initialize the items in queue
    this._items = []
  }

  enqueue(item) {
    //adds to the end of the queue;
    this._items.push(item);
  }

  dequeue() {
    //pull out the first item from the queue
    var returnElement = this._items[0];
    this._items.splice(0, 1);
    return returnElement;
  }

  peek() {
    //peek at the first item from the queue
    return this._items[0]
  }

  size() {
    //get the length of queue
    return this._items.length
  }

  isEmpty() {
    //find whether the queue is empty or no
    return this._items.length === 0
  }
}

class dailyQuestions_class {
  constructor() {
    this.parser = new simplifier();
  }

  dailyQuestions(year9, year10, year11, year12) {
    currentSlide(1);
    year9 = $.trim(year9);
    year10 = $.trim(year10);
    year11 = $.trim(year11);
    year12 = $.trim(year12);
    year9 = year9.split(",");
    year10 = year10.split(",");
    year11 = year11.split(",");
    year12 = year12.split(",");

    year9 = parseInt(year9[0]) * 100 / (parseInt(year9[0]) + parseInt(year9[1]));
    year10 = parseInt(year10[0]) * 100 / (parseInt(year10[0]) + parseInt(year10[1]));
    year11 = parseInt(year11[0]) * 100 / (parseInt(year11[0]) + parseInt(year11[1]));
    year12 = parseInt(year12[0]) * 100 / (parseInt(year12[0]) + parseInt(year12[1]));

    var choice;
    var generator = new questionGenerator();
    if (year9 < 70 || isNaN(year9)) {
      choice = 9;
    } else if (year10 < 70 || isNaN(year10)) {
      choice = 10;
    } else if (year11 < 70 || isNaN(year11)) {
      choice = 11;
    } else if (year12 < 70 || isNaN(year12)) {
      choice = 12;
    }

    var questions = "";

    for (var i = 0; i < 10; i++) {
      var tempChoice = choice;
      if(tempChoice == 12){ // 50% change of picking simultaneous equations over algebraic expression
        var rand = Math.floor((Math.random() * 2));
        if (rand == 1) {
          tempChoice =13;
        }
      }
      var temp = generator.generateQuestion(tempChoice)[0];
      if(temp.indexOf(',') != -1){
        temp = temp.replaceAll(',', '?');
      }
      if(generator.parser.controlVariable == false){
        i--;
      }else{
        questions += (temp);
        questions += ",";
      }
    }
    questions = questions.substring(0, questions.length - 1);
    localStorage.setItem('dailyQuestions', questions);
    localStorage.setItem('dailyQuestions_successFail', "0,0,0,0,0,0,0,0,0,0");

    this.printDailyQuestions();
  }

  printDailyQuestions(){
    this.updateStats();
    this.parser = new simplifier();
    var questions = localStorage.getItem('dailyQuestions');
    var successFail = localStorage.getItem('dailyQuestions_successFail');

    questions = questions.split(',');
    successFail = successFail.split(',');

    for (var i = 0; i < questions.length; i++) {
      $(document).ready(function() {

        if (questions[i].indexOf('?') != -1) {
          var question = questions[i].split('?');
          var divName = "dailyQuestion" + i;

          var arr1 = dailyQuestions.parser.getArr('(' + question[0] + ')', 1);
          var arr2 = dailyQuestions.parser.getArr('(' + question[1] + ')', 1);
          var arr3 = dailyQuestions.parser.getArr('(' + question[2] + ')', 1);
          var questionMathml1 = dailyQuestions.parser.MathML_translator(arr1);
          var questionMathml2 = dailyQuestions.parser.MathML_translator(arr2);
          var questionMathml3 = dailyQuestions.parser.MathML_translator(arr3);

          var question_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML1, divName);

          arr1 = dailyQuestions.parser.getArr('(' + question[3] + ')', 1);
          arr2 = dailyQuestions.parser.getArr('(' + question[4] + ')', 1);
          arr3 = dailyQuestions.parser.getArr('(' + question[5] + ')', 1);
          questionMathml1 = dailyQuestions.parser.MathML_translator(arr1);
          questionMathml2 = dailyQuestions.parser.MathML_translator(arr2);
          questionMathml3 = dailyQuestions.parser.MathML_translator(arr3);

          var question_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML2, divName + "0");

        }else{
          var arr = questions[i];
          arr = '(' + questions[i] + ')';
          arr = dailyQuestions.parser.getArr(arr, 1);
          arr = dailyQuestions.parser.MathML_translator(arr);
          arr = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + arr + '</math>';
          var divName = "dailyQuestion" + i;
          MathML_Render(arr, divName);
        }

        if(successFail[i] == "0"){
          var formName = "form_" + i;
          if (questions[i].indexOf('?') != -1) {
            var question = questions[i].split('?');
            var ans = dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
            $('<input/>').attr({ type: 'text',class:formName, name: "x", placeholder:"x", style:'width:400px;' }).appendTo('#' + formName);
            $('<input/>').attr({ type: 'text',class:formName, name: "y", placeholder:"y", style:'width:400px;' }).appendTo('#' + formName);
            $('<input/>').attr({ type: 'button', value: 'Submit', style:'width: 90px; float:right;', onclick: 'dailyQuestions.validateAnswer('+ i +')'}).appendTo('#' + formName);

          }else {
            var ans = dailyQuestions.parser.simplification("(" + questions[i] + ")");
            ans = dailyQuestions.parser.getArr("(" + ans + ")", 1);
            var widthProportion = (1200) - 10 + (10 * ans.length); // space available
            widthProportion = widthProportion / ans.length;
            widthProportion = widthProportion.toString();

            for (var j = 0; j < ans.length; j+= 2) {
              var power = ans[j][1];
              if (power == 0) {
                var symbol = 'constant';
              } else if (power == 1) {
                var symbol = 'x'
              } else {
                var symbol = 'x^[' + power + ']';
              }
              $('<input/>').attr({ type: 'text',class:formName, name: symbol, placeholder:symbol, style:'width:'+ widthProportion +'px;' }).appendTo('#' + formName);
            }
            $('<input/>').attr({ type: 'button', value: 'Submit', style:'width: 90px; float:right;', onclick: 'dailyQuestions.validateAnswer('+ i +')'}).appendTo('#' + formName);
          }
        }
        else if (successFail[i] == "-1") {
          document.getElementById("QuestionStatus_" + i).innerHTML = "Wrong";
          document.getElementById("QuestionStatus_" + i).style.color = "red";
          $("#form_"+i).remove();

          if (questions[i].indexOf('?') != -1) {
            var question = questions[i].split('?');
            dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
          }else{
            dailyQuestions.parser.simplification(questions[i]);
          }
          dailyQuestions.parser.steps.print("answerTable" + i);
        }
        else if (successFail[i] == "1") {
          document.getElementById("QuestionStatus_" + i).innerHTML = "Correct";
          document.getElementById("QuestionStatus_" + i).style.color = "green";
          $("#form_"+i).remove();
          if (questions[i].indexOf('?') != -1) {
            var question = questions[i].split('?');
            dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
          }else{
            dailyQuestions.parser.simplification(questions[i]);
          }
          dailyQuestions.parser.steps.print("answerTable" + i);
        }

        dailyQuestions.parser.steps.clearSteps();
        i++;
      });
    }
    i = 0;

  }

  updateStats(){
    var successFail = localStorage.getItem('dailyQuestions_successFail');
    successFail = successFail.split(',');

    var success = 0;
    var fail = 0;
    var unsolved = 0;

    for (var i = 0; i < successFail.length; i++) {
      if(successFail[i] == "1"){
        success++;
      }else if (successFail[i] == "-1") {
        fail++;
      }else if (successFail[i] == "0") {
        unsolved++;
      }
    }

    if(unsolved == "0"){
      var successRate = 100 * success / (success + fail);
      alert("Score : " + successRate + "%");
      localStorage.removeItem("dailyQuestions_successFail");
      localStorage.removeItem("dailyQuestions");
      window.location.href = "home.php";
    }
    success = success.toString();
    fail = fail.toString();
    unsolved = unsolved.toString();
    document.getElementById("dailyQuestion_correct").innerHTML = success;
    document.getElementById("dailyQuestion_wrong").innerHTML = fail;
    document.getElementById("dailyQuestion_unsolved").innerHTML = unsolved;

    $.ajax({
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "setDate.php", // Location of the service
      data: {
        "time": 1,
      },
      success: function(data) {
        data = $.trim(data);
        alert(data);
      },
      fail: function(data) {}
    }); //end of ajax

  }

  validateAnswer(i){

    var questions = localStorage.getItem('dailyQuestions');
    var successFail = localStorage.getItem('dailyQuestions_successFail');
    questions = questions.split(',');
    successFail = successFail.split(',');
    var formName = "form_" + i;
    var submittedAnswers = [];

    if (questions[i].indexOf('?') != -1) {
      var question = questions[i].split('?');
      var temp = dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
      var ans = [];
      ans[0] = [];
      ans[1] = [];
      ans[0][0] = temp[0];
      ans[1][0] = temp[1];
      submittedAnswers.push(document.forms[formName]['x'].value);
      submittedAnswers.push(document.forms[formName]['y'].value);
    }
    else {
      var ans = dailyQuestions.parser.simplification("(" + questions[i] + ")");
      ans = dailyQuestions.parser.getArr("(" + ans + ")", 1);
      for (var j = 0; j < ans.length; j++) {
        if(ans[j][1] == "S"){
          ans.splice(j,1);
        }
      }
      for (var j = 0; j < ans.length; j++) {
        var power = ans[j][1];
        if (power == 0) {
          var symbol = 'constant';
        } else if (power == 1) {
          var symbol = 'x'
        } else {
          var symbol = 'x^[' + power + ']';
        }
        var val = document.forms[formName][symbol].value;
        submittedAnswers.push(val);
      }
    }

    for (var j = 0; j < submittedAnswers.length; j++) {
      submittedAnswers[j] = submittedAnswers[j].replace(/ /g, '');
      submittedAnswers[j] = submittedAnswers[j].replaceAll('/', '$');
    }
    var isCorrect = 1;
    for (var j = 0; j < ans.length; j++) {
      if (submittedAnswers[j] != ans[j][0]) {
        isCorrect = 0;
      }
    }

    if (isCorrect == 0) {
      document.getElementById("QuestionStatus_" + i).innerHTML = "Wrong";
      document.getElementById("QuestionStatus_" + i).style.color = "red";
      successFail[i] = "-1";
    }else {
      document.getElementById("QuestionStatus_" + i).innerHTML = "Correct";
      document.getElementById("QuestionStatus_" + i).style.color = "green";
      successFail[i] = "1";
    }
    dailyQuestions.parser.steps.print("answerTable" + i);
    $("#form_"+i).remove();

    var successFail_String = "";
    for (var j = 0; j < successFail.length; j++) {
      successFail_String += successFail[j] + ",";
    }
    successFail_String = successFail_String.substring(0,successFail_String.length-1);
    localStorage.setItem('dailyQuestions_successFail', successFail_String);
    this.updateStats();
    // var form = document.getElementById(formName);
    // var inputs = document.getElementsByClassName(formName);
    // var k = document.forms[formName]['constant'].value;
    //currentSlide(i + 2);
  }
}

class game_class {
  constructor() {
    this.timeLeft;
    this.point = 0;
    this.current_difficulty;
    this.current_level;
    this.levels;
    this.levels_toIncrement;//number of times that level has to be incremented.
    this.QUESTION_NUMBER = 1;
    this.parser;
  }

  init() {
    this.parser = new simplifier();
    this.levels = this.levels.split(',');
    this.levels.pop();
    for (var i = 0; i < this.levels.length; i++) {
      this.levels[i] = parseInt(this.levels[i]);
    }
    var tempQueue = new Queue();
    for (var i = 0; i < this.levels.length; i++) {
      tempQueue.enqueue(this.levels[i]);
    }
    this.levels = tempQueue;
    this.levels_toIncrement = [];
    this.levels_toIncrement[0] = 1;
    this.levels_toIncrement[1] = this.levels.size() * 3;
    this.current_level = this.levels.dequeue();
    this.current_difficulty = 1;
    localStorage.removeItem("question1");
    localStorage.removeItem("question2");
    localStorage.removeItem("question3");
    localStorage.removeItem("point");
    localStorage.setItem('point', 0);
  }

  countdown(timeLeft) {
    var display = document.querySelector('#time');
    display.textContent = "time left: " + this.timeLeft;
    this.timeLeft--;
    var timer = setTimeout('game.countdown(' + this.timeLeft + ')', 1000);
    this.check();
  }

  increment() {
    this.timeLeft += 50;
    this.check();
  }

  decrement() {
    this.timeLeft -= 50;
    this.check();
  }

  check() {
    if (this.timeLeft < 0) {
      var display = document.querySelector('#time');
      display.textContent = "The End";

      document.getElementById("quitbutton").click();
    }
  }

  checklevel() {

    if ((this.point / 100 >= this.levels_toIncrement[0]) && (this.levels_toIncrement[0] < this.levels_toIncrement[1])) {
      this.current_difficulty += 1;
      this.levels_toIncrement[0] += 1;
      if (this.current_difficulty % 4 == 0) {
        if (this.levels.size() != 0) {
          this.current_difficulty = 1;
          this.current_level = this.levels.dequeue();
        }else {
          this.current_difficulty = 3;
        }
      }
    }


    // var incrementLevel = 0;
    // if (this.point / 100 >= this.current_difficulty) {
    //   this.current_difficulty += 1;
    //   if (this.current_difficulty % 4 == 0) {
    //     if (this.levels.size() != 0) {
    //       this.current_difficulty = 1;
    //       this.current_level = this.levels.dequeue();
    //     }else {
    //       this.current_difficulty = 3;
    //     }
    //   }
    //   incrementLevel += 1;
    // }
  }

  getStats(level, difficulty) {
    var time;
    var score;

    switch (level) {
      case 9:
        switch (difficulty) {
          case 1:
            time = 30;
            score = 10;
            break;
          case 2:
            time = 40;
            score = 15;
            break;
          case 3:
            time = 50;
            score = 20;
            break;
        }
        break;

      case 10:
        switch (difficulty) {
          case 1:
            time = 40;
            score = 25;
            break;
          case 2:
            time = 50;
            score = 30;
            break;
          case 3:
            time = 60;
            score = 35;
            break;
        }
        break;

      case 11:
        switch (difficulty) {
          case 1:
            time = 60;
            score = 40;
            break;
          case 2:
            time = 75;
            score = 45;
            break;
          case 3:
            time = 90;
            score = 50;
            break;
        }
        break;

      case 12:
        switch (difficulty) {
          case 1:
            time = 90;
            score = 55;
            break;
          case 2:
            time = 105;
            score = 60;
            break;
          case 3:
            time = 110;
            score = 60;
            break;
        }
        break;
    }

    return [time, score];
  }

  getQuestion() {

    for (var i = 0; i < 10; i++) {
      document.getElementById('answer' + i).value = "";
      $('#answer' + i).show();
    }

    this.checklevel();
    $.ajax({
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "question-get.php",
      data: {
        "level": this.current_level,
        "difficulty": this.current_difficulty
      }, // Location of the service
      success: function(data) {
        // data = question, answer, id
        data = $.trim(data);
        data = data.split("#");
        //data[0] = "((20 / 2) * (9/1 + -9/5 - 9/2)),((10 - 9) * -(-9 - 18)),(16 - 2 * -11),(13 - 7/3),((11 + 8/5 * (12 + 14)) + (8 / 3)),(4 * 1)";
        //data[1] = "134$81,-20$81";
        if(data[0].indexOf(",") != -1){//if simultaneous equations
          var question = data[0].split(',');

          var arr1 = game.parser.getArr('(' + question[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML1, "expression1");

          arr1 = game.parser.getArr('(' + question[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML2, "expression2");

          document.getElementById('answer0').style.width = "300px";
          document.getElementById('answer1').style.width = "300px";
          document.getElementById('answer0').placeholder = "x";
          document.getElementById('answer1').placeholder = "y";
          for (var i = 2; i < 10; i++) {
            document.getElementById('answer' + i).style.display = "none";
          }
          var temp = data[1].split(',');
          var answers = [];
          answers[0] = [];
          answers[1] = [];
          answers[0][0] = temp[0];
          answers[1][0] = temp[1];

        }else {//if algebraic expression
          var question_MathML = data[0];
          question_MathML = '(' + question_MathML + ')';
          question_MathML = game.parser.getArr(question_MathML, 1);
          question_MathML = game.parser.MathML_translator(question_MathML);
          question_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 80%;">' + question_MathML + '</math>';
          //--- sending question to the game ---//
          MathML_Render(question_MathML, "expression1");

          //--- Preparing the input texts for the possible inputs ---//
          var answers = "(" + data[1] + ")";
          answers = game.parser.getArr(answers, 1);
          for (var i = 0; i < answers.length; i++) {
            if (answers[i][1] == 'S') {
              answers.splice(i, 1);
            }
          }

          var i = 0;
          for (; i < answers.length; i++) {
            var power = answers[i][1];
            if (power == 0) {
              var symbol = 'constant';
            } else if (power == 1) {
              var symbol = 'x'
            } else {
              var symbol = 'x^[' + power + ']';
            }
            document.getElementById('answer' + i).placeholder = symbol;
          }
          for (; i < 10; i++) {
            document.getElementById('answer' + i).style.display = "none";
          }
          var widthProportion = (600) - 5 + (5 * answers.length + 1); // space available
          widthProportion = widthProportion / answers.length;
          widthProportion = widthProportion.toString();
          widthProportion = widthProportion + 'px';
          for (var i = 0; i < answers.length; i++) {
            document.getElementById('answer' + i).style.width = widthProportion;
          }
        }

        //------------------ the question number in the game  -------------------------//
        document.getElementById('QuestionNumber').innerHTML = game.QUESTION_NUMBER;
        game.QUESTION_NUMBER++;

        document.getElementById('quitbutton').onclick = function() {
          var bar1 = document.getElementById('he1');
          var bar2 = document.getElementById('he2');
          var bar3 = document.getElementById('he3');
          var pointDOM = document.getElementById('point');

          var arr = game.getStats(game.current_level, game.current_difficulty);
          game.point -= arr[1];
          pointDOM.innerHTML = game.point;
          localStorage.setItem('point', game.point);

          $.ajax({
            type: "GET", //GET or POST or PUT or DELETE verb
            url: "answer.php", // Location of the service
            data: {
              "isCorrect": 0,
              "id": data[2]
            },
          }); //end of ajax

          if (bar1.style.backgroundColor == "red" && bar2.style.backgroundColor == "red") {
            localStorage.setItem('question3', data[0]);
            game.finishgame();
          } else if (bar1.style.backgroundColor == "red") {
            localStorage.setItem('question2', data[0]);
            game.finishgame();
          } else {
            localStorage.setItem('question1', data[0]);
            game.finishgame();
          }
        }
        document.getElementById('nextbutton').onclick = function() {
          var submittedAnswers = [];
          for (var i = 0; i < answers.length; i++) {
            submittedAnswers[i] = document.getElementById("answer" + i).value;
            submittedAnswers[i] = submittedAnswers[i].replace(/ /g, '');
            submittedAnswers[i] = submittedAnswers[i].replaceAll('/', '$');
          }

          //---------------------comparing the real answers to the submited answers----------------------//
          var isCorrect = 1;
          for (var i = 0; i < answers.length; i++) {
            if (submittedAnswers[i] != answers[i][0]) {
              isCorrect = 0;
            }
          }
          //if correct becomes 0, then the answers submited are wrong
          //---------------------comparing the real answers to the submited answers----------------------//

          //---------------------- changing the status of game due to the answererd question ---------------------//
          var bar1 = document.getElementById('he1');
          var bar2 = document.getElementById('he2');
          var bar3 = document.getElementById('he3');
          var pointDOM = document.getElementById('point');

          // arr is the stats for the question
          //it includes the information such as how many game.points to add and how many minues to add.
          var arr = game.getStats(game.current_level, game.current_difficulty);
          if (isCorrect == 1) { //if correct
            game.increment(arr[0]);
            game.point += arr[1];
            pointDOM.innerHTML = game.point;
          } else if (isCorrect == 0) { //if wrong
            game.point -= arr[1];
            pointDOM.innerHTML = game.point;

            if (bar1.style.backgroundColor == "red" && bar2.style.backgroundColor == "red") {
              localStorage.setItem('question3', data[0]);
              localStorage.setItem('point', game.point);
              game.finishgame();
            } else if (bar1.style.backgroundColor == "red") {
              localStorage.setItem('question2', data[0]);
              bar2.style.backgroundColor = "red";
            } else {
              localStorage.setItem('question1', data[0]);
              bar1.style.backgroundColor = "red";
            }
          }
          localStorage.setItem('point', game.point);
          //---------------------- changing the status of game due to the answererd question ---------------------//

          $.ajax({
            type: "GET", //GET or POST or PUT or DELETE verb
            url: "answer.php", // Location of the service
            data: {
              "isCorrect": isCorrect,
              "id": data[2]
            },
          }); //end of ajax

          game.getQuestion();
        }
      },
      fail: function(data) {}
    });

  };

  finishgame() {
    //this.point insertion of the user beats his record
    var newScore = localStorage.getItem('point');
    $.ajax({
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "point-insert.php", // Location of the service
      data: {
        "point": newScore
      },
      success: function(data) {
        var result = $.trim(data);
        if (result === "fail") {
          //the current score is less than high score
        } else if (result === "success") {
          alert("New High Score!");
        } else if (result === "error") {
          alert("error");
        }
      },

      fail: function(data) {}
      //Data sent to server
    });
    window.onbeforeunload = null;
    window.location.href = "game-over.php";
  }

  gameover() {
    this.parser = new simplifier();
    document.getElementById("amount").value = localStorage.getItem('point');
    currentSlide(1);
    var question1 = localStorage.getItem('question1');
    var question2 = localStorage.getItem('question2');
    var question3 = localStorage.getItem('question3');

    if (question1 != null) {
      //document.getElementById("questi1").innerHTML = question1;
      $(document).ready(function() {
        question1 = localStorage.getItem('question1');
        if(question1.indexOf(',') != -1){
          var question1 = question1.split(',');
          var arr1 = game.parser.getArr('(' + question1[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question1[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question1[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question1_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question1_MathML1, "wrong1");

          arr1 = game.parser.getArr('(' + question1[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question1[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question1[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question1_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question1_MathML2, "wrong10");
        }else{
          var question1_MathML = '(' + question1 + ')';
          question1_MathML = game.parser.getArr(question1_MathML, 1);
          question1_MathML = game.parser.MathML_translator(question1_MathML);
          question1_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question1_MathML + '</math>';
          MathML_Render(question1_MathML, "wrong1");
        }
      });
      if(question1.indexOf(',') != -1){
        var tempQuestion1 = question1.split(',');
        var answer1 = game.parser.simultaneous(tempQuestion1[0], tempQuestion1[1], tempQuestion1[2], tempQuestion1[3], tempQuestion1[4], tempQuestion1[5]);
      }else {
        var answer1 = game.parser.simplification(question1);
      }
      game.parser.steps.print('answerTable1');
      game.parser.steps.clearSteps();
    }
    if (question2 != null) {
      //document.getElementById("questi2").innerHTML = question2;
      $(document).ready(function() {
        question2 = localStorage.getItem('question2');
        if(question2.indexOf(',') != -1){
          var question2 = question2.split(',');
          var arr1 = game.parser.getArr('(' + question2[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question2[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question2[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question2_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question2_MathML1, "wrong2");

          arr1 = game.parser.getArr('(' + question2[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question2[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question2[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question2_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question2_MathML2, "wrong20");
        }else{
          var question2_MathML = '(' + question2 + ')';
          question2_MathML = game.parser.getArr(question2_MathML, 1);
          question2_MathML = game.parser.MathML_translator(question2_MathML);
          question2_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question2_MathML + '</math>';
          MathML_Render(question2_MathML, "wrong2");
        }
      });
      if(question2.indexOf(',') != -1){
        var tempQuestion2 = question2.split(',');
        var answer2 = game.parser.simultaneous(tempQuestion2[0], tempQuestion2[1], tempQuestion2[2], tempQuestion2[3], tempQuestion2[4], tempQuestion2[5]);
      }else {
        var answer2 = game.parser.simplification(question2);
      }
      game.parser.steps.print('answerTable2');
      game.parser.steps.clearSteps();
    }
    if (question3 != null) {
      //document.getElementById("questi3").innerHTML = question3;
      $(document).ready(function() {
        question3 = localStorage.getItem('question3');
        if(question3.indexOf(',') != -1){
          var question3 = question3.split(',');
          var arr1 = game.parser.getArr('(' + question3[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question3[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question3[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question3_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question3_MathML1, "wrong3");

          arr1 = game.parser.getArr('(' + question3[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question3[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question3[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question3_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question3_MathML2, "wrong30");
        }else{
          var question3_MathML = '(' + question3 + ')';
          question3_MathML = game.parser.getArr(question3_MathML, 1);
          question3_MathML = game.parser.MathML_translator(question3_MathML);
          question3_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question3_MathML + '</math>';
          MathML_Render(question3_MathML, "wrong2");
        }
      });
      if(question3.indexOf(',') != -1){
        var tempQuestion3 = question3.split(',');
        var answer3 = game.parser.simultaneous(tempQuestion3[0], tempQuestion3[1], tempQuestion3[2], tempQuestion3[3], tempQuestion3[4], tempQuestion3[5]);
      }else {
        var answer3 = game.parser.simplification(question3);
      }
      game.parser.steps.print('answerTable3');
      game.parser.steps.clearSteps();
    }
  }
}

class simplifier {
  constructor() {
    class solutionSteps {
      constructor() {
        this.steps = [];
        this.i = 0;
      }
      assignQuestion(input) {
        this.expression = input;
        this.steps.push(input);
      }
      clearSteps() {
        this.steps = [];
        this.i = 0;
      }
      printToConsole() {
        for (var j = 0; j < this.steps.length; j++) {
          console.log(this.steps[j]);
        }
      }
      print(tablename) {
        var order = 1;
        for (var j = 0; j < this.steps.length; j++) {
          $('#' + tablename).append('<tr><th>' + order + '</th><th></th></tr>');
          order++;
          var temp = this.steps[j];
          temp = temp.replaceAll('$', '/');
          temp = temp.replaceAll('^[', '<sup>');
          temp = temp.replaceAll(']', '</sup>');
          var myTable = document.getElementById(tablename);
          myTable.rows[j].cells[1].innerHTML = temp;
        }
      }
      push(input) {
        this.steps[this.i] = input;
        this.i++;
      }
    }
    this.steps = new solutionSteps();
    class processor_class {
      constructor() {
        this.controlVariable_processor = true;
        this.resultArray_power_float = [];
        this.resultArray_power_string = [];
        this.resultArray_coefficient = [];
      }

      clear_ResultArrs() {
        this.resultArray_power_float = [];
        this.resultArray_power_string = [];
        this.resultArray_coefficient = [];
      }

      process(operand1, operand2, operator) {
        /*
         */

        if (operand1[1] == "A") {
          operand1 = operand1[0];
          for (var i = 0; i < operand1.length; i++) {
            if (operand1[i][1] == "S") {
              operand1[i + 1][0] = this.makeCalculation(operand1[i + 1][0], operand1[i][0] + "1", "*");
              operand1.splice(i, 1);
            }
          }
        } else {
          var temp1 = operand1[0];
          var temp2 = operand1[1];
          operand1 = [];
          operand1[0] = [2];
          operand1[0][0] = temp1;
          operand1[0][1] = temp2;
        }

        if (operand2[1] == "A") {
          operand2 = operand2[0];
          for (var i = 0; i < operand2.length; i++) {
            if (operand2[i][1] == "S") {
              operand2[i + 1][0] = this.makeCalculation(operand2[i + 1][0], operand2[i][0] + "1", "*");
              operand2.splice(i, 1);
            }
          }
        } else {
          var temp1 = operand2[0];
          var temp2 = operand2[1];
          operand2 = [];
          operand2[0] = [2];
          operand2[0][0] = temp1;
          operand2[0][1] = temp2;
        }

        var result;
        if (operator == "*") {
          result = this.multiply(operand1, operand2);
        } else if (operator == "/") {
          result = this.divide(operand1, operand2);
        }

        return result;
      }

      directInsert(operand, operator) {

        if (operand[1] == "A") {
          operand = operand[0];
          for (var i = 0; i < operand.length; i++) {
            if (operand[i][1] == "S") {
              operand[i + 1][0] = this.makeCalculation(operand[i + 1][0], operand[i][0] + "1", "*");
              operand.splice(i, 1);
            }
          }
        } else {
          var temp1 = operand[0];
          var temp2 = operand[1];
          operand = [];
          operand[0] = [2];
          operand[0][0] = temp1;
          operand[0][1] = temp2;
        }

        for (var i = 0; i < operand.length; i++) {
          operand[i][0] = this.makeCalculation(operand[i][0], operator + "1", "*");
        }

        if (operator == "+" || operator == "-") {
          this.add_subtract(operand);
        }
      }

      insert(operand, resultArray_coefficient, resultArray_power_float, resultArray_power_string) {
        operand = operand.split(",");
        var powerString = operand[1];
        //conditional/ternary operator usage --> var userType = userIsYoungerThan18 ? "Minor" : "Adult";
        // simplifying fraction for powerFloat if it is written in fraction syntax --> ex: 4$3;
        var powerFloat = (powerString.indexOf("$") < 0) ? parseFloat(powerString) : parseFloat(powerString.substring(0, powerString.indexOf("$"))) / parseFloat(powerString.substring(powerString.indexOf("$") + 1, powerString.length));
        //arr.splice(index, 0, item); // inserting into the array
        var index = this.insertAt(powerFloat, resultArray_power_float);

        if (resultArray_power_float[index] == powerFloat) {
          // already registered so add the coefficient
          resultArray_coefficient[index] = this.makeCalculation(resultArray_coefficient[index], operand[0], "+");
          if (resultArray_coefficient[index] == "0") {
            resultArray_coefficient.splice(index, 1);
            resultArray_power_string.splice(index, 1);
            resultArray_power_float.splice(index, 1);
          }
        } else {
          //register the value to the arrays
          resultArray_power_float.splice(index, 0, powerFloat);
          resultArray_power_string.splice(index, 0, powerString);
          resultArray_coefficient.splice(index, 0, operand[0]);
        }
        return [resultArray_coefficient, resultArray_power_float, resultArray_power_string];
      }

      multiply(operand1, operand2) {
        var resultArray_power_float = [];
        var resultArray_power_string = [];
        var resultArray_coefficient = [];
        var resultArray;
        var step = "(";
        for (var i = 0; i < operand1.length; i++) {
          for (var j = 0; j < operand2.length; j++) {
            var temp = this.insert(this.makeCalculation(operand1[i][0], operand2[j][0], "*") + "," + this.makeCalculation(operand1[i][1], operand2[j][1], "+"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power = this.makeCalculation(operand1[i][1], operand2[j][1], "+");
            var coefficient = this.makeCalculation(operand1[i][0], operand2[j][0], "*");
            if (power == "0") {
              step += coefficient;
            } else if (power == "1" || power == "+1") {
              step += coefficient + "x";
            } else {
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

        return [resultArray, ("multiply : " + step)];
      }

      divide(operand1, operand2) {
        if (operand2.length > 1) {
          this.controlVariable_processor = false;
        } else {
          var resultArray_power_float = [];
          var resultArray_power_string = [];
          var resultArray_coefficient = [];
          var resultArray;
          var step = "(";

          for (var i = 0; i < operand1.length; i++) {
            var temp = this.insert(this.makeCalculation(operand1[i][0], operand2[0][0], "/") + "," + this.makeCalculation(operand1[i][1], operand2[0][1], "-"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power = this.makeCalculation(operand1[i][1], operand2[0][1], "-");
            var coefficient = this.makeCalculation(operand1[i][0], operand2[0][0], "/");
            if (power == "0") {
              step += coefficient;
            } else if (power == "1" || power == "+1") {
              step += coefficient + "x";
            } else {
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

          return [resultArray, ("divide : " + step)];
        }
      }

      add_subtract(operand) {
        for (var i = 0; i < operand.length; i++) {
          var temp = this.insert(operand[i][0] + "," + operand[i][1], this.resultArray_coefficient, this.resultArray_power_float, this.resultArray_power_string);
          this.resultArray_coefficient = temp[0];
          this.resultArray_power_float = temp[1];
          this.resultArray_power_string = temp[2];
        }
      }

      resultString() {
        var resultString = "(";
        if (this.resultArray_coefficient.length == 0) {
          return "(0)";
        }
        for (var i = 0; i < this.resultArray_coefficient.length; i++) {
          if (this.resultArray_power_float[i] == 0) {
            resultString += this.resultArray_coefficient[i];
          } else if (this.resultArray_power_float[i] == 1) {
            resultString += this.resultArray_coefficient[i] + "x";
          } else {
            resultString += this.resultArray_coefficient[i] + "x^[" + this.resultArray_power_string[i] + "]";
          }
          resultString += " + ";
        }
        resultString = resultString.substring(0, resultString.length - 3);
        resultString += ")";

        return resultString;
      }

      makeCalculation(operand1, operand2, operator) {
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
        } else {
          numerator1 = parseInt(operand1.substring(0, operand1.indexOf('$')));
          denominator1 = parseInt(operand1.substring(operand1.indexOf('$') + 1, operand1.length));
        }

        if (operand2.indexOf("$") == -1) {
          numerator2 = parseInt(operand2);
          denominator2 = 1;
        } else {
          numerator2 = parseInt(operand2.substring(0, operand2.indexOf('$')));
          denominator2 = parseInt(operand2.substring(operand2.indexOf('$') + 1, operand2.length));
        }
        // -------------------  operations ------------------ //
        var result;

        if (operator == "+") {
          numerator1 = numerator1 * denominator2;
          numerator2 = numerator2 * denominator1;
          numerator1 = numerator1 + numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "-") {
          numerator1 = numerator1 * denominator2;
          numerator2 = numerator2 * denominator1;
          numerator1 = numerator1 - numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "*") {
          numerator1 = numerator1 * numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "/") {
          var temp = numerator2;
          numerator2 = denominator2;
          denominator2 = temp;

          numerator1 = numerator1 * numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        }

        if (denominator1 < 0) {
          denominator1 = -denominator1;
          numerator1 = -numerator1;
        }

        if (denominator1 == 1) {
          result = numerator1.toString();
        } else if (denominator1 == 0) {
          this.controlVariable_processor = false;
          result = "0";
        } else {
          result = numerator1.toString() + "$" + denominator1.toString();
        }

        return result;
      }

      isNumeric(character) {
        if (character.indexOf("$") != -1) {
          var c1 = character.substring(0, character.indexOf("$"));
          var c2 = character.substring(character.indexOf("$") + 1, character.length);
          if (!isNaN(parseFloat(c1)) && isFinite(c1) && !isNaN(parseFloat(c2)) && isFinite(c2)) {
            return true;
          } else {
            return false;
          }
        }
        return !isNaN(parseFloat(character)) && isFinite(character);
      }

      isOperator(character) {
        var check = false;
        if (character == '+' || character == '*' ||
          character == '-' || character == '/') {
          check = true;
        }
        return check;
      }

      gcd(x, y) {
        /* finds the greatest common factor of given two integers*/
        if ((typeof x !== 'number') || (typeof y !== 'number'))
          return false;
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
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
    this.controlVariable = true;
  }

  constructArr(arr) {
    var resultString = "(";
    for (var i = 0; i < arr.length; i++) {
      if (i % 2 == 1 && arr[i][1] != "S") {
        resultString += " + ";
      }
      if (this.processor.isNumeric(arr[i][1]) == true) {
        if (arr[i][1] == "0") {
          resultString += arr[i][0];
        } else if (arr[i][1] == "1" || arr[i][1] == "+1") {
          resultString += arr[i][0] + "x";
        } else {
          resultString += arr[i][0] + "x^[" + arr[i][1] + "]";
        }
      } else if (arr[i][1] == "S") {
        resultString += " " + arr[i][0] + " ";
      } else if (arr[i][1] == "A") {
        resultString += this.constructArr(arr[i][0]);
      }
    }
    resultString += ")";
    return resultString;
  }

  simplification(expression) {
    var index = 0;
    var stack = new Stack(); // index of parenthesis holder stack;
    this.steps.push(expression);
    expression = "(" + expression + ")";
    while (true) {
      if (expression.charAt(index) == "(") {
        stack.push(index);
      } else if (expression.charAt(index) == ")") {
        var expression_bit = (expression.substring(stack.pop(), index + 1));
        var arr = this.getArr(expression_bit, 1);
        //sending a bit of expression to simplify ex(3 + (2 + 4))
        // before the whole expression is evaluated, 2 + 4 inside the brackets will be evaluated
        if (typeof arr == "undefined") {
          this.controlVariable = false;
        }
        this.steps.push("simplifying = " + this.constructArr(arr));
        var operand_Stack = new Stack();
        var operator_Stack = new Stack();
        var operand2;
        var operand1;
        var operator;
        var tempExpression = this.constructArr(arr);
        for (var i = 0; i < arr.length; i++) {
          if (i % 2 == 0) { // even so --> operand
            operand_Stack.push(arr[i]);
            if ((operator_Stack.size() != 0) && (operator_Stack.peek() == "*" || operator_Stack.peek() == "/")) {
              operand2 = operand_Stack.pop();
              operand1 = operand_Stack.pop();
              operator = operator_Stack.pop();
              var res = this.processor.process(operand1, operand2, operator);
              operand_Stack.push(res[0]);
              this.steps.push("for : " + this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length - 1));
              this.steps.push(res[1]);
              this.steps.push(this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length - 1) + " = " + this.constructArr([operand_Stack.peek()]).substring(1, this.constructArr([operand_Stack.peek()]).length - 1));
              tempExpression = tempExpression.replace(this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator + " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length - 1), this.constructArr([operand_Stack.peek()]).substring(1, this.constructArr([operand_Stack.peek()]).length - 1));
              this.steps.push("update = " + tempExpression);
            }
          } else if (i % 2 == 1) { // even so --> operator
            operator_Stack.push(arr[i][0]);
          }
        }

        //--**--
        var tempQueue = new Queue();
        var temp = operator_Stack.size();
        for (var i = 0; i < temp; i++) {
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
          if (i == 0) {
            this.processor.directInsert(operand_Stack.pop(), "+");
          } else {
            this.processor.directInsert(operand_Stack.pop(), operator_Stack.pop());
          }
        }
        index = index + this.processor.resultString().length - expression_bit.length;
        this.steps.push("= " + (this.processor.resultString().substring(1, this.processor.resultString().length - 1)));
        expression = expression.replace(expression_bit, this.processor.resultString());
        this.steps.push('update expression = ' + expression);
        this.processor.clear_ResultArrs();
      } else if (index >= expression.length) {
        expression = expression.substring(1, expression.length - 1);
        //this.steps.print();
        //this.steps.clearSteps();
        if (this.processor.controlVariable_processor == false) {
          this.controlVariable = false;
        }
        return expression;
      }
      index++;
    }
  }

  simultaneous(a, b, c, d, e, f) {
    var checkarr = [a, b, c, d, e, f];
    this.steps.push("Simultaneous Equations : ");
    this.steps.push(a + "x +" + b + "y = " + c);
    this.steps.push(d + "x +" + e + "y = " + f);
    this.steps.push("Ax + By = C");
    this.steps.push("Dx + Ey = F");
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying A:");
    a = this.simplification(a);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying B:");
    b = this.simplification(b);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying C:");
    c = this.simplification(c);
    this.steps.push("equation = " + a + "x +" + b + "y = " + c);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying D:");
    d = this.simplification(d);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying E:");
    e = this.simplification(e);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    this.steps.push("simplifying F:");
    f = this.simplification(f);
    this.steps.push("equation = " + d + "x +" + e + "y = " + f);
    this.steps.push("--------------------------------------------------------------------------------------------------------------------");


    // treat the inputs as decimal number which is string.
    // cramer's rule;
    this.steps.push("to find value of x and y:");
    this.steps.push("Ax + By = C \nDx + Ey = F");
    this.steps.push("determinant = (A*E) - (B*D)");
    var determinant = this.simplification("(" + a + " * " + e + ")" + " - " + "(" + b + " * " + d + ")"); //a*d - b*c;
    this.steps.push("determinant = " + determinant);

    this.steps.push("--------------------------------------------------------------------------------------------------------------------");

    var x = "";
    var y = "";
    if (determinant != '0') {
      this.steps.push("for x:");
      this.steps.push("x = (e*d - b*f)/determinant");
      x = this.simplification("((" + c + " * " + e + ")" + " - " + "(" + b + " * " + f + "))" + " / " + determinant); //(e*d - b*f)/determinant;
      this.steps.push("x = " + x);

      this.steps.push("--------------------------------------------------------------------------------------------------------------------");

      this.steps.push("for y:");
      this.steps.push("y = (a*f - e*c)/determinant");
      y = this.simplification("((" + a + " * " + f + ")" + " - " + "(" + c + " * " + d + "))" + " / " + determinant); //(a*f - e*c)/determinant;
      this.steps.push("y = " + y);

      if (x == "0" || y == "0" || x.charAt(x.indexOf("/") + 1) == '0' || y.charAt(y.indexOf("/") + 1) == '0') {
        x = "error";
        y = "error";
      }
    } else {
      x = "error"; // making sure that validation will return false so that the function will be called with different imputs.
      y = "error";
      //"Cramer equations system: determinant is zero."
      //"there are either no solutions or many solutions exist."
    }
    //this.steps.print();
    return [x, y, checkarr];
  }

  getArr(expression, i) {
    var arr = this.getArr_Recursive(expression, i);
    return arr[0];
  }

  getArr_Recursive(expression, i) {
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
          } else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
            if (expression.charAt(i + 1) == "^" && expression.charAt(i + 2) == "[") {
              i += 2;
              if (expression.charAt(i + 1) == '+' || expression.charAt(i + 1) == '-') {
                arr[arrCount][1] = expression.charAt(i + 1);
                i++;
              } else {
                arr[arrCount][1] = "+";
              }
              while (true) {
                i++;
                if (this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$") {
                  arr[arrCount][1] += expression.charAt(i);
                } else if (expression.charAt(i) == ']') {
                  break;
                } else {
                  this.controlVariable = false;
                  break;
                }
              }
            } else {
              arr[arrCount][1] = "+1";
              break;
            }
          } else {
            if (arr[arrCount][1] == null) {
              arr[arrCount][1] = "0";
            }
            i--;
            break;
          }
        }
        arrCount++;
      } else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
        arr[arrCount] = [];
        arr[arrCount][0] = "1";
        if (expression.charAt(i + 1) == "^" && expression.charAt(i + 2) == "[") {
          i += 2;
          if (expression.charAt(i + 1) == '+' || expression.charAt(i + 1) == '-') {
            arr[arrCount][1] = expression.charAt(i + 1);
            i++;
          } else {
            arr[arrCount][1] = "+";
          }
          while (true) {
            i++;
            if (this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$") {
              arr[arrCount][1] += expression.charAt(i);
            } else if (expression.charAt(i) == ']') {
              break;
            } else {
              this.controlVariable = false;
              break;
            }
          }
        } else {
          arr[arrCount][1] = "+1";
        }
        arrCount++;
      } else if (expression.charAt(i) == '(') {
        arr[arrCount] = [];
        arr[arrCount][1] = "A"; // symbolyzing array;
        var temp = this.getArr_Recursive(expression, i + 1);
        arr[arrCount][0] = temp[0];
        //dont forget to increment i;
        i = temp[1];
        arrCount++;
      } else if (this.processor.isOperator(expression.charAt(i)) == true) {
        arr[arrCount] = [];
        arr[arrCount][1] = "S";
        arr[arrCount][0] = expression.charAt(i);
        arrCount++;
      } else if (expression.charAt(i) == ')') {
        /*
        this part of the program translates array to a workable format
        this might be: 1 - -1 -> 1 + 1 so translates two negative sign to one positive
        at the same time it check if the operators and operands are at the position in the array that they should
        if not, it corrects it,
        if the syntax is wrong or a problem it cant handle, makes sure that program will know that the output
        will be wrong.
        */
        var temp_i = i;
        i = 0;
        while (true) {
          if (typeof arr[i] == 'undefined') {
            break;
          }

          if (i % 2 == 0 && arr[i][1] == 'S') {
            if (arr[i][0] == "+" || arr[i][0] == "-") {
              if (arr[i + 1][0] == "+" || arr[i + 1][0] == "-") {
                if (arr[i + 1][0] == arr[i][0]) {
                  arr[i + 1][0] = "+";
                  arr.splice(i, 1);
                  i--;
                } else {
                  arr[i + 1][0] = "-";
                  arr.splice(i, 1);
                  i--;
                }
              } else if (arr[i + 1][1] == 'A') {

                arr[i][0] = arr[i][0] + "1";
                arr[i][1] = "0";
                arr.insert(i + 1, "");
                arr[i + 1] = [];
                arr[i + 1][0] = "*";
                arr[i + 1][1] = "S";
                i += 2;
                //[23,*,A,5]
              } else if (this.processor.isNumeric(arr[i + 1][0]) == true) {
                arr[i + 1][0] = this.processor.makeCalculation(arr[i + 1][0], arr[i][0] + "1", "*");
                arr.splice(i, 1);
                i--;
              } else {
                this.controlVariable = false;
              }
            } else {
              this.controlVariable = false;
            }
          }
          i++;
        }

        if (arr[arr.length - 1][1] == "S") {
          this.controlVariable = false;
        }
        return [arr, temp_i];
      }
    }
  }

  MathML_translator(arr) {

    var result = "<mrow>";
    var tempArr = [];
    var tempString = "";

    for (var i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        //operand
        if (arr[i][1] == 'A') {
          tempString += '<mrow><mfenced>';
          tempString += this.MathML_translator(arr[i][0]);
          tempString += '</mfenced></mrow>';
        } else if (this.processor.isNumeric(arr[i][1]) == true) {
          if (arr[i][1] == '0') {
            tempString += '<mrow><mn>' + arr[i][0] + '</mn></mrow>';
          } else if (arr[i][1] == '1' || arr[i][1] == '+1') {
            tempString += '<mrow><mn>' + arr[i][0] + '</mn></mrow><mi>x</mi>';
          } else {
            arr[i][1] = arr[i][1].replace('+', '');
            tempString += '<mrow><mn>' + arr[i][0] + '</mn></mrow><msup><mi>x</mi><mn>' + arr[i][1] + '</mn></msup>';
          }
        }
        tempArr.push(tempString);
        tempString = "";
      } else if (i % 2 == 1) {
        tempString += '<mo>' + arr[i][0] + '</mo>';
        tempArr.push(tempString);
        tempString = "";
      }
    }

    var operand_Stack = new Stack();
    var operator_Stack = new Stack();
    var operatorML_Stack = new Stack();
    var operand2;
    var operand1;
    var operator;
    for (var i = 0; i < tempArr.length; i++) {
      if (i % 2 == 0) { // even so --> operand
        operand_Stack.push(tempArr[i]);
        if ((operator_Stack.size() != 0) && (operator_Stack.peek() == "*" || operator_Stack.peek() == "/")) {
          operand2 = operand_Stack.pop();
          operand1 = operand_Stack.pop();
          operator = operator_Stack.pop();
          var operatorML = operatorML_Stack.pop();

          if (operator == '/') {
            operand_Stack.push('<mfrac><mrow>' + operand1 + '</mrow><mrow>' + operand2 + '</mrow></mfrac>');
          } else {
            operand_Stack.push(operand1 + operatorML + operand2);
          }
        }
      } else if (i % 2 == 1) { // even so --> operator
        var tempOperator = tempArr[i].replace('<mo>', '');
        tempOperator = tempOperator.replace('</mo>', '');
        operatorML_Stack.push(tempArr[i]);
        operator_Stack.push(tempOperator);
      }
    }

    var tempQueue = new Queue();
    var temp = operator_Stack.size();
    for (var i = 0; i < temp; i++) {
      tempQueue.enqueue(operator_Stack.pop());
    }
    for (var i = 0; i < temp; i++) {
      operator_Stack.push(tempQueue.dequeue());
    }
    for (var i = 0; i < temp; i++) {
      tempQueue.enqueue(operatorML_Stack.pop());
    }
    for (var i = 0; i < temp; i++) {
      operatorML_Stack.push(tempQueue.dequeue());
    }
    for (var i = 0; i < temp + 1; i++) {
      tempQueue.enqueue(operand_Stack.pop());
    }
    for (var i = 0; i < temp + 1; i++) {
      operand_Stack.push(tempQueue.dequeue());
    }

    for (var i = 0; i < (2 * temp) + 1; i++) {
      if (i % 2 == 0) {
        result += operand_Stack.pop();
      } else if (i % 2 == 1) {
        result += operatorML_Stack.pop();
      }
    }

    result += "</mrow>";
    return result;
  }
}

class questionGenerator {
  constructor() {
    this.parser = new simplifier();
  }

  generateQuestion(level) {
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

        if (this.parser.controlVariable == false) {
          this.parser.controlVariable = true;
        } else if (arr[0].length < 7 && arr[1].length < 7 && (arr[0] != 'error' || arr[1] != 'error')) {
          question = arr[2][0] + "," + arr[2][1] + "," + arr[2][2] + "," + arr[2][3] + "," + arr[2][4] + "," + arr[2][5];
          answer = arr[0] + "," + arr[1];
          break;
        }
      } else {
        question = this.selectTeplate(level);
        answer = this.parser.simplification(question);
        if (this.parser.controlVariable == false) {
          this.parser.controlVariable = true;
        } else {
          break;
        }
      }
    }
    var steps = this.parser.steps.steps;
    this.parser.steps.clearSteps();
    return [question, answer, steps];
  }

  selectTeplate(level) {
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

    for (var i = 0; i < expression.length; i++) {

      if (expression.charAt(i) == 'C') {
        expression = expression.slice(0, i) + this.getCoefficient() + expression.slice(i + 1, expression.length);
      } else if (expression.charAt(i) == 'S') {
        expression = expression.slice(0, i) + this.getSign() + expression.slice(i + 1, expression.length);
      } else if (expression.charAt(i) == 'P') {
        var r = Math.floor(Math.random() * 1); //0 or 1, 50% chance
        if (r == 0) {
          expression = expression.slice(0, i) + (Math.floor(Math.random() * 2) + 2) + expression.slice(i + 1, expression.length);
        } else if (r == 1) {
          expression = expression.slice(0, i) + (-(Math.floor(Math.random() * 2)) - 2) + expression.slice(i + 1, expression.length);
        }
      } else if (expression.charAt(i) == 'N') {
        if (level > 10) {
          var isInt = Math.floor(Math.random() * 10);
          if (isInt < 3) //30 percent change of having a numberator and denominator, not being a whole number
          {
            var temp1 = Math.floor(Math.random() * 10) + 1;
            var temp2 = Math.floor(Math.random() * 5) + 1;
            var ss = temp1.toString() + '/' + temp2.toString();
          } else //70 percent change of being an whole number
          {
            var temp = Math.floor(Math.random() * 20) + 1;
            var ss = temp.toString();
          }
          expression = expression.slice(0, i) + ss + expression.slice(i + 1, expression.length);
        } else {
          expression = expression.slice(0, i) + (Math.floor(Math.random() * 15) + 1) + expression.slice(i + 1, expression.length);
        }
      }
    }

    return expression;
  }

  getSign() {
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

  getCoefficient() {
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
        coefficient = "Nx - N";
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

    for (var i = 0; i < coefficient.length; i++) {
      if (coefficient.charAt(i) == 'N') {
        var isInt = Math.floor(Math.random() * 10);
        if (isInt < 2) //20 percent change of having a numberator and denominator, not being a whole number
        {
          var temp1 = Math.floor(Math.random() * 10) + 1;
          var temp2 = Math.floor(Math.random() * 5) + 1;
          var ss = temp1.toString() + '/' + temp2.toString();
        } else //70 percent change of being an whole number
        {
          var temp = Math.floor(Math.random() * 15) + 1;
          var ss = temp.toString();
        }
        coefficient = coefficient.slice(0, i) + ss + coefficient.slice(i + 1, coefficient.length);
      } else if (coefficient.charAt(i) == 'S') {
        coefficient = coefficient.slice(0, i) + this.getSign() + coefficient.slice(i + 1, coefficient.length);
      } else if (coefficient.charAt(i) == 'P') {
        var r = Math.floor(Math.random() * 1); //0 or 1, 50% chance
        if (r == 0) {
          coefficient = coefficient.slice(0, i) + (Math.floor(Math.random() * 2) + 2) + coefficient.slice(i + 1, coefficient.length);
        } else if (r == 1) {
          coefficient = coefficient.slice(0, i) + (-(Math.floor(Math.random() * 2)) - 2) + coefficient.slice(i + 1, coefficient.length);
        }
      }
    }

    return coefficient;
  }
}

function MathML_Render(mathml_text, div) {
  $(document).ready(function() {
    MathJax.Hub.Config({
      mml2jax: {
        preview: "mathml",
        useMathMLspacing: true
      }
    });
    var math = MathJax.Hub.getAllJax(div)[0]; //div name goes into input
    MathJax.Hub.Queue(["Text", math, mathml_text]);
  });
}

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};
