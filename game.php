<?php
  require "includes/header.php";
?>

<div class="mainbody">

  <!--Calculator-->
  <?php
    require "calculator.php";
  ?>
  <!--Game-->
  <div class="game">

    <script type="text/javascript">
      window.onbeforeunload = function() {
          //this is triggered when the user attempts to close the window.
          return "Are you sure you want to leave?";
      }
    </script>

    <script type="text/javascript">
      function startGame() {
        $( document ).ready(function() {
          game = new game_class();
          game.levels = temp_levels;
          game.init();
          var time = game.getStats(game.current_level,1)[0];
          game.timeLeft = time;
          game.countdown(time);
          game.getQuestion();
        });
        var temp_levels = '<?php foreach( $_SESSION['levels'] as $level){echo $level . ',';}  ?>';
        //stroring the user id in js local storage
        localStorage.setItem('user_id', <?php echo $_SESSION['user_id']; ?>);
      }
      window.onload = startGame;
    </script>

    <!--Points and timer-->
    <div class="pointtimer">
      <div style="background-color:lightgray;">
        <p style="display: inline;">Score: </p>
        <p style="display: inline;"id="point">0</p>
      </div>
      <ul>
        <li id="he1"> Health1 </li>
        <li id="he2"> Health2 </li>
        <li id="he3"> Health3 </li>
      </ul>
      <div style="float:right; margin-right:10px;background-color:lightgray;">
        <p style="display: inline;"><span id="time"></span></p>
      </div>
    </div>

    <!--Q&A-->
    <div class="question">

      <div class="q1" style="text-align: center;">
        <div class=q11><b>Question: <span id="QuestionNumber"></span></b></div>

        <div id="expression1" style="width:auto;height: auto;text-align: center;">
    			<math display="block">
    				<mrow class="beginning">
    				</mrow>
    			</math>
    		</div>
        <div id="expression2" style="width:auto;height: auto;text-align: center;">
    			<math display="block">
    				<mrow class="beginning">
    				</mrow>
    			</math>
    		</div>
      </div>
      <div style="
        border:2px solid black;
        margin-left: 12px;
        border-radius: 10px;
        width: 1077px;
        height: 40px;
        background-color: white;
        float: bottom;
        padding-bottom: 5px;

        ">
          <p style="text-align: center;"><b>Solve the questions and put the answers in boxes below in fraction form</b></p>
        </div>

        <div class="a1">
          <button id="quitbutton" onclick="getQuestion()">&laquo; Quit</button>

          <div id="buttons_div" class="buttons" style="margin-top:10px;">

          </div>

          <button class="next" id="nextbutton" onclick="getQuestion()" >Next &raquo;</button>

        </div>
    </div>
  </div>

  <div class="rightside">
    <!--Leaderboard-->
    <?php
      require "leaderboard.php";
    ?>
  </div>
</div>


<?php
  require "includes/footer.php";
?>
