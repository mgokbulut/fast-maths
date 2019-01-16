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
          return "Are you sure you want to leave?";
      }
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
        <div class=q11>Question:<p id="QuestionNumber"></p></div>

        <div id="expression1" style="margin-left:50px;">
    			<math display="block">
    				<mrow class="beginning">
    				</mrow>
    			</math>
    		</div>
        <div id="expression2">
    			<math display="block">
    				<mrow class="beginning">
    				</mrow>
    			</math>
    		</div>

      </div>

        <div class="a1">
          <a href="#" id="quitbutton" onclick="getQuestion()">&laquo; Quit</a>

          <div id="buttons_div" class="buttons" style="margin-top:10px;">

          </div>

          <a href="#" class="next" id="nextbutton" onclick="getQuestion()" >Next &raquo;</a>
          <script type="text/javascript">
            $("#myButton").click(function() {
              alert("Button code executed.");
            });
          </script>
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
