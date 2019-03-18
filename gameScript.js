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
    currentSlide(1); //for start, it directs to the first slide
    //changes the format of the stats
    year9 = $.trim(year9);
    year10 = $.trim(year10);
    year11 = $.trim(year11);
    year12 = $.trim(year12);
    //example year9 = "23,45"  --> meaning that 23 success 45 fail in total of 68 trial
    year9 = year9.split(",");
    year10 = year10.split(",");
    year11 = year11.split(",");
    year12 = year12.split(",");
    //calculate the success rate in persentage
    year9 = parseInt(year9[0]) * 100 / (parseInt(year9[0]) + parseInt(year9[1]));
    year10 = parseInt(year10[0]) * 100 / (parseInt(year10[0]) + parseInt(year10[1]));
    year11 = parseInt(year11[0]) * 100 / (parseInt(year11[0]) + parseInt(year11[1]));
    year12 = parseInt(year12[0]) * 100 / (parseInt(year12[0]) + parseInt(year12[1]));

    var level;
    var generator = new questionGenerator();
    //it checks lower to higher level
    //if the level checked has a success rate lower than 70 percent
    //than the questions are going to be generated at that level
    //variable level represents the level selected
    if (year9 < 70 || isNaN(year9)) {
      level = 9;
    } else if (year10 < 70 || isNaN(year10)) {
      level = 10;
    } else if (year11 < 70 || isNaN(year11)) {
      level = 11;
    } else if (year12 < 70 || isNaN(year12)) {
      level = 12;
    } else {
      level = 12;
    }

    var questions = "";
    var type;
    for (var i = 0; i < 10; i++) {
      var rand = Math.floor((Math.random() * 2));
      // 50% change of picking simultaneous equations over algebraic expression
      if (rand == 1) {
        type = "algebraic_expression";
      }else{
        type = "simultaneous_equations";
      }

      var temp = generator.generateQuestion(level,type)[0];
      //temp includes the question generated
      if (temp.indexOf(',') != -1) {
        temp = temp.replaceAll(',', '?');
      }
      //question variable holds the questions in a string which is splited by commas --> q1,q2,q3...
      questions += (temp);
      questions += ",";
    }

    questions = questions.substring(0, questions.length - 1);
    //stores the question in local storage.
    localStorage.setItem('dailyQuestions', questions);
    localStorage.setItem('dailyQuestions_successFail', "0,0,0,0,0,0,0,0,0,0");

    this.printDailyQuestions();
  }

  printDailyQuestions() {
    this.updateStats();//display is prepared along with validation
    this.parser = new simplifier();
    var questions = localStorage.getItem('dailyQuestions');
    var successFail = localStorage.getItem('dailyQuestions_successFail');

    questions = questions.split(',');//makes it an array
    successFail = successFail.split(',');//makes it an array

    for (var i = 0; i < questions.length; i++) {
      $(document).ready(function() {

        if (questions[i].indexOf('?') != -1) {
          //if simultaneous, prepare mathml code then display it
          var question = questions[i].split('?');
          var divName = "dailyQuestion" + i;

          var arr1 = dailyQuestions.parser.getArr('(' + question[0] + ')', 1);
          var arr2 = dailyQuestions.parser.getArr('(' + question[1] + ')', 1);
          var arr3 = dailyQuestions.parser.getArr('(' + question[2] + ')', 1);
          var questionMathml1 = dailyQuestions.parser.MathML_translator(arr1);
          var questionMathml2 = dailyQuestions.parser.MathML_translator(arr2);
          var questionMathml3 = dailyQuestions.parser.MathML_translator(arr3);

          var question_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + questionMathml1 +
            "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML1, divName);

          arr1 = dailyQuestions.parser.getArr('(' + question[3] + ')', 1);
          arr2 = dailyQuestions.parser.getArr('(' + question[4] + ')', 1);
          arr3 = dailyQuestions.parser.getArr('(' + question[5] + ')', 1);
          questionMathml1 = dailyQuestions.parser.MathML_translator(arr1);
          questionMathml2 = dailyQuestions.parser.MathML_translator(arr2);
          questionMathml3 = dailyQuestions.parser.MathML_translator(arr3);

          var question_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + questionMathml1 +
            "<mi>x</mi><mo>+</mo>" + questionMathml2 + "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML2, divName + "0");

        } else {
          //if algebraic expression, prepare mathml code and send it to html
          var arr = questions[i];
          arr = '(' + questions[i] + ')';
          arr = dailyQuestions.parser.getArr(arr, 1);
          arr = dailyQuestions.parser.MathML_translator(arr);
          arr = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 110%; z-index: 1;">' + arr + '</math>';
          var divName = "dailyQuestion" + i;
          MathML_Render(arr, divName);
        }

        if (successFail[i] == "0") {
          //if it is unsolved, put the input boxes
          var formName = "form_" + i;
          if (questions[i].indexOf('?') != -1) {
            //if simultaneous equations
            var question = questions[i].split('?');//make it an array
            var ans = dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
            $('<input/>').attr({
              type: 'text',
              class: formName,
              name: "answer0",
              placeholder: "  value of x",
              style: 'width:300px;border:2px solid black;border-radius:5px;height:28px;margin-top:5px;font-size:24px;margin-right:10px;'
            }).appendTo('#' + formName);
            $('<input/>').attr({
              type: 'hidden',
              name: "powerAnswer0",
              value: "0"
            }).appendTo('#' + formName);

            $('<input/>').attr({
              type: 'text',
              class: formName,
              name: "answer1",
              placeholder: "  value of y",
              style: 'width:300px;border:2px solid black;border-radius:5px;height:28px;margin-top:5px;font-size:24px;margin-right:10px;'
            }).appendTo('#' + formName);
            $('<input/>').attr({
              type: 'hidden',
              name: "powerAnswer1",
              value: "1"
            }).appendTo('#' + formName);

            $('<input/>').attr({
              type: 'button',
              value: 'Submit',
              style: 'width: 90px; float:right;height:30px;border:2px solid black;border-radius:5px;',
              onclick: 'dailyQuestions.validateAnswer(' + i + ')'
            }).appendTo('#' + formName);

          } else {
            /*
              
          for (var i = answers.length - 1; i>=0 ; i--) {
            var power = answers[i][1];
            if (power == 0) {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><input type="hidden" value="0" id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            } else if (power == 1) {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><p class="variableAnswers">x</p><input type="hidden" value="1" id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            } else {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><p class="variableAnswers">x</p><input id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            }
            if (i != 0) {
              $("#buttons_div").append('<p class="variableAnswers">+</p>');
            }
          }
            */
            var ans = dailyQuestions.parser.simplification("(" + questions[i] + ")");
            ans = dailyQuestions.parser.getArr("(" + ans + ")", 1);
            for (var j = 0; j < ans.length; j++) {
              if(ans[j][1] == "S"){
                ans.splice(j,1);
              }
            }
            var html = '<div class="gameoverInput">';
            for (var j = ans.length-1; j >= 0; j--) {
              var power = ans[j][1];
              if (power == 0) {
                html += '<input id="answer' + j + '"type="text" class="answers_daily"></input><input type="hidden" value="0" id="powerAnswer' + j + '"type="text" class="powerAnswers_daily"></input>';
              } else if (power == 1) {
                html += '<input id="answer' + j + '"type="text" class="answers_daily"></input><p class="variableAnswers_daily">x</p><input type="hidden" value="1" id="powerAnswer' + j + '"type="text" class="powerAnswers_daily"></input>';
              } else {
                html += '<input id="answer' + j + '"type="text" class="answers_daily"></input><p class="variableAnswers_daily">x</p><input id="powerAnswer' + j + '"type="text" class="powerAnswers_daily"></input>';
              }

              if (j != 0) {
                html += '<p class="variableAnswers_daily">+</p>';
              }
            }
            html += '</div>';
            $('#' + formName).append(html);

            $('<input/>').attr({
              type: 'button',
              value: 'Submit',
              style: 'width: 90px; float:right;height:30px;border:2px solid black;border-radius:5px;',
              onclick: 'dailyQuestions.validateAnswer(' + i + ')'
            }).appendTo('#' + formName);
          }
        } else if (successFail[i] == "-1") {
          //if fail,show the answer along with steps, dont show the input boxes
          document.getElementById("QuestionStatus_" + i).innerHTML = "Wrong";
          document.getElementById("QuestionStatus_" + i).style.color = "red";
          $("#form_" + i).remove();

          if (questions[i].indexOf('?') != -1) {
            var question = questions[i].split('?');
            dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
          } else {
            dailyQuestions.parser.simplification(questions[i]);
          }
          dailyQuestions.parser.steps.print("answerTable" + i);
        } else if (successFail[i] == "1") {
          //if success,show the answer along with steps, dont show the input boxes
          document.getElementById("QuestionStatus_" + i).innerHTML = "Correct";
          document.getElementById("QuestionStatus_" + i).style.color = "green";
          $("#form_" + i).remove();
          if (questions[i].indexOf('?') != -1) {
            var question = questions[i].split('?');
            dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
          } else {
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

  updateStats() {
    var successFail = localStorage.getItem('dailyQuestions_successFail');
    successFail = successFail.split(',');

    var success = 0;
    var fail = 0;
    var unsolved = 0;
    //collects the number of questions solved with its property
    for (var i = 0; i < successFail.length; i++) {
      if (successFail[i] == "1") {
        success++;
      } else if (successFail[i] == "-1") {
        fail++;
      } else if (successFail[i] == "0") {
        unsolved++;
      }
    }

    if (unsolved == "0") {
      //if all the questions are solved, show the user his success rate and erase the memory
      var successRate = 100 * success / (success + fail);
      alert("Score : " + successRate + "%");
      localStorage.removeItem("dailyQuestions_successFail");
      localStorage.removeItem("dailyQuestions");
      window.location.href = "home.php";
    }
    success = success.toString();
    fail = fail.toString();
    unsolved = unsolved.toString();
    //display in html
    document.getElementById("dailyQuestion_correct").innerHTML = success;
    document.getElementById("dailyQuestion_wrong").innerHTML = fail;
    document.getElementById("dailyQuestion_unsolved").innerHTML = unsolved;
    //update date so that next daily questions are going to be available after the user completes the daily questions
    $.ajax({
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "setDate.php", // Location of the service
      data: {
        "time": 1,
      },
      success: function(data) {
        data = $.trim(data);
      },
      fail: function(data) {}
    }); //end of ajax

  }

  validateAnswer(i) {

    var questions = localStorage.getItem('dailyQuestions');
    var successFail = localStorage.getItem('dailyQuestions_successFail');
    questions = questions.split(',');
    successFail = successFail.split(',');
    var formName = "form_" + i;
    var submittedAnswers_coefficient = [];
    var submittedAnswers_power = [];

    if (questions[i].indexOf('?') != -1) {
      var question = questions[i].split('?');
      var temp = dailyQuestions.parser.simultaneous(question[0], question[1], question[2], question[3], question[4], question[5]);
      var ans = [];
      ans[0] = [];
      ans[1] = [];
      ans[0][0] = temp[0];
      ans[1][0] = temp[1];
      ans[0][1] = "0";//indivates variable x
      ans[1][1] = "1";//indicates variable y
    } else {
      var ans = dailyQuestions.parser.simplification("(" + questions[i] + ")");
      ans = dailyQuestions.parser.getArr("(" + ans + ")", 1);
      for (var j = 0; j < ans.length; j++) {
        if (ans[j][1] == "S") {
          ans.splice(j, 1);
        }
      } 
    }
    //recieve submitted answers
    for (var j = 0;j < ans.length; j++) {
      submittedAnswers_coefficient[j] = document.forms[formName]["answer" + j].value;
      submittedAnswers_coefficient[j] = submittedAnswers_coefficient[j].replace(/ /g, '');
      submittedAnswers_coefficient[j] = submittedAnswers_coefficient[j].replaceAll('/', '$');
      //-----------------------------------------------------------------------
      submittedAnswers_power[j] = document.forms[formName]["powerAnswer" + j].value;
      submittedAnswers_power[j] = submittedAnswers_power[j].replace(/ /g, '');
      submittedAnswers_power[j] = submittedAnswers_power[j].replaceAll('/', '$');
    }
    var isCorrect = 1;
    var answers_coefficient = [];
    var answers_power = [];
    //changing the syntax of the answers so that they can be equal to each other
    for (var j = 0; j < ans.length; j++) {
      ans[j][1] = ans[j][1].replace('+','');
      answers_coefficient[j] = ans[j][0];
      answers_power[j] = ans[j][1];
      submittedAnswers_coefficient[j].replace("+","");
      submittedAnswers_power[j].replace("+","");
    }
    //if the submitted answers exists in the result arrays
    for (var j = 0; j < ans.length; j++) {
      var index = answers_power.indexOf(submittedAnswers_power[j]);
      if(index != -1){//if the power exist in the real answers
        //check the coefficient and if they match
        if (answers_coefficient[index] == submittedAnswers_coefficient[j]) {
          //removing the answer so that it can be valiadated only one time
          answers_coefficient.splice(index, 1);
          answers_power.splice(index, 1);
        }else{
          isCorrect = 0;
        }
      }else{
        isCorrect = 0;
      }
    }
    if (answers_power.length != 0 || answers_coefficient,length != 0) {
      isCorrect = 0;
    }


    if (isCorrect == 0) {
      document.getElementById("QuestionStatus_" + i).innerHTML = "Wrong";
      document.getElementById("QuestionStatus_" + i).style.color = "red";
      successFail[i] = "-1";
    } else {
      document.getElementById("QuestionStatus_" + i).innerHTML = "Correct";
      document.getElementById("QuestionStatus_" + i).style.color = "green";
      successFail[i] = "1";
    }
    dailyQuestions.parser.steps.print("answerTable" + i);
    $("#form_" + i).remove();

    var successFail_String = "";
    for (var j = 0; j < successFail.length; j++) {
      successFail_String += successFail[j] + ",";
    }
    successFail_String = successFail_String.substring(0, successFail_String.length - 1);
    localStorage.setItem('dailyQuestions_successFail', successFail_String);
    this.updateStats();
  }
}

class game_class {
  constructor() {
    this.timeLeft;
    this.point = 0;//score
    this.current_difficulty;//current difficulty level (1,2,3)
    this.current_level;//current year level
    this.levels;//levels selected --> queue
    this.levels_toIncrement; //number of times that level has to be incremented.
    //if there are 3 year groups selected, than 3 * 3(difficulty level) = 9 levels_toIncrement
    this.QUESTION_NUMBER = 1;//HTML DOM element (to show the question number)
    this.parser;
    //-------------
  }

  init() {
    //when the object is instantiated..
    this.parser = new simplifier();
    this.levels = this.levels.split(',');
    this.levels.pop();
    for (var i = 0; i < this.levels.length; i++) {
      this.levels[i] = parseInt(this.levels[i]);
    }
    //now levels are in an array form ex:[9,10,12]
    var tempQueue = new Queue();
    //put them in a queue
    for (var i = 0; i < this.levels.length; i++) {
      tempQueue.enqueue(this.levels[i]);
    }
    this.levels = tempQueue;
    this.levels_toIncrement = [];
    //--------------------------
    this.levels_toIncrement[0] = 1; //lower boundry of number of levels to increment
    this.levels_toIncrement[1] = this.levels.size() * 3; //upper boundry of number of levels to increment
    this.current_level = this.levels.dequeue();
    this.current_difficulty = 1;
    //remove the data that could be stored from the previous game from local storage
    localStorage.removeItem("question1");
    localStorage.removeItem("question2");
    localStorage.removeItem("question3");
    localStorage.removeItem("point");
    localStorage.setItem('point', 0);
  }

  countdown(timeLeft) {
    //timer
    var display = document.querySelector('#time');
    display.textContent = "time left: " + this.timeLeft;
    this.timeLeft--;
    var timer = setTimeout('game.countdown(' + this.timeLeft + ')', 1000);
    this.check();
  }

  increment(time) {
    //adds time to the timer
    this.timeLeft += time;
    this.check();
  }

  decrement(time) {
    //decrements time from timer
    this.timeLeft -= time;
    this.check();
  }

  check() {
    //checks if the time left is less than zero
    if (this.timeLeft < 0) {
      var display = document.querySelector('#time');
      display.textContent = "The End";

      document.getElementById("quitbutton").click();
    }
  }

  checklevel() {
    //checks current level and score to determine if the current level should be increased
    /*
      if level is less than 3, than increment level
      if level is 3, than check if there is a higher level selected
        if there is, increment the year group and make the difficulty level 1
        if not, then dont change anything since current difficulty level and year level is the maximum overall difficulty
    */
    if ((this.point / 100 >= this.levels_toIncrement[0]) && (this.levels_toIncrement[0] < this.levels_toIncrement[1])) {
      //if the point is range between the total level to increment and lower boundry...
      //ex:  point = 240,  1 < 2.4 < 9,  levels = [9,10,12] --> 3 difficulty each so 3 year level x 3 difficulty = 9total levels to increment
      this.current_difficulty += 1;
      this.levels_toIncrement[0] += 1;
      //increment lower boundry and current difficulty
      //therefore it only reacher here if the current score exceeds another 100 points
      if (this.current_difficulty % 4 == 0) {
        //if the 3 difficulty level is completed, then next year group can be selected
        if (this.levels.size() != 0) {
          //if there are still year groups levels left in the queue
          //next year group and set difficulty to base which is 1
          this.current_difficulty = 1;
          this.current_level = this.levels.dequeue();
        } else {
          //if the current level is highest level, dont change anything
          this.current_difficulty = 3;
        }
      }
    }

  }

  getStats(level, difficulty) {
    //statistics of the levels
    //it includes time to increment,and award point ex: if the question selected 
    //is level 9 and difficulty 1 then time to increment is 30 and point 
    //to award is 10
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
            score = 65;
            break;
        }
        break;
    }

    time += 15;
    //after the interviews, I decided to add 15 seconds to every level and difficulty
    return [time, score];
  }

  getQuestion() {
    //main game loop
    //first it checks the level and difficulty
    this.checklevel();
    $.ajax({
      //it request question from question-get.php according to level and difficulty
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "question-get.php",
      data: {
        "level": this.current_level,
        "difficulty": this.current_difficulty
      }, // Location of the service
      success: function(data) {
        //if the data is successfully retrieved from the database, start the preperations
        //empty the question boxes so that it wont overlap when the next question is called
        jQuery('#buttons_div').html('');
        MathML_Render('<math xmlns="http://www.w3.org/1998/Math/MathML"></math>', "expression1"); //cleans question box
        MathML_Render('<math xmlns="http://www.w3.org/1998/Math/MathML"></math>', "expression2"); //cleans question box
        // data = question, answer, id
        data = $.trim(data);
        data = data.split("#");
        //data = [question,answer,id]
        //data[0] = "((20 / 2) * (9/1 + -9/5 - 9/2)),((10 - 9) * -(-9 - 18)),(16 - 2 * -11),(13 - 7/3),((11 + 8/5 * (12 + 14)) + (8 / 3)),(4 * 1)";
        //data[1] = "134$81,-20$81";
        //data[2] = 34 --> this is going to be used for updating question statistics after the player solves question
        //this allows the questions to have dynamic difficulty
        if (data[0].indexOf(",") != -1) { 
          //if simultaneous equations
          //because the coefficients are splited with comma in the database
          var question = data[0].split(',');
          //tokenize the parts of the coefficients of simultaneous equestions
          var arr1 = game.parser.getArr('(' + question[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question[2] + ')', 1);
          //tokenized parts are going to be translated into mathml code
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          //prepare and render the first equation
          var question_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="float:left;">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML1, "expression1");

          //tokenize the parts of the coefficients of simultaneous equestions
          arr1 = game.parser.getArr('(' + question[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question[5] + ')', 1);
          //tokenized parts are going to be translated into mathml code
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          //prepare and render the second equation
          var question_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question_MathML2, "expression2");

          //there are going to be two input boxes which are the values of x and y
          //prepare the input boxes
          $("#buttons_div").append('<input id="answer0"type="text"class="answers"></input><input id="powerAnswer0" type="hidden" value="0"></input>');
          $("#buttons_div").append('<input id="answer1"type="text"class="answers"></input><input id="powerAnswer1" type="hidden" value="1"></input>');
          document.getElementById('answer0').style.width = "300px";
          document.getElementById('answer1').style.width = "300px";
          document.getElementById('answer0').placeholder = "value of x";
          document.getElementById('answer1').placeholder = "value of y";

          //prepare the answers so that it can be compared when the user submits their answers
          var temp = data[1].split(',');
          var answers = [];
          answers[0] = [];
          answers[1] = [];
          answers[0][0] = temp[0];
          answers[1][0] = temp[1];
          answers[0][1] = "0";//it means the variable x 
          answers[1][1] = "1";//it means variable y
          //so if the power is 0, indicates x.
          //power 1, indicates y.
          //this is used to keep the answer checking consistent

        } else { 
          //if algebraic expression
          //directly tokenize the question and translate it to the mathml code
          var question_MathML = data[0];
          question_MathML = '(' + question_MathML + ')';
          question_MathML = game.parser.getArr(question_MathML, 1);
          question_MathML = game.parser.MathML_translator(question_MathML);
          //font size of the questions can be changed below

          var size;//this size variable is going to determine amplification of its size in 
          //the screen so that every question can be fited into the game box
          //the length and size has to have inverse relation ship
          //as the length of the question gets larger, the amplification should get smaller
          //SQL --> select avg(length(question)) from questions where level=9
          //average length of year 9 = 13.2440   characters (sample size = 250 questions)
          //average length of year 10 = 23.3716  characters (sample size = 200 questions)
          //average length of year 11 = 46.0320  characters (sample size = 250 questions)
          //average length of year 12 = 113.8000 characters (sample size = 250 questions)

          //optimum amplification for year 9 = 120%
          //optimum amplification for year 12 = 80%

          //data points (13.2440,120) (23.3716,115) (46.0320,105) (113.8000,80)
          //best fit line --> y = -0.392737x + 124.288054
          size = -0.392737*(data[0].length) + 124.288054;//actually quite accurate, statistics <3

          question_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: ' + size + '%;">' + question_MathML + '</math>';
          //--- sending question to the game ---//
          //render the mathml code 
          MathML_Render(question_MathML, "expression1");

          //--- Preparing the input texts for the inputs ---//


          var answers = "(" + data[1] + ")";
          answers = game.parser.getArr(answers, 1);
          //tokenize the answer
          //get rid of the operators since only operator that can be in there is +
          //if it is simplified by my algorithm (my parser)
          for (var i = 0; i < answers.length; i++) {
            if (answers[i][1] == 'S') {
              answers.splice(i, 1);
            }
          }

          for (var i = answers.length - 1; i>=0 ; i--) {
            var power = answers[i][1];
            if (power == 0) {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><input type="hidden" value="0" id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            } else if (power == 1) {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><p class="variableAnswers">x</p><input type="hidden" value="1" id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            } else {
              $("#buttons_div").append('<input id="answer' + i + '"type="text" class="answers"></input><p class="variableAnswers">x</p><input id="powerAnswer' + i + '"type="text" class="powerAnswers"></input>');
            }
            if (i != 0) {
              $("#buttons_div").append('<p class="variableAnswers">+</p>');
            }
          }
          /*
          //---------------previous input boxes-------------------//
          //prepare the input boxes according to the powers of them
          for (var i = 0; i < answers.length; i++) {
            $("#buttons_div").append('<input id="answer' + i + '"type="text"class="answers"></input>');
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

          //prepare the withs of the input boxes
          var widthProportion = (600) - 5 + (5 * answers.length + 1); // space available
          widthProportion = widthProportion / answers.length;
          widthProportion = widthProportion.toString();
          widthProportion = widthProportion + 'px';
          //change the width of the input boxes
          for (var i = 0; i < answers.length; i++) {
            document.getElementById('answer' + i).style.width = widthProportion;
          }
          */
        }

        //------------------ the question number in the game (HTML DOM) -------------------------//
        document.getElementById('QuestionNumber').innerHTML = game.QUESTION_NUMBER;
        game.QUESTION_NUMBER++;
        
        //at this point, the method is vaiting for button presses
        document.getElementById('quitbutton').onclick = function() {
          //if the quit button is pressed
          //first disable the buttons
          $('#quitbutton').attr('disabled', 'disabled');
          $('#nextbutton').attr('disabled', 'disabled');
          var bar1 = document.getElementById('he1');
          var bar2 = document.getElementById('he2');
          var bar3 = document.getElementById('he3');
          var pointDOM = document.getElementById('point');

          var arr = game.getStats(game.current_level, game.current_difficulty);
          game.point -= arr[1];
          // decrement point according to point punnishment of the current question
          pointDOM.innerHTML = game.point;
          //store the point in the local storage
          localStorage.setItem('point', game.point);

          $.ajax({//update question stats in database
            type: "GET", //GET or POST or PUT or DELETE verb
            url: "answer.php", // Location of the service
            data: {
              "isCorrect": 0,
              "id": data[2]
            },
          }); //end of ajax

          //store the question in local storage so that the solution of it can be solved in game-over.php page
          //then goto finisgame method
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
          //if next question button is pressed
          $('#quitbutton').attr('disabled', 'disabled');
          $('#nextbutton').attr('disabled', 'disabled');
          //first, disable the buttons and allow them to be functioning after 2 seconds
          //this prevents button spamming problem --> SEE DOCUMENTATION FOR THIS PROBLEM
          setTimeout(function() {
            $('#quitbutton').removeAttr('disabled');
          }, 2000);
          setTimeout(function() {
            $('#nextbutton').removeAttr('disabled');
          }, 2000);
          var submittedAnswers_coefficient = [];
          var submittedAnswers_power = [];
          //recieve submitted answers
          for (var i = 0; i < answers.length; i++) {
            submittedAnswers_coefficient[i] = document.getElementById("answer" + i).value;
            submittedAnswers_coefficient[i] = submittedAnswers_coefficient[i].replace(/ /g, '');
            submittedAnswers_coefficient[i] = submittedAnswers_coefficient[i].replaceAll('/', '$');
            //-----------------------------------------------------------------------
            submittedAnswers_power[i] = document.getElementById("powerAnswer" + i).value;
            submittedAnswers_power[i] = submittedAnswers_power[i].replace(/ /g, '');
            submittedAnswers_power[i] = submittedAnswers_power[i].replaceAll('/', '$');
          }

          //---------------------comparing the real answers to the submited answers----------------------//
          var isCorrect = 1;
          var answers_coefficient = [];
          var answers_power = [];
          //changing the syntax of the answers so that they can be equal to each other
          for (var i = 0; i < answers.length; i++) {
            answers[i][1] = answers[i][1].replace('+','');
            answers_coefficient[i] = answers[i][0];
            answers_power[i] = answers[i][1];
            submittedAnswers_coefficient[i].replace("+","");
            submittedAnswers_power[i].replace("+","");
          }
          //if the submitted answers exists in the result arrays
          for (var i = 0; i < answers.length; i++) {
            var index = answers_power.indexOf(submittedAnswers_power[i]);
            if(index != -1){//if the power exist in the real answers
              //check the coefficient and if they match
              if (answers_coefficient[index] == submittedAnswers_coefficient[i]) {
                //removing the answer so that it can be valiadated only one time
                answers_coefficient.splice(index, 1);
                answers_power.splice(index, 1);
              }else{
                isCorrect = 0;
              }
            }else{
              isCorrect = 0;
            }
          }
          if (answers_power.length != 0 || answers_coefficient,length != 0) {
            isCorrect = 0;
          }
          //if correct becomes 0, then the answers submited are wrong
          //---------------------comparing the real answers to the submited answers----------------------//

          //---------------------- changing the status of game due to the answererd question ---------------------//
          var bar1 = document.getElementById('he1');
          var bar2 = document.getElementById('he2');
          var bar3 = document.getElementById('he3');
          var pointDOM = document.getElementById('point');

          // arr is the stats of the question
          //it includes the information such as how many game.points to add and how many minues to add.
          var arr = game.getStats(game.current_level, game.current_difficulty);
          if (isCorrect == 1) { //if correct
            game.increment(arr[0]);
            game.point += arr[1];
            pointDOM.innerHTML = game.point;
          } else if (isCorrect == 0) { //if wrong
            //make one of the bars red, dont add time, point punnishment
            game.point -= arr[1];
            pointDOM.innerHTML = game.point;

            //if all the bars are red, go to finishgame method
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

          $.ajax({//update the question statistics in database
            type: "GET", //GET or POST or PUT or DELETE verb
            url: "answer.php", // Location of the service
            data: {
              "isCorrect": isCorrect,
              "id": data[2]
            },
          }); //end of ajax
          //get new question (recursive call)
          game.getQuestion();
        }
      },
      fail: function(data) {}
    });

  }

  finishgame() {
    var newScore = localStorage.getItem('point');
    $.ajax({//users score is sent to the php code to test if it is better than his current max score
      type: "GET", //GET or POST or PUT or DELETE verb
      url: "point-insert.php", // Location of the service
      data: {
        "point": newScore
      },
      success: function(data) {
        //data indicates the message that is going to be returned the user
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
    //the page is directed to game-over.php to show the questions that the user got wrong
    //when the game onloads (document is ready) , gameover method runs
    window.location.href = "game-over.php";
  }

  gameover() {
    this.parser = new simplifier();
    document.getElementById("amount").value = localStorage.getItem('point');
    //displays the score in HTML
    currentSlide(1);
    var question1 = localStorage.getItem('question1');
    var question2 = localStorage.getItem('question2');
    var question3 = localStorage.getItem('question3');

    //the user might have gotten no questions wrong however he might have ran out
    //of time. In this case, there is going to be only one question displayed.

    if (question1 != null) {
      //document.getElementById("questi1").innerHTML = question1;
      $(document).ready(function() {
        question1 = localStorage.getItem('question1');
        if (question1.indexOf(',') != -1) {
          //if the question is simultaneous equations
          var question1 = question1.split(',');
          //preparing mathml code
          var arr1 = game.parser.getArr('(' + question1[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question1[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question1[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question1_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question1_MathML1, "wrong1");

          arr1 = game.parser.getArr('(' + question1[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question1[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question1[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question1_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question1_MathML2, "wrong10");
        } else {
          var question1_MathML = '(' + question1 + ')';
          question1_MathML = game.parser.getArr(question1_MathML, 1);
          question1_MathML = game.parser.MathML_translator(question1_MathML);
          question1_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question1_MathML + '</math>';
          MathML_Render(question1_MathML, "wrong1");
        }
      });
      if (question1.indexOf(',') != -1) {
        //if the question is simultaneous equations
        var tempQuestion1 = question1.split(',');
        var answer1 = game.parser.simultaneous(tempQuestion1[0], tempQuestion1[1], tempQuestion1[2], tempQuestion1[3], tempQuestion1[4], tempQuestion1[5]);
      } else {
        var answer1 = game.parser.simplification(question1);
      }
      //printing steps by step explanation in to the table at HTML
      game.parser.steps.print('answerTable1');
      game.parser.steps.clearSteps();
    }
    if (question2 != null) {
      //document.getElementById("questi2").innerHTML = question2;
      $(document).ready(function() {
        question2 = localStorage.getItem('question2');
        if (question2.indexOf(',') != -1) {
          var question2 = question2.split(',');
          var arr1 = game.parser.getArr('(' + question2[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question2[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question2[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question2_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question2_MathML1, "wrong2");

          arr1 = game.parser.getArr('(' + question2[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question2[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question2[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question2_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question2_MathML2, "wrong20");
        } else {
          var question2_MathML = '(' + question2 + ')';
          question2_MathML = game.parser.getArr(question2_MathML, 1);
          question2_MathML = game.parser.MathML_translator(question2_MathML);
          question2_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question2_MathML + '</math>';
          MathML_Render(question2_MathML, "wrong2");
        }
      });
      if (question2.indexOf(',') != -1) {
        var tempQuestion2 = question2.split(',');
        var answer2 = game.parser.simultaneous(tempQuestion2[0], tempQuestion2[1], tempQuestion2[2], tempQuestion2[3], tempQuestion2[4], tempQuestion2[5]);
      } else {
        var answer2 = game.parser.simplification(question2);
      }
      game.parser.steps.print('answerTable2');
      game.parser.steps.clearSteps();
    }
    if (question3 != null) {
      //document.getElementById("questi3").innerHTML = question3;
      $(document).ready(function() {
        question3 = localStorage.getItem('question3');
        if (question3.indexOf(',') != -1) {
          var question3 = question3.split(',');
          var arr1 = game.parser.getArr('(' + question3[0] + ')', 1);
          var arr2 = game.parser.getArr('(' + question3[1] + ')', 1);
          var arr3 = game.parser.getArr('(' + question3[2] + ')', 1);
          var questionMathml1 = game.parser.MathML_translator(arr1);
          var questionMathml2 = game.parser.MathML_translator(arr2);
          var questionMathml3 = game.parser.MathML_translator(arr3);

          var question3_MathML1 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question3_MathML1, "wrong3");

          arr1 = game.parser.getArr('(' + question3[3] + ')', 1);
          arr2 = game.parser.getArr('(' + question3[4] + ')', 1);
          arr3 = game.parser.getArr('(' + question3[5] + ')', 1);
          questionMathml1 = game.parser.MathML_translator(arr1);
          questionMathml2 = game.parser.MathML_translator(arr2);
          questionMathml3 = game.parser.MathML_translator(arr3);

          var question3_MathML2 = '<math xmlns="http://www.w3.org/1998/Math/MathML">' + questionMathml1 + "<mi>x</mi><mo>+</mo>" + questionMathml2 +
            "<mi>y</mi><mo>=</mo>" + questionMathml3 + '</math>';
          MathML_Render(question3_MathML2, "wrong30");
        } else {
          var question3_MathML = '(' + question3 + ')';
          question3_MathML = game.parser.getArr(question3_MathML, 1);
          question3_MathML = game.parser.MathML_translator(question3_MathML);
          question3_MathML = '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size: 120%;">' + question3_MathML + '</math>';
          MathML_Render(question3_MathML, "wrong3");
        }
      });
      if (question3.indexOf(',') != -1) {
        var tempQuestion3 = question3.split(',');
        var answer3 = game.parser.simultaneous(tempQuestion3[0], tempQuestion3[1], tempQuestion3[2], tempQuestion3[3], tempQuestion3[4], tempQuestion3[5]);
      } else {
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
          //makes the power supscript
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
        
        //changes the syntax if the operand is a sub-expression
        if (operand1[1] == "A") {
          operand1 = operand1[0];
          for (var i = 0; i < operand1.length; i++) {
            if (operand1[i][1] == "S") {
              //distirbuting the sign to the operands
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
        //goes to individual methods depending on the sign
        var result;
        if (operator == "*") {
          result = this.multiply(operand1, operand2);
        } else if (operator == "/") {
          result = this.divide(operand1, operand2);
        }

        return result;
      }

      directInsert(operand, operator) {
        //this method is used to directly insert/merge the coefficient of the final
        //results to each other. The results are stored locally in the object, see the attributes
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
          //changes the sign of the operand according to the operator given
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
        //simplifying fraction for powerFloat if it is written in fraction syntax --> ex: 4$3;
        var powerFloat = (powerString.indexOf("$") < 0) ? parseFloat(powerString) : parseFloat(powerString.substring(0, powerString.indexOf("$"))) /
          parseFloat(powerString.substring(powerString.indexOf("$") + 1, powerString.length));
        //arr.splice(index, 0, item); // inserting into the array
        var index = this.insertAt(powerFloat, resultArray_power_float);
        //binary search in the power float array

        if (resultArray_power_float[index] == powerFloat) {
          // already registered so add the coefficient to the already registered coefficient
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
        // this subroutine modifies the resultant arrays and returns them
      }

      multiply(operand1, operand2) {
        var resultArray_power_float = [];
        var resultArray_power_string = [];
        //there are two versions of power because the returned power has to be 
        //in the form of string (if it is a fraction ex: 3$2). However
        //when a new coefficient has to be inserted, in order to insert in
        //sorted order, binary insertion has to be used but it only works if 
        //the array is given in integer since the syntax of the fractions wouldn't
        //be understandable. Therefore keeping a float array helps to increase the speed of
        //the process and allows the new coefficient to be inserted into the right place 

        var resultArray_coefficient = [];
        var resultArray;

        /*
        result array allow the algorithm to merge the same variables together after the operation
        is carried out
        */

        //producing solution steps ...
        var step = "(";
        for (var i = 0; i < operand1.length; i++) {
          for (var j = 0; j < operand2.length; j++) {
            //for loop in for loop --> cross multiolication of every number if there are sub-expressions
            var temp = this.insert(this.makeCalculation(operand1[i][0], operand2[j][0], "*") + "," + this.makeCalculation(operand1[i][1], operand2[j][1],
              "+"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power = this.makeCalculation(operand1[i][1], operand2[j][1], "+");//add the powers together
            var coefficient = this.makeCalculation(operand1[i][0], operand2[j][0], "*");//multiply the coefficients
            /*
             ex: 5x * 4x^2
             = (5*4)x^[1+2]
             = 20x^3
            */
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
        //preparing result array --> is going to include coefficient and powers of results
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
        //returns the result array and the step that is generated at multiplication stage so
        //that it can be added to step by step explanation pile
        return [resultArray, ("multiply : " + step)];
      }

      divide(operand1, operand2) {
        if (operand2.length > 1) {
          //currently the simplifier can not handle (does not need to, check the input section in documentation)
          //more than one variable division therefore it is going to indicate as unsolvable
          this.controlVariable_processor = false;
        } else {
          var resultArray_power_float = [];
          var resultArray_power_string = [];
          var resultArray_coefficient = [];
          var resultArray;
          var step = "(";

          for (var i = 0; i < operand1.length; i++) {
            var temp = this.insert(this.makeCalculation(operand1[i][0], operand2[0][0], "/") + "," + this.makeCalculation(operand1[i][1], operand2[0][1],
              "-"), resultArray_coefficient, resultArray_power_float, resultArray_power_string);
            // sending -> products of coefficients , addition of powers
            //ex operand1 = 2x^2   operand2 = 3x^3
            //insert ("6,5",resultArrays);
            var power = this.makeCalculation(operand1[i][1], operand2[0][1], "-");
            var coefficient = this.makeCalculation(operand1[i][0], operand2[0][0], "/");
            //producing solution steps ...
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
          //preparation of result array
          var tempArr = [resultArray_coefficient.length];
          for (var i = 0; i < resultArray_coefficient.length; i++) {
            tempArr[i] = [];
            tempArr[i][0] = resultArray_coefficient[i];
            tempArr[i][1] = resultArray_power_string[i];
          }
          resultArray = [2];
          resultArray[0] = tempArr;
          resultArray[1] = "A";
          //returns the result array and the step that is generated at multiplication stage so
          //that it can be added to step by step explanation pile
          return [resultArray, ("divide : " + step)];
        }
      }

      add_subtract(operand) {
        for (var i = 0; i < operand.length; i++) {
          var temp = this.insert(operand[i][0] + "," + operand[i][1], this.resultArray_coefficient, this.resultArray_power_float, this
            .resultArray_power_string);
          //merges the same coefficient together and locally stores them in the object.
          this.resultArray_coefficient = temp[0];
          this.resultArray_power_float = temp[1];
          this.resultArray_power_string = temp[2];
        }
      }

      resultString() {
        var resultString = "(";
        if (this.resultArray_coefficient.length == 0) {
          //if there arent any coefficients left, that means the
          //result is zero
          return "(0)";
        }
        //constructuon of the result string from the syntax used
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
          this method is used to carry out a mathematical operation between
          two integers or fractions.

          ex operand = 5$4 ,56,
        */
        var numerator1;
        var numerator2;
        var denominator1;
        var denominator2;

        //if the operands are fractions, it splits them into numerator and denominator
        //if the operand is an integer, then the denominator is 1
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
          //make the bases same and add the numerators
          numerator1 = numerator1 * denominator2;
          numerator2 = numerator2 * denominator1;
          numerator1 = numerator1 + numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "-") {
          //make the bases same and subtract the numerators
          numerator1 = numerator1 * denominator2;
          numerator2 = numerator2 * denominator1;
          numerator1 = numerator1 - numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "*") {
          //multiply numerators and denominators with each other
          //than get the greatest common factor and divide both by
          //the gcf
          numerator1 = numerator1 * numerator2;
          denominator1 = denominator1 * denominator2;
          var d = this.gcd(numerator1, denominator1);
          numerator1 = numerator1 / d;
          denominator1 = denominator1 / d;
        } else if (operator == "/") {
          //flip the operator2 then carry out multiplication
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
          //the sign at denominator can be changed with numerator
          //to have a positive denominator
          denominator1 = -denominator1;
          numerator1 = -numerator1;
        }

        if (denominator1 == 1) {
          //therefore the solution is an integer
          result = numerator1.toString();
        } else if (denominator1 == 0) {
          //mathematics error. No solution when dividing by zero
          this.controlVariable_processor = false;
          result = "0";
        } else {
          //construct result fraction
          result = numerator1.toString() + "$" + denominator1.toString();
        }

        return result;
      }

      isNumeric(character) {
        //checks if the character / string is numeric
        //fractions are considered to be numeric
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
        //checks of the character is an operator
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
        //binary search
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
    //reverse tokenizer
    //this method is specificly used for generating solution steps
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
    //adding parenthesis at both end of the expression so that it can be tokenized
    while (true) {
      //for better understanding, check 'Simplification of Tokens' chapter in documentation
      if (expression.charAt(index) == "(") {
        stack.push(index);
      } else if (expression.charAt(index) == ")") {
        var expression_bit = (expression.substring(stack.pop(), index + 1));
        //get the sub-expreesion 
        var arr = this.getArr(expression_bit, 1);
        //tokenizing the sub-expression
        if (typeof arr == "undefined") {
          this.controlVariable = false;
          return false;
        }
        this.steps.push("simplifying = " + this.constructArr(arr));
        var operand_Stack = new Stack();
        var operator_Stack = new Stack();
        var operand2;
        var operand1;
        var operator;
        var tempExpression = this.constructArr(arr);
        //first, the operands and operators have to be splited into two stacks
        //while this happens, multiplication and division can be carried out
        //check documentation to get a more detailed explanation
        for (var i = 0; i < arr.length; i++) {
          if (i % 2 == 0) { // even so --> operand
            operand_Stack.push(arr[i]);
            if ((operator_Stack.size() != 0) && (operator_Stack.peek() == "*" || operator_Stack.peek() == "/")) {
              //if the operand is eighter multiplecation or division, carry the calculation out
              operand2 = operand_Stack.pop();
              operand1 = operand_Stack.pop();
              operator = operator_Stack.pop();
              //send the operands and operator to the process method to be evaluated
              var res = this.processor.process(operand1, operand2, operator);
              //add the result to the operator stack
              operand_Stack.push(res[0]);
              // add steps :
              this.steps.push("for : " + this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator + " " + this
                .constructArr([operand2]).substring(1, this.constructArr([operand2]).length - 1));
              this.steps.push(res[1]);
              this.steps.push(this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator + " " + this.constructArr(
                [operand2]).substring(1, this.constructArr([operand2]).length - 1) + " = " + this.constructArr([operand_Stack.peek()]).substring(1, this
                .constructArr([operand_Stack.peek()]).length - 1));
              tempExpression = tempExpression.replace(this.constructArr([operand1]).substring(1, this.constructArr([operand1]).length - 1) + " " + operator +
                " " + this.constructArr([operand2]).substring(1, this.constructArr([operand2]).length - 1), this.constructArr([operand_Stack.peek()])
                .substring(1, this.constructArr([operand_Stack.peek()]).length - 1));
              this.steps.push("update = " + tempExpression);
              // end of adding steps
            }
          } else if (i % 2 == 1) { // even so --> operator
            operator_Stack.push(arr[i][0]);
          }
        }

        //--flip the stacks so that the expression can be evaluated from left to right
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
        //end of flipping stacks
        for (var i = 0; i < temp + 1; i++) {
          if (i == 0) {
            //collect the same terms in one array --> send it to direct insert so that 
            //it can be collected in processor object
            this.processor.directInsert(operand_Stack.pop(), "+");
          } else {
            //same, however the operand is mutiplied with operator so if the operator is negative
            //the operand will be negative
            this.processor.directInsert(operand_Stack.pop(), operator_Stack.pop());
          }
        }
        index = index + this.processor.resultString().length - expression_bit.length;
        this.steps.push("= " + (this.processor.resultString().substring(1, this.processor.resultString().length - 1)));
        //replace the sub-expression with the simplified version withn the whole expression
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
    //this method solves similtaneous (linear) equations
    //first it simplifies every coefficients if they are expressions
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
    this.steps.push("Ax + By = C          Dx + Ey = F");
    this.steps.push("determinant = (A*E) - (B*D)");
    //calculate the determinant
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
    //check the documentation to understand how it works
    return [x, y, checkarr];
  }

  getArr(expression, i) {
    var arr = this.getArr_Recursive(expression, i);
    //this method seems like the duplicate of getArr_Recursive but it 
    //only returns the end product because the program does not need the
    //return index used in the recursive method.
    return arr[0];
  }

  getArr_Recursive(expression, i) {
    // start should be i = 1 if the first character is open parenthesis
    //this method is the tokenizer method. it takes the expression in the string
    //form and translates it to the syntax used in this parser. check documentation
    //to see the syntax
    var arr = [];
    var arrCount = 0;

    for (; i < expression.length; i++) {
      if (this.processor.isNumeric(expression.charAt(i)) == true) {
        //if the character is a number
        arr[arrCount] = [];
        arr[arrCount][0] = "";
        i--;
        while (true) {
          i++;
          if (this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$") {
            //keep adding the character if it is a number or fraction sign which is '$'
            arr[arrCount][0] += expression.charAt(i);
          } else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
            //if the next character is x check the power 
            if (expression.charAt(i + 1) == "^" && expression.charAt(i + 2) == "[") {
              //if it includes ^, that means the power is other than 1
              i += 2;
              //check if it includes the sign of the power
              if (expression.charAt(i + 1) == '+' || expression.charAt(i + 1) == '-') {
                arr[arrCount][1] = expression.charAt(i + 1);
                i++;
              } else {
                //if it does not, put + for the sign.
                arr[arrCount][1] = "+";
              }
              while (true) {
                i++;
                //keep adding the character to the power until the it finds the closed brackets
                if (this.processor.isNumeric(expression.charAt(i)) == true || expression.charAt(i) == "$") {
                  arr[arrCount][1] += expression.charAt(i);
                } else if (expression.charAt(i) == ']') {
                  break;
                } else {// if the character is unexpected
                  this.controlVariable = false;
                  break;
                }
              }
            } else {//if there is no "^", then the power of the variable is 1.
              arr[arrCount][1] = "+1";
              break;
            }
          } //end of if current character is x
          else {
            // if there is no x, then it is a number so x to the power of zero
            if (arr[arrCount][1] == null) {
              arr[arrCount][1] = "0";
            }
            i--;
            break;
          }
        }
        arrCount++;
      } else if (expression.charAt(i) == "x" || expression.charAt(i) == "X") {
        //if the current character is x, this means that it is a variable with 
        //coefficient of 1.
        arr[arrCount] = [];
        arr[arrCount][0] = "1";
        if (expression.charAt(i + 1) == "^" && expression.charAt(i + 2) == "[") {
          //checks the power
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
        } else {//if there is no power meaning that power of 1 indicated
          arr[arrCount][1] = "+1";
        }
        arrCount++;
      } else if (expression.charAt(i) == '(') {
        //if it is an open parenthesis, this indicates that there is a sub expression within
        //the expression therefore the method will recursively call itself then add it to the whole
        //expression to create tree like structure. Check documentation to see how this works in detail.
        arr[arrCount] = [];
        arr[arrCount][1] = "A"; // symbolyzing array and subexpression(S is taken therefore A); 
        var temp = this.getArr_Recursive(expression, i + 1);
        arr[arrCount][0] = temp[0];//the sub expression added to the whole
        //dont forget to increment i;
        i = temp[1];
        arrCount++;
      } else if (this.processor.isOperator(expression.charAt(i)) == true) {
        //if the character is an operator
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

        the aim is to have operands in odd number indicies, and operators in even indicies
        ex: {8x, + , 23, - ,7 ,*, 2}
        */
        var temp_i = i;//this is the index which the program has to continue from if it when it is returned
        i = 0;
        while (true) {
          if (typeof arr[i] == 'undefined') {
            break;
          }

          if (i % 2 == 0 && arr[i][1] == 'S') {
            if (arr[i][0] == "+" || arr[i][0] == "-") {
              if (arr[i + 1][0] == "+" || arr[i + 1][0] == "-") {
                //if there are two consequtive operators that arent multiplication or division
                //combine them
                //if they are same, the merged operator will be addition
                //if they are different, it is subtraction
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
                //from 'A' to '1 * A' to keep the syntax consistent
                arr[i][0] = arr[i][0] + "1";
                arr[i][1] = "0";
                arr.insert(i + 1, "");
                arr[i + 1] = [];
                arr[i + 1][0] = "*";
                arr[i + 1][1] = "S";
                i += 2;
                //[23,*,A,5]
              } else if (this.processor.isNumeric(arr[i + 1][0]) == true) {
                //if the element is an operand, multiply it by the sign to neturalize sign
                arr[i + 1][0] = this.processor.makeCalculation(arr[i + 1][0], arr[i][0] + "1", "*");
                arr.splice(i, 1);
                i--;
              } else {
                //unexpected;
                this.controlVariable = false;
              }
            } else {
              this.controlVariable = false;
            }
          }
          i++;
        }

        if (arr[arr.length - 1][1] == "S") {
          //if the last element is an operator, there is something wrong with the expression
          //example : 6 * 5x +
          //it has to start and end with an operand
          this.controlVariable = false;
        }
        //returns the product and the return index to use if the expression is a sub expression
        return [arr, temp_i];
      }
    }
  }

  MathML_translator(arr) {
    //works same as simplification method but instead of evaluation
    //it adds statements together to construct mathml code
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
    //flipping stacks
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
    result = result.replaceAll("*","&#8290;");//replaces * with invisible multiplication
    return result;
  }
}

class questionGenerator {
  constructor() {
    this.parser = new simplifier();
    this.controlVariable = true;
    /*
    control variable makes sure that any question generated that
    can not be solved can be detected
    */
  }

  generateQuestion(level, type) {
    this.controlVariable = true;
    //sets controlVariable to true because the method can be recursively 
    //called. the method has to assume that the question generated is true
    //otherwise the method would call itself infinitly many times because
    //all the questions would assumed to be unsolvable
    var question;
    var answer;

    /*
    switch case structure:

    switch (type of the question){
      switch levels...
    }
    
    * this allows that more topics can be added in the future
    without changing the structure.
    */


    switch (type) {
      case "algebraic_expression":
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
        // in this loop, the symbols are changed with the literal mathematical operators and operands
        // basicly template is constructed with content
        for (var i = 0; i < expression.length; i++) {

          if (expression.charAt(i) == 'C') {// C --> coefficient
            expression = expression.slice(0, i) + this.getCoefficient() + expression.slice(i + 1, expression.length);
          } else if (expression.charAt(i) == 'S') {// S --> sign (operator)
            expression = expression.slice(0, i) + this.getSign() + expression.slice(i + 1, expression.length);
          } else if (expression.charAt(i) == 'P') {// P --> power (small int -4 to 4)
            var r = Math.floor(Math.random() * 1); //0 or 1, 50% chance to be negative
            if (r == 0) {//1 to 4
              expression = expression.slice(0, i) + (Math.floor(Math.random() * 2) + 2) + expression.slice(i + 1, expression.length);
            } else if (r == 1) {//-1 to 4
              expression = expression.slice(0, i) + (-(Math.floor(Math.random() * 2)) - 2) + expression.slice(i + 1, expression.length);
            }
          } else if (expression.charAt(i) == 'N') {// N --> number (range depends on the level)
            if (level > 10) {//level 11,12
              var isInt = Math.floor(Math.random() * 10);
              if (isInt < 3){ //30 percent change of being a fraction
                var temp1 = Math.floor(Math.random() * 10) + 1;
                var temp2 = Math.floor(Math.random() * 5) + 1;
                var ss = temp1.toString() + '/' + temp2.toString();
              } else {//70 percent change of being an whole number
                var temp = Math.floor(Math.random() * 20) + 1;//range 1 to 20
                var ss = temp.toString();
              }
              expression = expression.slice(0, i) + ss + expression.slice(i + 1, expression.length);
            } else {//level 9,10
              expression = expression.slice(0, i) + (Math.floor(Math.random() * 15) + 1) + expression.slice(i + 1, expression.length);
              //number range 1 to 15
            }
          }
        }
        question = expression;
        //,ales the parser solve the question so that the question can be checked if it is solvable
        answer = this.parser.simplification(question);
        if (this.parser.controlVariable == false) {
          //if the control variable at parser is false
          //that means that something went wrong with the simplification
          //therefore the generated question can not be used.
          this.controlVariable = false
        }
        var arr = this.parser.getArr("(" + answer + ")", 1);
        //tokenizing the answer to be able to check the answers produced
        for (var i = 0; i < (arr.length / 2) + 1; i += 2) {
          arr[i][0] = arr[i][0].replace("-", "");
          arr[i][0] = arr[i][0].replace("$", "");
          //for every operand, if the coefficient has more than 5 numbers,
          //that means that the question generated is more complicated than aimed
          //complexity so checking the length allows to eliminate complex questions.
          if (arr[i][0].length > 5) {
            this.controlVariable = false;
          }
        }
        break;

      case "simultaneous_equations":
        var rand = [6]; // the coefficients (a,b,c,d,e,f) needed for the simultaneous equations is prepared
        switch (level) {
          case 9:
            for (var i = 0; i < 6; i++) {
              rand[i] = Math.floor(Math.random() * 11) - 5; //range -> -5 to +5 inclusive
            }
            break;

          case 10:
            for (var i = 0; i < 6; i++) {
              rand[i] = Math.floor(Math.random() * 25) - 12; //range -> -12 to +12 inclusive
            }
            break;

          case 11:
            for (var i = 0; i < 6; i++) {
              rand[i] = Math.floor(Math.random() * 41) - 20; //range -> -20 to +20 inclusive
            }
            break;

          case 12:
            for (var i = 0; i < 6; i++) {
              rand[i] = Math.floor(Math.random() * 101) - 50; //range -> -50 to +50 inclusive
            }
            break;
        }
        //preparing question with its answer + validation
        var arr = this.parser.simultaneous(rand[0], rand[1], rand[2], rand[3], rand[4], rand[5]);
        if (this.parser.controlVariable == false) {
          //if the control variable at parser is false
          //that means that something went wrong with the simplification
          //therefore the generated question can not be used.
          this.controlVariable = false
        }
        //solving the question
        question = arr[2][0] + "," + arr[2][1] + "," + arr[2][2] + "," + arr[2][3] + "," + arr[2][4] + "," + arr[2][5];
        answer = arr[0] + "," + arr[1];
        //take the sign and the division symbol out to see count the digits for validation.
        arr[0] = arr[0].replace("-", "");
        arr[0] = arr[0].replace("$", "");
        arr[1] = arr[1].replace("-", "");
        arr[1] = arr[1].replace("$", "");
        //the total numbers should not exceed 5 in the answer. This prevents questions with giant answers
        //basicly to prevent extra complex questions.
        if (!(arr[0].length < 5 && arr[1].length < 5 && (arr[0] != 'error' || arr[1] != 'error'))) {
          this.controlVariable = false;
        }
        break;
    }

    //at the end, if the question generated is not valid, then the method recursively calls
    //itself until it generates a valid question. When this happens, it returns the questions with its
    //answer in an array
    if (this.controlVariable == false) {
      this.controlVariable = true;
      var result = this.generateQuestion(level, type);
      return [result[0], result[1]];
      //always returns the valid question generated because result returned is always valid
      //it is because if it was not, it would not be returned
    }
    return [question, answer];
  }

  getSign() {
    var sign = "";
    //choosing random operator
    //the division operator is not included because it may generate questions that can not be soved
    //therefore using division operator in the templates prevents this problem.
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
    //random coefficient template generator.
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
  //renders mathml code in html
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
  //adding a new method to the String class
  return this.split(target).join(replacement);
};

Array.prototype.insert = function(index, item) {
  //adding a new method to array class
  this.splice(index, 0, item);
};